import React, {MouseEventHandler} from "react"
import { v4 } from "uuid"
import { IntegerBtn } from "@/components/controls/IntegerBtn"
import { GetCustomAttrFunc } from "@/models/main.models"

interface Props {
    getCustomAttr: GetCustomAttrFunc
    signListener: MouseEventHandler<HTMLButtonElement>
    values: string[]
    icon: string
}

const IntegerButtonsComponent: React.FC<Props> = ({ getCustomAttr, values, signListener, icon }) => (
    <div>
        {values.map((value) => <IntegerBtn key={v4()} value={value} customAttr={getCustomAttr(value)} icon={value} />)}
        <button onClick={signListener} className={'flex-center'}>
            <i className={`fa-solid fa-${icon}`}/>
        </button>
    </div>
)

export const IntegerButtons = React.memo(IntegerButtonsComponent)
