import {useState} from "react"
import PaletteComponent from "./PaletteComponent"
import Button1 from "../library/Buttons/Button1"
import Form1 from "../library/Forms/Form1"
import Form2 from "../library/Forms/Form2"
import {ChevronDown, ChevronRight, Send} from "lucide-react"
import Navbar1 from "../library/Navbars/Navbar1"
import Navbar2 from "../library/Navbars/Navbar2"
import Input1 from "../library/Inputs/Input1"
import Input2 from "../library/Inputs/Input2"
import Input3 from "../library/Inputs/Input3"
import Input4 from "../library/Inputs/Input4"
import Footer1 from "../library/Footers/Footer1"
import Footer2 from "../library/Footers/Footer2"
import Button2 from "../library/Buttons/Button2"
import Button3 from "../library/Buttons/Button3"
import Button4 from "../library/Buttons/Button4"

type Component = {
    title: string
    type: string
    code: any
}

export default function Palette() {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
    const [message, setMessage] = useState("")
    const [code, setCode] = useState<string[]>([])
    const [components, setComponents] = useState<Component[]>([
        {title: "Button 1", type: "Buttons", code: Button1},
        {title: "Button 2", type: "Buttons", code: Button2},
        {title: "Button 3", type: "Buttons", code: Button3},
        {title: "Button 4", type: "Buttons", code: Button4},
        {title: "Form 1", type: "Forms", code: Form1},
        {title: "Form 2", type: "Forms", code: Form2},
        {title: "Navbar 1", type: "Navbars", code: Navbar1},
        {title: "Navbar 2", type: "Navbars", code: Navbar2},
        {title: "Input 1", type: "Inputs", code: Input1},
        {title: "Input 2", type: "Inputs", code: Input2},
        {title: "Input 3", type: "Inputs", code: Input3},
        {title: "Input 4", type: "Inputs", code: Input4},
        {title: "Footer1", type: "Footers", code: Footer1},
        {title: "Footer2", type: "Footers", code: Footer2},
    ])

    const groupedComponents = components.reduce(
        (acc, component) => {
            if (!acc[component.type]) {
                acc[component.type] = []
            }
            acc[component.type].push(component)
            return acc
        },
        {} as Record<string, Component[]>,
    )

    const toggleSection = (type: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [type]: !prev[type],
        }))
    }

    const handleSend = async () => {
        const res = await fetch("https://ui-ai.onrender.com/inline", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({prompt: message}),
        })
        const data = await res.json()
        setMessage("")
        console.log(data.html)

        // Add the new AI-generated component
        setComponents((prev) => [
            ...prev,
            {title: "Generated Component", type: "AI Generated", code: data.html},
        ])
    }

    return (
        <div className="flex flex-col p-2 gap-2 max-h-[45rem] overflow-y-auto overflow-x-hidden border rounded-lg shadow-md">
            {Object.entries(groupedComponents).map(([type, items]) => (
                <div key={type} className="border-b p-2">
                    <button
                        className="flex items-center justify-between w-full text-left p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                        onClick={() => toggleSection(type)}
                    >
                        <span className="font-semibold">{type}</span>
                        {openSections[type] ?
                            <ChevronDown />
                        :   <ChevronRight />}
                    </button>
                    {openSections[type] && (
                        <div className="mt-2 flex flex-col gap-2 pl-4">
                            {items.map((component, i) => (
                                <PaletteComponent key={i} {...component} />
                            ))}
                        </div>
                    )}
                </div>
            ))}
            <div className="flex flex-col gap-2 p-2 border-neutral-300">
                <span className="ml-2 font-semibold">
                    Generate a component using AI
                </span>
                <div className="flex flex-row items-center mx-2">
                    <textarea
                        placeholder="Generate a navbar with a search bar"
                        className="flex-1 bg-neutral-50 text-black border-neutral-600 border p-2 rounded-lg resize-none mr-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && !e.shiftKey && handleSend()
                        }
                    />
                    <button
                        onClick={handleSend}
                        className="p-2 rounded-lg bg-neutral-100 border border-neutral-400 hover:bg-neutral-400 dark:hover:bg-neutral-100 hover:border-neutral-800 hover:border text-neutral-800"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}
