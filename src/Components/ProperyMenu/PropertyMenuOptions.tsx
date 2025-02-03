import { useComponentContext } from "../ComponentContextProvider"
import { usePropertyMenu } from "./PropertyMenuProvider"
import { DataType } from "../Types/PropertyType"

const PropertyOptions = () => {

    const {componentContext, setComponentContext} = useComponentContext()

    const data : DataType[] = usePropertyMenu()

    return (
        <div className="propertymenu__options">
            {data.map((option) => {
                const isDisplayed = option.isIgnored ? option.isIgnored() : true
                return isDisplayed && (
                    <div 
                        className={`properymenu__optionsicons ${option.image === componentContext.propertyOptionSelected ? 'propertymenu__optionsiconsselected' : ''}`} 
                        title={option.title}
                        onClick={() => {
                            setComponentContext(prev => (
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