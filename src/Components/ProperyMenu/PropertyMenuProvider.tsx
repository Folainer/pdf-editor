import { createContext, useContext } from 'react'
import { DataType } from '../Types/PropertyType'
import * as React from 'react'
import { useAppState } from '../AppStateProvider'

const PropertyMenuContext = createContext<DataType[] | null>(null)

export const PropertyMenuProvider = ({children} : {children : React.ReactNode}) => {
    const {state: appState} = useAppState()

    const data : DataType[] = [
        {
            image: 'paperFormat',
            title: 'Paper format',
            isIgnored: null,
            element: (<div>a</div>),
        },
        {
            image: 'fieldList',
            title: 'Pdf elements',
            isIgnored: null,
            element: (<div>b</div>),
        },
        {
            image: 'properties',
            title: 'Properties',
            isIgnored: () => {
                if (appState.selectedElement === null) {
                    return false
                } else {
                    return true
                }
            },
            element: (<div>c</div>),
        },
        {
            image: 'variables',
            title: 'Variables',
            isIgnored: null,
            element: (<div>d</div>),
        },
    ]

    return (
        <PropertyMenuContext.Provider value={data}>
            {children}
        </PropertyMenuContext.Provider>
    )
}

export const usePropertyMenu = () => {
    const context = useContext(PropertyMenuContext)
    if (context === null) {
        throw new Error('useProperty menu must be used within a PropertyMenuProvider')
    } else {
        return context
    }
}