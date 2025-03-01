import {dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import {useEffect, useRef, useState} from "react"
import useStore from "../store"
import Component from "./Component"
export default function ProjectRightContent() {
    const ref = useRef<HTMLDivElement>(null)
    const [isDraggedOver, setIsDraggedOver] = useState(false)
    const rightComponent = useStore((state) => state.project.rightComponent)
    const setRightComponent = useStore((state) => state.project.setRightComponent)
    useEffect(() => {
        if (!ref.current) return
        return dropTargetForElements({
            element: ref.current,
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: ({source}) => {
                setRightComponent({
                    title: source.data.title,
                    code: source.data.code,
                } as any)
                setIsDraggedOver(false)
            },
        })
    }, [])
    return (
        <div
                    ref={ref}
                    className={`flex-[0_1_auto] h-full ${isDraggedOver && "opacity-50"}`}
                >
                    {rightComponent ?
                        <Component code={rightComponent.code} />
                    :   <div className="flex-1 border-2 border-dashed border-neutral-500 bg-neutral-100 h-full text-center items-center rounded-2xl justify-center mx-1 flex">
                            <p className="text-neutral-600 font-medium">
                                Place your content here
                            </p>
                        </div>
                    }
                </div>
    )
}
