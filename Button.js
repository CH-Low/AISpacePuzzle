import { Image, Pressable, StyleSheet, Text, View } from "react-native"

export default function Button({ children, onPress, style, buttonStyle, inactive }) {
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
                <View style={[styles.button, buttonStyle, inactive && styles.inactiveButton]}>
                    <Text style={[styles.buttonText, inactive && styles.inactiveButtonText]}>
                        {children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export function SecondaryButton({ children, onPress, style }) {
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
                <View style={styles.secondaryButton}>
                    <Text style={styles.buttonText}>
                        {children}</Text>
                </View>
            </Pressable>
        </View>
    )
}


export function SecondaryIconButton({ onPress, style, source }) {
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
                <View style={styles.secondaryButton}>
                    <Image
                        style={styles.buttonImage}
                        source={source}
                    />
                </View>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 16,
        padding: 8,
        backgroundColor: '#007bff',
    },
    buttonImage: {
        height: 30,
        width: 30,
    },
    inactiveButton: {
        backgroundColor: "white",
    },
    secondaryButton: {
        borderRadius: 16,
        padding: 8,
        backgroundColor: "#6c757d",
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
    },
    inactiveButtonText: {
        color: 'black'
    },
    flatText: {
        color: '#00cc66',
        fontWeight: "600",
    },
    pressed: {
        opacity: 0.75,
        borderRadius: 4
    }
})
