import React, { useEffect, useRef } from "react"
import Head from 'next/head'
import { Calculator } from '@/services/calculator'
import styles from '@/styles/Index.module.scss'
import { useAppDispatch } from "@/hooks/redux"
import { Input } from "@/components/Input"
import { IntegerButtons } from "@/components/IntegerButtons"

const Home = () => {
    const mRef: any = useRef()
    const dispatch = useAppDispatch()

    function getCustomAttr(value: string) {
        return { value }
    }

    useEffect(() => {
        window.onkeydown = (e) =>Calculator.keyDown(e, dispatch)
        window.onkeyup = Calculator.checkLengthArr
    }, [])

    return (
        <div id={styles.wrapper} className={'min-h-screen opacity-90 flex justify-center items-center'}>
            <Head>
                <title>Calculator</title>
                <link rel={'icon'} href={'favicon.png'}/>
            </Head>
            <div onClick={(e) => Calculator.containerListener(e, dispatch)} className={`${styles.container} w-fit rounded-lg p-3 text-white`}>
                <div className={'w-fit relative text-center mb-10 mx-auto'}>
                   <Input/>
                   <span ref={mRef} className={`${styles['letter-m']} hidden absolute text-4xl`}>M</span>
                </div>
                <div className={`${styles.memory} text-center mb-10 text-4xl`}>
                    <button className={'mr-6 rounded-full duration-500'} onClick={() => Calculator.cleanMemory(mRef.current)}>MC</button>
                    <button className={'mr-6 rounded-full duration-500'} onClick={() => Calculator.readMemory(dispatch)}>MR</button>
                    <button className={'mr-6 rounded-full duration-500'} onClick={() => Calculator.plusMemory(mRef.current)}>M+</button>
                    <button className={'mr-6 rounded-full duration-500'} onClick={() => Calculator.minusMemory()}>M-</button>
                    <button className={'rounded-full duration-500'} onClick={() => Calculator.saveMemory(mRef.current)}>MS</button>
                </div>
                <div className={`${styles.controls} text-4xl`}>
                    <div className={'flex justify-between mt-2.5 mx-auto'}>
                        <button onClick={(e) => Calculator.signListener(e, '%', dispatch)} className={'flex justify-center items-center'}>
                            <i className={'fa-solid fa-percent'}/>
                        </button>
                        <button onClick={() => Calculator.squareListener(dispatch)} className={'flex justify-center items-center'}>
                            <i className={'fa-solid fa-square-root-variable'}/>
                        </button>
                        <button onClick={(e) => Calculator.signListener(e, '□', dispatch)} className={'flex justify-center items-center'}>х²</button>
                        <button onClick={() => Calculator.invPropListener(dispatch)} className={'flex justify-center items-center'}>1/x</button>
                    </div>
                    <div className={'flex justify-between mt-2.5 mx-auto'}>
                        <button onClick={() => Calculator.cleanUpInput(dispatch)} className={'flex justify-center items-center tracking-widest'}>
                            <i className={'fa-solid fa-c'}/>
                            <i className={'fa-solid fa-e'}/>
                        </button>
                        <button onClick={() => Calculator.fullCleaning(mRef.current, dispatch)} className={'flex justify-center items-center'}>
                            <i className={'fa-solid fa-c'}/>
                        </button>
                        <button onClick={() => Calculator.deleteListener(dispatch)} className={'flex justify-center items-center'}>
                            <i className={'fa-solid fa-delete-left'}/>
                        </button>
                        <button onClick={(e) => Calculator.signListener(e, '/', dispatch)} className={'flex justify-center items-center'}>
                            <i className={'fa-solid fa-divide'}/>
                        </button>
                    </div>
                    <IntegerButtons getCustomAttr={getCustomAttr} signListener={(e: any) => Calculator.signListener(e, '*', dispatch)} values={['7', '8', '9']} icon={'xmark'}/>
                    <IntegerButtons getCustomAttr={getCustomAttr} signListener={(e: any) => Calculator.signListener(e, '-', dispatch)} values={['4', '5', '6']} icon={'minus'}/>
                    <IntegerButtons getCustomAttr={getCustomAttr} signListener={(e: any) => Calculator.signListener(e, '+', dispatch)} values={['1', '2', '3']} icon={'plus'}/>
                    <div className={'flex justify-between mt-2.5 mx-auto'}>
                        <button onClick={() => Calculator.changeSign(dispatch)} className={'flex justify-center items-center'}>
                            <i className={'fa-solid fa-plus-minus'}/>
                        </button>
                        <button value={'0'} className={'flex justify-center items-center'}>
                            <i {...getCustomAttr('0')} className={`fa-solid fa-0`}/>
                        </button>
                        <button onClick={() => Calculator.dotListener(dispatch)} className={'flex justify-center items-center text-xl'}>
                            <i className={`${styles.circle} fa-solid fa-circle`}/>
                        </button>
                        <button onClick={() => Calculator.equalListener(dispatch)} className={'flex justify-center items-center'}>
                            <i className={'fa-solid fa-equals'}/>
                        </button>
                    </div>
                </div>
          </div>
      </div>
    )
}

export default React.memo(Home)
