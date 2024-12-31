const ToolbarSectionImage : React.FC<{src : string, title: string, handler : Function}> = ({src, title, handler}) => {
    return (
        <div title={title} onClick={() => handler()} className="toolbar__sectionimage toolbar__sectionimage_enabled">
            <img src={src} alt="" />
        </div>
    )
}

export default ToolbarSectionImage