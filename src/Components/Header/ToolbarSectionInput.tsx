const ToolbarSectionText : React.FC<{title: string, isEnabled : boolean, handler : Function | null}> = ({title, isEnabled, handler}) => {
    // const adjustClass =  isEnabled ? 'toolbar__sectionimage_enabled' : 'toolbar__sectionimage_disabled'
    const handlingFun = handler ? handler : () => {}
    return (
        // <div title={title} onClick={() => handlingFun()} className={"toolbar__sectionimage " + adjustClass}>
        //     <img src={src} alt="" />
        // </div>
        <div title={title} className="toolbar__sectiontext">
            <span className="toolbar__sectiontextspan">{title}:</span>
            <input className="toolbar__sectiontextinput" onChange={() => handlingFun()} />
        </div>
    )
}

export default ToolbarSectionText