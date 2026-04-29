import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import {
  StackCardInterpolationProps,
  StackCardStyleInterpolator,
  TransitionSpecs,
} from "@react-navigation/stack";

export const MyTransition = {
  gestureDirection: "horizontal" as const,
  headerShown: false,
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, layouts }: StackCardInterpolationProps) => {
    return {
      cardStyle: {
        opacity: current.progress,
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
export function getFadeanimation(): NativeStackNavigationOptions {
  // const { theme } = useCustomHooks();

  return {
    gestureEnabled: false,
    //animation: 'fade',
    headerShown: false,
    // contentStyle: {
    //   backgroundColor: theme.backgroundcolor,
    // },
  };
}



export const BottomSheetTransition = {
  gestureDirection: "vertical" as const,
  headerShown: false,
  presentation: "transparentModal" as const, // important for overlay effect
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, layouts }: StackCardInterpolationProps) => {
    const translateY = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [layouts.screen.height, layouts.screen.height * 0.3], 
    });

    return {
      cardStyle: {
        transform: [{ translateY }],
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5], // dim background
        }),
      },
    };
  },
};