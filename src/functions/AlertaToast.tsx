import Toast from 'react-native-toast-message';

type Props = Array<string>

export default function AlertaToast(props: Props) {
    Toast.show({
        type: props[0],
        text1: props[1],
        text2: props[2],
    })
}