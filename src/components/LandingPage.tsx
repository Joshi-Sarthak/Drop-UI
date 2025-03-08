import {Link} from "react-router-dom"
import {AnimatedGridPattern} from "@/components/magicui/animated-grid-pattern"
import {VelocityScroll} from "@/components/magicui/scroll-based-velocity"
import {TextAnimate} from "@/components/magicui/text-animate"
import {cn} from "@/lib/utils"

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-[80dvh] items-center justify-center text-center bg-gradient-to-br from-gray-100 via-gray-300 to-gray-200 relative overflow-hidden">
            {/* Pattern Overlay */}

            <div className="absolute flex h-screen w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20">
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

            <main className="flex-1 flex justify-center relative z-10">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6 flex flex-col items-center justify-center">
                        <div className="max-w-2xl space-y-6">
                            <div className="space-y-4">
                                <div className="relative flex flex-col items-center justify-center overflow-hidden">
                                    <VelocityScroll>Drop UI</VelocityScroll>
                                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
                                </div>

                                <TextAnimate
                                    animation="blurInUp"
                                    by="character"
                                    once={false}
                                    delay={1}
                                    className="text-xl py-4 text-stone-800"
                                >
                                    DropUI is a powerful visual builder that lets you
                                    create stunning websites without writing a single
                                    line of code. Just drag and drop.
                                </TextAnimate>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                                <Link
                                    to="/editor"
                                    className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-100 px-10 text-base font-semibold text-black shadow-lg transition-all duration-200 hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
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
