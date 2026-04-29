import { FlashList } from "@shopify/flash-list"
import { Pressable, View } from "react-native"
import Card from "../../Components/Card"
import Flexcomponent from "../../Components/flexcomponent"
import Images, { icons } from "../../Utilities/images"
import { borderradius, windowheight, windowwidth } from "../../Utilities/dimensions"
import Text from "../../Components/text"
import { Colors } from "../../Utilities/uiasset"
import useCustomHooks from "../../Actions/Hooks/customhook"
import { capitalizeFirstLetter, dateTimeForm, dateToMonthDate, numberChange, returnOriginalFile, returnServiceStatusDisplay } from "../../Common/commonFunction"
import { constantData } from "../../Common/constant"

type OrderHistoryCardProps = {
    data: any;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({ data = {}, }) => {



    const { theme, navigation } = useCustomHooks();



    const statusDisplay = () => {
        if (data?.isSubscriptionCancelled) {
            return "Cancelled"
        }
        else {
            if (data?.status == 'pending' && data?.paymentStatus == constantData.paymentStatus.paid) {
                return "Upcoming";
            }
            else {
                return capitalizeFirstLetter(data?.status);
            }

        }
    }

    const statusColour = () => {
        if (data?.isSubscriptionCancelled || data.status == constantData.subscriptionFilter.expired) {
            return Colors.red;
        }
        else {
            if (data.status == constantData.subscriptionFilter.active) {
                return Colors.green;
            }
            else {
                return Colors.yellow;
            }
        }
    }


    return (
        <Card backgroundColor="#CFCFCF" containerStyle={{ paddingHorizontal: "2.5%", paddingVertical: "5%", marginVertical: "2.5%" }} >
            <Flexcomponent style={{ width: "100%" }} >
                <View style={{ width: windowwidth * 0.2 }} >
                    <Images
                        type="image"
                        source={data?.brandVehicleDetails?.brandVehicleImage ? { uri: returnOriginalFile(data?.brandVehicleDetails?.brandVehicleImage) } : icons.Swift}
                        width={windowwidth * 0.2}
                        height={windowwidth * 0.2}
                    />
                </View>
                <View style={{ width: "50%", paddingHorizontal: windowwidth * 0.025 }} >
                    <Text family="GBold" size="medium" >
                        {data?.brandVehicleDetails?.brandName} {data?.brandVehicleDetails?.brandVehicleName}
                    </Text>
                    <Text family="GRegular" size="medium" >
                        {data?.registrationNo}
                    </Text>
                </View>
                <View style={{ width: "30%", alignItems: "center" }} >
                    <Pressable style={{ width: "80%", backgroundColor: statusColour(), borderRadius: borderradius * 0.4, justifyContent: "center", alignItems: "center", paddingVertical: windowwidth * 0.015 }} >
                        <Text family="GBold" size="semimedium" color="#fff" >
                            {statusDisplay()}
                        </Text>
                    </Pressable>
                </View>
            </Flexcomponent>

            <Flexcomponent bakgroundcolor="#E6E6E6" paddingHorizontal={"2.5%"} paddingVertical={"4%"} style={{ borderRadius: borderradius * 0.5 }} >
                {
                    data?.status != "pending"
                        ?
                        <>
                            <View style={{ width: "33.3%" }} >
                                <Text size="semimedium" family="GRegular" >Start Date</Text>
                                {/* Oct 9, 2025 */}
                                <Text size="medium" family="GMedium" >{dateToMonthDate(data?.startDate)}</Text>
                            </View>
                            {
                                data?.subscriptionType == constantData.subscriptionType.subscribe
                                    ?
                                    <View style={{ width: "33.3%" }} >
                                        <Text size="semimedium" family="GRegular" >End Date</Text>
                                        <Text size="medium" family="GMedium" >{dateToMonthDate(data?.endDate)}</Text>
                                    </View>
                                    :
                                    <View style={{ width: "33.3%" }} ></View>
                            }
                        </>
                        :
                        <>
                            <View style={{ width: "33.3%" }} ></View>
                            <View style={{ width: "33.3%" }} ></View>
                        </>
                }


                <View style={{ width: "33.3%" }} >
                    <Text size="semimedium" family="GRegular" >Plan</Text>
                    <Text size="medium" family="GMedium" >
                        {data?.duration} {numberChange(data?.duration) > 1 ? "days" : "day"}
                    </Text>
                </View>
            </Flexcomponent>

            <Flexcomponent top={"5%"} justifyContent="space-between" >
                <Pressable style={{ padding: "3%", backgroundColor: "#000", width: "40%", alignItems: "center", justifyContent: "center", borderRadius: borderradius * 0.5 }}
                    onPress={() => navigation.navigate('OrderActivity', { subscriptionId: data?._id })}>
                    <Text family="GMedium" size="medium" color="#fff" >Watch Activity</Text>
                </Pressable>

                <Pressable style={{ padding: "3%", borderWidth: 0.5, borderColor: "#000", width: "40%", alignItems: "center", justifyContent: "center", borderRadius: borderradius * 0.5, }}
                    onPress={() => navigation.navigate('OrderDetails', { fromScreen: 'orders', rescheduled: false, subscriptionId: data?._id })}>
                    <Text family="GMedium" size="medium" color="#000" >View details</Text>
                </Pressable>
            </Flexcomponent>
        </Card>
    )

}

export default OrderHistoryCard