import React from "react"
import { IntegerBtn } from "@/components/IntegerBtn"

interface GetCustomAttrResponse {
    value: string
}

interface Props {
    getCustomAttr: (value: string) => GetCustomAttrResponse
    signListener: (e: any) => any
    values: string[]
    icon: string
}

const IntegerButtonsComponent: React.FC<Props> = ({ getCustomAttr, values, signListener, icon }) => {
    return(
        <div className={'flex justify-between mt-2.5 mx-auto'}>
            <IntegerBtn value={values[0]} customAttr={getCustomAttr(values[0])} icon={values[0]} />
            <IntegerBtn value={values[1]} customAttr={getCustomAttr(values[1])} icon={values[1]} />
            <IntegerBtn value={values[2]} customAttr={getCustomAttr(values[2])} icon={values[2]} />
            <button onClick={signListener} className={'flex justify-center items-center'}>
                <i className={`fa-solid fa-${icon}`}/>
            </button>
        </div>
    )
}

export const IntegerButtons = React.memo(IntegerButtonsComponent)
