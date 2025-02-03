import React, { createContext, useContext, useState } from 'react'
import { ComponentContextType, ComponentContext } from './Types/PropertyType'

const ComponentContextContext = createContext<null | ComponentContextType>(null)

export const ComponentContextProvider : React.FC<{children : React.ReactNode}> = ({children}) => {
    const [componentContext, setComponentContext] = useState<ComponentContext>({
        setOption: null,
        propertyOptionSelected: 'paperFormat'
    })

    return (
        <ComponentContextContext.Provider value={{componentContext, setComponentContext}}>
            {children}
        </ComponentContextContext.Provider>
    )
}

export const useComponentContext = () => {
    const context = useContext(ComponentContextContext)

    if (!context) {
        throw new Error("useComponentContext must be used within a JsonManagerProvider")
    }

    return context
}