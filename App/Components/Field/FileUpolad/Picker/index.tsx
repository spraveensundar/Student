
import React, { ReactNode } from 'react';
import { launchCamera, launchImageLibrary, CameraOptions, ImagePickerResponse } from 'react-native-image-picker';
import { mediaConfiguration, imagePick } from './Helper';

type PickerProps = {
    crop?: boolean;
    content?: (args: { pickableSource: (source: 'camera' | 'gallery' | 'document' | string) => void; uploadFile: (file: any) => void }) => ReactNode;
    uploadFile?: (file: any) => void;
    maxSize?: number;
    refRBSheet?: any;
    multiple?: any
};

const Picker: React.FC<PickerProps> = (props) => {
    const { content, uploadFile = () => { }, maxSize, refRBSheet = false, multiple } = props;

    const imagePickerResponse = (response: ImagePickerResponse) => {
        console.log('camera/gallery response:', response);

        if (response.didCancel) {
            refRBSheet?.current?.close();
            return;
        }

        if (response.assets && response.assets.length > 0) {
            const files = multiple ? response.assets : [response.assets[0]];
            imagePick({ response: { assets: files }, refRBSheet, uploadFile });
            uploadFile(files);
        }

        refRBSheet?.current?.close();
    };

    const pickableSource = (source: 'camera' | 'gallery' | 'document' | string) => {
        if (source === 'document') {
        } else if (source === 'camera') {
            launchCamera(mediaConfiguration.uploadSettings as CameraOptions, imagePickerResponse);
        } else if (source === 'gallery') {

            const options: any = {
                ...mediaConfiguration.uploadSettings,
                selectionLimit: multiple ? 0 : 1,
            };

            launchImageLibrary(options, imagePickerResponse);
        }
    };

    return <>{content && content({ pickableSource, uploadFile })}</>;
};

export default Picker;
