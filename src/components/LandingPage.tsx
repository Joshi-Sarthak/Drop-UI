import {Link} from "react-router-dom"

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-[100dvh] items-center justify-center text-center bg-gradient-to-br from-gray-100 via-gray-300 to-gray-200 relative overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-10"></div>

            <main className="flex-1 flex justify-center relative z-10">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6 flex flex-col items-center justify-center">
                        <div className="max-w-2xl space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-black">
                                    Build beautiful websites with drag and drop
                                    simplicity
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto text-neutral-800">
                                    DropUI is a powerful visual builder that lets you
                                    create stunning websites without writing a single
                                    line of code. Just drag and drop.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                                <Link
                                    to="/editor"
                                    className="inline-flex h-12 items-center justify-center rounded-lg bg-neutral-100 px-10 text-base font-semibold text-black shadow-lg transition-all duration-200 hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                >
                                    Get started with Drop UI
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
