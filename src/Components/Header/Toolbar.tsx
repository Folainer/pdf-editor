import { AppState, useAppState } from "../AppStateProvider"
import ToolbarSection from "./ToolbarSection"
import ToolbarSectionImage from './ToolbarSectionImage'
import ToolbarSectionInput from "./ToolbarSectionInput"
import ToolbarSectionCheck from "./ToolbarSectionCheck"

const Toolbar = () => {
    const emptyHandler = () => {
        alert('The command still is not availabe')
    }

    // const emptyCheck = (state : AppState) => {
    //     state
    //     return true
    // }

    const saveTemplateCheck = (state: AppState) => {
        if (state.hasUnsavedTemplate) {
            return true
        }
        return false
    }
    
    const saveDataCheck = (state: AppState) => {
        if (state.hasUnsavedData) {
            return true
        }
        return false
    }

    const saveCheck = (state: AppState) => {
        if (state.hasUnsavedData || state.hasUnsavedTemplate) {
            return true
        }
        return false
    }

    const alignmentCheck = (state : AppState) => {
        if (state.selectedElement) {
            return true
        }
        return false
    }

    const positionCheck = (state : AppState) => {
        if (state.selectedElement) {
            return true
        }
        return false
    }

    const gridCheck = (state : AppState) => {
        if (state.selectedTemplate) {
            return true
        }
        return false
    }

    const sizeCheck = (state : AppState) => {
        if (state.selectedElement) {
            return true
        }
        return true
    }


    const sectionData  = [
        {
            id: 0,
            name: 'Save',
            items: [
                {
                    type: 'image',
                    src: '/img/save.png',
                    title: 'Save All',
                    handler: emptyHandler,
                    useCheck: saveCheck
                },
                {
                    type: 'image',
                    src: '/img/templateSave.png',
                    title: 'Save template',
                    handler: emptyHandler,
                    useCheck: saveTemplateCheck
                },
                {
                    type: 'image',
                    src: '/img/dataSave.png',
                    title: 'Save data',
                    handler: emptyHandler,
                    useCheck: saveDataCheck
                },
            ]
        },
        {
            id: 1,
            name: 'Alignment',
            items: [
                {
                    type: 'image',
                    src: '/img/align_horizontal_left.png',
                    title: 'Align horizontal left',
                    handler: emptyHandler,
                    useCheck: alignmentCheck
                },
                {
                    type: 'image',
                    src: '/img/align_horizontal_center.png',
                    title: 'Align horizontal center',
                    handler: emptyHandler,
                    useCheck: alignmentCheck
                },
                {
                    type: 'image',
                    src: '/img/align_horizontal_right.png',
                    title: 'Align horizontal right',
                    handler: emptyHandler,
                    useCheck: alignmentCheck
                },
                {
                    type: 'image',
                    src: '/img/align_vertical_top.png',
                    title: 'Align vertical top',
                    handler: emptyHandler,
                    useCheck: alignmentCheck
                },
                {
                    type: 'image',
                    src: '/img/align_vertical_center.png',
                    title: 'Align vertical center',
                    handler: emptyHandler,
                    useCheck: alignmentCheck
                },
                {
                    type: 'image',
                    src: '/img/align_vertical_bottom.png',
                    title: 'Align vertical bottom',
                    handler: emptyHandler,
                    useCheck: alignmentCheck
                },
            ]
        },
        {
            id: 2,
            name: 'Size',
            items: [
                {
                    type: 'input',
                    title: 'Width',
                    handler: emptyHandler,
                    useCheck: sizeCheck
                },
                {
                    type: 'input',
                    title: 'Height',
                    handler: emptyHandler,
                    useCheck: sizeCheck
                },
            ]
        },
        {
            id: 3,
            name:'Positioning',
            items: [
                {
                    type: 'check',
                    title: 'Relative placement',
                    handler: emptyHandler,
                    useCheck: positionCheck
                },
                {
                    type: 'input',
                    title: 'X',
                    handler: emptyHandler,
                    useCheck: positionCheck
                },
                {
                    type: 'input',
                    title: 'Y',
                    handler: emptyHandler,
                    useCheck: positionCheck
                },
            ]
        },
        {
            id: 4,
            name: 'Grid',
            items: [
                {
                    type: 'image',
                    src: '/img/magnet.png',
                    title: 'Use snapping',
                    handler: emptyHandler,
                    useCheck: gridCheck
                },
                {
                    type: 'image',
                    src: '/img/grid.png',
                    title: 'Display grid',
                    handler: emptyHandler,
                    useCheck: gridCheck
                },
                {
                    type: 'input',
                    title: 'Gap',
                    handler: emptyHandler,
                    useCheck: gridCheck
                },
            ]
        },
    ]

    const sectionLenth = sectionData.length
    const appState = useAppState().state

    return (
        <div className="toolbar">
            {sectionData.map((section, index) => {
                return (
                    <>
                        <ToolbarSection  name={section.name}>
                            {section.items.map(item => {
                                const isEnabled = item.useCheck(appState)
                                if (item.type === 'image' && 'src' in item) {
                                    return <ToolbarSectionImage title={item.title} src={item.src ?? ''} handler={isEnabled ? item.handler : null} isEnabled={isEnabled} />
                                } else if (item.type === 'input') {
                                    return <ToolbarSectionInput title={item.title} handler={isEnabled ? item.handler : null} isEnabled={isEnabled} />
                                } else if (item.type === 'check') {
                                    return <ToolbarSectionCheck title={item.title} handler={isEnabled ? item.handler : null} isEnabled={isEnabled} /> 
                                }
                            })}
                        </ToolbarSection>
                        {index !== sectionLenth - 1 && <div className="toolbar__sectionseparator"></div>}
                    </>
                    )
            }) }
        </div>
    )
}

export default Toolbar