import {useState} from "react"
import {Send} from "lucide-react"
import useStore from "../store"

interface message {
    prompt: string
    code: string
}

export default function RightPanel() {
    const {headerStack, leftStack, rightStack, footerStack} = useStore(
        (state) => state.project,
    )
    const [message, setMessage] = useState<message>({prompt: "", code: ""})

    const handleSend = () => {
        const code = headerStack
            .map((component) => component.code)
            .concat(leftStack.map((component) => component.code))
            .concat(rightStack.map((component) => component.code))
            .concat(footerStack.map((component) => component.code))
            .join("\n")

        setMessage({...message, code})
    }

    return (
        <div className="flex flex-col h-full w-full bg-neutral-100 p-4 rounded-xl shadow-md">
            <h2 className="ml-2 font-semibold">Ask AI For suggestions</h2>
            <div className="flex items-center gap-2 p-2  border-neutral-300">
                <textarea
                    placeholder="Suggest some improvements to the current design"
                    className="flex-1 bg-neutral-50 text-black border-neutral-600 border p-2 rounded-lg resize-none"
                    value={message.prompt}
                    onChange={(e) => setMessage({...message, prompt: e.target.value})}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="p-2 rounded-lg bg-neutral-100 border border-neutral-400  hover:bg-neutral-400 dark:hover:bg-neutral-100 hover:border-neutral-800 hover:border text-neutral-800"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    )
}
