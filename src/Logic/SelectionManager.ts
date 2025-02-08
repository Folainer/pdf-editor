import { ElementType } from "../Components/Types/PdfViewType"
import { ElementSelectionType } from "./Command/SelectCommand"
import eventBus from "./EventBus"

export type Coords = [number, number]


interface SelectedElementType {
    name: string,
    type: ElementType,
    selectedCells: Coords[] | null
}

interface SelectionType {
    selectedElements: SelectedElementType[],
    lastSelected: ElementSelectionType | null
}

export default class SelectionManager {
    private selection: SelectionType
    private lastLastSelected: ElementSelectionType | null

    constructor() {
        this.selection = {
            selectedElements: [],
            lastSelected: null
        }
        this.lastLastSelected = null
    }

    getSelection() : SelectionType {
        return this.selection
    }

    getSelectedElements() : SelectedElementType[] {
        return this.selection.selectedElements
    }

    getLastSelectedElement() : ElementSelectionType | null {
        return this.selection.lastSelected
    }

    select(name: string, type: ElementType, selectedCell: Coords | null = null) : void {
        this.setLastSelected({name, type, selectedCell})
        if (type !== 'table') {
            this.selection.selectedElements.push({
                name: name,
                type: type,
                selectedCells: null
            })
        } else {
            const selectedTable = this.selection.selectedElements.find(table => {
                if (name === table.name) {
                    return table
                }
            })
            
            if (!selectedTable) {
                this.selection.selectedElements.push({
                    name: name,
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
        // console.log('Selecting:', name, type)
        eventBus.emit('selectionChanged', { type: 'update', name: name})
    }

    // disselect() : void // later

    clearSelection() {
        this.setLastSelected(null)
        this.selection.selectedElements = []
        eventBus.emit('selectionChanged', { type:'clear', name: null})
    }

    toggleSelection(name: string, type: ElementType, selectedCell: Coords | null = null) {
        this.clearSelection() // clear all selection
        this.select(name, type, selectedCell) // add new selection
    }

    isSameElement(element: ElementSelectionType | null) {
        const lastSelected = this.selection.lastSelected
        return (
            element?.name === lastSelected?.name && 
            element?.type === lastSelected?.type &&
            (
                (element?.selectedCell === lastSelected?.selectedCell) || 
                (element?.selectedCell === null && lastSelected?.selectedCell === null)
            )
        )
    }

    isCleared() {
        if (Array.isArray(this.selection.selectedElements) && this.selection.selectedElements.length === 0) {
            return true
        } else {
            return false
        }
    }

    setLastSelected(value: ElementSelectionType | null) {
        this.lastLastSelected = this.selection.lastSelected
        this.selection.lastSelected = value
    }

    getPreviousSelected() {
        return this.lastLastSelected
    }
}