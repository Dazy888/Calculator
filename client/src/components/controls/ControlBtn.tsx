import React, { ReactNode } from "react"

interface Props {
    clickListener: () => void
    value: string | ReactNode
}

const ControlBtnComponent: React.FC<Props> = ({ clickListener, value }) => <button onClick={clickListener} className={'flex-center'}>{value}</button>
export const ControlBtn = React.memo(ControlBtnComponent)
