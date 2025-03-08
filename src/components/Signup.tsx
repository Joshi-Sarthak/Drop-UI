import {useState, ChangeEvent, FormEvent, useContext} from "react"
import {Link} from "react-router-dom"
import {AuthContext} from "../context/AuthContext"

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
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="p-2 border rounded"
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="p-2 border rounded"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="p-2 border rounded"
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
                <div className="mt-4">
                    <Link to="/login" className="text-blue-500">
                        Already have an account? Sign in
                    </Link>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    )
}

export default SignUp
