import './PdfView.scss'
import PdfViewController from './PdfViewController'
import { useAppState } from '../AppStateProvider'
import { useJsonManager } from '../JsonManagerProvider'
// import { validateTemplateJson } from '../../Logic/Validator'
// import { JsonType } from '../../Logic/JsonManager'
import { PdfFormat } from '../Types/PdfTypes'
import { useEffect, useRef, useState } from 'react'

const PdfView = () => {
    const {template : jsonTemplateManager} = useJsonManager()
    const {state: appState, setState: setAppState} = useAppState()
    const selectedTemplate = appState.selectedTemplate
    const containerRef = useRef<HTMLDivElement>(null)
    const [currentPage, setCurrentPage] = useState<number>(0)

    let selectedTemplateJson: null | PdfFormat = null
    if (selectedTemplate) {
        selectedTemplateJson = jsonTemplateManager.getByName(selectedTemplate)?.json as PdfFormat
    }

    const zoom = appState.zoom

    const incrementZoom = () => {
        setAppState(prev => ({
            ...prev,
            zoom: prev.zoom < 5 ? prev.zoom + 0.25 : prev.zoom
        }))
    }

    const decrementZoom = () => {
        setAppState(prev => ({
            ...prev,
            zoom: prev.zoom >= 0.75 ? prev.zoom - 0.25 : prev.zoom
        }))
    }

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return

            const pages = containerRef.current.querySelectorAll('.pdfview__page')

            let currentPageIndex = 0

            pages.forEach((page, index) => {
                const rect = page.getBoundingClientRect()

                if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                    currentPageIndex = index
                }
            })

            setCurrentPage(currentPageIndex)
            console.log(currentPage)
        }

        const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);

        return () => {
        container?.removeEventListener("scroll", handleScroll);
        };
    }, [])

    return (
        <div className="pdfview">
            <div 
                className='pdfview__wrapper'
                ref={containerRef}
                style={{
                    // gap: `${20 * 2}px`
                }}>
                {selectedTemplateJson && selectedTemplateJson.formats.map((format, index) => (
                <div 
                    className='pdfview__page'
                    key={index}
                    style={{
                        width: `${format.w}px`,
                        height: `${format.h}px`,
                        transform: `scale(${2*zoom})`,
                        marginBottom: `${2 * (2*zoom - 1) * parseInt(format.h) - 290 * (2*zoom - 1)}px`,
                        // border: `${1}px solid gray`
                    }}>
                    a
                </div>
                ))}
            </div>
            <PdfViewController zoom={zoom} onIncrementZoom={incrementZoom} onDecrementZoom={decrementZoom} />
        </div>
    )
}

export default PdfView