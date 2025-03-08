import useStore from "../store"
import Stack from "./Stack"

export default function ProjectHeader() {
    const headerStack = useStore((state) => state.project.headerStack)
    const setHeaderStack = useStore((state) => state.project.setHeaderStack)
    return (
        <div className="flex-[0_1_auto]">
            <Stack
                section="header"
                direction="horizontal"
                components={headerStack}
                setComponents={setHeaderStack}
            />
        </div>
    )
}
