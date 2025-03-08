import {useNavigate} from "react-router-dom"
import favicon from "../../public/favicon.svg"

export default function NavBar() {
    const navigate = useNavigate();
    return (
        <nav className="flex items-center justify-between px-6 py-4 backdrop-blur-lg">
            <Link to="/">
                <div className="flex items-center space-x-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-md bg-neutral-400">
                        <img
                            src={favicon || "/placeholder.svg"}
                            alt="DropUI logo"
                            className="w-6 h-6"
                        />
                    </span>
                    <span className="text-lg font-semibold text-neutral-800">
                        DropUI
                    </span>
                </div>
            </Link>
        </nav>
    )
}
