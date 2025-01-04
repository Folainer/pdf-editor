const ToolbarSectionCheck : React.FC<{title: string, isEnabled : boolean, handler : Function | null}> = ({title, isEnabled, handler}) => {
    const handlingFun = handler ? handler : () => {}
    return (
        <div title={title} className="toolbar__sectioncheck">
            <input type="checkbox" onClick={() => handlingFun()} disabled={!isEnabled} />
        </div>
    )
}

export default ToolbarSectionCheck