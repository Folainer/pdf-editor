import './PdfView.scss'
import PdfViewController from './PdfViewController'
import { useAppState } from '../AppStateProvider'
import { useJsonManager } from '../JsonManagerProvider'
// import { validateTemplateJson } from '../../Logic/Validator'
// import { JsonType } from '../../Logic/JsonManager'
import { PdfFormat } from '../Types/PdfTypes'
import { useEffect, useRef, useState } from 'react'
import Multibox from './Multibox'
import { ElementType } from '../Types/PdfViewType'

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

    const scrollToPage = (pageIndex: number) => {
        if (!containerRef.current) return

        const pages = containerRef.current.querySelectorAll('.pdfview__page')
        const targetPage = pages[pageIndex]

        if (targetPage) {
            const offsetTop = targetPage.getBoundingClientRect().top + containerRef.current.scrollTop - 100
            containerRef.current.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            })
            // setCurrentPage(pageIndex)
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !containerRef) return;

            const pages = containerRef.current.querySelectorAll('.pdfview__page');

            let currentPageIndex = 0; // Default to the first page

            // Find the page that is most visible
            pages.forEach((page, index) => {
                const rect = page.getBoundingClientRect();
                const containerRect = containerRef.current?.getBoundingClientRect();

                // Calculate the visible height of the page inside the container
                const visibleTop = containerRect ? Math.max(rect.top, containerRect.top) : 0;
                const visibleBottom = containerRect ? Math.min(rect.bottom, containerRect.bottom) : 0;

                const visibleHeight = Math.max(0, visibleBottom - visibleTop + 15);

                // If the visible height of this page is greater than 50% of the container height, mark it as the current page
                if (containerRef.current && visibleHeight > containerRef.current.clientHeight / 2) {
                    currentPageIndex = index;
                }
            });

            setCurrentPage(currentPageIndex); // Update the current page state
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
                        transform: `scale(${zoom})`,
                        marginBottom: `${1.4 * (zoom - 1) * parseInt(format.h) - 320 * (zoom - 1)}px`,
                        // border: `${1}px solid gray`
                    }}>
                        <div 
                            className='pdfview__pagepaddings'
                            style={{
                                height: '100%',
                                width: `${format.padding_left}px`,
                                left: 0,
                                top: 0}}>
                        </div>
                        <div 
                            className='pdfview__pagepaddings'
                            style={{
                                height: '100%',
                                width: `${format.padding_right}px`,
                                right: 0,
                                top: 0}}>
                        </div>
                        <div 
                            className='pdfview__pagepaddings'
                            style={{
                                width: '100%',
                                height: `${format.padding_top}px`,
                                left: 0,
                                top: 0}}>
                        </div>
                        <div 
                            className='pdfview__pagepaddings'
                            style={{
                                width: '100%',
                                height: `${format.padding_bottom}px`,
                                left: 0,
                                bottom: 0}}>
                        </div>
                        {format.elements.map(element => {
                            const elementType = element.type as ElementType
                            if (elementType === 'multibox') {
                                return <Multibox element={element} />
                            }
                        })}
                </div>
                ))}
            </div>
            <PdfViewController zoom={zoom} onIncrementZoom={incrementZoom} onDecrementZoom={decrementZoom} currentPage={currentPage + 1} scroll={scrollToPage}/>
        </div>
    )
}

export default PdfView