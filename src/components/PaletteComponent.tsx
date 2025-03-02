import {draggable} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import {useEffect, useLayoutEffect, useRef, useState} from "react"
import Component from "./Component"

function forceReflow(el: HTMLElement) {
    return el.offsetHeight
}

export interface PaletteComponentProps {
    title: string
    code: string
}

export default function PaletteComponent({title, code}: PaletteComponentProps) {
    const ref = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const componentRef = useRef<HTMLDivElement>(null)
    const [containerHeight, setContainerHeight] = useState(0)
    const [componentScale, setComponentScale] = useState(1)
    function update() {
        if (!containerRef.current || !componentRef.current) return
        const containerRect = containerRef.current.getBoundingClientRect()
        componentRef.current.style.scale = "1"
        forceReflow(componentRef.current)
        const componentRect = componentRef.current.getBoundingClientRect()
        const aspectRatio = componentRect.width / componentRect.height
        const componentScale = containerRect.width / componentRect.width
        if (componentScale > 1) {
            setComponentScale(1)
            setContainerHeight(componentRect.height)
        } else {
            setComponentScale(componentScale)
            setContainerHeight(containerRect.width / aspectRatio)
        }
    }
    const onResizeTimeout = useRef<number>(undefined)
    useEffect(() => {
        function onResize() {
            clearTimeout(onResizeTimeout.current)
            onResizeTimeout.current = setTimeout(update, 50)
        }
        window.addEventListener("resize", onResize)
        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [])
    useLayoutEffect(update, [])
    const [isBeingDragged, setIsBeingDragged] = useState(false)
    useEffect(() => {
        if (!ref.current) return
        return draggable({
            element: ref.current,
            getInitialData: () => {
                return {title, code}
            },
            onDragStart: () => setIsBeingDragged(true),
            onDrop: () => setIsBeingDragged(false),
        })
    }, [])
    return (
        <div
            ref={ref}
            className={`bg-neutral-100 rounded-sm shadow p-1 ${isBeingDragged && "opacity-50"}`}
        >
            <div ref={containerRef} style={{height: `${containerHeight}px`}}>
                <div className="relative w-[800px]">
                    <div
                        ref={componentRef}
                        className="absolute origin-top-left"
                        style={{scale: componentScale}}
                    >
                        <Component code={code} />
                    </div>
                </div>
            </div>
        </div>
    )
}
