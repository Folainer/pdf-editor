import { useState } from "react";

const ToolbarSectionInput : React.FC<{title: string, isEnabled : boolean, handler : Function | null}> = ({title, isEnabled, handler}) => {
    const handlingFun = handler ? handler : () => {}
    const [inputValue, setInputValue] = useState('')

    const isNumber = (value: string): boolean => {
        return /^\d+(\.\d+)?$/.test(value); 
    };

    let isCorrectInput = true

    const inputHandling = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (isNumber(value) || value === '' ||  isNumber(value.slice(0, -1)) && value.slice(-1) === '.') {
            if (value !== '' && !(isNumber(value.slice(0, -1)) && value.slice(-1) === '.')) {
                setInputValue(value)
                handlingFun()
            } else if (isNumber(value.slice(0, -1)) && value.slice(-1) === '.') {
                setInputValue(value)
            } else {
                setInputValue('0')
            }
            isCorrectInput = true
        } else {
            isCorrectInput = false
        }
    }

    return (
        <div title={title} className="toolbar__sectiontext">
            <span className="toolbar__sectiontextspan">{title}:</span>
            <input className={`toolbar__sectiontextinput ${!isCorrectInput ? 'toolbar__sectiontextinput_error' : ''}`} value={inputValue === '0' ? '' : inputValue} onChange={inputHandling} disabled={!isEnabled} />
        </div>
    )
}

export default ToolbarSectionInput