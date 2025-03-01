import {dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import {useEffect, useRef, useState} from "react"
import useStore from "../store"
import Component from "./Component"

export default function ProjectFooter() {
    const ref = useRef<HTMLDivElement>(null)
    const [isDraggedOver, setIsDraggedOver] = useState(false)
    const footerComponent = useStore((state) => state.project.footerComponent)
    const setFooterComponent = useStore((state) => state.project.setFooterComponent)
    useEffect(() => {
        if (!ref.current) return
        return dropTargetForElements({
            element: ref.current,
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: ({source}) => {
                setFooterComponent({
                    title: source.data.title,
                    code: source.data.code,
                } as any)
                setIsDraggedOver(false)
            },
        })
    }, [])

    return (
        <div ref={ref} className={`flex-[0_1_auto] ${isDraggedOver && "opacity-50"}`}>
                    {footerComponent ?
                        <Component code={footerComponent.code} />
                    :   <div className="border-2 border-dashed border-neutral-500 bg-neutral-100 py-6 text-center rounded-2xl m-1">
                            <p className="text-neutral-600 font-medium">
                                Place your footer here
                            </p>
                        </div>
                    }
                </div>
        // <div className="flex-[0_1_auto] border-2 border-dashed border-neutral-500 bg-neutral-100 py-6 text-center rounded-2xl m-1">
        //     <p className="text-neutral-600 font-medium">Place your footer here</p>
        // </div>
    )
}
