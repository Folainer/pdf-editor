import React from "react"
import { Command } from "../CommandManager"
import { AppStateContextType } from "../../Components/AppStateProvider"
import { JsonType } from "../JsonManager"
import { ChangeTemplateCommand } from "./ChangeTemplateCommand"
import { JsonManagerType } from "../JsonManager"


export class ImportTemplateCommand implements Command {
    private json: JsonType
    private changeTemplateCommand : Command
    // private oldJson : JsonType | null

    constructor(private jsonTemplateManager: JsonManagerType, private appState: AppStateContextType, setOption : React.Dispatch<React.SetStateAction<string>>, jsonText: string) {
        const jsonParsed = JSON.parse(jsonText)
        let jsonName = 'unnamed'
        if ('name' in jsonParsed) {
            jsonName = jsonParsed.name
        }

        this.json = {
            json: jsonParsed,
            name: jsonName,
            type: 'unsaved'
        }

        // this.oldJson = jsonTemplateManager.getUnsaved()

        this.changeTemplateCommand = new ChangeTemplateCommand(appState, setOption, jsonName)
    }

    execute(): void {
        this.jsonTemplateManager.replaceJson(this.json)
        this.changeTemplateCommand.execute()
        this.appState.setState(prev => ({
            ...prev,
            hasUnsavedTemplate: true
        }))
    }

    undo() {
        this.appState.setState(prev => ({
            ...prev,
            hasUnsavedTemplate: false
        }))
        this.changeTemplateCommand.undo()
        this.jsonTemplateManager.delete(this.json.name)
    }
}