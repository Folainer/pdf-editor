// it is a test command
import { Command } from "../CommandManager"

export class ChangeBackgroundCommand implements Command {
    constructor(private oldValue: string, private newValue: string) {

    }

    execute(): void {
        document.body.style.backgroundColor = this.newValue
    }

    undo() {
        document.body.style.backgroundColor = this.oldValue
    }
}