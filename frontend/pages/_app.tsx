import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Header, Footer } from '../components'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

axios.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
export default MyApp
