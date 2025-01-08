export type Tarefa = {
    id: string,
    desc: string,
    onDelete?: () => void
};