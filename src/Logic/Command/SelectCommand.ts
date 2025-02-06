import { ElementType } from "../../Components/Types/PdfViewType";
import { Command } from "../CommandManager";
import SelectionManager, { Coords } from "../SelectionManager";

export interface ElementSelectionType {
    type: ElementType,
    name: string,
    selectedCell: Coords | null
}

export class SelectCommand implements Command {
    constructor(private selectionManager : SelectionManager, private newSelection : ElementSelectionType | null, private oldSelection : ElementSelectionType | null) {

    }

    execute(): void {
        // console.log(this.newSelection?.name, this.newSelection?.type, this.newSelection?.selectedCell)
        if (this.newSelection) {
            this.selectionManager.toggleSelection(this.newSelection.name, this.newSelection.type, this.newSelection.selectedCell)
        } else {
            this.selectionManager.clearSelection()
        }
    }

    undo(): void {
        // console.log(this.oldSelection?.name, this.oldSelection?.type, this.oldSelection?.selectedCell)
        if (this.oldSelection) {
            this.selectionManager.toggleSelection(this.oldSelection.name, this.oldSelection.type, this.oldSelection.selectedCell)
        } else {
            this.selectionManager.clearSelection()
        }
    }
}