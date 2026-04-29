import React from 'react';
import { Image, Pressable, View } from 'react-native';

import VectorIcons from '../../../../Utilities/vectorIcons';

type PreviewProps = {
    onChange?: any;
    mediaData?: any;
    theme?: any;
    background?: any
    removeFile?: any
};

const Preview: React.FC<PreviewProps> = ({ mediaData, removeFile }) => {
    const files = Array.isArray(mediaData) ? mediaData : mediaData ? [mediaData] : [];

    console.log("files", files)
    return (
        <>
            {files.length > 0 && (
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 10,
                        marginTop: '3%',
                    }}
                >
                    {files.map((file, index) => (
                        <View
                            key={index}
                            style={{
                                position: 'relative',
                                width: '30%',
                                aspectRatio: 1,
                                borderRadius: 8,
                            }}
                        >
                            <Image
                                source={{ uri: file.uri }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'cover',
                                    borderRadius: 8,
                                }}
                            />
                            <Pressable
                                onPress={() => removeFile(file.uri)}
                                style={{
                                    position: 'absolute',
                                    top: -8,
                                    right: -8,
                                    backgroundColor: 'rgba(255, 0, 0, 0.6)',
                                    borderRadius: 20,
                                    padding: 4,

                                }}
                                hitSlop={10}
                            >
                                <VectorIcons family="Feather" name="x" size={14} iconcolor="#fff" />
                            </Pressable>
                        </View>
                    ))}
                </View>
            )}




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

        </>
    );
};

export default Preview;
