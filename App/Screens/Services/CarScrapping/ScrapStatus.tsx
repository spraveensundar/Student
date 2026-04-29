import React from "react";
import { View } from "react-native";

import Text from "../../../Components/text";
import { Button } from "../../../Components/Field";
import Lottie from "../../../Components/lottieview";
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import Images, { icons, lotties } from "../../../Utilities/images";
import { NavigationProp, stackNavProp } from "../../../Actions/types";

import styles from "./styles";

type Props = {
    navigation: NavigationProp;
    route: stackNavProp<'ScrapStatus'>['route'];
};

const ScrapStatus: React.FC<Props> = ({ route }) => {
    const { content, button, status } = route?.params;

    const { theme } = useCustomHooks();
    const style = styles(theme);
    return (
        <Mainview
            isheader={false}
            isscollable={false}
            bottomContent={
                <View style={style.buttonContainer}>
                    <Button
                        title={button?.title}
                        onPress={button?.onButtonPress}
                    />
                </View>
            }
        >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                {status === 'success' &&
                    <Lottie
                        src={lotties.Tick}
                        style={{ width: "50%", height: "50%" }}
                        loop={false}
                    />}
                {status === 'error' &&
                    <Lottie
                        src={lotties.SadEmoji}
                        style={{ width: "50%", height: "50%" }}
                        loop={false}
                    />}
                {status === 'info' &&
                    <Images
                        type="image"
                        source={icons.StatusInfo}
                        width={"50%"}
                        height={"50%"}
                    />}
                <Text family="GBold" size="medium" style={{ textAlign: "center", bottom: "12.5%", width: "70%" }} >
                    {content}
                </Text>
            </View>
        </Mainview>
    )
}

export default ScrapStatus;