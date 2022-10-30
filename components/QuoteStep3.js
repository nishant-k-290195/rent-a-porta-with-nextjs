import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-input-mask";
import QuoteStep3Styles from "../styles/QuoteStep3.module.css";
import { useContext, useState } from "react";
import { QuoteContext } from "../contexts/QuoteContext";

import { RiRefreshLine } from "react-icons/ri";
import axios from "axios";
import { Event } from "../lib/analytics";

const QuoteStep3 = () => {
  const { render, data } = useContext(QuoteContext);
  const [state, setState] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [step, setStep] = render;
  const [formValues, setFormValues] = data;

  const MyTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className={QuoteStep3Styles.outerBox}>
        <label
          className={QuoteStep3Styles.label}
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
        <div className={QuoteStep3Styles.innerBox}>
          <input className={QuoteStep3Styles.input} {...field} {...props} />
          {meta.touched && meta.error ? (
            <div className={QuoteStep3Styles.error}>{meta.error}</div>
          ) : null}
        </div>
      </div>
    );
  };

  const MyMaskedTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className={QuoteStep3Styles.outerBox}>
        <label
          className={QuoteStep3Styles.label}
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
        <div className={QuoteStep3Styles.innerBox}>
          <MaskedInput
            className={QuoteStep3Styles.input}
            {...field}
            {...props}
          />
          {meta.touched && meta.error ? (
            <div className={QuoteStep3Styles.error}>{meta.error}</div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Formik
        initialValues={formValues}
        validationSchema={Yup.object({
          fName: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("Required"),
          lName: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("Required"),
          cName: Yup.string().max(120, "Must be 120 characters or less"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          phone: Yup.string().required("Required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSpinner(true);
          try {
            await setFormValues((prevValues) => {
              return { ...prevValues, ...values };
            });
            const res = await axios.post(`/api/quote`, values);
            res.status === 200 ? setState(true) : setState(false);
            setStep(4);
            Event("Request quote", "Quote Form Submit", "QFS");
          } catch (err) {
            alert(
              `The server has some issues, please make a phone call instead submitting the form :( `
            );
          }
        }}
      >
        <div className={QuoteStep3Styles.section}>
          <div className={QuoteStep3Styles.container}>
            <Form>
              <div className={QuoteStep3Styles.form}>
                <div className={QuoteStep3Styles.fName}>
                  <MyTextField
                    label="* First Name"
                    name="fName"
                    type="text"
                    maxLength="50"
                    autoComplete="given-name"
                  />
                </div>

                <div className={QuoteStep3Styles.lName}>
                  <MyTextField
                    label="* Last Name"
                    name="lName"
                    type="text"
                    maxLength="50"
                    autoComplete="family-name"
                  />
                </div>

                <div className={QuoteStep3Styles.cName}>
                  <MyTextField
                    label="Company Name (If any)"
                    name="cName"
                    type="text"
                    maxLength="120"
                    autoComplete="organization"
                  />
                </div>

                <div className={QuoteStep3Styles.email}>
                  <MyTextField
                    label="* Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                  />
                </div>

                <div className={QuoteStep3Styles.phone}>
                  <MyMaskedTextInput
                    label="* Phone"
                    name="phone"
                    mask="(999) 999-9999"
                    autoComplete="off"
                    type="tel"
                  />
                </div>
              </div>
              <div
                className={`${QuoteStep3Styles.outerBox} ${QuoteStep3Styles.buttons}`}
              >
                <button type="submit" className={QuoteStep3Styles.next}>
                  {spinner ? (
                    <div className={QuoteStep3Styles.processing}>
                      <RiRefreshLine className={QuoteStep3Styles.spinner} />
                      <h3>SUBMIT</h3>
                    </div>
                  ) : (
                    `SUBMIT`
                  )}
                </button>
                <button
                  className={QuoteStep3Styles.previous}
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  PREVIOUS
                </button>
              </div>
            </Form>
          </div>
        </div>
      </Formik>
    </div>
  );
};

export default QuoteStep3;
