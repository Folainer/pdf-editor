export interface ComponentContext {
    setOption: React.Dispatch<React.SetStateAction<string>> | null,
    propertyOptionSelected: propertyOptionType
}

export interface ComponentContextType {
    componentContext: ComponentContext,
    setComponentContext: React.Dispatch<React.SetStateAction<ComponentContext>>
}

export type propertyOptionType = 'paperFormat' | 'fieldList' | 'properties' | 'variables'

export interface DataType {
    image: propertyOptionType,
    title: string,
    isIgnored: null | Function,
    element: JSX.Element
}