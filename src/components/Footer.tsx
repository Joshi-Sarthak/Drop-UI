import favicon from "../../public/favicon.svg"

export default function Footer() {
    return (
        <footer className="bg-neutral-200 px-6 py-4">
            <div className="max-w-7xl mx-auto flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-md bg-neutral-400">
                        <img src={favicon} alt="DropUI logo" className="w-6 h-6" />
                    </span>
                    <span className="text-lg font-semibold text-neutral-800">
                        DropUI
                    </span>
                </div>
                <p className="text-neutral-600 text-sm text-center">
                    Drag and Drop to create your own UI
                </p>
            </div>
        </footer>
    )
}
