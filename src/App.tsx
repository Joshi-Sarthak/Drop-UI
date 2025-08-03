import "allotment/dist/style.css"
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Editor from "./components/Editor"
import Footer from "./components/Footer"
import LandingPage from "./pages/LandingPage"
import Login from "@/pages/Login"
import NavBar from "./components/NavBar"
import Palette from "./components/Palette"
import Preview from "./components/Preview" // Import Preview Page

import SignUp from "@/pages/Signup"
import AllGenerated from "./components/AllGenerated"

export default function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                {/* Main Editor Page */}
                <Route path="/all" element={<AllGenerated />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                <Route
                    path="/preview"
                    element={
                        <>
                            <Preview />
                        </>
                    }
                ></Route>
                <Route
                    path="/editor"
                    element={
                        <>
                            <div className="flex h-screen">
                                <div className="w-1/5 bg-neutral-100 rounded-2xl border border-neutral-200 flex-shrink-0">
                                    <Palette />
                                </div>
                                <div className="w-4/5">
                                    <Editor />
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
