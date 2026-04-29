import { View } from "react-native"
import Mainview from "../../../Components/mainview"
import Text from "../../../Components/text"
import Images, { icons, lotties } from "../../../Utilities/images"
import Lottie from "../../../Components/lottieview"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Stacknavigationtypes } from "../../../Navigations/stacknavigationtypes"

type Props = NativeStackScreenProps<Stacknavigationtypes, 'LeaveConfirmation'>;

const LeaveConfirmation: React.FC<Props> = ({ route }) => {
    const { content, button, status } = route?.params;

    return (
        <Mainview
            isheader={false}
            isscollable={false}
            bottomContent
            bottomtext={button?.title}
            onBottompress={button?.onButtonPress}
        >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                {status === 'success' &&
                    <Lottie
                        src={lotties.Success}
                        style={{ width: "50%", height: "50%" }}
                        loop={false}
                    />}
                {status === 'error' &&
                    <Lottie
                        src={lotties.SoSad}
                        style={{ width: "50%", height: "50%" }}
                        loop={false}
                    />}
                {status === 'info' &&
                    <Images
                        type="image"
                        source={icons.Scrap}
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

export default LeaveConfirmation;