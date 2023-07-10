import React from "react"
import styles from '@/styles/Index.module.scss'
import { Calculator } from "@/services/calculator"
import { useAppDispatch } from "@/hooks/redux"
import { FirstRow } from "@/components/controls/FirstRow"
import { SecondRow } from "@/components/controls/SecondRow"
import { IntegerButtons } from "@/components/controls/IntegerButtons"
import { ThirdRow } from "@/components/controls/ThirdRow"

const ControlsComponent = () => {
    const dispatch = useAppDispatch()

    const getCustomAttr = (value: string) => { return { value } }

    return(
        <div className={`${styles.controls} text-4xl`}>
            <FirstRow />
            <SecondRow />
            <IntegerButtons getCustomAttr={getCustomAttr} signListener={(e: any) => Calculator.signListener(e, '*', dispatch)} values={['7', '8', '9']} icon={'xmark'}/>
            <IntegerButtons getCustomAttr={getCustomAttr} signListener={(e: any) => Calculator.signListener(e, '-', dispatch)} values={['4', '5', '6']} icon={'minus'}/>
            <IntegerButtons getCustomAttr={getCustomAttr} signListener={(e: any) => Calculator.signListener(e, '+', dispatch)} values={['1', '2', '3']} icon={'plus'}/>
            <ThirdRow getCustomAttr={getCustomAttr} />
        </div>
    )
}

export const Controls = React.memo(ControlsComponent)
