import React, { useRef} from "react";

interface FileImportProps {
    onFileSelect: (file: File) => void,
    accept?: string,
    children: React.ReactNode
}

const FileImport : React.FC<FileImportProps> = ({onFileSelect, accept = '*', children}) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        fileInputRef.current?.click()
    }
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            onFileSelect(file)

            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    return (
        <div>
            <input 
                type="file" 
                accept={accept}
                ref={fileInputRef}
                onChange={handleFileChange}
                className="menubar__fileimport"
            />
            <div onClick={handleClick}>
                {children}
            </div>
        </div>
    )
} 

export default FileImport