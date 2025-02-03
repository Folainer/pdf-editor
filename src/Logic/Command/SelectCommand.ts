import { Command } from "../CommandManager";

export class SelectCommand implements Command {
    constructor(private oldSelectionName: string, private newSelectionName : string) {
        
    }

    execute(): void {
        
    }

    undo(): void {
        
    }
}