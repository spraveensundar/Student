import LinearGradient from "react-native-linear-gradient"
import Mainview from "../../../Components/mainview"
import { borderradius, windowwidth } from "../../../Utilities/dimensions"
import { Pressable, View } from "react-native"
import Images, { icons } from "../../../Utilities/images"
import Text from "../../../Components/text"
import useCustomHooks, { useProfile } from "../../../Actions/Hooks/customhook"
import VectorIcons from "../../../Utilities/vectorIcons"
import Flexcomponent from "../../../Components/flexcomponent"
import Gradientlist from "../../Others/Common/gradientlist"
import { useFetchMyServiceDetailsQuery } from "../../../Slices/cleaning"
import { useSelector } from "react-redux"
import { authSelector } from "../../../Slices/auth"


const Profile: React.FC = () => {
    const { theme, navigation } = useCustomHooks();

    const { serviceMan } = useSelector(authSelector);
    const { isLoading, data: serviceData } = useFetchMyServiceDetailsQuery(0);

    useProfile()

    console.log('useFetchMyServiceDetailsQuery-data', serviceMan);

    return (
        <Mainview
            isheader
            headertitle="Profile"
            ismainloading={isLoading}
        >
            <LinearGradient
                colors={["#1C5E56", "#006D60"]}
                style={{ flexDirection: "row", alignItems: "center", width: "100%", paddingVertical: "3.5%", borderRadius: borderradius * 0.5, marginTop: "10%", paddingHorizontal: "5%" }} >
                <View style={{ width: "15%" }} >
                    <Images
                        type="image"
                        source={icons.User}
                        style={{ width: windowwidth * 0.1, height: windowwidth * 0.1 }}
                    />
                </View >
                <View style={{ width: "70%", paddingHorizontal: "2.5%" }} >
                    <Text color={theme.white} size="medium" >{`Hello, ${serviceMan?.name}`}</Text>
                    <Text color={theme.white} size="medium" family="GRegular" top={"2.5%"} >{serviceMan?.mobileNo}</Text>
                </View>
                <Pressable onPress={() => navigation.navigate("Editprofile")} style={{ width: "15%", alignItems: "flex-end" }} >
                    <View style={{ width: windowwidth * 0.1, height: windowwidth * 0.1, backgroundColor: theme.white, borderRadius: borderradius * 3, justifyContent: "center", alignItems: "center" }} >
                        <VectorIcons
                            family="AntDesign"
                            name={"edit"}
                            size={windowwidth * 0.06}
                        />
                    </View>
                </Pressable>
            </LinearGradient>

            <Flexcomponent top={"5%"} justifyContent="space-between" style={{ flexWrap: "wrap", gap: windowwidth * 0.04 }} >
                <Gradientlist
                    source={icons.Earnings}
                    title="Net Profit Today"
                    value={`₹${serviceData?.data?.netProfitToday ?? 0}`}
                    colors={["#380600", "#993328"]}
                />

                <Gradientlist
                    source={icons.Hours}
                    title="Total Booking"
                    value={`${serviceData?.data?.totalBooking ?? 0}`}
                    colors={["#00634D", "#00AF87"]}
                />

                <Gradientlist
                    source={icons.Washed}
                    title="Car Washed"
                    value={`${serviceData?.data?.carWashed ?? 0}`}
                    colors={["#8847FF", "#5826B2"]}
                />

                <Gradientlist
                    source={icons.Washed}
                    title="Car Pendings"
                    value={`${serviceData?.data?.carPending ?? 0}`}
                    colors={["#16C1FF", "#004963"]}
                />
            </Flexcomponent>

        </Mainview>
    )

}

export default Profile