import React, { useContext } from 'react';
import { Text as RNText, StyleProp, TextProps, TextStyle } from 'react-native';
import { Fontfamily, Fontsize } from '../Utilities/uiasset';
import ThemeContext from '../Utilities/themecontext';

type AlignSelfOptions = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
type size = "semismall" | "small" | "semimedium" | "medium" | "semilarge" | "large" | "extralarge" | "xxlarge" | "xxxlarge" | "tiny" | "xsmall" | "xxmedium" | "xmedium" | "xxxxlarge" | "tinylarge"
type family = "bold" | "light" | "medium" | "GLight" | "GMedium" | "GBold" | "GBlack" | "GRegular"

interface Props {
    children?: React.ReactNode;
    fontfamily?: string,
    fontSize?: number,
    align?: AlignSelfOptions,
    numoflines?: number,
    width?: any,
    top?: any,
    left?: any,
    style?: StyleProp<TextStyle>;
    textProps?: TextProps;
    size?: size,
    family?: family,
    color?: string


}

const Text: React.FC<Props> = ({
    children,
    fontfamily = Fontfamily.bold,
    fontSize,
    align = 'auto',
    numoflines = 0,
    style,
    top = 0,
    left = 0,
    textProps,
    size = "semimedium",
    family = "bold",
    color
}) => {
    const theme = useContext(ThemeContext);

    return (
        <>

            <RNText
                numberOfLines={numoflines}
                style={[

                    {
                        fontFamily: Fontfamily[family as keyof typeof Fontfamily] ?? Fontfamily.bold,
                        fontSize: fontSize ?? Fontsize[size],
                        alignSelf: align,
                        color: color ?? theme.primarytext,
                        marginTop: top,
                        marginLeft: left,
                    },
                    style,
                ]}
                {...textProps}
            >
                {children}
            </RNText>
        </>
    );
};

export default Text;

