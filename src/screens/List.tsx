import { ScrollView, View } from "react-native";

import { Header } from "../components/Header";
import { CARDS } from "../data/cards";
import { CARD_HEIGHT, Card } from "../components/Card";

export function List() {
    return (
        <View style={{ width: '100%', flex: 1 }}>
            <Header />
            <ScrollView
                style={{ flex: 1, padding: 32, backgroundColor: '#222', position: 'relative' }} showsVerticalScrollIndicator={false}
                contentContainerStyle={{ height: CARDS.length * CARD_HEIGHT }}
            >
                {
                    CARDS.map(item => (
                        <Card
                            key={item.id}
                            data={item}
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}