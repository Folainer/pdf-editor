import { useRef, useState, useEffect } from "react"
import { SimpleElement } from "../Types/PdfTypes"
import { useAppState } from "../AppStateProvider"
import eventBus from "../../Logic/EventBus"
import { ElementType } from "../Types/PdfViewType"
import { ElementSelectionType, SelectCommand } from "../../Logic/Command/SelectCommand"
import { useCommandManager } from "../CommandManagerProvider"

const Multibox : React.FC<{element : SimpleElement}> = ({element}) => {
    const multiboxRef = useRef<HTMLDivElement>(null)
    const [isSelected, setSelected] = useState<boolean>(false)
    const commandManager = useCommandManager()
    const appState = useAppState().state
    const selection = appState.selection
    const lastSelected = selection.getLastSelectedElement()
    let oldSelection : ElementSelectionType | null = null
    if (lastSelected) {
        oldSelection = {
            type: lastSelected.type,
            name: lastSelected.name,
            selectedCell: lastSelected.selectedCell
        }
    }
    let x : string, y: string

    if (!element.ln_x) {
        x =  element.x
    } else {
        x = element.x
    }

    if (!element.ln_y) {
        y = element.y
    } else {
        y = element.y
    }

    const alignmentMap : Map<string, 'start' | 'center' | 'end'>= new Map([['L', 'start'], ['C', 'center'], ['R', 'end']])
    let alignment : 'start' | 'center' | 'end';

    const alignValue = alignmentMap.get(element.align);
    if (alignValue) {
        alignment = alignValue
    } else {
        alignment = 'center'
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (multiboxRef.current && !multiboxRef.current.contains(event.target as Node)) {
        setSelected(false)
        multiboxRef.current.blur()

        if (!selection.isCleared()) {
            const selectionCmd = new SelectCommand(selection, null, oldSelection)
            commandManager.execute(selectionCmd)
        }
      }
    }


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)

        let isHandlingSelection = false

        const subscription = eventBus.addListener('selectionChanged', (type: string) => {
            
            if (type === 'update') {
                if (isSelected) {
                    multiboxRef.current?.classList.add('pdfview__pagemultibox--selected')
                }
                
            } else if (type === 'clear') {
                if (isHandlingSelection) return
                isHandlingSelection = true

                console.log(type, element.name)
                multiboxRef.current?.classList.remove('pdfview__pagemultibox--selected')
            }
            
            setTimeout(() => {
                isHandlingSelection = false
            }, 0)
        })

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            subscription.remove()
        }
      }, [])

    return (
        <div id={element.name} className="pdfview__pagemultibox"
            ref={multiboxRef}
            tabIndex={0}
            onMouseDown={(e) => {
                if (!isSelected) {
                    e.preventDefault()
                }
            }}
            onClick={() => {
                multiboxRef.current?.classList.add('pdfview__pagemultibox--selected')
                if (!isSelected) {
                    setSelected(true)
                    const selectionCmd = new SelectCommand(selection, {name: element.name, type: element.type as ElementType, selectedCell: null}, oldSelection)
                    commandManager.execute(selectionCmd)
                }
            }}
            style={{
                fontSize: `${element.font_size}px`,
                top: `${y}px`,
                left: `${x}px`,
                minHeight: `${element.h}px`,
                width: `${element.w}px`,
                borderTop: `${element.border_top}px solid`,
                borderBottom: `${element.border_bottom}px solid`,
                borderLeft: `${element.border_left}px solid`,
                borderRight: `${element.border_right}px solid`,
                paddingTop: `${element.padding_top}px`,
                paddingBottom: `${element.padding_bottom}px`,
                paddingLeft: `${element.padding_left}px`,
                paddingRight: `${element.padding_right}px`,
                textAlign: `${alignment}`,
                color: element.fontcolor,
                overflow: element.h_adjustable ? 'hidden' : 'none'
            }}>
                <div
                // contentEditable
                >
                {element.txt}
                </div>
        </div>
    )
}

export default Multibox