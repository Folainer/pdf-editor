import React, { useState } from "react"

const MenuBarChoose : React.FC<{title: string, }> = ({title}) => {
    const [isOpen, setOpenness] = useState<boolean>(false)
    const [option, setOption] = useState<string>('')

    const handleClick = () => {
        setOpenness(!isOpen)
    }

    const handleItemClick = (itemName: string) => {
        setOption(itemName)
    }

    return (
        <div title={title} onClick={() => handleClick()} className={`menubar__choose ${isOpen && 'menubar__choose_open'}`}>
            <div className="menubar__chooseoption"> 
                <span>{option}</span>
                <img src="/img/chooseOptions.png" />
            </div>
            {isOpen && (
                <div className="menubar__chooselist">
                    {['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map(item => {
                        return (
                            <div key={item} onClick={() => handleItemClick(item)}  className="menubar__chooselistitem">
                                {item}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default MenuBarChoose