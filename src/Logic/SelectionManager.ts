import { ElementType } from "../Components/Types/PdfViewType"

type Coords = [number, number]


interface SelectedElementType {
    id: string,
    type: ElementType,
    selectedCells: Coords[] | null
}

interface LastSelectedType {
    id: string,
    type: ElementType,
    selectedCell: Coords | null
}

interface SelectionType {
    selectedElements: SelectedElementType[],
    lastSelected: LastSelectedType | null
}

export default class SelectionManager {
    private selection: SelectionType

    constructor() {
        this.selection = {
            selectedElements: [],
            lastSelected: null
        }
    }

    getSelection() : SelectionType {
        return this.selection
    }

    getSelectedElements() : SelectedElementType[] {
        return this.selection.selectedElements
    }

    getLastSelectedElement() : LastSelectedType | null {
        return this.selection.lastSelected
    }

    select(id: string, type: ElementType, selectedCell: Coords | null = null) : void {
        this.selection.lastSelected = {id, type, selectedCell}
        if (type !== 'table') {
            this.selection.selectedElements.push({
                id: id,
                type: type,
                selectedCells: null
            })
        } else {
            const selectedTable = this.selection.selectedElements.find(table => {
                if (id === table.id) {
                    return table
                }
            })

            if (!selectedTable) {
                this.selection.selectedElements.push({
                    id: id,
                    type: type,
                    selectedCells: selectedCell ? [selectedCell] : null
                })
            } else {
                if (selectedTable.selectedCells === null && selectedCell) {
                    selectedTable.selectedCells = [selectedCell]
                } else if (selectedTable.selectedCells) {
                    if (selectedCell) {
                        selectedTable.selectedCells.push(selectedCell)
                    } else {
                        selectedTable.selectedCells = []
                    }
                }
            }
        }
    }

    // disselect() : void // later

    clearSelection() {
        this.selection.lastSelected = null
        this.selection.selectedElements = []
    }

    toggleSelection(id: string, type: ElementType, selectedCell: Coords | null = null) {
        this.clearSelection() // clear all selection
        this.select(id, type, selectedCell) // add new selection
    }
}