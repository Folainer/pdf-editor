export interface Command {
    execute(): void;
    undo(): void;
}

export interface CommandManagerType {
    execute: (command: Command) => void,
    undo: () => void,
    redo: () => void
}

export default class CommandManager implements CommandManagerType {
    private history: Command[] = []
    private undoStack: Command[] = []

    execute(command: Command) {
        command.execute()
        this.history.push(command)
        this.undoStack = []
    }

    undo() {
        const command = this.history.pop()
        if (command) {
            command.undo()
            this.undoStack.push(command)
        }
    }

    redo() {
        const command = this.undoStack.pop()
        if (command) {
            command.execute()
            this.history.push(command)
        }
    }
}