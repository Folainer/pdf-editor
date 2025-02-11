import { AppState } from "../../Components/AppStateProvider";
import { Format } from "../../Components/Types/PdfTypes";
import { Command } from "../CommandManager";
import JsonManager from "../JsonManager";
import TemplateManager from "../TemplateManager";
import eventBus from "../EventBus";

export class PageCommand implements Command {
    private templateManager : TemplateManager
    private formatBuffer : Format | null
    private data : Format

    constructor(appState : AppState ,jsonManger : JsonManager, private type : 'add' | 'remove', private pos : number) {
        this.templateManager = new TemplateManager(jsonManger, appState)
        this.formatBuffer = null
        this.data = {
            "id": Math.floor(Math.random()*1000000000).toString(36),
            "w": "595",
            "h": "842",
            "padding_top": "40",
            "padding_left": "40",
            "padding_right": "40",
            "padding_bottom": "40",
            "elements": []
          }
    }


    execute(): void {
        switch (this.type) {
            case 'remove':
                const tempBuffer = this.templateManager.removePage(this.pos) 
                if (tempBuffer) {
                    this.formatBuffer = tempBuffer
                }
                break
            case 'add':
                const prevPageFormat = this.templateManager.getFormatAtPage(this.pos)
                const nextPageFormat = this.templateManager.getFormatAtPage(this.pos + 2)
                if (prevPageFormat) {
                    this.templateManager.addPage(this.pos + 1, prevPageFormat)
                } else if (nextPageFormat) {
                    this.templateManager.addPage(this.pos + 1, nextPageFormat)
                } else {
                    this.templateManager.addPage(this.pos + 1, this.data)
                }
        }
        eventBus.emit('rerenderPdfView')
    }

    undo(): void {
        switch (this.type) {
            case 'remove':
                if (this.formatBuffer) {
                    this.templateManager.addPage(this.pos, this.formatBuffer)
                }
                break
            case 'add':
                this.templateManager.removePage(this.pos + 1)
        }
        eventBus.emit('rerenderPdfView')
    }
}