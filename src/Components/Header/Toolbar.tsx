import ToolbarSection from "./ToolbarSection"
import ToolbarSectionImage from './ToolbarSectionImage'

const Toolbar = () => {
    const emptyHandler = () => {
        alert('The command still is not availabe')
    }

    const sectionData  = [
        {
            name: 'Save',
            items: [
                {
                    type: 'image',
                    src: '/img/save.png',
                    title: 'Save All',
                    handler: emptyHandler
                },
                {
                    type: 'image',
                    src: '/img/templateSave.png',
                    title: 'Save template',
                    handler: emptyHandler
                },
                {
                    type: 'image',
                    src: '/img/dataSave.png',
                    title: 'Save data',
                    handler: emptyHandler
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
                    handler: emptyHandler
                },
                {
                    type: 'image',
                    src: '/img/align_horizontal_center.png',
                    title: 'Align horizontal center',
                    handler: emptyHandler
                },
                {
                    type: 'image',
                    src: '/img/align_horizontal_right.png',
                    title: 'Align horizontal right',
                    handler: emptyHandler
                },
                {
                    type: 'image',
                    src: '/img/align_vertical_top.png',
                    title: 'Align vertical top',
                    handler: emptyHandler
                },
                {
                    type: 'image',
                    src: '/img/align_vertical_center.png',
                    title: 'Align vertical center',
                    handler: emptyHandler
                },
                {
                    type: 'image',
                    src: '/img/align_vertical_bottom.png',
                    title: 'Align vertical bottom',
                    handler: emptyHandler
                },
            ]
        }
    ]

    const sectionLenth = sectionData.length

    return (
        <div className="toolbar">
            {sectionData.map((section, index) => {
                return (
                    <>
                        <ToolbarSection name={section.name}>
                            {section.items.map(item => {
                                if (item.type === 'image') {
                                    return <ToolbarSectionImage title={item.title} src={item.src} handler={item.handler} />
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