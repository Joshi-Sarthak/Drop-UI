import {Button} from "@heroui/react"
import {useRef} from "react"
import Component from "./Component"

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
    return (
        <div className="flex flex-col">
            <div ref={ref} contentEditable>
                <Component title={title} code={code} />
            </div>
            <Button
                onPress={() => {
                    onEditingDone(title, ref.current!.children[0].innerHTML)
                }}
            >
                Done
            </Button>
        </div>
    )
}
