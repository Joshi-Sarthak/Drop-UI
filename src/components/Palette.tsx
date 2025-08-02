import {ChevronDown, ChevronRight} from "lucide-react"
import {useState} from "react"
import {BsStars} from "react-icons/bs"
import PaletteItem from "./PaletteComponent"
import {Block} from "./block"
import Navbar1 from "@/library/Navbars/Navbar1"
import Navbar2 from "@/library/Navbars/Navbar2"

export default function Palette() {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState<Block[]>([
        {
            type: "Buttons",
            html: `<button type="button" class="text-gray-100 bg-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Button</button>`,
        },
        {
            type: "Buttons",
            html: `<button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Button</button>`,
        },
        {
            type: "Buttons",
            html: `<button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Button</button>`,
        },
        {
            type: "Buttons",
            html: `<button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Button</button>`,
        },
        {
            type: "Buttons",
            html: `<button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Button</button>`,
        },
        {
            type: "Buttons",
            html: `<button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Button</button>`,
        },
        {
            type: "Footer",
            html: `<footer class="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
    </div>
</footer>`,
        },
        {
            type: "Footer",
            html: `<footer class="flex flex-row flex-wrap items-center justify-center w-full py-6 text-center border-t gap-y-6 gap-x-12 border-slate-200 md:justify-between">
  <p class="block text-slate-800 font-semibold text-sm">
      Material Tailwind
  </p>
  <ul class="flex flex-wrap items-center gap-y-2 gap-x-8">
    <li>
      <a href="#" class="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm">
        About Us
      </a>
    </li>
    <li>
      <a href="#" class="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm">
        License
      </a>
    </li>
    <li>
      <a href="#" class="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm">
        Contribute
      </a>
    </li>
    <li>
      <a href="#" class="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm">
        Contact Us
      </a>
    </li>
  </ul>
</footer> `,
        },
        {
            type: "Cards",
            html: `<div class="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div class="flex items-center justify-between">
        <span class="text-sm font-light text-gray-600 dark:text-gray-400">Mar 10, 2019</span>
        <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabindex="0" role="button">Design</a>
    </div>

    <div class="mt-2">
        <a href="#" class="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabindex="0" role="link">Accessibility tools for designers and developers</a>
        <p class="mt-2 text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
    </div>

    <div class="flex items-center justify-between mt-4">
        <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline" tabindex="0" role="link">Read more</a>

        <div class="flex items-center">
            <img class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80" alt="avatar">
            <a class="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabindex="0" role="link">Khatab wedaa</a>
        </div>
    </div>
</div>`,
        },
        {
            type: "Cards",
            html: `<div class="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
    <div class="flex items-center justify-between">
        <span class="text-sm font-light text-gray-800 dark:text-gray-400">Courses and MOOCs</span>
        <span class="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">psychology</span>
    </div>

    <div>
        <h1 class="mt-2 text-lg font-semibold text-gray-800 dark:text-white">AP® Psychology - Course 5: Health and Behavior</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio eligendi similique exercitationem optio libero vitae accusamus cupiditate laborum eos.</p>
    </div>

    <div>
        <div class="flex items-center mt-2 text-gray-700 dark:text-gray-200">
            <span>Visit on:</span>
            <a class="mx-2 text-blue-600 cursor-pointer dark:text-blue-400 hover:underline" tabindex="0" role="link">edx.org</a>
            <span>or</span>
            <a class="mx-2 text-blue-600 cursor-pointer dark:text-blue-400 hover:underline" tabindex="0" role="link">classcentral.com</a>
        </div>

        <div class="flex items-center justify-center mt-4">
            <a class="mr-2 text-gray-800 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" tabindex="0" role="link" aria-label="twitter link">
                <svg aria-hidden="true" class="w-5 h-5 fill-current" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                    <path d='M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z' />
                </svg>
            </a>

            <a class="mr-2 text-gray-800 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" tabindex="0" role="link" aria-label="share link">
                <svg aria-hidden="true" class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.8283 12L16.2426 13.4142L19.071 10.5858C20.6331 9.02365 20.6331 6.49099 19.071 4.9289C17.5089 3.3668 14.9762 3.3668 13.4141 4.9289L10.5857 7.75732L11.9999 9.17154L14.8283 6.34311C15.6094 5.56206 16.8757 5.56206 17.6568 6.34311C18.4378 7.12416 18.4378 8.39049 17.6568 9.17154L14.8283 12Z" />
                    <path d="M12 14.8285L13.4142 16.2427L10.5858 19.0711C9.02365 20.6332 6.49099 20.6332 4.9289 19.0711C3.3668 17.509 3.3668 14.9764 4.9289 13.4143L7.75732 10.5858L9.17154 12L6.34311 14.8285C5.56206 15.6095 5.56206 16.8758 6.34311 17.6569C7.12416 18.4379 8.39049 18.4379 9.17154 17.6569L12 14.8285Z" />
                    <path d="M14.8284 10.5857C15.2189 10.1952 15.2189 9.56199 14.8284 9.17147C14.4379 8.78094 13.8047 8.78094 13.4142 9.17147L9.17154 13.4141C8.78101 13.8046 8.78101 14.4378 9.17154 14.8283C9.56206 15.2188 10.1952 15.2188 10.5857 14.8283L14.8284 10.5857Z" />
                </svg>
            </a>
        </div>
    </div>
</div>`,
        },
        {
            type: "Navbars",
            html: Navbar1,
        },
        {
            type: "Navbars",
            html: Navbar2,
        },
        {
            type: "Forms",
            html: `

<form class="max-w-sm h-[30rem] mt-16 mx-auto">
<div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required />
  </div>
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div class="flex items-start mb-5">
    <div class="flex items-center h-5">
      <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
`,
        },
    ])
    const groupedComponents = items.reduce(
        (acc, component) => {
            if (!acc[component.type]) {
                acc[component.type] = []
            }
            acc[component.type].push(component)
            return acc
        },
        {} as Record<string, Block[]>,
    )

    const toggleSection = (type: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [type]: !prev[type],
        }))
    }

    const handleSend = async () => {
        if (!message.trim()) return
        setLoading(true)
        try {
            const res = await fetch("https://ui-ai.onrender.com/inline", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({prompt: message}),
            })
            const data = await res.json()
            console.log(data.html)
            console.log(message)
            const accessToken = localStorage.getItem("token")
            console.log(accessToken)
            const res1 = await fetch("https://ui-ai.onrender.com/components/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({description: message, html: data.html}),
            })
            console.log(res1)
            setMessage("")
            setItems((prev) => [
                ...prev,
                {type: "AI Generated", html: data.jsx ?? data.html},
            ])
        } catch (error) {
            console.error("Failed to generate AI component:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col p-2 gap-2 max-h-[45rem] overflow-y-auto overflow-x-hidden rounded-xl">
            {Object.entries(groupedComponents).map(([type, items]) => (
                <div key={type} className="border-b p-2">
                    <button
                        className="flex items-center justify-between w-full text-left p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                        onClick={() => toggleSection(type)}
                    >
                        <span className="font-semibold">{type}</span>
                        {openSections[type] ?
                            <ChevronDown />
                        :   <ChevronRight />}
                    </button>
                    {openSections[type] && (
                        <div className="mt-2 flex flex-col gap-2 pl-4">
                            {items.map((block, i) => (
                                <PaletteItem key={i} block={block} />
                            ))}
                        </div>
                    )}
                </div>
            ))}
            <div className="flex flex-col gap-2 p-2 border-neutral-300">
                <span className="ml-2 font-semibold">
                    Generate a component using AI
                </span>

                <div className="flex flex-col gap-2 p-2 border-neutral-300 mt-2">
                    <textarea
                        placeholder="Suggest some improvements to the current design"
                        className="flex-1 bg-neutral-50 text-black w-11/12 border-neutral-300 border pb-8 rounded-lg resize-none placeholder:text-neutral-400 placeholder:text-md p-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && !e.shiftKey && handleSend()
                        }
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className={`p-2 rounded-lg w-36 mt-2 flex flex-row items-center border border-neutral-800 transition-all duration-300 font-semibold
                            ${loading ? "bg-stone-900 cursor-not-allowed text-neutral-50" : "bg-neutral-100 hover:bg-stone-900 hover:text-neutral-50"}`}
                    >
                        {loading ?
                            <>
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
                                <span className="text-sm ml-3">Generating</span>
                            </>
                        :   <>
                                <BsStars />
                                <span className="text-sm ml-2">Generate by AI</span>
                            </>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
