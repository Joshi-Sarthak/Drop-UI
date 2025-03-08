import {useState, ChangeEvent, FormEvent, useContext} from "react"
import {Link} from "react-router-dom"
import {AuthContext} from "../context/AuthContext"
import {AnimatedGridPattern} from "./magicui/animated-grid-pattern"
import {cn} from "@/lib/utils"

const SignUp = () => {
    const {login} = useContext(AuthContext)!
    const [formData, setFormData] = useState({email: "", password: "", name: ""})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            console.log(formData)
            console.log(formData)
            const createResponse = await fetch("https://ui-ai.onrender.com/users", {
                // <-- updated to /users
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            })
            console.log(createResponse)
            if (!createResponse.ok) {
                throw new Error("Signup failed. Please try again.")
            }

            const response = await fetch("https://ui-ai.onrender.com/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            })
            console.log(response)
            if (!response.ok) {
                throw new Error("Login failed. Please check your credentials.")
            }

            const data = await response.json()
            console.log(data)
            login(data.access_token)
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <div className="absolute flex h-[80vh] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20">
                <AnimatedGridPattern
                    numSquares={30}
                    maxOpacity={0.5}
                    duration={1}
                    repeatDelay={1}
                    className={cn(
                        "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]",
                        "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                    )}
                />
            </div>

            <div className="bg-neutral-100/50 p-8  shadow-md w-96 border border-neutral-400 rounded-3xl z-10">
                <h1 className="text-2xl font-semibold mb-4 text-center">Sign Up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="p-2 border border-stone-400 rounded-lg bg-neutral-50"
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="p-2 border border-stone-400 rounded-lg bg-neutral-50"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="p-2 border border-stone-400 rounded-lg bg-neutral-50"
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="bg-stone-900 rounded-3xl hover:bg-stone-950 text-white font-semibold transition-all duration-200 p-2"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
                <div className="mt-4">
                    <Link to="/login" className="text-stone-900 hover:underline">
                        Already have an account? Sign in
                    </Link>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    )
}

export default SignUp
