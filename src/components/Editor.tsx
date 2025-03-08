import useStore from "@/store"
import {Edit, SquareMousePointer, Trash} from "lucide-react"
import {useLayoutEffect, useRef} from "react"
import Project from "./Project"
import {Button} from "./ui/button"

export default function Editor() {
    const ref = useRef<HTMLDivElement>(null)
    const isSelecting = useStore((store) => store.project.isSelecting)
    const startSelecting = useStore((store) => store.project.startSelecting)
    const stopSelecting = useStore((store) => store.project.stopSelecting)
    const selection = useStore((store) => store.project.selection)
    const headerStack = useStore((store) => store.project.headerStack)
    const setHeaderStack = useStore((store) => store.project.setHeaderStack)
    const leftStack = useStore((store) => store.project.leftStack)
    const setLeftStack = useStore((store) => store.project.setLeftStack)
    const rightStack = useStore((store) => store.project.rightStack)
    const setRightStack = useStore((store) => store.project.setRightStack)
    const footerStack = useStore((store) => store.project.footerStack)
    const setFooterStack = useStore((store) => store.project.setFooterStack)
    function deleteSelection() {
        if (!selection) return
        switch (selection.stack) {
            case "header":
                setHeaderStack(headerStack.filter((_, i) => i !== selection.index))
                break
            case "left":
                setLeftStack(leftStack.filter((_, i) => i !== selection.index))
                break
            case "right":
                setRightStack(rightStack.filter((_, i) => i !== selection.index))
                break
            case "footer":
                setFooterStack(footerStack.filter((_, i) => i !== selection.index))
                break
            default:
                selection.stack satisfies never
        }
        stopSelecting()
    }
    // TODO: Fix this, clicking outside should stop selection
    useLayoutEffect(() => {
        function stopSelection(ev: MouseEvent) {
            if (ref.current && !ref.current.contains(ev.target as Node)) {
                stopSelecting()
            }
        }
        document.body.addEventListener("mouseup", stopSelection)
        return () => {
            document.body.removeEventListener("mouseup", stopSelection)
        }
    }, [stopSelecting])
    return (
        <div ref={ref} className="flex flex-col h-full">
            <div className="flex p-2 gap-2">
                <Button
                    size="icon"
                    variant={isSelecting ? "default" : "ghost"}
                    onClick={() => {
                        if (isSelecting) {
                            stopSelecting()
                        } else {
                            startSelecting()
                        }
                    }}
                >
                    <SquareMousePointer />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    disabled={!isSelecting}
                    onClick={deleteSelection}
                >
                    <Trash />
                </Button>
                <Button size="icon" variant="ghost" disabled={!isSelecting}>
                    <Edit />
                </Button>
            </div>
            <div className="flex flex-col h-full">
                <Project />
            </div>
        </div>
    )
}
