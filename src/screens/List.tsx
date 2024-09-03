import { View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import { MovableCard } from "../components/MovableCard";
import { Header } from "../components/Header";
import { CARD_HEIGHT } from "../components/Card";
import { CARDS } from "../data/cards";

export function List() {
    const scrollY = useSharedValue(0)
    const cardsPosition = useSharedValue(listToObject(CARDS))

    const handleScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });
    function listToObject(list: typeof CARDS) {
        const listOfCards = Object.values(list)
        const object : any = {}
        listOfCards.forEach((card, index) => {
            object[card.id] = index
        })
        return object
    }

    return (
        <View style={{ width: '100%', flex: 1 }}>
            <Header />
            <Animated.ScrollView
                style={{ flex: 1, padding: 32, backgroundColor: '#222', position: 'relative' }} showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                contentContainerStyle={{ height: CARDS.length * CARD_HEIGHT }}
                scrollEventThrottle={16}
            >
                {
                    CARDS.map(item => (
                        <MovableCard
                            key={item.id}
                            data={item}
                            scrollY={scrollY}
                            cardsPosition={cardsPosition}
                            cardsCount={CARDS.length}
                        />
                    ))
                }
            </Animated.ScrollView>
        </View>
    )
}