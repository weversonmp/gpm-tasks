export type Tarefa = {
    id: string
    desc: string
    did?: boolean | null
    openModal?: (id: string) => void
    onDelete?: (id: string) => void
    onDidIt?: (id: string) => void
};