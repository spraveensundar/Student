import React, { useMemo, useRef, useState } from "react"
import Bottomsheet from "../../../Components/bottomsheet"
import BottomSheet from "@gorhom/bottom-sheet"
import { View } from "react-native"
import Flexcomponent from "../../../Components/flexcomponent"
import Text from "../../../Components/text"
import { RFvalue, windowheight, windowwidth } from "../../../Utilities/dimensions"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import Switch from "../../../Components/Field/switch/swtich"
import Lottie from "../../../Components/lottieview"
import Images, { icons, lotties } from "../../../Utilities/images"
import Card from "../../../Components/Card"
import { useSelector } from "react-redux"
import { helperSelector, update_onetimewashstate } from "../../../Slices/helper"
import { Button } from "../../../Components/Field"

interface onetimeprops {

}

const Onetimedashboard: React.FC<onetimeprops> = React.memo(({
}) => {
    const bottomsheetref = useRef<BottomSheet>(null)
    const { theme, dispatch } = useCustomHooks()
    const { onetimewashstate } = useSelector(helperSelector)
    const [isonline, setIsonline] = useState(onetimewashstate == "request" ? true : false)
    const { navigation } = useCustomHooks()
    const snappoint = useMemo(() => {
        if (isonline) return ["45%"]
        else return ["40%"]
    }, [isonline])
    return (
        <Bottomsheet
            sheetref={bottomsheetref}
            snappoint={snappoint}
        >
            <View style={{ padding: "5%", flex: 1 }} >
                <Flexcomponent >
                    <View style={{ width: "75%", }} >
                        <Text family="GMedium" style={{ fontSize: RFvalue(15) }} >Switch to {!isonline ? "Online" : "Offline"}</Text>
                        {/* <Text family="GRegular" color={theme.green1} >10 Work Assigned</Text> */}
                    </View>
                    <View style={{ width: "25%", justifyContent: "center", alignItems: "flex-end" }} >
                        <Switch
                            value={isonline}
                            onPress={() => {
                                if (isonline) dispatch(update_onetimewashstate("request"))
                                dispatch(update_onetimewashstate("offine"))
                                setIsonline(!isonline)
                            }}
                        />
                    </View>
                </Flexcomponent>

                {/* {!isonline ? */}
                <>
                    <Lottie
                        src={lotties.Onetimereq}
                        width={windowwidth * 0.7}
                        height={windowheight * 0.2}
                    />
                    
                    <Text top={"2.5%"} style={{ textAlign: "center", width: "70%", alignSelf: "center" }} family="GRegular" >{ !isonline ? "Please enable your location to find nearby car wash services quickly." :"Tap to view the service request and get started."}</Text>
                    {isonline ?
                        <Button
                            title="View Service Request"
                            buttonStyle={{ width: "100%", marginTop: "5%" }}
                            onPress={() => navigation.navigate("Servicerequest")}
                        /> : null

                    }
                </>
                {/* :
                    <>
                        <Flexcomponent justifyContent="space-between" top={"5%"}  >
                            <Card containerStyle={{ padding: "5%", width: "47.5%" }} >
                                <Images
                                    type="image"
                                    source={icons.Home}
                                />
                                <Text size="semimedium" top={"7.5%"} >Service at home</Text>
                                <Text size="semimedium" family="GRegular" top={"2.5%"} >8 Work Assigned</Text>

                            </Card>

                            <Card containerStyle={{ padding: "5%", width: "47.5%" }} >
                                <Images
                                    type="image"
                                    source={icons.Office}
                                />
                                <Text size="semimedium" top={"7.5%"} >Service at office</Text>
                                <Text size="semimedium" family="GRegular" top={"2.5%"} >2 Work Assigned</Text>

                            </Card>
                        </Flexcomponent>

                        <Button
                            title="View Service Request"
                            buttonStyle={{ width: "100%", marginTop: "5%" }}
                            onPress={() => navigation.navigate("Servicerequest")}
                        />
                    </>} */}
            </View>
        </Bottomsheet>
    )
})


export default Onetimedashboard