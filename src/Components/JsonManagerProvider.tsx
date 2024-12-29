import React, {createContext, useContext} from "react";
import JsonManager from "../Logic/JsonManager";

interface JsonContext {
    template : JsonManager,
    data : JsonManager
}

const JsonManagerContext = createContext<JsonContext | null>(null)

export const JsonManagerProvider : React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const jsonTemplateManager = new JsonManager({ name: 'hello'})
    const jsonDataManager = new JsonManager({ name: 'bye' })

    return (
        <JsonManagerContext.Provider value={{ template : jsonTemplateManager, data : jsonDataManager }}>
            {children}
        </JsonManagerContext.Provider>
    )
}

export const useJsonManager = () => {
    const context = useContext(JsonManagerContext)

    if (!context) {
        throw new Error("useJsonManager must be used within a JsonManagerProvider")
    }
    return context
}