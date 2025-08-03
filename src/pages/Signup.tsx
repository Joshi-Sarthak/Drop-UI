import {useState, ChangeEvent, FormEvent} from "react"
import {Link} from "react-router-dom"

import {AnimatedGridPattern} from "../components/magicui/animated-grid-pattern"
import {cn} from "@/lib/utils"
import {motion} from "framer-motion"

const SignUp = () => {
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
            const res = await fetch("https://ui-ai.onrender.com/users", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            })
            console.log(res.json().then((data) => console.log(data)))
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

            <motion.div
                className="bg-neutral-100/50 p-8  shadow-md w-96 border border-neutral-400 rounded-3xl z-10"
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.3}}
            >
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
                        className="bg-stone-900 rounded-lg hover:bg-stone-950 text-white font-semibold transition-all duration-200 p-2"
                        disabled={loading}
                    >
                        {loading ?
                            <div className="flex flex-row justify-center">
                                <div role="status" className="mt-[-3px] ml-1">
                                    <svg
                                        aria-hidden="true"
                                        className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-neutral-50"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                </div>
                            </div>
                        :   "Sign Up"}
                    </button>
                </form>
                <div className="mt-4">
                    <Link to="/login" className="text-stone-900 hover:underline">
                        Already have an account? Sign in
                    </Link>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </motion.div>
        </div>
    )
}

export default SignUp
