import { useState } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
    SharedValue,
    runOnJS,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    useAnimatedReaction,
} from "react-native-reanimated";

import { CARD_HEIGHT, Card, CardProps } from "./Card";

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
    }
})

type Props = {
    data: CardProps;
    cardsPosition: SharedValue<number[]>;
    scrollY: SharedValue<number>;
    cardsCount: number;
}

export function MovableCard({ data, scrollY, cardsPosition, cardsCount }: Props) {
    const [moving, setMoving] = useState(false)
    const top = useSharedValue(cardsPosition.value[data.id] * CARD_HEIGHT)

    function objectMove(positions: number[], from: number, to: number) {
        'worklet';
        const newPositions = Object.assign({}, positions);
        for (const id in positions) {
            if (positions[id] == from) {
                newPositions[id] = to;
            }
            if (positions[id] == to) {
                newPositions[id] = from;
            }
        }
        return newPositions
    }

    useAnimatedReaction(
        () => cardsPosition.value[data.id],
        (currentPosition, previousPosition) =>{
            if (!moving) {
                top.value = withSpring(currentPosition * CARD_HEIGHT)
            }
        }, [moving]
    )

    const longPressGesture = Gesture
        .LongPress()
        .onStart(() => {
            runOnJS(setMoving)(true)
        })
        .minDuration(200)

    const panGesture = Gesture
        .Pan()
        .manualActivation(true)
        .onTouchesMove((event, state) => {
            moving ? state.activate() : state.fail()
        })
        .onUpdate((event) => {
            const positionY = event.absoluteY + scrollY.value
            top.value = positionY - CARD_HEIGHT

            const startPositionList = 0
            const endPositionList = cardsCount - 1
            const currentPosition = Math.floor(positionY / CARD_HEIGHT)

            'worklet';
            const newPosition = Math.max(startPositionList, Math.min(currentPosition, endPositionList))

            if (newPosition !== cardsPosition.value[data.id]) {
                cardsPosition.value = objectMove(cardsPosition.value, cardsPosition.value[data.id], newPosition)
            }
        })
        .onFinalize(() => {
            // const newPosition = cardsPosition.value[data.id] * CARD_HEIGHT
            // top.value = withSpring(newPosition)
            runOnJS(setMoving)(false)
        })
        .simultaneousWithExternalGesture(longPressGesture)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            top: top.value - CARD_HEIGHT,
            opacity: withSpring(moving ? 1 : 0.4),
            zIndex: moving ? 1 : 0,
        }
    }, [moving])

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <GestureDetector gesture={Gesture.Race(panGesture, longPressGesture)}>
                <Card data={data} />
            </GestureDetector>
        </Animated.View>
    )
}