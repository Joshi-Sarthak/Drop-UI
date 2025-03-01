import {Allotment} from "allotment"
import "allotment/dist/style.css"
import Editor from "./components/Editor"
import NavBar from "./components/NavBar"
import Palette from "./components/Palette"

export default function App() {
    return (
        <>
            <NavBar />
            <Allotment className="flex-[1_1_auto]">
                <Allotment.Pane minSize={128} preferredSize={192}>
                    <Palette />
                </Allotment.Pane>
                <Allotment.Pane snap>
                    <Editor />
                </Allotment.Pane>
            </Allotment>
        </>
    )
}
