import React from "react"

type getCustomAttrRes = {
    value: string
}

interface Props {
    getCustomAttr: (value: string) => getCustomAttrRes
    signListener: (e: any) => any
    values: string[]
    icon: string
}

const IntegerButtonsComponent: React.FC<Props> = ({ getCustomAttr, values, signListener, icon }) => {
    return(
        <div>
            <button value={values[0]} className={'flex-center'}>
                <i {...getCustomAttr(values[0])} className={`fa-solid fa-${values[0]}`}/>
            </button>
            <button value={values[1]} className={'flex-center'}>
                <i {...getCustomAttr(values[1])} className={`fa-solid fa-${values[1]}`}/>
            </button>
            <button value={values[2]} className={'flex-center'}>
                <i {...getCustomAttr(values[2])} className={`fa-solid fa-${values[2]}`}/>
            </button>
            <button onClick={signListener} className="flex-center">
                <i className={`fa-solid fa-${icon}`}/>
            </button>
        </div>
    )
}

export const IntegerButtons = React.memo(IntegerButtonsComponent)