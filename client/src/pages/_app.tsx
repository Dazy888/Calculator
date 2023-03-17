import React from "react"
import type { AppProps } from 'next/app'
import Script from "next/script"
import { Provider } from "react-redux"
// Styles
import '@/styles/reset.scss'
import '@/styles/main.scss'
// Store
import { store } from "@/store/store"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
      <>
        <Script src={'https://kit.fontawesome.com/0a15c952b0.js'} crossOrigin={'anonymous'}/>
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
      </>
  )
}

export default React.memo(App)
