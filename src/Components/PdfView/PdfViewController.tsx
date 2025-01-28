import { useJsonManager } from "../JsonManagerProvider"
import { useAppState } from "../AppStateProvider"
import { PdfFormat } from "../Types/PdfTypes"

interface PdfViewControllerProps {
    zoom: number,
    onIncrementZoom: () => void,
    onDecrementZoom: () => void,
    scroll: (pageIndex: number) => void,
    currentPage: number
}

const PdfViewController  = ({zoom, onIncrementZoom, onDecrementZoom, currentPage, scroll} : PdfViewControllerProps) => {
    const {template : jsonTemplateManager} = useJsonManager()
        const appState = useAppState().state
        const selectedTemplate = appState.selectedTemplate
        let selectedTemplateJson: null | PdfFormat = null
        if (selectedTemplate) {
            selectedTemplateJson = jsonTemplateManager.getByName(selectedTemplate)?.json as PdfFormat
        }

    //add scale status and page number in context
    return (
        <div className="pdfview__controller">
            <div className="pdfview__controllerpage">
                <div className="pdfview__controllerpageleft" onClick={() => scroll(currentPage - 2)}></div>
                {currentPage} / {selectedTemplateJson?.formats.length}
                <div className="pdfview__controllerpageright" onClick={() => scroll(currentPage)}></div>
            </div>
            <div className="pdfview__controllerscale">
                <div className="pdfview__controllerscaleminus" onClick={() => onDecrementZoom()}>-</div>
                <div className="pdfview__controllerscalevalue">{zoom*100}%</div>
                <div className="pdfview__controllerscaleplus" onClick={() => onIncrementZoom()}>+</div>
            </div>
        </div>
    )
}

export default PdfViewController