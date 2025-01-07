import React, { useState } from "react"
import { useJsonManager } from "../JsonManagerProvider"

const MenuBarChoose : React.FC<{title: string, }> = ({title}) => {
    const [isOpen, setOpenness] = useState<boolean>(false)
    const [option, setOption] = useState<string>('')

    const handleClick = () => {
        setOpenness(!isOpen)
    }

    const handleItemClick = (itemName: string) => {
        setOption(itemName)
    }

    const templateJson = useJsonManager().template

    return (
        <div title={title} onClick={() => handleClick()} className={`menubar__choose ${isOpen && 'menubar__choose_open'}`}>
            <div className="menubar__chooseoption"> 
                <span>{option}</span>
                <img src="/img/chooseOptions.png" />
            </div>
            {isOpen && (
                <div className="menubar__chooselist">
                    {templateJson.getAll().map(item => {
                        return (
                            <div key={item.name} onClick={() => handleItemClick(item.name)}  className="menubar__chooselistitem">
                                {item.name}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default MenuBarChoose