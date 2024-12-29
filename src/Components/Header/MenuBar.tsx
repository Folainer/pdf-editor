import { useState } from "react"
import './Header.scss'
import { ChangeBackgroundCommand } from "../../Logic/Command/ChangeBackgroundCommand"
import { useCommandManager } from "../CommandManagerProvider"

const MenuBar = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null)

    // const menuList = ['Pdf', 'Edit', 'Add', 'Template', 'Data', 'Font']

    const commandManager = useCommandManager()

    const menuList = [
        {
            name: 'Pdf',
            options: [
                {
                    name: 'Export PDF',
                    handling: () => alert('Command is not available')
                },
                {
                    name: 'Add page after',
                    handling: () => alert('Command is not available')
                },
                {
                    name: 'Remove current page',
                    handling: () => alert('Command is not available')
                },
            ],
        },
        {
            name: 'Edit',
            options: [
                {
                    name: 'Undo',
                    handling: () => commandManager.undo()
                },
                {
                    name: 'Redo',
                    handling: () => commandManager.redo()
                },
            ]
        },
        {
            name: 'Add',
            options: [
                {
                    name: 'Text',
                    handling: () => alert('Command is not available')
                },
                {
                    name: 'Image',
                    handling: () => alert('Command is not available')
                },
                {
                    name: 'Table',
                    handling: () => alert('Command is not available')
                },
            ]
        },
        {
            name: 'Template',
            options: [
                {
                    name: 'Import template',
                    handling: () => alert('Command is not available')
                },
                {
                    name: 'Export current template',
                    handling: () => alert('Command is not available')
                },
                {
                    name: 'Save current template',
                    handling: () => alert('Command is not available')
                },
                {
                    name: 'Delete current template',
                    handling: () => alert('Command is not available')
                },
            ]
        },
        {
            name: 'Data',
            options: [
                {
                    name: 'Replace data',
                    handling: () => alert('Command is not available')
                },
                {
                    name: 'Save data',
                    handling: () => alert('Command is not available')
                },
                {
                    name: 'Export data',
                    handling: () => alert('Command is not available')
                }
            ]
        },
        {
            name: 'Font',
            options: [
                {
                    name: 'Import font',
                    handling: () => alert('Command is not available')
                },
                {
                    name: 'Delete all custom fonts',
                    handling: () => alert('Command is not available')
                }
            ]
        }
    ]

    const mouseEnter = (label : string) => {
        setActiveMenu(label)
    }

    const mouseLeave = () => {
        setActiveMenu(null)
    }

    const handleClick = (color : string) => {
        const command = new ChangeBackgroundCommand(document.body.style.backgroundColor, color)
        commandManager.execute(command)
    }


    return (
        <div className="menubar">
            {menuList.map(menuListItem => {
                return (
                    <div 
                        className="menubar__item"
                        key={menuListItem.name}
                        onMouseEnter={() => mouseEnter(menuListItem.name)}
                        onMouseLeave={mouseLeave}
                    >
                        {menuListItem.name}
                        {activeMenu === menuListItem.name && (
                            <div className="menubar__contextmenu">
                                {menuListItem.options.map(option => {
                                    return (
                                    <div
                                        key={option.name}
                                        className="menubar__contextmenuitem"
                                        onClick={option.handling}>
                                        {option.name}
                                    </div>)
                                })}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default MenuBar