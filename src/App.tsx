import { JsonManagerProvider } from './Components/JsonManagerProvider'
import { CommandManagerProvider } from './Components/CommandManagerProvider'
import { AppStateProvider } from './Components/AppStateProvider'
import { ComponentContextProvider } from './Components/ComponentContextProvider'
import AppDisplay from './AppDisplay'
import './App.scss'

const App = () => {
  return (
    <AppStateProvider>
      <JsonManagerProvider>
        <CommandManagerProvider>
          <ComponentContextProvider>
            <AppDisplay />
          </ComponentContextProvider>
        </CommandManagerProvider>
      </JsonManagerProvider>
    </AppStateProvider>
  )
}

export default App
