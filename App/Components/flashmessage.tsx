import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MessageComponentProps } from 'react-native-flash-message';
import { borderradius, windowheight, windowwidth } from '../Utilities/dimensions';
import { Fontfamily, Fontsize } from '../Utilities/uiasset';

const toastColors = {
    success: {
        borderLeftColor: '#4CAF50',
        backgroundColor: '#E6F4EA',
        titleColor: '#256029',
    },
    warning: {
        borderLeftColor: '#FF9800',
        backgroundColor: '#FFF4E5',
        titleColor: '#8C6D1F',
    },
    danger: {
        borderLeftColor: '#F44336',
        backgroundColor: '#FDECEA',
        titleColor: '#B71C1C',
    },
};

const FlashToastMessage: React.FC<MessageComponentProps> = ({ message }) => {
    const { type = 'danger', message: title, description } = message;
    const colors = toastColors[type as keyof typeof toastColors] || toastColors.danger;

    return (
        <View style={[styles.toast, {
            borderLeftColor: colors.borderLeftColor,
            backgroundColor: colors.backgroundColor
        }]}>
            <Text style={[styles.title, { color: colors.titleColor }]}>{title}</Text>
            {description ? <Text style={styles.description}>{description}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    toast: {
        width: "90%",
        padding: "5%",
        elevation: 1,
        borderRadius: borderradius * 0.5,
        alignSelf: "center",
        borderLeftWidth: 5,
        top:windowheight*0.05,
    },
    title: {
        fontFamily: Fontfamily.bold,
        fontSize: Fontsize.semimedium,
    },
    description: {
        fontFamily: Fontfamily.regular,
        fontSize: Fontsize.small,
        color: "#333333",
        marginTop:5
    }
});

export default FlashToastMessage;
