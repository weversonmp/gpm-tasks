import AsyncStorage from '@react-native-async-storage/async-storage';

import { Tarefa } from "../types/allTypesExport";

export default class TaskCrud {
    id?: string;
    desc?: string;
    did?: boolean | null;

    constructor(id: string, tarefa: string) {
        this.id = id;
        this.desc = tarefa;
    }

    getTasks = async (): Promise<Array<Tarefa>> => {
        return await AsyncStorage.getItem('listaDeTarefas').then(
            (value) => JSON.parse(value ?? '')
        )
    }

    saveTask = async (todasTarefasSalvas: Array<Tarefa>): Promise<void> => {
        this.id && this.desc && todasTarefasSalvas.unshift({ id: this.id, desc: this.desc, did: this.did });

        await AsyncStorage.setItem("listaDeTarefas", JSON.stringify([...todasTarefasSalvas]))
    }

    removeTask = async (todasTarefasSalvas: Array<Tarefa>): Promise<Tarefa[]> => {
        let todasTarefasAtualizadas: Array<Tarefa> = todasTarefasSalvas.filter((tarefa) => {
            return tarefa.id != this.id && tarefa.desc != ''
        }); // Remove a tarefa (que chegou como parâmetro) do array

        await AsyncStorage.setItem("listaDeTarefas", JSON.stringify([...todasTarefasAtualizadas]));

        return todasTarefasAtualizadas;

    }
}