import { StyleSheet, View } from 'react-native'
import { SecondaryButton, SecondaryIconButton } from './Button'

export default function ButtonContainer({ rotateLeft, randomizeHandler, rotateRight }) {
    return (
        <View style={styles.buttonContainer}>
            <SecondaryIconButton style={styles.buttonImage} onPress={rotateLeft}
                source={require('./assets/combinations/rotate-left.png')} />
            <SecondaryButton style={styles.button} onPress={randomizeHandler}>
                Randomize
            </SecondaryButton>
            <SecondaryIconButton style={styles.buttonImage} onPress={rotateRight}
                source={require('./assets/combinations/rotate-right.png')} />
        </View>
    )
}
const styles = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        alignSelf: 'center',
        width: 150,
        marginHorizontal: 20,
    },
    buttonImage: {
        marginTop: 2,
    }
})