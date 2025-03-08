import {useState} from "react"
import {BsStars} from "react-icons/bs"
import useStore from "../store"
import {TypingAnimation} from "@/components/magicui/typing-animation"

export default function RightPanel() {
    const {headerStack, leftStack, rightStack, footerStack} = useStore(
        (state) => state.project,
    )

    const [message, setMessage] = useState({prompt: "", html: ""})
    const [suggestion, setSuggestion] = useState("") // Store API response
    const [loading, setLoading] = useState(false) // Loading state
    const selection = useStore((store) => store.project.selection)
    let selectedBlock = undefined
    if (selection) {
        switch (selection.stack) {
            case "header":
                selectedBlock = headerStack[selection.index]
                break
            case "left":
                selectedBlock = leftStack[selection.index]
                break
            case "right":
                selectedBlock = rightStack[selection.index]
                break
            case "footer":
                selectedBlock = footerStack[selection.index]
                break
            default:
                selectedBlock = undefined
        }
    }

    const handleSend = async () => {
        const html = [...headerStack, ...leftStack, ...rightStack, ...footerStack]
            .map((component) => component.html)
            .join("\n")
        console.log(html)
        const requestBody = {prompt: message.prompt, html}
        setMessage({...message, html})
        setLoading(true)
        console.log(requestBody)
        try {
            const response = await fetch("https://ui-ai.onrender.com/suggest", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(requestBody),
            })

            if (!response.ok) throw new Error("Failed to fetch suggestions")

            const data = await response.json()
            setSuggestion(data.suggestion) // Store the AI suggestion
        } catch (error) {
            setSuggestion("Error fetching suggestions.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-full w-full bg-neutral-100 p-4 rounded-xl shadow-lg border border-neutral-200 border-r-0 rounded-r-none">
            <h2 className="ml-2 font-semibold flex flex-row items-center ">
                <span className="ml-2">Ask AI For Suggestions</span>
            </h2>

            <div className="flex flex-col gap-2 p-2 border-neutral-300 mt-2">
                <textarea
                    placeholder="Suggest some improvements to the current design"
                    className="flex-1 bg-neutral-50 text-black w-4/5 border-neutral-300  border pb-8 rounded-lg resize-none placeholder:text-neutral-400 placeholder:text-md p-2  "
                    value={message.prompt}
                    onChange={(e) => setMessage({...message, prompt: e.target.value})}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                />
                <button
                    onClick={handleSend}
                    disabled={loading}
                    className={`p-2 rounded-lg w-36 mt-2 flex flex-row items-center border border-neutral-800 transition-all duration-300 font-semibold
                            ${loading ? "bg-stone-900 cursor-not-allowed text-neutral-50" : "bg-neutral-100 hover:bg-stone-900 hover:text-neutral-50"}`}
                >
                    {loading ?
                        <>
                            <div role="status" className="mt-[-3px] ml-1">
                                <svg
                                    aria-hidden="true"
                                    className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-neutral-50"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                            </div>
                            <span className="text-sm ml-3">Generating</span>
                        </>
                    :   <>
                            <BsStars />
                            <span className="text-sm ml-2">Generate by AI</span>
                        </>
                    }
                </button>
            </div>

            {suggestion && (
                <div className="mt-4 p-4 bg-neutral-100 rounded-lg overflow-auto">
                    <h3 className="font-semibold text-lg">AI Suggestion:</h3>
                    <TypingAnimation>{suggestion.replace(/\*\*/g, "")}</TypingAnimation>
                </div>
            )}
        </div>
    )
}
