import { Image, StyleSheet, View } from 'react-native'
export default function Board({ data, combinations, diceValues }) {
    const newDiceValues = [...diceValues];
    return (
        <View style={styles.imageContainer}>
            {[...Array(4)].map((x, row) =>
                <View key={'row_' + row} style={styles.row}>
                    {[...Array(4)].map((y, column) => {
                        const combination = combinations[row * 4 + column];
                        let diceValue = '';
                        if (combination !== 'empty' && combination !== 'x') {
                            diceValue = data[newDiceValues.pop()];
                        }
                        return (
                            <View key={`${row * 4 + column}`}>
                                <Image
                                    key={`${row * 4 + column}_dice`}
                                    style={styles.diceImage}
                                    source={diceValue}
                                />
                                <Image
                                    key={`${row * 4 + column}_${combination}`}
                                    style={styles.image}
                                    source={data[combination]}
                                />
                            </View>
                        )
                    })}
                </View>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    imageContainer: {
        paddingVertical: 40,
        paddingHorizontal: 10,
        borderRadius: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#239EC0',
        marginBottom: 20
    },
    row: {
        backgroundColor: '#239EC0',
    },
    image: {
        height: 80,
        width: 80,
        margin: 2,
    },
    diceImage: {
        position: 'absolute',
        right: 1,
        top: 1,
        height: 20,
        width: 20,
        zIndex: 1,
    }
})