import { View } from "react-native"
import Mainview from "../../../Components/mainview"
import Text from "../../../Components/text"
import Images, { icons, lotties } from "../../../Utilities/images"
import Lottie from "../../../Components/lottieview"

const ScrapDealerConfirmation: React.FC = ({ route }: any) => {
    const { origin, content, button } = route?.params;
    return (
        <Mainview
            isheader={false}
            bottomContent
            isscollable={false}
            bottomtext={button?.title}
            onBottompress={button?.onButtonPress}
        >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                {origin === 'CancelBid' ?
                    <Lottie
                        src={lotties.SoSad}
                        style={{ width: "80%", height: "80%" }}
                        loop={false}
                    />
                    :
                    <Images
                        type="image"
                        source={icons.Aadharpreview}
                        width={"80%"}
                        height={"80%"}
                    />}
                <Text family="GBold" size="medium" style={{ textAlign: "center", bottom: "12.5%", width: "70%" }} >
                    {content}
                </Text>
            </View>
        </Mainview>
    )
}

export default ScrapDealerConfirmation;