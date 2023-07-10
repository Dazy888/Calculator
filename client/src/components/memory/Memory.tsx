import React from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import styles from "@/styles/Index.module.scss"
import { Calculator } from "@/services/calculator"
import { MemoryBtn } from "@/components/memory/MemoryBtn"
import { setIsMemorized } from "@/store/reducers/CalculatorSlice"

const MemoryComponent = () => {
    const dispatch = useAppDispatch()
    const isMemorized = useAppSelector(state => state.calculatorReducer.isMemorized)

    function cleanMemory() {
        Calculator.cleanMemory()
        dispatch(setIsMemorized(false))
    }

    return(
        <div className={`${styles.memory} text-center my-10 text-4xl`}>
            <MemoryBtn value={'C'} clickListener={cleanMemory} />
            <MemoryBtn value={'R'} clickListener={() => Calculator.readMemory(dispatch)} />
            <MemoryBtn value={'+'} clickListener={() => Calculator.plusMemory(dispatch, isMemorized)} />
            <MemoryBtn value={'-'} clickListener={() => Calculator.minusMemory()} />
            <MemoryBtn isMargin={false} value={'S'} clickListener={() => Calculator.saveMemory(dispatch)} />
        </div>
    )
}

export const Memory = React.memo(MemoryComponent)
