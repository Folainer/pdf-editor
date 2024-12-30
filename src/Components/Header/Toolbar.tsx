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
        }
    ]

    return (
        <div className="toolbar">
            {sectionData.map(section => {
                return (
                    <ToolbarSection name={section.name}>
                        {section.items.map(item => {
                            if (item.type === 'image') {
                                return <ToolbarSectionImage title={item.title} src={item.src} handler={item.handler} />
                            }
                        })}
                    </ToolbarSection>
                    )
            }) }
        </div>
    )
}

export default Toolbar