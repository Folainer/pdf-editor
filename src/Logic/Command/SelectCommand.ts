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
        console.log('Command:', newSelection, oldSelection)
    }

    execute(): void {
        if (this.newSelection) {
            this.selectionManager.clearSelection();
            this.selectionManager.select(
                this.newSelection.name, 
                this.newSelection.type, 
                this.newSelection.selectedCell
            );
        } else {
            this.selectionManager.clearSelection();
        }
    }

    undo(): void {
        if (this.oldSelection) {
            this.selectionManager.clearSelection();
            this.selectionManager.select(
                this.oldSelection.name, 
                this.oldSelection.type, 
                this.oldSelection.selectedCell
            );
        } else {
            this.selectionManager.clearSelection();
        }
    }
}