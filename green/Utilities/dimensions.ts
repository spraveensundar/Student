import { Dimensions, PixelRatio, Platform } from 'react-native';

export const windowwidth = Dimensions.get('window').width;
export const windowheight = Dimensions.get('window').height;

export const borderwidth = PixelRatio.getPixelSizeForLayoutSize(1);
export const borderradius = Math.min(windowwidth, windowheight) * 0.5 * 0.1;

const scale = windowwidth / 320;

export function RFvalue(size: number) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}
