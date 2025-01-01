import { AppState, useAppState } from "../AppStateProvider"
import ToolbarSection from "./ToolbarSection"
import ToolbarSectionImage from './ToolbarSectionImage'
import ToolbarSectionInput from "./ToolbarSectionInput"

const Toolbar = () => {
    const emptyHandler = () => {
        alert('The command still is not availabe')
    }

    const emptyCheck = (state : AppState) => {
        state
        return true
    }

    const alignmentCheck = (state : AppState) => {
        if (state.selectedElement) {
            return true
        }
        return false
    }


    const sectionData  = [
        {
            name: 'Save',
            items: [
                {
                    type: 'image',
                    src: '/img/save.png',
                    title: 'Save All',
                    handler: emptyHandler,
                    useCheck: emptyCheck
                },
                {
                    type: 'image',
                    src: '/img/templateSave.png',
                    title: 'Save template',
                    handler: emptyHandler,
                    useCheck: emptyCheck
                },
                {
                    type: 'image',
                    src: '/img/dataSave.png',
                    title: 'Save data',
                    handler: emptyHandler,
                    useCheck: emptyCheck
                },
            ]
        },
        {
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
            name:'Positioning',
            items: [
                {
                    type: 'input',
                    title: 'X',
                    handler: emptyHandler,
                    useCheck: emptyCheck
                },
                {
                    type: 'input',
                    title: 'Y',
                    handler: emptyHandler,
                    useCheck: emptyCheck
                },
            ]
        }
    ]

    const sectionLenth = sectionData.length
    const appState = useAppState().state

    return (
        <div className="toolbar">
            {sectionData.map((section, index) => {
                return (
                    <>
                        <ToolbarSection name={section.name}>
                            {section.items.map(item => {
                                const isEnabled = item.useCheck(appState)
                                if (item.type === 'image' && 'src' in item) {
                                    return <ToolbarSectionImage title={item.title} src={item.src} handler={isEnabled ? item.handler : null} isEnabled={isEnabled} />
                                } else if (item.type === 'input') {
                                    return <ToolbarSectionInput title={item.title} handler={isEnabled ? item.handler : null} isEnabled={isEnabled} />
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