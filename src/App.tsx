import "allotment/dist/style.css"
import Editor from "./components/Editor"
import NavBar from "./components/NavBar"
import Palette from "./components/Palette"
import RightPanel from "./components/RightPanel"

export default function App() {
    return (
        <>
            <NavBar />
            <div className="flex h-screen">
                <div className="w-1/5 bg-gray-100 flex-shrink-0">
                    <Palette />
                </div>
                <div className="flex-1">
                    <Editor />
                </div>
                <div className="w-1/5 bg-gray-100 flex-shrink-0">
                    <RightPanel />
                </div>
            </div>
        </>
    )
}
