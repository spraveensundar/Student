
import React, { ReactNode } from 'react';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import { mediaConfiguration, imagePick } from './Helper';

type PickerProps = {
    crop?: boolean;
    content?: (args: { pickableSource: (source: 'camera' | 'gallery' | 'document' | string) => void; uploadFile: (file: any) => void }) => ReactNode;
    uploadFile?: (file: any) => void;
    maxSize?: number;
    refRBSheet?: any;
};

const Picker: React.FC<PickerProps> = (props) => {
    const { content, uploadFile = () => { }, maxSize, refRBSheet = false } = props;

    const imagePickerResponse = (response: ImagePickerResponse) => {
        console.log("camera permission status:", response);
        imagePick({ response, refRBSheet, uploadFile });
        refRBSheet?.current?.close()
    };

    const pickableSource = (source: 'camera' | 'gallery' | 'document' | string) => {
        if (source === 'document') {
            // documentPick(refRBSheet, maxSize, uploadFile);
        } else if (source === 'camera') {
            launchCamera(mediaConfiguration.uploadSettings as CameraOptions, imagePickerResponse);
        } else if (source === 'gallery') {
            launchImageLibrary(mediaConfiguration.uploadSettings as ImageLibraryOptions, imagePickerResponse);
        }
    };

    return <>{content && content({ pickableSource, uploadFile })}</>;
};

export default Picker;
