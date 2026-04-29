import { Pressable, View } from "react-native"
import Card from "../../../Components/Card"
import Flexcomponent from "../../../Components/flexcomponent"
import { borderradius, RFvalue, windowheight, windowwidth } from "../../../Utilities/dimensions"
import Images, { icons } from "../../../Utilities/images"
import { Colors } from "../../../Utilities/uiasset"
import Text from "../../../Components/text"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import { Button } from "../../../Components/Field"
import { LinearGradient } from "react-native-linear-gradient"
import { plantype, status } from "./types"
import Detilsofride from "./detailsofride"
import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import { helperSelector } from "../../../Slices/helper"
import { PROFILEURL } from "../../../Actions/Constants/constant"
import { capitalizeFirstLetter } from "../../../Actions/Hooks/helperfn"

interface Rideitemprops {
    acceptfn?: () => void,
    rejectfn?: () => void,
    onclick?: () => void,
    onview?: () => void,
    isRejectable?: boolean,
    item: any,
    isotcload?: boolean
}

const Rideitem: React.FC<Rideitemprops> = React.memo(({
    acceptfn,
    onclick,
    rejectfn,
    onview,
    isRejectable = true,
    isotcload = false,
    item
}) => {
    const { theme } = useCustomHooks()
    const { servicetype } = useSelector(helperSelector);

    console.log('servicetype', servicetype);
    const checktodaywork = useMemo(() => {
        const current = new Date()
        const cureenttime = new Date(current)
        cureenttime.setDate(cureenttime.getDate())
        cureenttime.setHours(0, 0, 0, 0)

        const date = new Date(item?.serviceStartTime)
        date.setDate(date.getDate())
        date.setHours(23, 0, 0, 0);

        if (item?.status == "pending" && ((cureenttime.getTime() <= date.getTime())) && (cureenttime.getDate() == date.getDate()) && !item?.isCancelled) return true
    }, [item])
    return (
        <Card ispress onPress={onclick} containerStyle={{ padding: windowwidth * 0.04, marginVertical: "2.5%" }} >
            <Flexcomponent top={"5%"} alignItems="center" >
                <View style={{ width: "15%", alignItems: "center" }} >
                    <Images
                        type="image"
                        source={item?.userDetail?.profile ? { uri: PROFILEURL + item?.userDetail?.profile } : icons.User}
                        width={windowwidth * 0.16}
                        height={windowwidth * 0.16}
                        borderRadius={borderradius * 5}
                        resizeMode="cover"
                    />
                    <View style={{ paddingVertical: "4.5%", backgroundColor: Colors.green, justifyContent: "center", alignItems: "center", borderRadius: borderradius * 0.25, width: windowwidth * 0.16, position: "absolute", bottom: -windowwidth * 0.03 }} >
                        <Text numoflines={1} top={"5%"} family="GMedium" color={theme.white} >#{item?.serviceUniqueId}</Text>
                    </View>
                </View>
                <View style={{ width: "60%", paddingHorizontal: "5%", justifyContent: "flex-start", }} >
                    <Text size="medium"  >{item?.userDetail?.name ?? "Carigato customer"}</Text>
                    <Text top={"2.5%"} size="medium" family="GRegular" >{item?.subscriptionDetail?.registrationNo ?? "vechile number"}</Text>
                    {servicetype !== 'dailywash' && <Text size="medium" top={"2.5%"} >₹{item?.serviceAmount?.toFixed(1)}</Text>}

                </View>
                <View style={{ width: "25%", alignItems: "flex-end", justifyContent: "center", }} >

                    <Pressable onPress={() => onview?.()} hitSlop={50} style={{ backgroundColor: "#E6E6E6", borderRadius: borderradius * 0.25, width: "90%", alignItems: "center", justifyContent: "center", paddingVertical: windowwidth * 0.012 }} >
                        <Text family="GMedium" >detail</Text>
                    </Pressable >
                </View>
            </Flexcomponent>

            <Pressable onPress={() => onview?.()} style={{ width: "100%", backgroundColor: "#E6E6E6", padding: windowwidth * 0.05, borderRadius: borderradius * 0.5, marginTop: "7.5%" }} >
                {/* <Detilsofride
                    leftext="Address"
                    righttext={item?.subscriptionDetail?.address}

                /> */}

                <Detilsofride
                    leftext="Apartment Name"
                    righttext={item?.subscriptionDetail?.apartmentName}
                    top={"2.5%"}
                />
                <Detilsofride
                    leftext="Block.No"
                    righttext={item?.subscriptionDetail?.blockNo}
                    top={"2.5%"}
                />

                <Detilsofride
                    leftext="Parking Type"
                    righttext={item?.subscriptionDetail?.parkingType}
                    top={"2.5%"}
                />


                <Detilsofride
                    leftext="Date"
                    righttext={(new Date(item?.serviceStartTime)).toDateString() ?? ""}
                    top={"2.5%"}
                />

                {servicetype == "dailywash" ?
                    <Detilsofride
                        leftext="Slot Time"
                        righttext={item?.subscriptionDetail?.serviceStartTime?.display + " - " + item?.subscriptionDetail?.serviceEndTime?.display}
                        top={"2.5%"}
                    /> :
                    <Detilsofride
                        leftext="Service Time"
                        righttext={(new Date(item?.serviceStartTime)).toLocaleTimeString() ?? ""}
                        top={"2.5%"}
                    />}

                {servicetype == "dailywash" ?
                    <Detilsofride
                        leftext="Service Type"
                        righttext={item?.recurrence ?? ""}
                        top={"2.5%"}
                    /> : null}


                {(item?.status == "pending" && item?.isCancelled) &&
                    <Detilsofride
                        leftext="Status"
                        righttext={"Cancelled"}
                        top={"2.5%"}
                        staus={"cancelled"}

                    />}
                {item?.status != "pending" &&
                    <Detilsofride
                        leftext="Status"
                        righttext={(item?.status == "completed" && !item.isCancelled) ? "Completed" : "Cancelled"}
                        top={"2.5%"}
                        staus={item?.status}

                    />}
            </Pressable>
            {/* {((item?.status == "pending") && (servicetype == "onetimewash") && (!item?.isCancelled)) ?
                <Flexcomponent justifyContent="space-between" top={"5%"} >``
                    {<Button
                        title="Reject"
                        buttonStyle={{
                            width: "45%",
                            height: windowheight * 0.05,
                            borderWidth: 1,
                            borderColor: "#CF1322",
                            backgroundColor: "transparent"
                        }}
                        textStyle={{
                            color: "#CF1322"
                        }}
                        onPress={rejectfn}
                        loading={isotcload}
                    />}

                    <Button
                        title="Accept"
                        buttonStyle={{
                            width: "45%",
                            height: windowheight * 0.05,
                            backgroundColor: Colors.green
                        }}
                        textStyle={{
                            color: theme.white
                        }}
                        onPress={acceptfn}
                        loading={isotcload}

                    />
                </Flexcomponent>
                :
                checktodaywork ?
                    <Button
                        title="View Navigation"
                        buttonStyle={{
                            width: "100%",
                            height: windowheight * 0.05,
                            backgroundColor: Colors.green,
                            marginTop: "5%"
                        }}
                        textStyle={{
                            color: theme.white
                        }}
                        onPress={acceptfn}
                    />
                    :
                    null
            } */}

            <Button
                title="View Navigation"
                buttonStyle={{
                    width: "100%",
                    height: windowheight * 0.05,
                    backgroundColor: Colors.green,
                    marginTop: "5%"
                }}
                textStyle={{
                    color: theme.white
                }}
                onPress={acceptfn}
            />

            {(servicetype === 'dailywash') &&
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    colors={item?.subscriptionDetail?.planDetails?.planName == "standard" ? ["#0F4C81", "#3A86FF"] : item?.subscriptionDetail?.planDetails?.planName == "premium" ? ["#00634D", "#00AF87"] : ["#380600", "#993328"]} style={{ position: "absolute", top: 0, right: 0, paddingVertical: windowwidth * 0.02, borderTopRightRadius: borderradius * 0.5, borderBottomLeftRadius: borderradius * 0.5, alignItems: "center", justifyContent: "center", width: "35%" }} >
                    <Text color={theme.white} family="GMedium" style={{ fontSize: RFvalue(11.5) }} >{capitalizeFirstLetter(item?.subscriptionDetail?.planDetails?.planName)}</Text>
                </LinearGradient>}
        </Card>
    )

})
export default Rideitem