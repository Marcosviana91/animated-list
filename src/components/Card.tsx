import { Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export type CardProps = {
    id: number;
    title: string;
}

type Props = {
    data: CardProps
}

export const HEIGHT = 68
export const MARGIN_BOTTOM = 12
export const CARD_HEIGHT = HEIGHT + MARGIN_BOTTOM

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: HEIGHT,
        borderRadius: MARGIN_BOTTOM,
        backgroundColor: '#595959',
        padding: 16,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontWeight:'bold',
        fontSize:18,
        color:'#fff'
    }
})

export function Card({ data }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {data.title}
            </Text>
            <MaterialIcons name="drag-indicator" size={32} color='#eee' />
        </View>
    )
}