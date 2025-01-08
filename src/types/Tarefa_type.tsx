export type Tarefa = {
    id: string,
    desc: string,
    onDelete?: (id: string) => void
};