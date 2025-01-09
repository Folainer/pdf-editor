import { useState } from "react"
import './Header.scss'
import MenuBarChoose from "./MenubarChoose"
// import { ChangeBackgroundCommand } from "../../Logic/Command/ChangeBackgroundCommand"
import FileImport from "../FileImport"
import { useCommandManager } from "../CommandManagerProvider"
// import { ChangeTemplateCommand } from "../../Logic/Command/ChangeTemplateCommand"
import { ImportTemplateCommand } from "../../Logic/Command/ImportTemplateCommand"
import { useJsonManager } from "../JsonManagerProvider"
import { useAppState } from "../AppStateProvider"

const MenuBar = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null)

    const commandManager = useCommandManager()

    const jsonManager = useJsonManager()

    const appState = useAppState()

    const { template : templateJsonManager} = jsonManager

    const fileImport = (file: File) => {
        const reader = new FileReader()

        reader.readAsText(file)

        reader.onload = () => {
            console.log(reader.result)
            //fix it next time on 10.10
            // const command = new ImportTemplateCommand(templateJsonManager, appState, )
        }

        reader.onerror = () => {
            console.log('The file import error')
        }
    }

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
                    handling: () => {},
                    fileImport: fileImport,
                    accept: '.json'
                },
                {
                    name: 'Create empty template',
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
            name: 'Image',
            options: [
                {
                    name: 'Import image',
                    handling: () => alert('Command is not available')
                },
                {
                    name: 'Delete all images',
                    handling: () => alert('Command is not available')
                },
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

    // const handleClick = (color : string) => {
    //     const command = new ChangeBackgroundCommand(document.body.style.backgroundColor, color)
    //     commandManager.execute(command)
    // }

    return (
        <div className="menubar">
            <div className="menubar__items">
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
                                <div key={menuListItem.name} className="menubar__contextmenu">
                                    {menuListItem.options.map((option, index) => {
                                        return (!option.fileImport ?
                                        <div
                                            tabIndex={index + 1}
                                            key={option.name}
                                            className="menubar__contextmenuitem"
                                            onClick={option.handling}>
                                            {option.name}
                                        </div> :
                                        <FileImport onFileSelect={option.fileImport} accept={option.accept} >
                                            <div
                                                tabIndex={index + 1}
                                                key={option.name}
                                                className="menubar__contextmenuitem"
                                                onClick={option.handling}>
                                                {option.name}
                                            </div>
                                        </FileImport>)
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
            <MenuBarChoose title="Choose template"/>
        </div>
    )
}

export default MenuBar