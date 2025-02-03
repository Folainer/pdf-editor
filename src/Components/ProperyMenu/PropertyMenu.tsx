import './PropertyMenu.scss'
import PropertyMenuContent from './PropertyMenuContent'
import PropertyOptions from './PropertyMenuOptions'
import { PropertyMenuProvider } from './PropertyMenuProvider'

const ProperyMenu = () => {
    return (
        <PropertyMenuProvider>
            <div className='propertymenu'>
                <PropertyOptions/>
                <PropertyMenuContent/>
            </div>
        </PropertyMenuProvider>
    )
}

export default ProperyMenu