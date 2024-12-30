const ToolbarSection: React.FC<{ name: string, children : React.ReactNode }> = ({ name, children }) => {
    return (
        <div className="toolbar__section">
            <div className="toolbar__sectionoptions">
                {children}
            </div>
            <div className="toolbar__sectionname">{name}</div>
        </div>
    )
}

export default ToolbarSection