import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrashCan, faCircleCheck } from '@fortawesome/free-regular-svg-icons'

// Types
import { Tarefa } from "../types/allTypesExport";


export default function TaskComponent(tarefa: Tarefa) {
    let myRef = useRef(null);

    function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
        const styleAnimation = useAnimatedStyle(() => {
            return {
                transform: [{ translateX: drag.value + 50 }]
            };
        });

        return (
            <TouchableOpacity>
                <Reanimated.View style={styleAnimation}>
                    <Text style={styles.rightAction} >
                        <FontAwesomeIcon icon={faTrashCan} size={28} color='white' />
                    </Text>
                </Reanimated.View>
            </TouchableOpacity>
        );
    }

    function LeftAction(prog: SharedValue<number>, drag: SharedValue<number>) {
        const styleAnimation = useAnimatedStyle(() => {
            return {
                transform: [{ translateX: drag.value - 50 }]
            };
        });

        return (
            <TouchableOpacity>
                <Reanimated.View style={styleAnimation}>
                    <Text style={styles.leftAction} >
                        <FontAwesomeIcon icon={faCircleCheck} size={28} color='white' />
                    </Text>
                </Reanimated.View>
            </TouchableOpacity>
        );
    }

    const closeSwipe = (index: any) => index.current?.close();

    const getLimitedText = (value: string) => {
        const maxLength = 85; // Quantidade máxima de caracteres visíveis
        return value.length > maxLength ? value.substring(0, maxLength) + '...' : value;
      };

    return (
        <View>
            <GestureHandlerRootView style={styles.container_tarefa} id={tarefa.id} >
                <ReanimatedSwipeable
                    ref={myRef}
                    containerStyle={tarefa.did ? styles.didSwipeable : styles.swipeable}
                    friction={2}
                    enableTrackpadTwoFingerGesture
                    rightThreshold={70}
                    leftThreshold={70}
                    renderRightActions={RightAction}
                    renderLeftActions={LeftAction}
                    overshootFriction={100}
                    onSwipeableOpen={() => {
                        closeSwipe(myRef);
                    }}
                    onSwipeableWillOpen={(where) => {
                        setTimeout(() => {
                            where === 'right' && tarefa.onDelete?.(tarefa.id)
                            where === 'left' && tarefa.onDidIt?.(tarefa.id)
                        }, 300);
                    }}
                >

                    <TouchableOpacity onLongPress={() => tarefa.openModal?.(tarefa.id)}>
                        <Text style={(Boolean(tarefa.did) ? styles.didTextoTarefa : styles.textoTarefa)} >
                            {getLimitedText(tarefa.desc)}
                        </Text>
                    </TouchableOpacity>

                </ReanimatedSwipeable>
            </GestureHandlerRootView>
        </View>
    );
}

const styles = StyleSheet.create({
    rightAction: {
        width: 49,
        height: 50,
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        fontWeight: '900',
        fontSize: 30,
        paddingTop: 10
    },
    leftAction: {
        width: 49,
        height: 50,
        backgroundColor: 'blue',
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        fontWeight: '900',
        fontSize: 30,
        paddingTop: 10
    },
    separator: {
        width: '100%',
        borderTopWidth: 1,
    },
    swipeable: {
        width: '100%',
        height: 50,
        backgroundColor: '#333738',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#595f61',
        borderRadius: 10,
        padding: 5,
    },
    didSwipeable: {
        width: '100%',
        height: 50,
        backgroundColor: '#26292a',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#26292a',
        borderRadius: 10,
        padding: 5,
    },
    textoTarefa: {
        color: 'white',
    },
    didTextoTarefa: {
        color: 'darkgray',
        textDecorationLine: 'line-through',
    },
    container_tarefa: {
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        alignContent: 'flex-start',
        marginBottom: 2
    },
});