import {dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import {useEffect, useRef, useState} from "react"
import {StaticComponent} from "../store"
import Component from "./Component"

function StackItem({
    index,
    children,
    components,
    setComponents,
}: {
    index: number
    children: StaticComponent
    components: StaticComponent[]
    setComponents: (components: StaticComponent[]) => void
}) {
    const ref = useRef<HTMLDivElement>(null)
    const [isDraggedOver, setIsDraggedOver] = useState(false)
    useEffect(() => {
        if (!ref.current) return
        return dropTargetForElements({
            element: ref.current,
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: ({source}) => {
                const newComponents = components.map((component, i) =>
                    i === index ? (source.data as any) : component,
                )
                setComponents(newComponents)
                setIsDraggedOver(false)
            },
        })
    }, [index, components, setComponents])
    return (
        <div ref={ref} className={`flex flex-col ${isDraggedOver && "opacity-50"}`}>
            <Component {...children} />
        </div>
    )
}

export interface StackProps {
    direction?: "horizontal" | "vertical"
    components: StaticComponent[]
    setComponents: (components: StaticComponent[]) => void
}

export default function Stack({
    direction = "horizontal",
    components,
    setComponents,
}: StackProps) {
    return (
        <div className={`flex ${direction === "horizontal" ? "flex-row" : "flex-col"}`}>
            {components.map((component, index) => (
                <StackItem
                    key={index}
                    index={index}
                    children={component}
                    components={components}
                    setComponents={setComponents}
                />
            ))}
        </div>
    )
}
