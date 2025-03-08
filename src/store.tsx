import {create} from "zustand"
import {Block} from "./components/block"

export interface Store {
    project: {
        headerStack: Block[]
        leftStack: Block[]
        rightStack: Block[]
        footerStack: Block[]
        setHeaderStack: (stack: Block[]) => void
        setLeftStack: (stack: Block[]) => void
        setRightStack: (stack: Block[]) => void
        setFooterStack: (stack: Block[]) => void
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
