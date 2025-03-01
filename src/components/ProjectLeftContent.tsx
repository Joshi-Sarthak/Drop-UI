import useStore from "../store"
import Stack from "./Stack"

export default function ProjectLeftContent() {
    const leftStack = useStore((state) => state.project.leftStack)
    const setLeftStack = useStore((state) => state.project.setLeftStack)
    return (
        <div className="flex-[0_1_auto]">
            <Stack
                direction="vertical"
                components={leftStack}
                setComponents={setLeftStack}
            />
        </div>
    )
}
