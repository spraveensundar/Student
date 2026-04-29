import { BottomSheetModal, BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Sheet from "../../../Components/bottomsheetmodal"
import { Pressable, View } from "react-native";
import Text from "../../../Components/text";
import Flexcomponent from "../../../Components/flexcomponent";
import { Colors, Fontfamily, Fontsize } from "../../../Utilities/uiasset";
import { borderradius, windowheight, windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import ServiceChecklist from "../Servicedetails/servicechecklist";
import React, { useState } from "react";
import { Button, Input } from "../../../Components/Field";
import { helperSelector, update_dailywashstate, update_onetimewashstate } from "../../../Slices/helper";
import { useSelector } from "react-redux";
import { clearservice, persistorSelector } from "../../../Slices/persistor";
import { cleaningSelector } from "../../../Slices/cleaning";
import { useCancelServiceMutation } from "../../../Slices/services";
import { Toastfn } from "../../../Utilities/helerfunction";
import Loader from "../../../Components/loader";
import useApiError from "../../../Actions/Hooks/errorhook";


interface Addonrequestprops {
    sheetref: React.RefObject<BottomSheetModal | null>;
    isreject?: boolean,
    ondismiss?: () => void

}

const Addonrequest: React.FC<Addonrequestprops> = React.memo(({
    sheetref,
    isreject = false,
    ondismiss
}) => {
    const { theme, dispatch, navigation } = useCustomHooks()
    const { servicetype } = useSelector(helperSelector)
    const { serviceinprogress } = useSelector(persistorSelector)
    const { selectedservice } = useSelector(cleaningSelector)
    const [cancelReason, setCancelReason] = useState("")
    const [cancel_service, { isLoading, error }] = useCancelServiceMutation()

    useApiError(error)
    console.log(serviceinprogress, "addonpopup");

    const handleSubmit = async () => {
        if (!cancelReason) {
            return Toastfn("Reason is required")
        }
        const payload = {
            serviceId: selectedservice?._id,
            cancelReason: cancelReason
        }
        console.log(payload, "PAyload");

        try {
            const res = await cancel_service(payload).unwrap()
            if (res?.status) {
                sheetref.current?.dismiss()
                dispatch(servicetype == "dailywash" ? update_dailywashstate("request") : dispatch(update_onetimewashstate("request")))
                navigation.navigate("Vendorhome")
                Toastfn("Service Cancelled")
                dispatch(clearservice())

            }
        } catch (error) {
            console.log(error, "CANCEL_SERVICE_ERROR");
        }
    }

    return (
        <Sheet
            sheetref={sheetref}
            snappoint={[!isreject ? "45%" : "35%"]}
            bottomSheetProps={{
                keyboardBehavior: "interactive",
                keyboardBlurBehavior: "restore",
                android_keyboardInputMode: "adjustPan",
                enablePanDownToClose: false,
                onDismiss: () => {
                    ondismiss && ondismiss()
                }
            }}
            backdropbehaviour="none"

        >
            {!isreject ?
                <View style={{ padding: "5%", flex: 1 }} >
                    <View style={{ flex: 0.85 }} >
                        <Text size="semilarge" family="GMedium" >Addon Services</Text>
                        <Text size="medium" top={"1%"} family="GRegular" >Customer need to be extra services to make my car shine even more!</Text>
                        <BottomSheetScrollView>
                            {serviceinprogress?.services?.map((e: any) => (
                                <ServiceChecklist ischeck
                                    title={e?.name}
                                    textstyle={{ fontFamily: Fontfamily.GRegular }}
                                    top={"2.5%"}
                                />))}
                            {/* <ServiceChecklist ischeck
                                title="Tyre Polish"
                                textstyle={{ fontFamily: Fontfamily.GRegular }}
                            />
                            <ServiceChecklist ischeck
                                title="Dashboard Cleaning"
                                textstyle={{ fontFamily: Fontfamily.GRegular }}
                            />
                            <ServiceChecklist ischeck
                                title="Car Perfume Spray"
                                textstyle={{ fontFamily: Fontfamily.GRegular }}
                            /> */}
                        </BottomSheetScrollView>

                    </View>
                    <View style={{ flex: 0.15, justifyContent: "center" }} >
                        <Flexcomponent justifyContent="space-between" >
                            {/* <Pressable onPress={() => setReject(true)} style={{ width: "47.5%", borderWidth: 1, borderColor: Colors.red, borderRadius: borderradius * 3, paddingVertical: "4%", alignItems: "center", justifyContent: "center" }} >
                                <Text family="GMedium" size="medium" style={{ color: Colors.red }} >Reject</Text>
                            </Pressable> */}

                            {/* <Pressable onPress={() => {
                                sheetref.current?.dismiss()
                                navigation?.navigate("Addonjobdetail")
                            }} style={{ width: "100%", borderColor: Colors.red, borderRadius: borderradius * 3, paddingVertical: "4%", alignItems: "center", justifyContent: "center", backgroundColor: "#389E0D" }} >
                                <Text family="GMedium" size="medium" style={{ color: theme.white }} >Accept</Text>
                            </Pressable> */}

                            <Button
                                buttonStyle={{ width: "100%" }}
                                title="Continue"
                                onPress={() => {
                                    sheetref.current?.dismiss()
                                    navigation?.navigate("Addonjobdetail")
                                }}
                            />
                        </Flexcomponent>
                    </View>
                </View> :
                <View style={{ flex: 1, padding: "5%" }} >
                    <View style={{ flex: 0.85 }} >
                        {/* <Input
                            label={"Service Cancel Reason"}
                            labelStyle={{ fontFamily: Fontfamily.GMedium, fontSize: Fontsize.medium }}
                            containerprops={{
                                height: windowheight * 0.15,
                                justifyContent: "flex-start"
                            }}
                            placeHolder="Enter reject reason"
                        /> */}
                        <Text family="GMedium" size="medium" >Are you sure you want to cancel the service? If yes, please enter the cancellation reason.</Text>
                        {/* <Text family="GMedium" size="semilarge" >Service Cancel Reason</Text> */}
                        <View style={{ backgroundColor: "rgba(243, 243, 243, 1)", height: windowheight * 0.15, borderRadius: borderradius * 0.5, padding: "2.5%", marginTop: "2.5%", justifyContent: "flex-start" }} >
                            <BottomSheetTextInput
                                style={{ fontFamily: Fontfamily.GRegular, fontSize: Fontsize.semimedium }}
                                placeholder="Enter reject reason"
                                value={cancelReason}
                                onChangeText={setCancelReason}
                            />
                        </View>


                    </View>

                    <View style={{ flex: 0.15, justifyContent: "center" }} >
                        {isreject ?
                            <Flexcomponent justifyContent="space-around" >
                                <Button
                                    title="Back"
                                    buttonStyle={{ width: "45%", backgroundColor: "transparent", borderWidth: 1, borderColor: theme.primarytext }}
                                    textStyle={{ color: theme.primarytext }}
                                    onPress={() => {
                                        sheetref.current?.dismiss()

                                    }}
                                    disabled={isLoading}
                                />

                                <Button
                                    title="Submit"
                                    buttonStyle={{ width: "45%" }}
                                    onPress={handleSubmit}
                                    loading={isLoading}
                                />


                            </Flexcomponent> :
                            <Button
                                title="Submit"
                                buttonStyle={{ width: "100%" }}
                                onPress={() => {
                                    sheetref.current?.dismiss()
                                    dispatch(servicetype == "dailywash" ? update_dailywashstate("request") : dispatch(update_onetimewashstate("request")))
                                    navigation.navigate("Vendorhome")
                                }}
                            />}
                    </View>
                </View>}

        </Sheet>
    )
})

export default Addonrequest