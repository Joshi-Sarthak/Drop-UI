import {
    attachClosestEdge,
    Edge,
    extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import {DropIndicator} from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box"
import {dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    useDisclosure,
} from "@heroui/react"
import {LightningBoltIcon, Pencil1Icon, TrashIcon} from "@radix-ui/react-icons"
import {useEffect, useRef, useState} from "react"
import {StaticComponent} from "../store"
import Component from "./Component"

function StackItem({
    index,
    children,
    props,
}: {
    index: number
    children: StaticComponent
    props: StackProps
}) {
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
    const disclosure = useDisclosure()
    return (
        <>
            <div
                ref={ref}
                className={`relative flex flex-col ${isDraggedOver && "opacity-50"}`}
            >
                <Popover
                    isOpen={disclosure.isOpen}
                    onOpenChange={disclosure.onOpenChange}
                    placement="top"
                >
                    <PopoverTrigger>
                        <div>
                            <Component {...children} />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="flex bg-white rounded border shadow-xl">
                            <Button isIconOnly>
                                <Pencil1Icon />
                            </Button>
                            <Button isIconOnly>
                                <LightningBoltIcon />
                            </Button>
                            <Button
                                isIconOnly
                                onPress={() => {
                                    props.setComponents(
                                        props.components.filter((_, i) => i !== index),
                                    )
                                }}
                            >
                                <TrashIcon />
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
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
            className={`relative flex flex-col border-dashed border-gray-300 border-2 m-1 rounded ${isDraggedOver && "bg-blue-300 border-blue-400"}`}
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
    direction: "horizontal" | "vertical"
    components: StaticComponent[]
    setComponents: (components: StaticComponent[]) => void
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
                    key={index}
                    index={index}
                    children={component}
                    props={props}
                />
            ))}
        </div>
    )
}
