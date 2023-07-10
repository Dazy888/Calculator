import React from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { Calculator } from "@/services/calculator"
import { ControlBtn } from "@/components/controls/ControlBtn"
import { setIsMemorized } from "@/store/reducers/CalculatorSlice"

const SecondRowComponent = () => {
    const dispatch = useAppDispatch()
    const isMemorized = useAppSelector(state => state.calculatorReducer.isMemorized)

    function fullCleaning() {
        Calculator.fullCleaning(dispatch)
        if (isMemorized) dispatch(setIsMemorized(false))
    }

    return(
        <div>
            <ControlBtn clickListener={() => Calculator.cleanUpInput(dispatch)} value={
                <>
                    <i className={'fa-solid fa-c mr-1.5'}/>
                    <i className={'fa-solid fa-e'}/>
                </>
            } />
            <ControlBtn clickListener={fullCleaning} value={<i className={'fa-solid fa-c'} />} />
            <ControlBtn clickListener={() => Calculator.deleteListener(dispatch)} value={<i className={'fa-solid fa-delete-left'} />} />
            <button onClick={(e) => Calculator.signListener(e, '/', dispatch)} className={'flex-center'}>
                <i className={'fa-solid fa-divide'}/>
            </button>
        </div>
    )
}

export const SecondRow = React.memo(SecondRowComponent)
