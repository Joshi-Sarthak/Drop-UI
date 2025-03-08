import {Toaster} from "@/components/ui/sonner"
import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import App from "./App.tsx"
import {AuthProvider} from "./context/AuthContext.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
        <Toaster />
    </StrictMode>,
)
