import { JsonManagerProvider } from './Components/JsonManagerProvider'
import { CommandManagerProvider } from './Components/CommandManagerProvider'
import AppDisplay from './AppDisplay'
import './App.scss'

const App = () => {
  return (
    <JsonManagerProvider>
        < CommandManagerProvider>
          <AppDisplay />
        </CommandManagerProvider>
    </JsonManagerProvider>
  )
}

export default App
