import './PdfView.scss'
import PdfViewController from './PdfViewController'
import { useAppState } from '../AppStateProvider'
import { useJsonManager } from '../JsonManagerProvider'
import { validateTemplateJson } from '../../Logic/Validator'
import { JsonType } from '../../Logic/JsonManager'

const PdfView = () => {
    const {template : jsonTemplateManager} = useJsonManager()
    const appState = useAppState().state
    const selectedTemplate = appState.selectedTemplate
    let selectedTemplateJson : null | JsonType
    if (selectedTemplate) {
        selectedTemplateJson = jsonTemplateManager.getByName(selectedTemplate)
    }

    // if (selectedTemplateJson) {
    //     console.log(validateTemplateJson(selectedTemplateJson.json))
    // }

    return (
        <div className="pdfview">
            <PdfViewController />
        </div>
    )
}

export default PdfView