import React, { useState } from "react"
import { useJsonManager } from "../JsonManagerProvider"
import { ChangeTemplateCommand } from "../../Logic/Command/ChangeTemplateCommand"
import { useAppState } from "../AppStateProvider"
import { useCommandManager } from "../CommandManagerProvider"
import { useComponentContext } from "../ComponentContextProvider"

const MenuBarChoose : React.FC<{title: string, }> = ({title}) => {
    const [isOpen, setOpenness] = useState<boolean>(false)
    const [option, setOption] = useState<string>('')
    const appState = useAppState()
    const commandManager = useCommandManager()

    const componentContext = useComponentContext()
    componentContext.chooseContext.setOption = setOption

    const handleClick = () => {
        if (templateJson.getAll().length === 0) {
            return
        }
        setOpenness(!isOpen)
    }

    const handleItemClick = (itemName: string) => {
        const command = new ChangeTemplateCommand(appState, setOption, itemName)
        commandManager.execute(command)
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