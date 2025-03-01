import {dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import {useEffect, useRef, useState} from "react"
import useStore from "../store"
import Component from "./Component"

export default function ProjectHeader() {
    const ref = useRef<HTMLDivElement>(null)
    const [isDraggedOver, setIsDraggedOver] = useState(false)
    const headerComponent = useStore((state) => state.project.headerComponent)
    useEffect(() => {
        if (!ref.current) return
        return dropTargetForElements({
            element: ref.current,
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: () => setIsDraggedOver(false),
        })
    }, [])
    return (
        <div ref={ref} className={`flex-[0_1_auto] ${isDraggedOver && "opacity-50"}`}>
            {headerComponent ?
                <Component code={headerComponent.code} />
            :   <div className="border-2 border-dashed border-neutral-500 bg-neutral-100 py-6 text-center rounded-2xl m-1">
                    <p className="text-neutral-600 font-medium">
                        Place your navbar here
                    </p>
                </div>
            }
        </div>
    )
}
