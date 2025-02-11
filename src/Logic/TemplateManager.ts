import { AppState } from "../Components/AppStateProvider";
import { Format, PdfFormat } from "../Components/Types/PdfTypes";
import JsonManager from "./JsonManager";

export default class TemplateManager {
    private template : PdfFormat | null

    constructor (jsonManager: JsonManager, appState : AppState) {
        const name = appState.selectedTemplate
        this.template = null
        if (name) {
            const receivedJsonType = jsonManager.getByName(name)
            if (receivedJsonType) {
                this.template = receivedJsonType.json as PdfFormat
            }
        }
    }

    removePage(pos : number) {
        if (this.template) {
            if (pos < this.template.formats.length && pos >= 0) {
                return this.template.formats.splice(pos, 1)[0]
            }
        }
        return null
    }

    getFormatAtPage(pos: number) {
        if (this.template) {
            if (pos < this.template.formats.length && pos >= 0) {
                const page = this.template.formats.slice(pos, pos + 1)[0]
                const pageCopy = { ...page }
                pageCopy.id = Math.floor(Math.random()*1000000000).toString(36)
                pageCopy.elements = []
                return pageCopy
            }
        }
        return null
    }

    addPage(pos: number, data? : Format) {
        if (this.template) {
            if (pos >= 0 && pos <= this.template.formats.length) {
                if (data) {
                    this.template.formats.splice(pos, 0, data)
                }
            } 
        }
    } 
}