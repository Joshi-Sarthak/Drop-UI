import {Allotment} from "allotment"
import ProjectFooter from "./ProjectFooter"
import ProjectHeader from "./ProjectHeader"
import ProjectLeftContent from "./ProjectLeftContent"
import ProjectRightContent from "./ProjectRightContent"

export default function Project() {
    return (
        <div className="h-full flex flex-col">
            <ProjectHeader />
            <div className="flex flex-col flex-[1_1_auto] ">
                <Allotment>
                    <Allotment.Pane snap preferredSize={`50%`} minSize={0}>
                        <ProjectLeftContent />
                    </Allotment.Pane>
                    <Allotment.Pane preferredSize={`50%`} minSize={0}>
                        <ProjectRightContent />
                    </Allotment.Pane>
                </Allotment>
            </div>
            <ProjectFooter />
        </div>
    )
}
