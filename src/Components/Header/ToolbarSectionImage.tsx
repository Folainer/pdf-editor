const ToolbarSectionImage : React.FC<{src : string, title: string, isEnabled : boolean, handler : Function | null}> = ({src, title, isEnabled, handler}) => {
    const adjustClass =  isEnabled ? 'toolbar__sectionimage--enabled' : 'toolbar__sectionimage--disabled'
    const handlingFun = handler ? handler : () => {}
    return (
        <div title={title} onClick={() => handlingFun()} className={"toolbar__sectionimage " + adjustClass}>
            <img src={src} alt="" />
        </div>
    )
}

export default ToolbarSectionImage