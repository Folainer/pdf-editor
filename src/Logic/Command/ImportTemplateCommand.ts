import React from "react"
import { Command } from "../CommandManager"
import { AppStateContextType } from "../../Components/AppStateProvider"
import { JsonType } from "../JsonManager"
import { ChangeTemplateCommand } from "./ChangeTemplateCommand"
import { JsonManagerType } from "../JsonManager"


export class ImportTemplateCommand implements Command {
    private json: JsonType
    private changeTemplateCommand : Command

    constructor(private jsonTemplateManager: JsonManagerType, appState: AppStateContextType, setOption : React.Dispatch<React.SetStateAction<string>>, jsonText: string) {
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

        this.changeTemplateCommand = new ChangeTemplateCommand(appState, setOption, jsonName)
    }

    execute(): void {
        this.jsonTemplateManager.replaceJson(this.json)
        this.changeTemplateCommand.execute()
    }

    undo() {
        // this.appState.setState((prev) => ({
        //     ...prev,
        //     'selectedTemplate': this.oldTemplateName
        // }))
        // this.setOption(this.oldTemplateString)
    }
}