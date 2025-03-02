import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import "allotment/dist/style.css"
import Editor from "./components/Editor"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import Palette from "./components/Palette"
import RightPanel from "./components/RightPanel"
import Preview from "./components/Preview" // Import Preview Page

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Main Editor Page */}
                <Route
                    path="/"
                    element={
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
                            <Footer />
                        </>
                    }
                />
                {/* Preview Page */}
                <Route path="/preview" element={<Preview />} />
            </Routes>
        </Router>
    )
}
