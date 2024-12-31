import { JsonManagerProvider } from './Components/JsonManagerProvider'
import { CommandManagerProvider } from './Components/CommandManagerProvider'
import { AppStateProvider } from './Components/AppStateProvider'
import AppDisplay from './AppDisplay'
import './App.scss'

const App = () => {
  return (
    <AppStateProvider>
      <JsonManagerProvider>
        < CommandManagerProvider>
          <AppDisplay />
        </CommandManagerProvider>
      </JsonManagerProvider>
    </AppStateProvider>
  )
}

export default App
