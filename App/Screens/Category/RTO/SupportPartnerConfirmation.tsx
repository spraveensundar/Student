import { View } from "react-native"
import Mainview from "../../../Components/mainview"
import Text from "../../../Components/text"
import Images, { icons } from "../../../Utilities/images"
import useCustomHooks from "../../../Actions/Hooks/customhook"

const SupportPartnerConfirmation: React.FC = () => {
    const { navigation } = useCustomHooks()
    return (
        <Mainview
            isheader={false}
            bottomContent
            isscollable={false}
            bottomtext={"Continue"}
            onBottompress={() => {
                // navigation?.navigate("ContactUs");
                navigation?.navigate("Successreg");
            }}
        >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                <Images
                    type="image"
                    source={icons.Aadharpreview}
                    width={"80%"}
                    height={"80%"}
                />
                <Text family="GBold" size="medium" style={{ textAlign: "center", bottom: "12.5%", width: "70%" }} >
                    {'Please review and verify the submitted documents carefully. Ensure all details are valid and match the applicant’s profile before approval.'}
                </Text>
            </View>
        </Mainview>
    )
}

export default SupportPartnerConfirmation;