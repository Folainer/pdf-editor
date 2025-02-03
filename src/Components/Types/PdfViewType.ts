export type ElementType = 'table' | 'image' | 'multibox'

export interface PdfViewControllerProps {
    zoom: number,
    onIncrementZoom: () => void,
    onDecrementZoom: () => void,
    scroll: (pageIndex: number) => void,
    currentPage: number
}