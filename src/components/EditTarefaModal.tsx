import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type Props = {
    visible: boolean
    idTarefa: string
    descTarefa: string
    closeModal: () => void
    updateTarefa: (id: string, desc: string) => void
}

export default function EditTarefaModal(props: Props) {
    const [modalVisible, setModalVisible] = useState(props.visible);
    const [texto, setTexto] = useState(props.descTarefa);

    return (
        <GestureHandlerRootView>
            <SafeAreaProvider>
                <SafeAreaView style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!props.visible);
                        }}>

                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ width: '100%', height: 300, marginBottom: 10 }}>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(novoTexto) => setTexto(novoTexto)}
                                        defaultValue={texto}
                                        placeholder="Descreva sua tarefa..."
                                        placeholderTextColor="#333738"
                                        returnKeyType="send"
                                        enablesReturnKeyAutomatically={true}
                                        multiline={true}
                                        numberOfLines={15}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                                    <Pressable
                                        style={[styles.button, styles.buttonSave]}
                                        onPress={() => {
                                            setModalVisible(!props.visible)
                                            props.updateTarefa(props.idTarefa, texto)
                                        }
                                        }>
                                        <Text style={styles.textStyle}>Salvar</Text>
                                    </Pressable>

                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => {
                                            setModalVisible(!props.visible)
                                            props.closeModal()
                                        }
                                        }>
                                        <Text style={styles.textStyle}>Fechar</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: 300,
        margin: 20,
        backgroundColor: '#1F2223',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        flex: 1,
        height: 10,
        borderColor: '#595f61',
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginRight: 10,
        marginLeft: 6,
        color: 'white'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonSave: {
        backgroundColor: 'green',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});