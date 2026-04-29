import { View } from "react-native"
import Mainview from "../../../Components/mainview"
import Lottie from "../../../Components/lottieview"
import { lotties } from "../../../Utilities/images"
import { windowheight, windowwidth } from "../../../Utilities/dimensions"
import Text from "../../../Components/text"
import useCustomHooks, { Commonalert, useHardwareBackPress } from "../../../Actions/Hooks/customhook"
import { update_dailywashstate, update_onetimewashstate } from "../../../Slices/helper"
import { clearservice } from "../../../Slices/persistor"


const Completejob: React.FC = () => {
    const { navigation, dispatch } = useCustomHooks()

    const backfn = async () => {
        Commonalert({
            title: "Alert!",
            des: "Are your sure want to skip review ?",
            yes: () => {
                dispatch(update_dailywashstate("request"))
                dispatch(update_onetimewashstate("request"))
                navigation.navigate("Vendorhome")
                dispatch(clearservice())
            }
        })
    }

    useHardwareBackPress({
        title: "Alert!",
        des: "Are your sure want to skip review ?",
        yesfn: () => {
            dispatch(update_dailywashstate("request"))
            dispatch(update_onetimewashstate("request"))
            navigation.navigate("Vendorhome")
            dispatch(clearservice())
        }
    })
    return (
        <Mainview
            headertitle="Completejob"
            isboxshadow
            bottomContent
            bottomtext="Reviews and Rating"
            isscollable={false}
            onleftfn={backfn}
            onBottompress={() => {
                navigation.navigate("Reviews")
            }}

        >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                <Lottie
                    src={lotties.Success}
                    width={windowwidth * 0.4}
                    height={windowheight * 0.4}
                />
                <Text size="medium" style={{ alignSelf: "center", textAlign: "center", width: "80%", bottom: "5%" }} >Great Job, You have completed the
                    service earlier by 30 mins</Text>
            </View>
        </Mainview>
    )
}

export default Completejob

