import React, { useContext, useRef, useState } from 'react';
import { Alert, Pressable, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import Card from '../../Card';
import Text from '../../text';
import Picker from './Picker';
import Preview from './Preview';
import SourceData from './SourceData';
import { Colors } from '../../../Utilities/uiasset';
import ThemeContext from '../../../Utilities/themecontext';
import { RFvalue } from '../../../Utilities/dimensions';
import VectorIcons from '../../../Utilities/vectorIcons';
import Sheet from '../../bottomsheet';

type FileUploadProps = {
    crop?: boolean;
    label?: string;
    maxSize?: any;
    onChange: (file: any) => void;
    source?: 'camera' | 'gallery' | 'sheet';
    mediaData?: { uri: string; fileName?: string }[];
    component?: React.ReactNode;
    background?: any;
    preview?: false;
    multiple?: any;
    maxFiles?: number;
};

const FileUpload: React.FC<FileUploadProps> = ({
    source = 'gallery',
    onChange,
    mediaData = false,
    maxSize,
    component,
    crop = false,
    background,
    label,
    preview = true,
    multiple,
    maxFiles = 10,
}) => {
    const bottomsheetref = useRef<BottomSheetModal>(null);
    const theme = useContext(ThemeContext);
    const [files, setFiles] = useState<any>(mediaData);

    const handleUpload = (newFiles: any) => {
        const safeNewFiles = Array.isArray(newFiles) ? newFiles : [newFiles];
        const safeExistingFiles = Array.isArray(files) ? files : [];

        const updatedFiles = multiple
            ? [...safeExistingFiles, ...safeNewFiles].slice(0, maxFiles)
            : [safeNewFiles[0]];
        if (updatedFiles.length > maxFiles) {
            Alert.alert(`⚠️ Only ${maxFiles} images allowed`);
        }
        setFiles(updatedFiles);
        onChange(updatedFiles);
    };

    const removeFile = (uri: string) => {
        const updated: any = files.filter((f: any) => f.uri !== uri);
        setFiles(updated);
        onChange(updated);
    };

    return (
        <>
            {label && (
                <View style={{ marginBottom: '3%' }}>
                    <Text size="medium" family="GRegular">
                        {label}
                    </Text>
                </View>
            )}
            <Picker
                multiple={multiple}
                uploadFile={handleUpload}
                refRBSheet={bottomsheetref}
                maxSize={maxSize}
                content={({ pickableSource }) => {
                    console.log('pickableSource', pickableSource);
                    return (
                        <>
                            <Pressable
                                onPress={() => {
                                    source === 'sheet'
                                        ? bottomsheetref?.current?.present()
                                        : pickableSource(source);
                                }}
                            >
                                {component ? (
                                    component
                                ) : (
                                    <Card
                                        containerStyle={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            paddingVertical: '20%',
                                            marginBottom: '5%',
                                            borderColor: Colors.lightGreyy,
                                        }}
                                    >
                                        <View style={{ alignItems: 'center' }}>
                                            <VectorIcons family="Feather" name={'upload'} size={20} />
                                            <Text
                                                size="semimedium"
                                                family="GRegular"
                                                style={{ marginTop: '2%' }}
                                            >
                                                Maximum 10 Images Should be 2 MB
                                            </Text>
                                        </View>
                                    </Card>
                                )}
                            </Pressable>
                            <Preview
                                onChange={onChange}
                                mediaData={mediaData}
                                theme={theme}
                                background={background}
                                removeFile={removeFile}
                            />

                            <Sheet
                                sheetref={bottomsheetref}
                                custominterface={true}
                                snappoint={['20%']}
                            >
                                <View
                                    style={{ flex: 1, padding: '5%', justifyContent: 'center' }}
                                >
                                    <Text
                                        family="GBold"
                                        style={{
                                            color: theme.darktext,
                                            marginBottom: '5%',
                                            fontSize: RFvalue(14),
                                        }}
                                    >
                                        Select Media
                                    </Text>
                                    <SourceData pickableSource={pickableSource} theme={theme} />
                                </View>
                            </Sheet>
                        </>
                    );
                }}
            />

            {maxSize ? (
                <Text>{`(The maximum size per file is ${maxSize} mb)`}</Text>
            ) : null}
        </>
    );
};

export default FileUpload;
