import { useComponentContext } from "../ComponentContextProvider"
import { usePropertyMenu } from "./PropertyMenuProvider"

const PropertyMenuContent = () => {
    const selectedOption = useComponentContext().componentContext.propertyOptionSelected
    const element = usePropertyMenu().find(cur => {
        if (cur.image === selectedOption) {
            return true
        }
    })

    return (
        <div className="propertymenu__content">
            {element && element.element}
        </div>
    )
}

export default PropertyMenuContent