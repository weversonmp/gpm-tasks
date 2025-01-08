import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

// Types
import { Tarefa } from "../types/all_types_export";

const teste = () => {
    console.log('object');
}


export default function TarefaComponent(tarefa: Tarefa, onDelete: () => void) {
    function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
        const styleAnimation = useAnimatedStyle(() => {
            return {
                transform: [{ translateX: drag.value + 50 }]
            };
        });

        return (
            <Reanimated.View style={styleAnimation}>
                <Text onPress={onDelete} style={styles.rightAction} >X</Text>
            </Reanimated.View>
        );
    }

    return (
        <GestureHandlerRootView style={styles.container_tarefa} id={tarefa.id} >
            <ReanimatedSwipeable
                containerStyle={styles.swipeable}
                friction={2}
                enableTrackpadTwoFingerGesture
                rightThreshold={40}
                renderRightActions={RightAction}>
                <Text>{tarefa.desc}</Text>
            </ReanimatedSwipeable>
        </GestureHandlerRootView>
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
        paddingTop: 7
    },
    separator: {
        width: '100%',
        borderTopWidth: 1,
    },
    swipeable: {
        width: '100%',
        height: 50,
        backgroundColor: 'darkgray',
        alignItems: 'center',
        borderRadius: 10
    },
    container_tarefa: {
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        alignContent: 'flex-start',
        marginBottom: 2
    },
});