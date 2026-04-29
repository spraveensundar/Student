import React from 'react';
import Video from 'react-native-video';

import ClnService1 from '../Assets/videos/clnService1.mp4';
import ClnService2 from '../Assets/videos/clnService2.mp4';
import { borderradius, windowwidth } from './dimensions';
import { StyleProp, ViewStyle } from 'react-native';

export const video = {
    ClnService1: ClnService1,
    ClnService2: ClnService2,
}

type Source = {
    uri?: string;
    headers?: {
        [key: string]: string;
    };
};

interface VideoProp {
    width?: number | string;
    height?: number | string;
    borderRadius?: number;
    source?: Source;
    type: 'video';
}

export default function Videos({
    width = '100%',
    height = '100%',
    borderRadius = borderradius,
    source,
    type = 'video',
}: VideoProp) {
    if (type === 'video' && source) {
        return (
            <Video
                source={source}
                style={{
                    width,
                    height,
                    borderRadius,
                } as StyleProp<ViewStyle>}
                resizeMode="cover"
                repeat
                paused={false}
            />
        );
    }
    return null;
}




