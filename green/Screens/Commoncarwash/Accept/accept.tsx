import { Pressable, View } from "react-native"
import Mapscreen from "../Map/map"
import React, { useCallback, useEffect, useMemo, useRef } from "react"
import BottomSheet, { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet"
import Bottomsheet from "../../../Components/bottomsheet"
import LinearGradient from "react-native-linear-gradient"
import Images, { icons } from "../../../Utilities/images"
import { borderradius, windowheight, windowwidth } from "../../../Utilities/dimensions"
import useCustomHooks, { useFetchservicedetail } from "../../../Actions/Hooks/customhook"
import Text from "../../../Components/text"
import VectorIcons from "../../../Utilities/vectorIcons"
import Flexcomponent from "../../../Components/flexcomponent"
import Gradientlist from "../../Others/Common/gradientlist"
import FastImage, { FastImageProps, ImageStyle, Priority } from "@d11/react-native-fast-image";
import Card from "../../../Components/Card"
import { Button } from "../../../Components/Field"
import { useSelector } from "react-redux"
import { cleaningSelector } from "../../../Slices/cleaning"
import { helperSelector, update_dailywashstate } from "../../../Slices/helper"
import { openGoogleMap, useFetchcurrentlocation } from "../../../Actions/location/location"
import { Colors } from "../../../Utilities/uiasset"
import { PROFILEURL } from "../../../Actions/Constants/constant"
import { persistorSelector, setDamagepics } from "../../../Slices/persistor"
import Addonrequest from "../Addon/addonrequest"


const Acceptorder: React.FC = React.memo(() => {
    const { theme, navigation, dispatch } = useCustomHooks()
    const bottomsheetref = useRef<BottomSheet>(null)
    const { dailywashstate, onetimewashstate, servicetype } = useSelector(helperSelector)
    // const managesheet = useCallback(() => {
    //     if (dailywashstate == "accept" || onetimewashstate == "accept") {
    //         bottomsheetref.current?.expand()
    //     }
    //     else return bottomsheetref.current?.close()
    // }, [dailywashstate, onetimewashstate])
    // useEffect(() => {
    //     managesheet()
    // }, [managesheet, dailywashstate, onetimewashstate])
    const { selectedservice } = useSelector(cleaningSelector)
    console.log(JSON.stringify(selectedservice, null, 2));
    const { currentlocation } = useSelector(helperSelector)
    const location = currentlocation?.coordinates
    const pickup = useMemo(() => {
        const res = {
            latitude: selectedservice?.subscriptionDetail?.subscriptionLocation?.coordinates[1] ?? 0,
            longitude: selectedservice?.subscriptionDetail?.subscriptionLocation?.coordinates[0] ?? 0
        }
        return res
    }, [selectedservice])

    const currentloc = useMemo(() => {
        const res = {
            latitude: location?.latitude ?? 0,
            longitude: location?.longitude ?? 0
        }
        return res
    }, [location, dailywashstate, onetimewashstate])
    // const { serviceinprogress } = useSelector(persistorSelector)
    // const { fetchservicedetail } = useFetchservicedetail((selectedservice?._id ? selectedservice?._id : serviceinprogress?._id) ?? "")
    // useEffect(() => {
    //     if (serviceinprogress?._id || serviceinprogress?._id) {
    //         fetchservicedetail()
    //     }
    // }, [selectedservice, serviceinprogress])

    const rejectref = useRef<BottomSheetModal | null>(null)


    return (
        <Bottomsheet
            sheetref={bottomsheetref}
            snappoint={["55%"]}

        >
            <View style={{ paddingHorizontal: "5%" }} >
                <BottomSheetScrollView  >
                    <LinearGradient
                        colors={["#1C5E56", "#006D60"]}
                        style={{ flexDirection: "row", alignItems: "center", width: "100%", paddingVertical: "4%", borderRadius: borderradius * 0.5, marginTop: "10%", paddingHorizontal: "5%" }} >
                        <View style={{ width: "15%" }} >
                            <Images
                                type="image"
                                source={selectedservice?.userDetail?.profile ? { uri: PROFILEURL + selectedservice?.userDetail?.profile } : icons.User}
                                style={{ width: windowwidth * 0.1, height: windowwidth * 0.1 }}
                                resizeMode="cover"
                            />
                        </View >
                        <View style={{ width: "70%", paddingHorizontal: "2.5%" }} >
                            <Text color={theme.white} size="semimedium" >{selectedservice?.userDetail?.name ?? "Carigato customer"}</Text>
                            <Text color={theme.white} size="semimedium" family="GRegular" top={"2.5%"} >Full Car Cleaning</Text>
                        </View>
                        <Pressable
                            onPress={() => {

                                navigation.navigate("ChatBox")
                            }} style={{ width: "15%", alignItems: "flex-end" }} >
                            <VectorIcons
                                family="Lucide"
                                name={"message-square"}
                                size={windowwidth * 0.06}
                                iconcolor={theme.white}
                            />
                        </Pressable>
                    </LinearGradient>

                    <Flexcomponent top={"5%"} justifyContent="space-between" >
                        <Pressable
                            onPress={() => openGoogleMap(currentloc, pickup)}
                            style={[{ width: "47.5%", padding: "5%", borderRadius: borderradius * 0.5, backgroundColor: "#3984E8" }]}
                        >
                            <Images
                                type="image"
                                source={icons.Maploc}
                                style={{ width: windowwidth * 0.09, height: windowwidth * 0.09, }}

                            />

                            <Text family="GMedium" size="medium" color={theme.white} top={"10%"} >Navigate</Text>
                            <Text family="GRegular" size="semimedium" color={theme.white} >( Google Maps )</Text>
                        </Pressable>


                        <Pressable
                            style={[{ width: "47.5%", padding: "5%", borderRadius: borderradius * 0.5, backgroundColor: "#37B76C" }]}
                        >
                            <Images
                                type="image"
                                source={icons.Mappin}
                                style={{ width: windowwidth * 0.09, height: windowwidth * 0.09, }}

                            />

                            <Text family="GMedium" size="medium" color={theme.white} top={"10%"} >Mark as Arrived</Text>
                            <Text family="GRegular" size="semimedium" color={theme.white} >2 Work Assigned</Text>
                        </Pressable>
                    </Flexcomponent>

                    <Card containerStyle={{ paddingHorizontal: "5%", paddingVertical: "2.5%", marginTop: "5%" }} >
                        <Text top={3} family="GRegular" align="center" >Notification will a sent to customer upon arrival</Text>
                    </Card>
                    <Flexcomponent style={{ marginBottom: "5%" }} justifyContent="space-around" >
                        <Button
                            onPress={() => {
                                if (servicetype == "dailywash") {
                                    dispatch(update_dailywashstate("request"))
                                }
                                else {
                                    rejectref.current?.present()
                                }
                            }
                            }

                            title={servicetype == "dailywash" ? "Back" : "Cancel"}
                            textStyle={{ color: theme.inversetext }}
                            buttonStyle={{ marginTop: "5%", alignSelf: "center", width: "47.5%", borderWidth: 1, borderColor: Colors.primary, backgroundColor: "transparent" }}
                        />
                        <Button
                            onPress={() => {
                                dispatch(setDamagepics([]))
                                navigation.navigate("JobDetails")
                            }}
                            title="Continue"
                            buttonStyle={{ marginTop: "5%", alignSelf: "center", width: "45%" }}
                        />
                    </Flexcomponent>



                </BottomSheetScrollView>

                <Addonrequest isreject sheetref={rejectref} />
            </View>
        </Bottomsheet>
    )
})

export default Acceptorder