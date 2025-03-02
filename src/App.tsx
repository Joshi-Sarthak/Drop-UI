import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import "allotment/dist/style.css"
import Editor from "./components/Editor"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import Palette from "./components/Palette"
import RightPanel from "./components/RightPanel"
import Preview from "./components/Preview" // Import Preview Page
import LandingPage from "./components/LandingPage"

export default function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                {/* Main Editor Page */}
                <Route path="/" element={<LandingPage />} />
                <Route
                    path="/editor"
                    element={
                        <>
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
                    }
                />
                {/* Preview Page */}
                <Route path="/preview" element={<Preview />} />
            </Routes>
            <Footer />
        </Router>
    )
}
