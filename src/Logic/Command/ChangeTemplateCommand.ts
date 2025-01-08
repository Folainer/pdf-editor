import React from "react"
import { Command } from "../CommandManager"
import { AppStateContextType } from "../../Components/AppStateProvider"


export class ChangeTemplateCommand implements Command {
    private oldTemplateName: string | null
    private newTemplateString : string
    private oldTemplateString : string

    constructor(private appState: AppStateContextType, private setOption : React.Dispatch<React.SetStateAction<string>>,  private newTemplateName: string | null) {
        this.oldTemplateName = appState.state.selectedTemplate
        this.newTemplateString = this.newTemplateName === null ? '' : this.newTemplateName
        this.oldTemplateString = this.oldTemplateName === null ? '' : this.oldTemplateName
    }

    execute(): void {
        this.appState.setState((prev) => ({
            ...prev,
            'selectedTemplate': this.newTemplateName
        }))
        this.setOption(this.newTemplateString)
    }

    undo() {
        this.appState.setState((prev) => ({
            ...prev,
            'selectedTemplate': this.oldTemplateName
        }))
        this.setOption(this.oldTemplateString)
    }
}