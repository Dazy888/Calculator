import React from "react"

interface Props {
    value: string
    customAttr: any
    icon: string
}

const IntegerBtnComponent: React.FC<Props> = ({ customAttr, value, icon }) => (
    <button value={value} className={'flex justify-center items-center'}>
        <i {...customAttr} className={`fa-solid fa-${icon}`}/>
    </button>
)

export const IntegerBtn = React.memo(IntegerBtnComponent)
