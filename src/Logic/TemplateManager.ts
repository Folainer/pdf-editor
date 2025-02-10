import { Format, PdfFormat } from "../Components/Types/PdfTypes";
import JsonManager from "./JsonManager";

export default class TemplateManager {
    private template : PdfFormat

    constructor (jsonManager: JsonManager) {
        this.template = jsonManager.getAll() as unknown as PdfFormat
    }

    removePage(pos : number) {
        if (pos < this.template.formats.length && pos >= 0) {
            return this.template.formats.splice(pos, pos)
        }
        return null
    }

    addPage(pos: number, data? : Format) {
        if (pos >= 0 && pos <= this.template.formats.length) {
            if (data) {
                this.template.formats.splice(pos, 0, data)
            }
        } 
    } 
}