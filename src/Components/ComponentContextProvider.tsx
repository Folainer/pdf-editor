import React, { createContext, useContext } from 'react'


interface ComponentContextType {
    chooseContext: {
        setOption: React.Dispatch<React.SetStateAction<string>> | null
    }
}

const ComponentContextContext = createContext<ComponentContextType>({
    chooseContext : {
        setOption: null
    }
})

export const ComponentContextProvider : React.FC<{children : React.ReactNode}> = ({children}) => {
    return (
        <ComponentContextContext.Provider value={{chooseContext: {
            setOption: null
        }}}>
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