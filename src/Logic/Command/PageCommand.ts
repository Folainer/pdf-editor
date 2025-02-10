import { Format } from "../../Components/Types/PdfTypes";
import { Command } from "../CommandManager";
import JsonManager from "../JsonManager";
import TemplateManager from "../TemplateManager";

export class ChangeTemplateCommand implements Command {
    private templateManager : TemplateManager
    private formatBuffer : Format | null

    constructor(jsonManger : JsonManager, private type : 'add' | 'remove', private pos : number, private data?: Format) {
        this.templateManager = new TemplateManager(jsonManger)
        this.formatBuffer = null
    }


    execute(): void {
        switch (this.type) {
            case 'remove':
                const tempBuffer = this.templateManager.removePage(this.pos) 
                if (tempBuffer) {
                    this.formatBuffer = tempBuffer[0]
                }
                break
        }
    }

    undo(): void {
        switch (this.type) {
            case 'remove':
                
                break
        }
    }
}