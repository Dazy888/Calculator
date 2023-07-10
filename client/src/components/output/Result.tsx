import React from "react"
import styles from "@/styles/Index.module.scss"
import { ResultInput } from "@/components/output/ResultInput"
import { useAppSelector } from "@/hooks/redux"

const ResultComponent = () => {
    const isMemorized = useAppSelector(state => state.calculatorReducer.isMemorized)

    return(
        <div className={'w-fit relative text-center mx-auto'}>
            <ResultInput />
            <span className={`${styles['letter-m']} ${isMemorized ? '' : 'hidden'} absolute text-3xl text-black`}>M</span>
        </div>
    )
}

export const Result = React.memo(ResultComponent)
