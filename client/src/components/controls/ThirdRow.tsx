import React from "react"
import styles from '@/styles/Index.module.scss'
import { Calculator } from "@/services/calculator"
import { useAppDispatch } from "@/hooks/redux"
import { GetCustomAttrFunc } from "@/models/main.models"
import { ControlBtn } from "@/components/controls/ControlBtn"

interface Props {
    getCustomAttr: GetCustomAttrFunc
}

const ThirdRowComponent: React.FC<Props> = ({ getCustomAttr }) => {
    const dispatch = useAppDispatch()

    return(
        <div>
            <ControlBtn clickListener={() => Calculator.changeSign(dispatch)} value={<i className={'fa-solid fa-plus-minus'} />} />
            <button value={'0'} className={'flex-center'}>
                <i {...getCustomAttr('0')} className={`fa-solid fa-0`} />
            </button>
            <ControlBtn clickListener={() => Calculator.dotListener(dispatch)} value={<i className={`${styles.circle} text-xl fa-solid fa-circle`} />} />
            <ControlBtn clickListener={() => Calculator.equalListener(dispatch)} value={<i className={'fa-solid fa-equals'} />} />
        </div>
    )
}

export const ThirdRow = React.memo(ThirdRowComponent)
