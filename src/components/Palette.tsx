import {ChevronDown, ChevronRight, Send} from "lucide-react"
import {useState} from "react"
import PaletteItem from "./PaletteComponent"
import {Block} from "./block"

export default function Palette() {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
    const [message, setMessage] = useState("")
    const [items, setItems] = useState<Block[]>([
        {
            type: "Buttons",
            jsx: "<Button variant={variant}>Sample shadcn/ui button</Button>",
            props: {variant: "default"},
            allowedProps: {variant: {type: "string", values: ["default", "secondary"]}},
        },
        {
            type: "Forms",
            jsx: `
            <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>`,
            props: {},
            allowedProps: {},
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
        const res = await fetch("https://ui-ai.onrender.com/inline", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({prompt: message}),
        })
        const data = await res.json()
        setMessage("")
        console.log(data.html)

        // Add the new AI-generated component
        setItems((prev) => [
            ...prev,
            {type: "AI Generated", jsx: data.html, props: {}, allowedProps: {}},
        ])
    }

    return (
        <div className="flex flex-col p-2 gap-2 max-h-[45rem] overflow-y-auto overflow-x-hidden border rounded-lg shadow-md">
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
                <div className="flex flex-row items-center mx-2">
                    <textarea
                        placeholder="Generate a navbar with a search bar"
                        className="flex-1 bg-neutral-50 text-black border-neutral-600 border p-2 rounded-lg resize-none mr-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && !e.shiftKey && handleSend()
                        }
                    />
                    <button
                        onClick={handleSend}
                        className="p-2 rounded-lg bg-neutral-100 border border-neutral-400 hover:bg-neutral-400 dark:hover:bg-neutral-100 hover:border-neutral-800 hover:border text-neutral-800"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}
