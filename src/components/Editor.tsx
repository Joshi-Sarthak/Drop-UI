import useStore from "@/store"
import {Edit, SquareMousePointer, Trash} from "lucide-react"
import {useLayoutEffect, useRef} from "react"
import {Block} from "./block"
import Project from "./Project"
import RightPanel from "./RightPanel"
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
    const isEditing = useStore((store) => store.project.isEditing)
    const setIsEditing = useStore((store) => store.project.setIsEditing)
    const editingBlock = useStore((store) => store.project.editingBlock)
    function replaceSelection(block: Block) {
        if (!selection) return
        switch (selection.stack) {
            case "header":
                setHeaderStack(
                    headerStack.map((_, i) => (i === selection.index ? block : _)),
                )
                break
            case "left":
                setLeftStack(
                    leftStack.map((_, i) => (i === selection.index ? block : _)),
                )
                break
            case "right":
                setRightStack(
                    rightStack.map((_, i) => (i === selection.index ? block : _)),
                )
                break
            case "footer":
                setFooterStack(
                    footerStack.map((_, i) => (i === selection.index ? block : _)),
                )
                break
            default:
                selection.stack satisfies never
        }
    }
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
        <div ref={ref} className="flex flex-row h-full w-full">
            <div className="flex flex-col p-2 gap-2 w-10/12 border border-neutral-200 rounded-2xl">
                <div>
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
                    <Button
                        size="icon"
                        variant={isEditing ? "default" : "ghost"}
                        disabled={!isSelecting}
                        onClick={() => {
                            setIsEditing(!isEditing)
                            if (isEditing && editingBlock) {
                                replaceSelection(editingBlock)
                                stopSelecting()
                            }
                        }}
                    >
                        <Edit />
                    </Button>
                </div>
                <div className="w-full h-full">
                    <Project />
                </div>
            </div>
            <div className="flex flex-row h-full w-4/12">
                <div className="h-full w-full">
                    <RightPanel />
                </div>
            </div>
        </div>
    )
}
