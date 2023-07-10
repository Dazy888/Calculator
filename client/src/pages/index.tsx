import React, { useEffect } from "react"
import Head from 'next/head'
import { useAppDispatch } from "@/hooks/redux"
import { Calculator } from '@/services/calculator'
import styles from '@/styles/Index.module.scss'
// Components
import { Result } from "@/components/output/Result"
import { Memory } from "@/components/memory/Memory"
import { Controls } from "@/components/controls/Controls"

const Home = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        window.onkeydown = (e) => Calculator.keyDown(e, dispatch)
        window.onkeyup = Calculator.checkLengthArr
    }, [])

    return (
        <div id={styles.wrapper} className={'min-h-screen opacity-90 flex justify-center items-center'}>
            <Head>
                <title>Calculator</title>
                <link rel={'icon'} href={'favicon.png'}/>
            </Head>
            <div onClick={(e: any) => Calculator.containerListener(e, dispatch)} className={`${styles.container} w-fit rounded-lg p-3 text-white`}>
                <Result />
                <Memory />
                <Controls />
          </div>
      </div>
    )
}

export default React.memo(Home)
