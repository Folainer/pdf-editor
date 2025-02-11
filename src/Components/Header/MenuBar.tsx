import './Header.scss'
import { useState } from "react"
import MenuBarChoose from "./MenubarChoose"
import FileImport from "../FileImport"
import DownloadManager from "../../Logic/DownloadManager"
import { ImportTemplateCommand } from "../../Logic/Command/ImportTemplateCommand"
import { useCommandManager } from "../CommandManagerProvider"
import { useJsonManager } from "../JsonManagerProvider"
import { useAppState } from "../AppStateProvider"
import { useComponentContext } from "../ComponentContextProvider"
import { validateTemplateJson } from '../../Logic/Validator'
import { PageCommand } from '../../Logic/Command/PageCommand'

const MenuBar = () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null)

    const commandManager = useCommandManager()

    const jsonManager = useJsonManager()

    const appState = useAppState()

    const { template : templateJsonManager} = jsonManager

    const componentContext = useComponentContext()

    const fileTemplateImport = (file: File) => {
        const reader = new FileReader()

        reader.readAsText(file)

        reader.onload = () => {
            try {
                const setOption = componentContext.componentContext.setOption
                if (setOption) {
                    if (typeof reader.result === 'string') {
                        const pdfFormat = validateTemplateJson(reader.result)
                        console.log(pdfFormat)
                        if (pdfFormat) {
                            const command = new ImportTemplateCommand(templateJsonManager, appState, setOption, pdfFormat)
                            commandManager.execute(command)
                        } else {
                            throw new Error()
                        }
                    } else {
                        throw new Error()
                    }
                }
            } catch (error) {
                alert('The import error')
            }
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
                    handling: () => {
                        const pageCommand = new PageCommand(appState.state, jsonManager.template, 'add', appState.state.currentPage)
                        commandManager.execute(pageCommand)
                    }
                },
                {
                    name: 'Remove current page',
                    handling: () => {
                        const pageCommand = new PageCommand(appState.state, jsonManager.template, 'remove', appState.state.currentPage)
                        commandManager.execute(pageCommand)
                    }
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
                    fileImport: fileTemplateImport,
                    accept: '.json'
                },
                {
                    name: 'Create empty template',
                    handling: () => alert('Command is not available')
                },
                {
                    name: 'Export current template',
                    handling: () => {
                        const selectedTemplate = appState.state.selectedTemplate;
                        if (selectedTemplate) {
                            const templateJson = templateJsonManager.getByName(selectedTemplate)
                            if (templateJson) {
                                DownloadManager.exportObject(JSON.stringify(templateJson.json, null, 2), `${templateJson.name}.json`)   
                            }
                        } else {
                            alert('Template was not choosen')
                        }
                    }
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
                    name: 'Import/Replace data',
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