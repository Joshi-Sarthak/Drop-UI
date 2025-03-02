import {Button} from "@heroui/react"
import {useRef, useState} from "react"

export interface ComponentEditorProps {
    title: string
    code: string
    onEditingDone: (title: string, code: string) => void
}

export default function ComponentEditor({
    title,
    code,
    onEditingDone,
}: ComponentEditorProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [content, setContent] = useState(code)
    return (
        <div className="flex flex-col">
            <div
                ref={ref}
                contentEditable
                dangerouslySetInnerHTML={{__html: content}}
                onBlur={() => {
                    setContent(ref.current!.innerHTML)
                }}
            />
            <Button
                onPress={() => {
                    onEditingDone(title, content)
                }}
            >
                Done
            </Button>
        </div>
    )
}
