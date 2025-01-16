import { PdfFormat } from "../Components/Types/PdfTypes"

export const validateTemplateJson = (jsonString: string) => {
    try {
        const json = JSON.parse(jsonString)
        
        // here to check required fields
        const pdfFormat = json as PdfFormat
        const hasRequiredProps = (
            typeof pdfFormat.name === 'string' &&
            typeof pdfFormat.type === 'string' &&
            typeof pdfFormat.rotation === 'string' &&
            typeof pdfFormat.is_multiple === 'string' &&
            typeof pdfFormat.cols === 'string' &&
            typeof pdfFormat.rows === 'string' &&
            typeof pdfFormat.cell_w === 'string' &&
            typeof pdfFormat.cell_h === 'string' &&
            typeof pdfFormat.space_horizontal === 'string' &&
            typeof pdfFormat.space_vertical === 'string' &&
            typeof pdfFormat.cell_h === 'string' &&
            Array.isArray(pdfFormat.formats)
        )

        if (!hasRequiredProps) return false

        pdfFormat.formats.forEach(format => {
            const hasFormatProps = (
                typeof format.w === 'string' &&
                typeof format.h === 'string' &&
                typeof format.padding_top === 'string' &&
                typeof format.padding_bottom === 'string' &&
                typeof format.padding_left === 'string' &&
                typeof format.padding_right === 'string' &&
                Array.isArray(format.elements)
            )
            if (!hasFormatProps) throw new Error()

            format.elements.forEach(element => {
                if (!(typeof element.type === 'string')) throw new Error()

                if (element.type === 'multibox') {
                    const hasElementProps = (
                        typeof element.name === 'string' &&
                        typeof element.seq === 'string' &&
                        typeof element.txt === 'string' &&
                        typeof element.x === 'string' &&
                        typeof element.ln_x === 'string' &&
                        typeof element.y === 'string' &&
                        typeof element.ln_y === 'string' &&
                        typeof element.w === 'string' &&
                        typeof element.h === 'string' &&
                        typeof element.h_adjustable === 'string' &&
                        typeof element.padding_top === 'string' &&
                        typeof element.padding_bottom === 'string' &&
                        typeof element.padding_left === 'string' &&
                        typeof element.padding_right === 'string' &&
                        typeof element.margin_top === 'string' &&
                        typeof element.margin_left === 'string' &&
                        typeof element.align === 'string' &&
                        typeof element.valign === 'string' &&
                        typeof element.font_size === 'string' &&
                        typeof element.font_family === 'string' &&
                        typeof element.fontcolor === 'string' &&
                        typeof element.border_top === 'string' &&
                        typeof element.border_bottom === 'string' &&
                        typeof element.border_left === 'string' &&
                        typeof element.border_right === 'string'
                    )
                    if (!hasElementProps) throw new Error()
                } else {
                    throw new Error()
                }
            })
        })

        return pdfFormat
    }
    catch (err) {
        return false
    }
}