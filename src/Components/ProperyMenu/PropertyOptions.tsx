import { useAppState, propertyOptionType } from "../AppStateProvider"

interface DataType {
    image: propertyOptionType,
    title: string,
    isIgnored: null | Function,
    element: JSX.Element
}

const PropertyOptions = () => {
    const {state: appState, setState : setAppState} = useAppState()

    const data : DataType[] = [
        {
            image: 'paperFormat',
            title: 'Paper format',
            isIgnored: null,
            element: (<div>a</div>),
        },
        {
            image: 'fieldList',
            title: 'Pdf elements',
            isIgnored: null,
            element: (<div>b</div>),
        },
        {
            image: 'properties',
            title: 'Properties',
            isIgnored: () => {
                if (appState.selectedElement === null) {
                    return false
                } else {
                    return true
                }
            },
            element: (<div>c</div>),
        },
        {
            image: 'variables',
            title: 'Variables',
            isIgnored: null,
            element: (<div>d</div>),
        },
    ]

    return (
        <div className="propertymenu__options">
            {data.map((option) => {
                const isDisplayed = option.isIgnored ? option.isIgnored() : true
                return isDisplayed && (
                    <div 
                        className={`properymenu__optionsicons ${option.image === appState.propertyOptionSelected ? 'propertymenu__optionsiconsselected' : ''}`} 
                        title={option.title}
                        onClick={() => {
                            setAppState(prev => (
                                {
                                    ...prev,
                                    propertyOptionSelected: option.image
                                }
                            ))
                        }}>
                        <img src={`img/${option.image}.png`} alt="" />
                    </div>
                )
            })}
        </div>
    )
}

export default PropertyOptions