import {create} from "zustand"

export interface StaticComponent {
    title: string
    code: string
}

export interface Store {
    project: {
        headerStack: StaticComponent[]
        leftStack: StaticComponent[]
        rightStack: StaticComponent[]
        footerStack: StaticComponent[]
        setHeaderStack: (stack: StaticComponent[]) => void
        setLeftStack: (stack: StaticComponent[]) => void
        setRightStack: (stack: StaticComponent[]) => void
        setFooterStack: (stack: StaticComponent[]) => void
    }
}

const useStore = create<Store>()((set) => ({
    project: {
        headerStack: [],
        leftStack: [],
        rightStack: [],
        footerStack: [],
        setHeaderStack: (stack) =>
            set((store) => ({
                project: {
                    ...store.project,
                    headerStack: stack,
                },
            })),
        setLeftStack: (stack) =>
            set((store) => ({
                project: {
                    ...store.project,
                    leftStack: stack,
                },
            })),
        setRightStack: (stack) =>
            set((store) => ({
                project: {
                    ...store.project,
                    rightStack: stack,
                },
            })),
        setFooterStack: (stack) =>
            set((store) => ({
                project: {
                    ...store.project,
                    footerStack: stack,
                },
            })),
    },
}))

export default useStore
