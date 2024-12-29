import React, { createContext, useContext } from "react"
import CommandManager from "../Logic/CommandManager"

const CommandManagerContext = createContext<CommandManager | null>(null)

export const CommandManagerProvider : React.FC<{ children : React.ReactNode }> = ({ children }) => {
    const commandManager = new CommandManager()

    return (
        <CommandManagerContext.Provider value={commandManager}>
            {children}
        </CommandManagerContext.Provider>
    )
}

export const useCommandManager = () => {
    const context = useContext(CommandManagerContext)
    if (!context) {
        throw new Error("useCommandManager must be used within a CommandManagerProvider")
    }
    return context
}