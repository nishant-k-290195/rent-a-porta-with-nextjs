import '../styles/globals.css'
import Layout from '../components/Layout'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import {SidebarContextProvider} from '../contexts/SidebarContext'
import { QuoteContextProvider } from '../contexts/QuoteContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <SidebarContextProvider>
      <QuoteContextProvider>
        <Sidebar />
        <Layout>
          <Nav />
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </QuoteContextProvider>
    </SidebarContextProvider>
    </>
  )
}

export default MyApp
