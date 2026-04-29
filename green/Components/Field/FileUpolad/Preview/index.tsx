import React, { useRef } from 'react';
import { Image, Pressable, View } from 'react-native';

import Text from '../../../text';
import VectorIcons from '../../../../Utilities/vectoricons';
import { shortenFileName } from '../Picker/Helper';
import Card from '../../../Card';
import useCustomHooks from '../../../../Actions/Hooks/customhook';
import Sheet from '../../../bottomsheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Colors } from '../../../../Utilities/uiasset';
import { windowwidth } from '../../../../Utilities/dimensions';

type PreviewProps = {
    onChange?: any;
    mediaData?: any;
    theme?: any;
    background?: any
};

const Preview: React.FC<PreviewProps> = ({ onChange, mediaData, theme, background }) => {
    //   const files = fileFormat(fileName || '');
    console.log("mediaData", mediaData?.fileName)
    const openPrivew = useRef<BottomSheetModal>(null);
    return (
        <>

            {
                mediaData && (
                    <Card containerStyle={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: "4%", paddingHorizontal: "4%", marginBottom: "3%" }} backgroundColor={background}>
                        <View style={{ flexDirection: "row", alignItems: "center", width: "60%" }}>
                            <VectorIcons
                                family='FontAwesome'
                                name="photo"
                                size={windowwidth*0.065}
                            />
                            <Text>   {shortenFileName(mediaData?.fileName)}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Pressable style={{ marginRight: "5%" }} onPress={() => openPrivew?.current?.present()}>
                                <VectorIcons
                                    family='Feather'
                                    name="eye"
                                    size={windowwidth*0.045}
                                />
                            </Pressable>
                            <Pressable onPress={() => onChange(false)}>
                                <VectorIcons
                                    family='Feather'
                                    name="trash-2"
                                    size={windowwidth*0.045}
                                />
                            </Pressable>
                        </View>
                    </Card>
                )
            }
            {/* 
            {file !== 'image' && (
                <VectorIcons/>            )} 
            
            */}

            {/* {
                mediaData && (
                    <Image
                        height={160}
                        width={160}
                        source={{ uri: mediaData?.uri }}
                    />
                )
            } */}
            {/* <Text>{mediaData?.fileName}</Text>

            <Pressable onPress={() => onChange(false)}>
                <Text>X</Text>
            </Pressable> */}

            <Sheet
                sheetref={openPrivew}
                custominterface={true}
                snappoint={["100%"]}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                    <View style={{ height: '80%', flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>
                        <Image
                            source={{ uri: mediaData?.uri }}
                            style={{ width: "100%", height: "80%", resizeMode: "contain" }}
                        />
                    </View>


                    {/* Close button */}
                    <Pressable
                        onPress={() => openPrivew.current?.dismiss()}
                        style={{ position: "absolute", top: 55, right: 20 }}
                    >
                        <VectorIcons family='Feather' name="x" size={30} iconcolor={theme.darktext} />
                    </Pressable>
                </View>
            </Sheet>
        </>
    );
};

export default Preview;
