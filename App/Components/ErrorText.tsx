import { View } from "react-native";
import { Fontfamily, Fontsize } from "../Utilities/uiasset";
import Text from "./text";
import { windowwidth } from "../Utilities/dimensions";

interface ErrorTextProps {
    errorMessage: string;
    errorTextContainerStyle?: any;
    errorTextStyle?: any;
}

const ErrorText: React.FC<ErrorTextProps> = props => {

    const {
        errorMessage,
        errorTextContainerStyle,
        errorTextStyle,
    } = props;

    return (
        <View style={[{ marginTop: 5, marginHorizontal: windowwidth * 0.02 }, errorTextContainerStyle]}>
            <Text
                style={[{
                    fontFamily: Fontfamily.GRegular,
                    fontSize: Fontsize.medium,
                    color: 'red',
                }, errorTextStyle]}
            >
                {errorMessage}
            </Text>
        </View>
    )

}

export default ErrorText;
