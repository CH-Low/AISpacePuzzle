import { Image, StyleSheet, View } from 'react-native'

export default function Board({ data, finalCombinations, diceValues }) {
    const newDiceValues = [...diceValues];
    const colors = {
        black: '#231F1E',
        blue: '#387DA7',
        green: '#8ABF3B',
        red: '#C21D21',
        white:'#D4D3D0',
        yellow: '#C19300'
    };
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
                            pattern = (<Image
                                key={`${row * 4 + column}_${combination}`}
                                style={[styles.image, { backgroundColor: colors[color]}]}
                                source={data[shape]}
                            />);
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
    },
})