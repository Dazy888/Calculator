import React from "react"
import {useAppDispatch} from "@/hooks/redux"
import { Calculator } from "@/services/calculator"
import { ControlBtn } from "@/components/controls/ControlBtn"

const FirstRowComponent = () => {
    const dispatch = useAppDispatch()

    return(
        <div>
            <button onClick={(e) => Calculator.signListener(e, '%', dispatch)} className={'flex-center'}>
                <i className={'fa-solid fa-percent'}/>
            </button>
            <ControlBtn clickListener={() => Calculator.squareListener(dispatch)} value={<i className={'fa-solid fa-square-root-variable'} />} />
            <button onClick={(e) => Calculator.signListener(e, '□', dispatch)} className={'flex-center'}>х²</button>
            <ControlBtn clickListener={() => Calculator.invPropListener(dispatch)} value={'1/x'} />
        </div>
    )
}

export const FirstRow = React.memo(FirstRowComponent)
