import React from "react"

interface Props {
    value: string
    clickListener: () => void
    isMargin?: boolean
}

const MemoryBtnComponent: React.FC<Props> = ({ clickListener, value, isMargin = true}) => (
    <button className={`${isMargin ? 'mr-6' : ''} rounded-full duration-500`} onClick={clickListener}>M{value}</button>
)

export const MemoryBtn = React.memo(MemoryBtnComponent)
