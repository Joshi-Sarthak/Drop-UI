import useStore from "@/store"
import {
    Check,
    Edit,
    Globe,
    History,
    LogOut,
    Save,
    SquareMousePointer,
    Trash,
    Upload,
} from "lucide-react"
import {useEffect, useLayoutEffect, useMemo, useRef} from "react"
import {Link} from "react-router-dom"
import {toast} from "sonner"
import {Block} from "./block"
import Project from "./Project"
import RightPanel from "./RightPanel"
import {Button} from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"

function Exported() {
    const project = useStore((store) => store.project)
    return useMemo(() => {
        return `import React from "react"

export interface PageProps {}

export default function Page({}: PageProps) {
    return (
        <>
            <header>
                ${project.headerStack.map((block) => block.html).join("\n")}
            </header>
            <main>
                <div>
                    ${project.leftStack.map((block) => block.html).join("\n")}
                </div>
                <div>
                    ${project.rightStack.map((block) => block.html).join("\n")}
                </div>
            </main>
            <footer>
                ${project.footerStack.map((block) => block.html).join("\n")}
            </footer>
        </>
    )
}
`
    }, [project])
}

export default function Editor() {
    const ref = useRef<HTMLDivElement>(null)
    const project = useStore((store) => store.project)
    const setProject = useStore((store) => store.setProject)
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
    useEffect(() => {
        function onKeyup(ev: KeyboardEvent) {
            if (ev.key === "Escape") {
                stopSelecting()
            }
            //ctrl+s
            if (ev.ctrlKey && ev.key === "s") {
                ev.stopImmediatePropagation()
                ev.preventDefault()
                project.setRevisions([
                    {
                        project: JSON.stringify(project),
                        date: new Date().toLocaleString(),
                    },
                    ...project.revisions,
                ])
                toast.success("Saved 🎉")
            }
        }
        window.addEventListener("keydown", onKeyup)
        return () => {
            window.removeEventListener("keydown", onKeyup)
        }
    })
    function onSave() {
        const text = JSON.stringify(project)
        const blob = new Blob([text], {type: "text/plain"})
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "project.json"
        a.click()
        URL.revokeObjectURL(url)
        a.remove()
    }
    function onLoad() {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "application/json"
        input.addEventListener("change", () => {
            const file = input.files![0]
            const reader = new FileReader()
            reader.onload = () => {
                const text = reader.result as string
                const project = JSON.parse(text)
                setProject(project)
            }
            reader.readAsText(file)
        })
        input.click()
        input.remove()
    }
    function onListRevisions() {}
    async function onUpload() {
        const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
            </head>
            <body>
                <div class="flex">
                    ${project.headerStack.map((block) => block.html).join("\n")}
                </div>
                <div class="grid grid-cols-2">
                    <div class="flex flex-col">
                        ${project.leftStack.map((block) => block.html).join("\n")}
                    </div>
                    <div class="flex flex-col">
                        ${project.rightStack.map((block) => block.html).join("\n")}
                    </div>
                </div>
                <div class="flex">
                    ${project.footerStack.map((block) => block.html).join("\n")}
                </div>
            </body>
        </html>
        `
        toast("Uploading...")
        const response = await fetch("https://ui-ai.onrender.com/layouts/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Name",
                description: "Description",
                html,
            }),
        })
        const json = await response.json()
        const id = json.id

        toast(() => (
            <span>
                Your website is live at{" "}
                <a
                    href={`http://ui-ai.onrender.com/layouts/${id}`}
                    target="_blank"
                    className="underline"
                >
                    View
                </a>
            </span>
        ))
    }
    return (
        <div ref={ref} className="flex flex-row h-full w-full">
            <div className="flex flex-col p-2 gap-2 w-10/12 border border-neutral-200 rounded-2xl">
                <div className="flex flex-row justify-between items-center">
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
                        <Button size="icon" variant="ghost" onClick={onSave}>
                            <Save />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={onLoad}>
                            <Upload />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={onUpload}>
                            <Globe />
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="icon" variant="ghost">
                                    <LogOut />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Export as React component.
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col gap-4 w-[450px] h-[600px]">
                                    <pre className="bg-gray-100 p-4 rounded-lg overflow-scroll">
                                        <code className="overflow-scroll">
                                            <Exported />
                                        </code>
                                    </pre>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={onListRevisions}
                                >
                                    <History />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Revisions</DialogTitle>
                                    <DialogDescription>
                                        Pick a revision to go back to.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    {project.revisions.map((revision) => (
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm font-semibold">
                                                    {revision.date}
                                                </div>
                                                <div className="text-sm font-semibold">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => {
                                                            const history =
                                                                project.revisions
                                                            setProject({
                                                                ...JSON.parse(
                                                                    revision.project,
                                                                ),
                                                                revisions: history,
                                                            })
                                                        }}
                                                    >
                                                        <Check />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => {
                                                            project.setRevisions(
                                                                project.revisions.filter(
                                                                    (r) =>
                                                                        r !== revision,
                                                                ),
                                                            )
                                                        }}
                                                    >
                                                        <Trash />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Link to="/preview">
                        <div className="mr-4 text-sm font-semibold transition-all duration-200 hover:underline">
                            Preview
                        </div>
                    </Link>
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
