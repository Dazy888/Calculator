import React from "react"
import { useSelector } from "react-redux"
import { getValue } from "@/store/reducers/calculator-selectors"

const InputComponent: React.FC = () => {
    const value = useSelector(getValue)
    return <input readOnly={true} value={value}/>
}

export const Input = React.memo(InputComponent)