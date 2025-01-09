import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

// Components
import TaskComponent from '../components/TaskComponent'
import EditTaskModal from '../components/EditTaskModal';

// Classes
import TaskCrud from "../classes/TaskCrud";

// Functions
import AlertToast from "../functions/AlertToast";

// Types
import { Tarefa } from "../types/allTypesExport";

const getDataTime = (): string => {
    return Date.now().toString();
}

export default function Index() {
    const [alert, setAlert] = useState('');
    const [texto, setTexto] = useState('');
    const [todasAsTarefas, setTodasAsTarefas] = useState<Tarefa[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dadosEditTarefa, setDadosEditTarefa] = useState<Tarefa>();

    useEffect(() => {
        getStorage()
    }, [])

    const submit = async () => {
        try {
            if (texto === "") {
                setAlert("Descreva uma tarefa")
                AlertToast([
                    'error',
                    'Opa!!!',
                    'Campo vazio! Nenhuma tarefa foi adicionada 🚨'
                ]
                );
            } else {
                const resultado = texto;
                salvarTarefa(resultado)
                setAlert("")
                setTexto("")
                AlertToast([
                    'success',
                    'Show!!',
                    'Tarefa adicionada com sucesso 🚀'
                ]);
            }

        } catch (error) {
            setAlert("Erro ao adicionar sua tarefa")
        }
    };

    const getStorage = async (): Promise<void> => {
        const taskCrud = new TaskCrud('', '');
        const todasTarefasSalvas: Array<Tarefa> = await taskCrud.getTasks()

        setTodasAsTarefas(todasTarefasSalvas);
    }

    const salvarTarefa = async (descricaoTarefa: string): Promise<void> => {
        const id: string = getDataTime();
        const taskCrud = new TaskCrud(id, descricaoTarefa);
        // const todasTarefasSalvas: Array<Tarefa> = todasAsTarefas;

        taskCrud.saveTask(todasAsTarefas);
    }

    const toogleEstadoTarefa = async (id: string): Promise<void> => {
        // const id: string = getDataTime();
        const taskCrud = new TaskCrud('', '');
        const todasTarefasSalvas: Array<Tarefa> = todasAsTarefas.filter(tarefa => tarefa.id !== id);
        const tarefaConcluida = todasAsTarefas.find(tarefa => tarefa.id === id);

        if (tarefaConcluida) {
            const NovoEstadoTarefa = !tarefaConcluida.did;
            tarefaConcluida.did = NovoEstadoTarefa;
            NovoEstadoTarefa == false ? todasTarefasSalvas.unshift(tarefaConcluida) : todasTarefasSalvas.push(tarefaConcluida);
            taskCrud.saveTask(todasTarefasSalvas);


            setTimeout(() => {
                setTodasAsTarefas(todasTarefasSalvas);
            }, 300);
        }
    }

    const deletarTarefa = (id: string) => {
        Alert.alert('Cuidado!!!', 'Deseja realmente excluir essa tarefa?', [
            {
                text: 'Cancel',
                onPress: () => false,
                style: 'cancel',
            },
            {
                text: 'OK', onPress: async () => {
                    const taskCrud = new TaskCrud(id, '');
                    const todasTarefasAtualizadas = await taskCrud.removeTask(todasAsTarefas)

                    setTodasAsTarefas(todasTarefasAtualizadas);
                }
            },
        ]);
    }

    const updateTarefa = (id: string, desc: string) => {
        const taskCrud = new TaskCrud('', '');

        todasAsTarefas.forEach(tarefa => {
            if (tarefa.id === id) {
                tarefa.desc = desc
            }
        })

        taskCrud.saveTask(todasAsTarefas);
        setTodasAsTarefas(todasAsTarefas);
        setModalVisible(false);

        AlertToast([
            'success',
            !desc ? 'A tarefa foi removida com sucesso' : 'Tarefa atualizada com sucesso'
        ]);
    }

    const openModal = (id: string): void => {
        setDadosEditTarefa(todasAsTarefas.find(tarefa => tarefa.id === id));
        setModalVisible(!modalVisible);
    }

    return (
        <View style={{ backgroundColor: '#1F2223', height: '100%' }}>
            <ScrollView scrollEnabled keyboardShouldPersistTaps="handled" >
                <View style={s.container}>
                    <View style={s.header}>
                        <Image
                            source={require('../assets/icon.png')}
                            style={s.logo}
                        />
                        <View style={s.containerBuscar}>
                            <TextInput
                                style={s.input}
                                onChangeText={(novoTexto) => setTexto(novoTexto)}
                                defaultValue={texto}
                                placeholder="Descreva sua tarefa..."
                                placeholderTextColor="#333738"
                                returnKeyType="send"
                                enablesReturnKeyAutomatically={true}
                            />
                            <TouchableOpacity onPress={submit}>
                                <FontAwesomeIcon
                                    icon={faCirclePlus}
                                    size={40}
                                    color="green"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {alert && <Text style={s.textErro}> {alert} </Text>}

                    <View style={{ marginTop: 10 }}>
                        {todasAsTarefas.map((item: Tarefa) => {
                            return item.desc && item.desc && (
                                <TaskComponent
                                    key={item.id}
                                    id={item.id}
                                    desc={item.desc}
                                    did={item.did}
                                    openModal={openModal}
                                    onDelete={deletarTarefa}
                                    onDidIt={toogleEstadoTarefa}
                                />
                            )
                        })}
                    </View>

                    {modalVisible && dadosEditTarefa?.id && <EditTaskModal
                        visible={modalVisible}
                        idTarefa={dadosEditTarefa.id}
                        descTarefa={dadosEditTarefa.desc}
                        updateTarefa={(id, desc) => updateTarefa(id, desc)}
                        closeModal={() => setModalVisible(false)}
                    />}
                </View>
            </ScrollView>

            <Toast />
            {modalVisible && dadosEditTarefa?.id && <View style={s.backdrop} />}
        </View>
    )
}

const s = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#141718',
        borderEndEndRadius: 20,
        borderStartEndRadius: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 150,
        marginBottom: 20
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: '#FFF'
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#595f61',
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginRight: 10,
        marginLeft: 6,
        color: 'white'
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
        fontSize: 15,
        marginTop: 10
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Cor preta com 50% de opacidade
    }
})

