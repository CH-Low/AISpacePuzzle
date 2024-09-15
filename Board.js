import { Image, StyleSheet, View } from 'react-native'

export default function Board({ data, finalCombinations, diceValues }) {
    const newDiceValues = [...diceValues];
    return (
        <View style={styles.imageContainer}>
            {[...Array(4)].map((x, column) =>
                <View key={'row_' + column} style={styles.row}>
                    {[...Array(4)].map((y, row) => {
                        const combination = finalCombinations[row * 4 + column];
                        let diceValue = '';
                        let pattern = (<Image
                            key={`${row * 4 + column}_${combination}`}
                            style={styles.image}
                            source={data[combination]}
                        />);
                        if (combination !== 'empty' && combination !== 'x') {
                            diceValue = data[newDiceValues.pop()];
                            const [color, shape] = combination.split('_');
                            pattern = (
                                <>
                                    <Image
                                        style={[styles.image]}
                                        source={data[color]}
                                    />
                                    <Image
                                        key={`${row * 4 + column}_${combination}`}
                                        style={[styles.image, { position: 'absolute' }]}
                                        source={data[shape]}
                                    />
                                </>);
                        }
                        return (
                            <View key={`${row * 4 + column}`}>
                                <Image
                                    key={`${row * 4 + column}_dice`}
                                    style={styles.diceImage}
                                    source={diceValue}
                                />
                                {pattern}
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
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
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
    },
})