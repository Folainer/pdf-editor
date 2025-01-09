import { useJsonManager } from "./Components/JsonManagerProvider"
import { useAppState } from "./Components/AppStateProvider"
import Header from "./Components/Header/Header"

const AppDisplay = () => {
    const {template : jsonTemplateManager} = useJsonManager()
    const appState = useAppState().state
    const selectedTemplate = appState.selectedTemplate
    let selectedTemplateJson
    if (selectedTemplate) {
        selectedTemplateJson = jsonTemplateManager.getByName(selectedTemplate)
    }

    return (
        <>
            <Header />
            {selectedTemplateJson && JSON.stringify(selectedTemplateJson)}
        </>
    )
}

export default AppDisplay