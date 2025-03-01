import useStore from "../store"
import Stack from "./Stack"

export default function ProjectFooterContent() {
    const footerStack = useStore((state) => state.project.footerStack)
    const setFooterStack = useStore((state) => state.project.setFooterStack)
    return (
        <div className="flex-[0_1_auto]">
            <Stack
                direction="vertical"
                components={footerStack}
                setComponents={setFooterStack}
            />
        </div>
    )
}
