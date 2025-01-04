import React, { useState } from "react"

const ToolbarSectionChoose : React.FC<{title: string}> = ({title}) => {
    const [isOpen, setOpenness] = useState<boolean>(false)

    const handleClick = () => {
        setOpenness(!isOpen)
    }

    return (
        <div title={title} onClick={() => handleClick()} className="toolbar__sectionchoose">
            {isOpen && (
                <div className="toolbar__sectionchooselist">
                    {['One', 'Two', 'Three'].map(item => {
                        return (
                            <div id={item} className="toolbar__sectionchooselistitem">
                                {item}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default ToolbarSectionChoose