import Editor from "./components/Editor"
import NavBar from "./components/NavBar"
import Palette from "./components/Palette"

export default function App() {
    return (
        <>
            <NavBar />
            <div className="flex flex-[1_1_auto]">
                <Palette />
                <Editor />
            </div>
        </>
    )
}
