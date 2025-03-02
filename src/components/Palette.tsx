import {useState} from "react"
import PaletteComponent from "./PaletteComponent"
import Button1 from "../library/Buttons/Button1"
import Form1 from "../library/Forms/Form1"
import Form2 from "../library/Forms/Form2"
import {ChevronDown, ChevronRight} from "lucide-react"
import Navbar1 from "../library/Navbars/Navbar1"
import Navbar2 from "../library/Navbars/Navbar2"

type Component = {
    title: string
    type: string
    code: any
}

const components: Component[] = [
    {title: "Button 1", type: "Buttons", code: Button1},
    {title: "Form 1", type: "Forms", code: Form1},
    {title: "Form 2", type: "Forms", code: Form2},
    {title: "Navbar 1", type: "Navbars", code: Navbar1},
    {title: "Navbar 2", type: "Navbars", code: Navbar2},
]

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

export default function Palette() {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

    const toggleSection = (type: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [type]: !prev[type],
        }))
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
        </div>
    )
}
