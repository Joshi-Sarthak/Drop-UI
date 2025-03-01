import ProjectFooter from "./ProjectFooter"
import ProjectHeader from "./ProjectHeader"
import ProjectLeftContent from "./ProjectLeftContent"
import ProjectRightContent from "./ProjectRightContent"

export default function Project() {
    return (
        <div>
            <ProjectHeader />
            <div className="grid grid-cols-[250px_1fr]">
                <ProjectLeftContent />
                <ProjectRightContent />
            </div>
            <ProjectFooter />
        </div>
    )
}
