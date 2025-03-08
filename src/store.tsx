import {produce} from "immer"
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
        isSelecting: boolean
        startSelecting: () => void
        stopSelecting: () => void
        selection?: {
            stack: "header" | "footer" | "left" | "right"
            index: number
        }
        setSelection: (
            stack: "header" | "footer" | "left" | "right",
            index: number,
        ) => void
    }
}

const useStore = create<Store>()((set) => ({
    project: {
        headerStack: [],
        leftStack: [],
        rightStack: [],
        footerStack: [],
        setHeaderStack: (stack) =>
            set(
                produce((state) => {
                    state.project.headerStack = stack
                }),
            ),
        setLeftStack: (stack) =>
            set(
                produce((state) => {
                    state.project.leftStack = stack
                }),
            ),
        setRightStack: (stack) =>
            set(
                produce((state) => {
                    state.project.rightStack = stack
                }),
            ),
        setFooterStack: (stack) =>
            set(
                produce((state) => {
                    state.project.footerStack = stack
                }),
            ),
        isSelecting: false,
        startSelecting: () =>
            set(
                produce((state) => {
                    state.project.isSelecting = true
                }),
            ),
        stopSelecting: () =>
            set(
                produce((state) => {
                    state.project.isSelecting = false
                    state.project.selection = undefined
                }),
            ),
        selection: undefined,
        setSelection: (stack, index) =>
            set(
                produce((state) => {
                    state.project.selection = {stack, index}
                }),
            ),
    },
}))

export default useStore
