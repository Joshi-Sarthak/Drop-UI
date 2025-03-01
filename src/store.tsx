import {create} from "zustand"

export interface StaticComponent {
    title: string
    code: string
}

export interface Store {
    project: {
        headerComponent?: StaticComponent
        leftComponent?: StaticComponent
        rightComponent?: StaticComponent
        footerComponent?: StaticComponent
        setHeaderComponent: (component?: StaticComponent) => void
        setLeftComponent: (component?: StaticComponent) => void
        setRightComponent: (component?: StaticComponent) => void
        setFooterComponent: (component?: StaticComponent) => void
    }
}

const useStore = create<Store>()((set) => ({
    project: {
        setHeaderComponent: (component) => {
            set((state) => ({
                project: {
                    ...state.project,
                    headerComponent: component,
                },
            }))
        },
        setLeftComponent: (component) => {
            set((state) => ({
                project: {
                    ...state.project,
                    leftComponent: component,
                },
            }))
        },
        setRightComponent: (component) => {
            set((state) => ({
                project: {
                    ...state.project,
                    rightComponent: component,
                },
            }))
        },
        setFooterComponent: (component) => {
            set((state) => ({
                project: {
                    ...state.project,
                    footerComponent: component,
                },
            }))
        },
    },
}))
