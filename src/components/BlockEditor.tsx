import useStore from "@/store"
import {useEffect, useRef} from "react"
import {Block} from "./block"

export interface BlockEditorProps {
    block: Block
}

export default function BlockEditor({block}: BlockEditorProps) {
    const ref = useRef<HTMLDivElement>(null)
    const editingBlock = useStore((store) => store.project.editingBlock)
    const setEditingBlock = useStore((store) => store.project.setEditingBlock)
    useEffect(() => {
        if (!editingBlock) {
            setEditingBlock(block)
        }
    }, [block, editingBlock, setEditingBlock])
    return (
        <div
            ref={ref}
            contentEditable
            suppressContentEditableWarning
            onBlur={() => {
                if (!editingBlock) {
                    setEditingBlock(block)
                } else {
                    setEditingBlock({
                        ...block,
                        html: ref.current!.innerHTML,
                    })
                }
            }}
            dangerouslySetInnerHTML={{
                __html: (editingBlock?.html as string) ?? block.html,
            }}
        ></div>
    )
}
