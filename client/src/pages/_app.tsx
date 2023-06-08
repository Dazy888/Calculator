import React from "react"
import type { AppProps } from 'next/app'
import Script from "next/script"
import { Provider } from "react-redux"
import { Analytics } from '@vercel/analytics/react'
import { store } from "@/store/store"
// Styles
import '@/styles/reset.scss'
import '@/styles/main.scss'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
    <>
        <Script src={'https://kit.fontawesome.com/0a15c952b0.js'} crossOrigin={'anonymous'}/>
        <Provider store={store}>
            <Component {...pageProps} />
            <Analytics />
        </Provider>
    </>
)

export default React.memo(App)
