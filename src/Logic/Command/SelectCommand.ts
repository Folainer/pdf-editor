import { ElementType } from "../../Components/Types/PdfViewType";
import { Command } from "../CommandManager";
import SelectionManager, { Coords } from "../SelectionManager";

export class SelectCommand implements Command {
    constructor(private selectionManager : SelectionManager, private oldType : ElementType, private newType : ElementType, private oldSelectionName: string, private newSelectionName : string, private oldSelectedCell : Coords | null, private newSelectedCell : Coords | null) {
        
    }

    execute(): void {
        this.selectionManager.toggleSelection(this.newSelectionName, this.newType, this.newSelectedCell)
    }

    undo(): void {
        this.selectionManager.toggleSelection(this.oldSelectionName, this.oldType, this.oldSelectedCell)
    }
}