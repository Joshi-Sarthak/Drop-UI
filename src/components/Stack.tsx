import useStore from "@/store"
import {
    attachClosestEdge,
    Edge,
    extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import {DropIndicator} from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box"
import {dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import {useEffect, useRef, useState} from "react"
import {Block} from "./block"
import RenderBlock from "./RenderBlock"

function StackItem({
    section,
    index,
    children,
    props,
}: {
    section: "header" | "footer" | "left" | "right"
    index: number
    children: Block
    props: StackProps
}) {
    const isSelecting = useStore((store) => store.project.isSelecting)
    const selection = useStore((store) => store.project.selection)
    const stopSelecting = useStore((store) => store.project.stopSelecting)
    const setSelection = useStore((store) => store.project.setSelection)
    const ref = useRef<HTMLDivElement>(null)
    const [isDraggedOver, setIsDraggedOver] = useState(false)
    const [closestEdge, setClosestEdge] = useState<Edge | null>(null)
    useEffect(() => {
        if (!ref.current) return
        return dropTargetForElements({
            element: ref.current,
            getData: ({input, element}) =>
                attachClosestEdge(
                    {index},
                    {
                        input,
                        element,
                        allowedEdges:
                            props.direction === "horizontal" ?
                                ["left", "right"]
                            :   ["top", "bottom"],
                    },
                ),
            onDragStart: ({self}) => {
                setClosestEdge(extractClosestEdge(self.data))
            },
            onDragEnter: ({self}) => {
                setClosestEdge(extractClosestEdge(self.data))
                setIsDraggedOver(true)
            },
            onDragLeave: () => {
                setClosestEdge(null)
                setIsDraggedOver(false)
            },
            onDrop: ({self, source}) => {
                setClosestEdge(null)
                const closestEdgdeOfTarget = extractClosestEdge(self.data)
                if (closestEdgdeOfTarget == "left" || closestEdgdeOfTarget == "top") {
                    props.setComponents([
                        ...props.components.slice(0, index),
                        source.data as any,
                        ...props.components.slice(index),
                    ])
                } else if (
                    closestEdgdeOfTarget == "right" ||
                    closestEdgdeOfTarget == "bottom"
                ) {
                    props.setComponents([
                        ...props.components.slice(0, index + 1),
                        source.data as any,
                        ...props.components.slice(index + 1),
                    ])
                } else {
                    const newComponents = props.components.map((component, i) =>
                        i === index ? (source.data as any) : component,
                    )
                    props.setComponents(newComponents)
                }
                setIsDraggedOver(false)
            },
        })
    }, [index, props])
    return (
        <>
            <div
                ref={ref}
                className={`relative flex-grow flex flex-col ${isDraggedOver && "opacity-50"} ${
                    isSelecting &&
                    "hover:outline-2 hover:outline-blue-400 hover:opacity-50"
                } ${
                    selection &&
                    section === selection.stack &&
                    index === selection.index &&
                    "outline-2 outline-blue-400 opacity-50"
                }`}
                onClick={() => {
                    if (isSelecting) {
                        setSelection(section, index)
                    }
                }}
            >
                <RenderBlock block={children} />
                {closestEdge && <DropIndicator edge={closestEdge} />}
            </div>
        </>
    )
}

function EmptyStack({props}: {props: StackProps}) {
    const ref = useRef<HTMLDivElement>(null)
    const [isDraggedOver, setIsDraggedOver] = useState(false)
    useEffect(() => {
        if (!ref.current) return
        return dropTargetForElements({
            element: ref.current,
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: ({source}) => {
                props.setComponents([source.data as any])
                setIsDraggedOver(false)
            },
        })
    }, [props])
    return (
        <div
            ref={ref}
            className={`relative flex flex-col border-dashed border-2 m-1 rounded ${isDraggedOver ? "bg-blue-300 border-black" : "border-gray-300"}`}
        >
            <span
                className={`font-semibold p-10 ${
                    isDraggedOver ? "text-black" : "text-gray-400"
                }`}
            >
                Drop any component here
            </span>
        </div>
    )
}

export interface StackProps {
    section: "header" | "footer" | "left" | "right"
    direction: "horizontal" | "vertical"
    components: Block[]
    setComponents: (components: Block[]) => void
}

export default function Stack(props: StackProps) {
    if (props.components.length === 0) {
        return <EmptyStack props={props} />
    }
    return (
        <div
            className={`flex ${props.direction === "horizontal" ? "flex-row" : "flex-col"}`}
        >
            {props.components.map((component, index) => (
                <StackItem
                    section={props.section}
                    key={index}
                    index={index}
                    children={component}
                    props={props}
                />
            ))}
        </div>
    )
}
