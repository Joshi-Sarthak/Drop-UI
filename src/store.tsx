import {create} from "zustand"
import {Block} from "./components/block"

export interface Revision {
    project: string
    date: string
}

export interface Store {
    project: {
        revisions: Revision[]
        setRevisions: (revisions: Revision[]) => void
        editingBlock?: Block
        setEditingBlock: (block: Block) => void
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
        isEditing: boolean
        setIsEditing: (isEditing: boolean) => void
        setSelection: (
            stack: "header" | "footer" | "left" | "right",
            index: number,
        ) => void
    }
    setProject: (project: Store["project"]) => void
}

const useStore = create<Store>()((set) => ({
    setProject: (project) =>
        set((store) => ({
            project: {
                ...store.project,
                ...project,
            },
        })),
    project: {
        revisions: [],
        setRevisions: (revisions) =>
            set((store) => ({
                project: {
                    ...store.project,
                    revisions,
                },
            })),
        editingBlock: undefined,
        setEditingBlock: (block) =>
            set((store) => ({
                project: {
                    ...store.project,
                    editingBlock: block,
                },
            })),
        isEditing: false,
        setIsEditing: (isEditing) =>
            set((store) => ({
                project: {
                    ...store.project,
                    isEditing,
                },
            })),
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
        isSelecting: false,
        startSelecting: () =>
            set((store) => ({
                project: {
                    ...store.project,
                    isSelecting: true,
                },
            })),
        stopSelecting: () =>
            set((store) => ({
                project: {
                    ...store.project,
                    selection: undefined,
                    isSelecting: false,
                    isEditing: false,
                    editingBlock: undefined,
                },
            })),
        selection: undefined,
        setSelection: (stack, index) =>
            set((store) => ({
                project: {
                    ...store.project,
                    selection: {
                        stack,
                        index,
                    },
                    isEditing: false,
                    editingBlock: undefined,
                },
            })),
    },
}))

export default useStore
