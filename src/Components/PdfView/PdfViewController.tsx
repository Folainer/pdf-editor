import { useJsonManager } from "../JsonManagerProvider"
import { useAppState } from "../AppStateProvider"
import { PdfFormat } from "../Types/PdfTypes"

interface PdfViewControllerProps {
    zoom: number,
    onIncrementZoom: () => void,
    onDecrementZoom: () => void
}

const PdfViewController  = ({zoom, onIncrementZoom, onDecrementZoom} : PdfViewControllerProps) => {
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
                <div className="pdfview__controllerpageleft"></div>
                / {selectedTemplateJson?.formats.length}
                <div className="pdfview__controllerpageright"></div>
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