import { SimpleElement } from "../Types/PdfTypes"

const Multibox : React.FC<{element : SimpleElement}> = ({element}) => {
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

    return (
        <div className="pdfview__pagemultibox" contentEditable
            style={{
                fontSize: `${element.font_size}px`,
                top: `${y}px`,
                left: `${x}px`,
                height: `${element.h}px`,
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
            {element.txt}
        </div>
    )
}

export default Multibox