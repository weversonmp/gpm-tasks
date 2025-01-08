import Toast from 'react-native-toast-message';

export default function AlertaToast(icone: string, text1: string, text2: string) {
    Toast.show({
        type: icone,
        text1: text1,
        text2: text2,
    })
}