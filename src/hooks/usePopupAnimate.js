import {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { POPUP_HEIGHT } from '../utils';

const usePopupAnimate = ({ to }) => {

    const offset = useSharedValue(POPUP_HEIGHT);

    const show = () => {
        offset.value = to;
    };

    const animate = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: withTiming(offset.value, {
                    duration: 350,
                    easing: Easing.inOut(Easing.quad)
                })
            }]
        };
    });

    return {
        show,
        animate,
    };
};

export default usePopupAnimate;
