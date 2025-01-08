import React, { createContext, useContext, useState } from "react"

export interface AppState {
    selectedElement: null | 'text' | 'table' | 'image',
    hasUnsavedTemplate: boolean,
    hasUnsavedData : boolean,
    selectedTemplate: string | null
}

export interface AppStateContextType {
    state: AppState,
    setState: React.Dispatch<React.SetStateAction<AppState>>
}

const AppStateContext = createContext<null | AppStateContextType>(null)

export const AppStateProvider : React.FC<{children : React.ReactNode}> = ({children}) => {
    const [state, setState] = useState<AppState>({
        selectedElement: null,
        hasUnsavedTemplate: false,
        hasUnsavedData: false,
        selectedTemplate: null
    })

    return (
        <AppStateContext.Provider value={{state, setState}}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
    const context = useContext(AppStateContext)
    if (!context) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context
}