import AsyncStorage from '@react-native-async-storage/async-storage';

import { Tarefa } from "../types/all_types_export";

export default class TaskCrud {
    id: string;
    tarefa: string;

    constructor(id: string, tarefa: string) {
        this.id = id;
        this.tarefa = tarefa;
    }

    getTasks = async (): Promise<Array<Tarefa>> => {
        return await AsyncStorage.getItem('listaDeTarefas').then(
            (value) => JSON.parse(value ?? '')
        )
    }

    saveTask = async (todasTarefasSalvas: Array<Tarefa>): Promise<Array<Tarefa>> => {
        todasTarefasSalvas.push({ id: this.id, desc: this.tarefa });

        await AsyncStorage.setItem("listaDeTarefas", JSON.stringify([...todasTarefasSalvas]))

        return todasTarefasSalvas;
    }

    // deleteTask(id) {
    //     setTasks(tasks.filter(task => task.id !== id));
    //   }
}