import React from "react"
import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => (
    <Html lang="en">
        <Head>
             <link rel={'stylesheet'} href={'/fontawesome/css/all.css'}/>
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
    </Html>
)

export default React.memo(Document)
