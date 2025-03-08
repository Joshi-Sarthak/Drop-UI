export interface Block {
    type: string
    jsx: string
    props: Record<string, unknown>
    allowedProps: Record<string, {type: "string"; values: string[]}>
}
