import React, { useContext, useRef } from 'react';
import { Pressable, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';


import { Button } from '..';
import Card from '../../Card';
import Text from '../../text';
import Picker from './Picker';
import Preview from './Preview';
import Sheet from '../../bottomsheet';
import SourceData from './SourceData';
import ThemeContext from '../../../Utilities/themecontext';
import { RFvalue } from '../../../Utilities/dimensions';
import VectorIcons from '../../../Utilities/vectoricons';
import { Colors } from '../../../Utilities/uiasset';

type FileUploadProps = {
    crop?: boolean;
    label?: string;
    maxSize?: any;
    onChange: (file: any) => void;
    source?: 'camera' | 'gallery' | 'sheet';
    mediaData?: { uri: string, fileName?: string; } | false;
    component?: React.ReactNode;
    background?: any,
    preview?: false

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
    preview = true
}) => {
    const bottomsheetref = useRef<BottomSheetModal>(null);
    const theme = useContext(ThemeContext)
    return (
        <>
            {
                label && (
                    <View style={{ marginBottom: "3%" }}>
                        <Text style={{ color: theme.secondarytext }}>{label}</Text>
                    </View>
                )
            }
            <Picker
                uploadFile={(res) => onChange(res)}
                refRBSheet={bottomsheetref}
                maxSize={maxSize}
                content={({ pickableSource }) => {

                    console.log("pickableSource", pickableSource)
                    return (
                        <>
                            {
                                mediaData && preview ? (
                                    <Preview onChange={onChange} mediaData={mediaData} theme={theme} background={background} />
                                ) : (
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
                                            <Card containerStyle={{ justifyContent: "center", alignItems: "center", paddingVertical: "20%", marginBottom: "5%" }}>
                                                <View style={{ alignItems: "center" }}>
                                                    <VectorIcons
                                                        family="Feather"
                                                        name={"upload"}
                                                        size={20}
                                                    />
                                                    <Text size="semimedium" style={{ marginTop: '2%' }}>Upload</Text>
                                                </View>
                                            </Card>
                                        )}
                                    </Pressable>
                                )
                            }

                            {/* {
                                component ?
                                    <>
                                        {
                                            mediaData ? (
                                                <Preview onChange={onChange} mediaData={mediaData} theme={theme} background={background} />
                                            ) :
                                                <Pressable onPress={() => { source === 'sheet' ? bottomsheetref?.current?.present() : pickableSource(source) }}>
                                                    {component}
                                                </Pressable>
                                        }
                                    </>
                                    :
                                    <Pressable onPress={() => { source === 'sheet' ? bottomsheetref?.current?.present() : pickableSource(source) }}>
                                        <Card containerStyle={{ justifyContent: "center", alignItems: "center", paddingVertical: "20%", marginBottom: "5%" }}>
                                            <View style={{ alignItems: "center" }}>
                                                <VectorIcons
                                                    family="Feather"
                                                    name={"upload"}
                                                    size={20}
                                                />
                                                <Text size="semimedium" style={{ marginTop: '2%' }}>Upload</Text>
                                            </View>
                                        </Card>
                                    </Pressable>
                            } */}
                            <Sheet sheetref={bottomsheetref}
                                custominterface={true}
                                snappoint={["20%"]}
                            >
                                <View style={{ flex: 1, padding: "5%", justifyContent: "center" }}>
                                    <Text family="semiBold" style={{ color: theme.darktext, marginBottom: '5%', fontSize: RFvalue(14) }}>Select Media</Text>
                                    <SourceData pickableSource={pickableSource} theme={theme} />
                                </View>
                            </Sheet>
                        </>
                    )
                }}
            />

            {
                maxSize ? (
                    <Text>{`(The maximum size per file is ${maxSize} mb)`}</Text>
                ) : null
            }
        </>
    );
};

export default FileUpload;