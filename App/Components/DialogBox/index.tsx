import React, { ReactNode } from 'react';
import { View, Modal, ScrollView, ViewStyle, StyleSheet, Pressable, Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { Colors } from '../../Utilities/uiasset';
import { windowheight, windowwidth } from '../../Utilities/dimensions';
import Text from '../text';
import VectorIcons from '../../Utilities/vectoricons';

type DialogBoxProps = {
    content?: ReactNode;
    style?: ViewStyle;
    type?: 'fade' | 'slide';
    title?: string;
    closeIcon?: boolean;
    onClose?: () => void;
};

const DialogBox: React.FC<DialogBoxProps> = ({
    content,
    style = {},
    type = 'fade',
    title,
    closeIcon = true,
    onClose = () => { },
}) => {

    const getBehavior = () => {
        if (Platform.OS === 'ios') {
            return 'padding';
        }
        return;
    }

    return (

        <Modal
            visible={true}
            transparent
            animationType={type}
            statusBarTranslucent
        >
            <KeyboardAvoidingView behavior={getBehavior()} style={{ flex: 1 }} keyboardVerticalOffset={0}>
                {type === 'fade' && (
                    <View style={styles.container}>
                        <View style={styles.whiteContainer}>
                            <View style={[styles.contentContainer, style]}>
                                <Text>
                                    {title}
                                </Text>

                                {
                                    closeIcon && (
                                        <View style={styles.closeIconContainer}>
                                            <Pressable onPress={onClose}>
                                                <VectorIcons
                                                    family="Ionicons"
                                                    name="add"
                                                    iconcolor={"red"}
                                                />
                                            </Pressable>
                                        </View>
                                    )
                                }
                            </View>

                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                bounces={false}
                            >
                                {content}
                            </ScrollView>
                        </View>
                    </View>
                )}

                {type === 'slide' && <>{content}</>}
            </KeyboardAvoidingView>
        </Modal>

    );
};

export default DialogBox;




const styles = StyleSheet.create({
    contentContainer: {
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.white
    },
    whiteContainer: {
        maxHeight: windowheight - 30,
        width: windowwidth - 30,
        backgroundColor: Colors.white
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    closeIconContainer: {
        position: "absolute",
        right: 0,
        padding: 10
    },
    closeContainer: {
        paddingRight: 10
    },
});

