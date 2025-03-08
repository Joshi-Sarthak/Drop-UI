import useStore from "../store"
import Stack from "./Stack"

export default function ProjectRightContent() {
    const rightStack = useStore((state) => state.project.rightStack)
    const setRightStack = useStore((state) => state.project.setRightStack)
    return (
        <div className="flex-[0_1_auto]">
            <Stack
                section="right"
                direction="vertical"
                components={rightStack}
                setComponents={setRightStack}
            />
        </div>
    )
}
