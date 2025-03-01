import {useLayoutEffect, useRef, useState} from "react"
import Component from "./Component"

export interface PaletteComponentProps {
    code: string
}

export default function PaletteComponent({code}: PaletteComponentProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const componentRef = useRef<HTMLDivElement>(null)
    const [containerHeight, setContainerHeight] = useState(0)
    const [componentScale, setComponentScale] = useState(1)
    useLayoutEffect(() => {
        if (!containerRef.current || !componentRef.current) return
        const containerRect = containerRef.current.getBoundingClientRect()
        const componentRect = componentRef.current.getBoundingClientRect()
        const aspectRatio = componentRect.width / componentRect.height
        setContainerHeight(containerRect.width / aspectRatio)
        setComponentScale(containerRect.width / componentRect.width)
    }, [code])
    return (
        <div className="bg-blue-500 rounded-sm shadow">
            <div ref={containerRef} style={{height: `${containerHeight}px`}}>
                <div className="relative w-[800px]">
                    <div
                        ref={componentRef}
                        className="absolute origin-top-left"
                        style={{scale: componentScale}}
                    >
                        <Component code={code} />
                    </div>
                </div>
            </div>
        </div>
    )
}
