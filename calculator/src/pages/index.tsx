import React, {useEffect, useRef} from "react"
import Head from 'next/head'
import { useDispatch } from "react-redux"
// Styles
import styles from '../styles/Index.module.scss'
// Components
import { Input } from "@/components/input"
import { IntegerButtons } from "@/components/integerButtons"
// Service
import { Calculator } from '@/service/calculator'

const Home = () => {
    const mRef: any = useRef()
    const dispatch = useDispatch()

    function getCustomAttr(value: string) {
        return {'value': value}
    }

    useEffect(() => {
        window.onkeydown = (e) =>Calculator.keyDown(e, dispatch)
        window.onkeyup = Calculator.checkLengthArr
    }, [])

    return (
        <div id={'wrapper'} className={'flex-center'}>
            <Head>
                <title>Calculator</title>
                <link rel={'icon'} href={'https://img.favpng.com/2/10/3/computer-icons-calculator-png-favpng-wbhiLCa45UD16TnYgD3YTK8Qh.jpg'}/>
            </Head>
            <div onClick={(e) => Calculator.containerListener(e, dispatch)} className={styles['container']}>
                <div className={styles['container__input']}>
                   <Input/>
                   <div>
                      <button onClick={() => Calculator.cleanMemory(mRef.current)}>MC</button>
                      <button onClick={() => Calculator.readMemory(dispatch)}>MR</button>
                      <button onClick={() => Calculator.plusMemory(mRef.current)}>M+</button>
                      <button onClick={() => Calculator.minusMemory()}>M-</button>
                      <button onClick={() => Calculator.saveMemory(mRef.current)}>MS</button>
                   </div>
                   <span ref={mRef} className="letter-m">M</span>
                </div>
                <div className={styles['container__controls']}>
                    <div>
                        <button onClick={(e) => Calculator.signListener(e, '%', dispatch)} className={'flex-center'}>
                            <i className={'fa-solid fa-percent'}/>
                        </button>
                        <button onClick={() => Calculator.squareListener(dispatch)} className={'flex-center'}>
                            <i className={`fa-solid fa-square-root-variable`}/>
                        </button>
                        <button onClick={(e) => Calculator.signListener(e, '□', dispatch)} className={'flex-center'}>х²</button>
                        <button onClick={() => Calculator.invPropListener(dispatch)} className="flex-center">1/x</button>
                    </div>
                    <div>
                        <button onClick={() => Calculator.cleanUpInput(dispatch)} className={'flex-center'}>
                            <i className={'fa-solid fa-c'}/>
                            <i className={'fa-solid fa-e'}/>
                        </button>
                        <button onClick={() => Calculator.fullCleaning(mRef.current, dispatch)} className={'flex-center'}>
                            <i className={`fa-solid fa-c`}/>
                        </button>
                        <button onClick={() => Calculator.deleteListener(dispatch)} className={'flex-center'}>
                            <i className={`fa-solid fa-delete-left`}/>
                        </button>
                        <button onClick={(e) => Calculator.signListener(e, '/', dispatch)} className="flex-center">
                            <i className={`fa-solid fa-divide`}/>
                        </button>
                    </div>
                    <IntegerButtons getCustomAttr={getCustomAttr} signListener={(e: any) => Calculator.signListener(e, '*', dispatch)} values={['7', '8', '9']} icon={'xmark'}/>
                    <IntegerButtons getCustomAttr={getCustomAttr} signListener={(e: any) => Calculator.signListener(e, '-', dispatch)} values={['4', '5', '6']} icon={'minus'}/>
                    <IntegerButtons getCustomAttr={getCustomAttr} signListener={(e: any) => Calculator.signListener(e, '+', dispatch)} values={['1', '2', '3']} icon={'plus'}/>
                    <div>
                        <button onClick={() => Calculator.changeSign(dispatch)} className={'flex-center'}>
                            <i className={'fa-solid fa-plus-minus'}/>
                        </button>
                        <button value={'0'} className={'flex-center'}>
                            <i {...getCustomAttr('0')} className={`fa-solid fa-0`}/>
                        </button>
                        <button onClick={() => Calculator.dotListener(dispatch)} className={'flex-center'}>
                            <i className={`fa-solid fa-circle`}/>
                        </button>
                        <button onClick={(e) => Calculator.equalListener(dispatch)} className="flex-center">
                            <i className={`fa-solid fa-equals`}/>
                        </button>
                    </div>
                </div>
          </div>
      </div>
    )
}

export default React.memo(Home)