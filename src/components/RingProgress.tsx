import { View, Text } from 'react-native';
import SVG, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RingProgressProps = {
    radius?: number;
    strokeWidth?: number;
    progress: number;
};

const color = '#EE0F55';

const RingProgress = ({
    radius = 100,
    strokeWidth = 35,
    progress,
}: RingProgressProps) => {

    const innerRadius = radius - strokeWidth / 2;
    const circumference = 2 * Math.PI * innerRadius;

    const animatedProps = useAnimatedProps(() => ({
        strokeDasharray: [circumference * progress, circumference]
    }));

    return (
        <View style={{ width: radius * 2, height: radius * 2, alignSelf: 'center' }}>
            <SVG>
                {/* Background */}
                <Circle
                    cx={radius}
                    cy={radius}
                    r={innerRadius}
                    strokeWidth={strokeWidth}
                    stroke={color}
                    opacity={0.2} />
                {/* Foreground */}
                <AnimatedCircle
                    animatedProps={animatedProps}
                    r={innerRadius}
                    cx={radius}
                    cy={radius}
                    originX={radius}
                    originY={radius}
                    strokeWidth={strokeWidth}
                    stroke={color}
                    strokeLinecap='round'
                    rotation="-90"

                />
            </SVG>
        </View>
    );
};

export default RingProgress;