import { useJsonManager } from "./Components/JsonManagerProvider"
import Header from "./Components/Header/Header"

const AppDisplay = () => {
    const {template : jsonTempleManager, data : jsonDataManager} = useJsonManager()

    return (
        <>
            <Header />
            {JSON.stringify(jsonTempleManager.getJson())}
            {JSON.stringify(jsonDataManager.getJson())}
        </>
    )
}

export default AppDisplay