import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import MaskedInput from 'react-input-mask';
import contactStyles from '../styles/Contact.module.css'
import {server} from '../config/index'
import axios from 'axios';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
      <div>
      <label className={contactStyles.label} htmlFor={props.id || props.name}>{label}</label>
      <input className={contactStyles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
          <div className={contactStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  )
}

const MyMaskedTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label className={contactStyles.label} htmlFor={props.id || props.name}>{label}</label>
      <MaskedInput className={contactStyles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={contactStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  )
}

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label className={contactStyles.label} htmlFor={props.id || props.name}>{label}</label>
      <textarea className={contactStyles.textarea} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={contactStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  )
}

const contact = () => {  
  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        }}

        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          phone: Yup.string()
            .required('Required'),
          message: Yup.string()
            .min(1, 'Message cannot be empty')
            .required('Required'),
        })}

        onSubmit={ async (values, { setSubmitting, resetForm }) => {
          await sleep(500);
          try{
            const res = await axios.post(`${server}/api/contact`, values)
            if(res.status === 200){
              alert(`Your message has been sent successfully`)
            }
          } catch(err){
            alert(err)
          }
          resetForm()
        }}
      >
      <div className={contactStyles.section}>
        <div className={contactStyles.container}>
          <Form className={contactStyles.form}>
            <div className={contactStyles.firstName}>
              <MyTextInput
                label="First Name"
                name="firstName"
                type="text"
                maxLength='15'
                autoComplete="given-name"
                placeholder="Jane"
              />
            </div>

          <div className={contactStyles.lastName}>
            <MyTextInput
                label="Last Name"
                name="lastName"
                type="text"
                maxLength='20'
                autoComplete="family-name"
                placeholder="Doe"
              />
          </div>

          <div className={contactStyles.email}>
            <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@email.com"
              />
          </div>

          <div className={contactStyles.phone}>
            <MyMaskedTextInput
                label="Phone"
                name="phone"
                mask="(999) 999-9999"
                autoComplete="tel-national"
                placeholder="(000) 000-0000"
              />
          </div>

          <div className={contactStyles.message}>
            <MyTextArea
                label="Message"
                name="message"
                type="textarea"
                placeholder="Message"
              />
          </div>
          <button className={contactStyles.button} type="submit">SUBMIT</button>
        </Form>
        </div>
      </div>
      </Formik>
    </div>
  )
}

export default contact
