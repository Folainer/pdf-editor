import './App.scss'
import { useJsonManager } from "./Components/JsonManagerProvider"
import { useAppState } from "./Components/AppStateProvider"
import Header from "./Components/Header/Header"
import PdfView from './Components/PdfView/PdfView'
import ProperyMenu from './Components/ProperyMenu/PropertyMenu'

const AppDisplay = () => {
    const {template : jsonTemplateManager} = useJsonManager()
    const appState = useAppState().state
    const selectedTemplate = appState.selectedTemplate
    let selectedTemplateJson
    if (selectedTemplate) {
        selectedTemplateJson = jsonTemplateManager.getByName(selectedTemplate)
    }

    return (
        <div className="appdisplay">
            <Header />
            <PdfView />
            <ProperyMenu />
            {/* {selectedTemplateJson && JSON.stringify(selectedTemplateJson)} */}
        </div>
    )
}

export default AppDisplay