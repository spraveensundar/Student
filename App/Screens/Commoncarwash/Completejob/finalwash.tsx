import { View } from "react-native"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import Lottie from "../../../Components/lottieview"
import Mainview from "../../../Components/mainview"
import { helperSelector, update_dailywashstate, update_onetimewashstate } from "../../../Slices/helper"
import Text from "../../../Components/text"
import { windowheight, windowwidth } from "../../../Utilities/dimensions"
import { lotties } from "../../../Utilities/images"
import { useSelector } from "react-redux"


const Finalwash: React.FC = () => {
    const { navigation, dispatch } = useCustomHooks()
    const { servicetype } = useSelector(helperSelector)
    return (
        <Mainview
            headertitle="Review & Ratings"
            isboxshadow
            bottomContent
            bottomtext="Go to home"
            isscollable={false}
            onBottompress={() => {
                dispatch(update_dailywashstate("request"))
                dispatch(update_onetimewashstate("request"))
                navigation.navigate("Vendorhome")

            }}
        >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                <Lottie
                    src={lotties.Success}
                    width={windowwidth * 0.4}
                    height={windowheight * 0.4}
                />
                <Text size="medium" style={{ alignSelf: "center", textAlign: "center", width: "80%", bottom: "5%" }} >Your reviews updated successfully !</Text>
            </View>

        </Mainview>
    )
}
export default Finalwash
