import { View } from "react-native"
import Mainview from "../../../Components/mainview"
import Lottie from "../../../Components/lottieview"
import { icons, lotties } from "../../../Utilities/images"
import { windowheight, windowwidth } from "../../../Utilities/dimensions"
import Text from "../../../Components/text"
import Listcomponent from "../../../Components/listcomponent"
import { useEffect, useState } from "react"
import useCustomHooks from "../../../Actions/Hooks/customhook"


const Successreg: React.FC = () => {
    const [isupdate, setIsupdate] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsupdate(true)
        }, 1000)
    }, [])
    const { theme, navigation } = useCustomHooks()

    return (
        <Mainview
            isheader={false}
            bottomContent={isupdate}
            isscollable={false}
            onBottompress={() => {
                navigation?.navigate("Manualverification")
            }}
        >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                <Lottie
                    src={lotties.Success}
                    style={{ width: windowwidth * 0.4, height: windowheight * 0.4 }}
                />
                {!isupdate ?
                    <>
                        <Text size="medium" style={{ bottom: "5%", alignSelf: "center", textAlign: "center" }} >Your Aadhhar updated successfully !</Text>
                    </>
                    :
                    <>
                        <Text size="medium" style={{ bottom: "5%", alignSelf: "center", textAlign: "center" }} >Thanks for registration, Our team will connect you soon !</Text>
                        <Listcomponent
                            src={icons.Phone}
                            top={"10%"}
                            title="Call"
                        />
                        <Listcomponent
                            src={icons.Whatsapp}
                            top={"5%"}
                            title="Whatsapp"
                        />
                    </>}
            </View>

        </Mainview>
    )

}

export default Successreg

