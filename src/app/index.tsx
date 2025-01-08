import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';

// Components
import TarefaComponent from '../components/Tarefa_component'

// Classes
import TaskCrud from "../classes/TaskCrud";

// Functions
import GeraAlert from "../classes/AlertaToast";

// Types
import { Tarefa } from "../types/all_types_export";

const getDataTime = (): string => {
    return Date.now().toString();
}

export default function Index() {
    const [alert, setAlert] = useState('');
    const [texto, setTexto] = useState('');
    const [descDaTarefa, setdescDaTarefa] = useState<Tarefa[]>([]);

    useEffect(() => {
        getStorage()
    }, [])

    const submit = async () => {
        try {

            if (texto === "") {
                setAlert("Descreva uma tarefa")
                GeraAlert(
                    'error',
                    'Opa!!!',
                    'Campo vazio! Nenhuma tarefa foi adicionada 🚨'
                );
            } else {
                const resultado = texto;
                saveStorage(resultado)
                setAlert("")
                setTexto("")
                GeraAlert(
                    'success',
                    'Hello',
                    'Tarefa adicionada com sucesso 👋'
                );
            }

        } catch (error) {
            setAlert("Erro ao adicionar sua tarefa")
        }
    };

    const showToast = () => {
        console.log('==dataTeste', Date.now());
    }

    const saveStorage = async (descricaoTarefa: string): Promise<void> => {
        const id: string = getDataTime();
        const taskCrud = new TaskCrud(id, descricaoTarefa);
        const todasTarefasSalvas: Array<Tarefa> = descDaTarefa

        setdescDaTarefa(todasTarefasSalvas);
        taskCrud.saveTask(todasTarefasSalvas);
    }

    const getStorage = async (): Promise<void> => {
        const taskCrud = new TaskCrud('', '');

        const todasTarefasSalvas: Array<Tarefa> = await taskCrud.getTasks()
        setdescDaTarefa(todasTarefasSalvas);
    }

    return (
        <View>
            <ScrollView scrollEnabled keyboardShouldPersistTaps="handled">
                <View style={styles.container}>
                    <Text style={styles.titulo}>GPM Tasks</Text>
                    <View style={styles.containerBuscar}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(novoTexto) => setTexto(novoTexto)}
                            defaultValue={texto}
                            placeholder="Descreva sua tarefa..."
                        />
                        <TouchableOpacity onPress={submit} style={styles.botao}>
                            <Text style={styles.botao_text}> + </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textErro}> {alert} </Text>
                    {descDaTarefa.map((item: Tarefa) => {
                        return (
                            // {/* <Text> {item.desc} </Text> */}
                            <TarefaComponent id={item.id} desc={item.desc} onDelete={() => showToast} />
                        )
                    })}
                </View>
            </ScrollView>
            <Toast />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        fontStyle: 'italic',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    containerBuscar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botao: {
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 2,
    },
    botao_text: {
        color: 'white',
        fontWeight: '900',
        fontSize: 30
    },
    textErro: {
        color: 'red',
        fontSize: 10,
    }
})

