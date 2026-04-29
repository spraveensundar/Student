import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import Text from "../../../Components/text";
import Card from "../../../Components/Card";
import Images from "../../../Utilities/images";
import { Button } from "../../../Components/Field";
import Mainview from "../../../Components/mainview";
import { Colors } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectoricons";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks, { useApihooks } from "../../../Actions/Hooks/customhook";
import { shortenText } from "../../../Utilities/helerfunction";
import { PROFILEURL } from "../../../Actions/Constant/constant";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";
import Flexcomponent from "../../../Components/flexcomponent";
import { useCashfreekycMutation, useLazyCashfreestatusQuery } from "../../../Slices/auth";
import WebviewModal from "../../../Components/DialogBox/Web";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'MyAccount'>;

const MyAccount: React.FC<Props> = () => {
    const { theme, navigation, copyData } = useCustomHooks();
    const style = styles(theme);

    const { email, referralCode, userId, profileImage, userName, role, externalKycStatus, reason } = useSelector((state: any) => state.auth.userData);
    const [cashfreekyc, { data, isLoading }] = useCashfreekycMutation()
    const [kycpopup, setKycpopup] = useState(false)
    const cashfreesubmit = async () => {
        const response = await cashfreekyc(true).unwrap()
        console.log(response, "chechec");
        if (response?.success) {
            setKycpopup(true)
        }

    }


    const [cashfreestatus] = useLazyCashfreestatusQuery()
    const kycStatus = externalKycStatus



    const { triggeruserdetails } = useApihooks()

    useEffect(() => {
        triggeruserdetails()
        cashfreestatus(true)
    }, [])
    return (
        <Mainview
            isheader={true}
            isscollable={true}
            headertitle={"My Account"}
            onleftfn={() => navigation.goBack()}
            isrefereshcontrol={true}
            onreload={() => {
                triggeruserdetails()
                cashfreestatus(true)
            }}
        >
            <View style={[style.container]}>
                <Text size={"medium"}>Accounts Details</Text>
                <Card containerStyle={{ marginTop: '8%' }}>
                    <View style={[style.between, { paddingHorizontal: "5%", paddingVertical: "2.5%" }]}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {
                                profileImage ?
                                    <Images
                                        type="image"
                                        source={{ uri: `${PROFILEURL}${profileImage}` }}
                                        width={windowwidth * 0.15}
                                        height={windowwidth * 0.15}
                                        style={{ borderRadius: 100 }}
                                        resizeMode="cover"
                                    />
                                    :
                                    <Images
                                        type="svg"
                                        name={theme.theme == "dark" ? "DarkUser" : "EmptyUser"}
                                        width={windowwidth * 0.15}
                                        height={windowwidth * 0.15}
                                    />
                            }
                            <View style={{ marginLeft: "10%" }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text family="semiBold">{userName}  </Text>
                                    {
                                        (kycStatus === "notVerified" || kycStatus === "rejected" || kycStatus == "pending") ?
                                            <VectorIcons
                                                family="MaterialDesignIcons"
                                                name="alert-decagram"
                                                size={20}
                                                iconcolor={kycStatus == "pending" ? Colors.orange : kycStatus === "notVerified" ? theme.secondarytext : Colors.red}
                                            /> :
                                            <VectorIcons
                                                family="MaterialIcons"
                                                name="verified"
                                                size={20}
                                                iconcolor={Colors.green}
                                            />
                                    }
                                </View>
                                <Text style={{ color: theme.secondarytext }}>{role}</Text>
                            </View>
                        </View>
                        <Pressable onPress={() => navigation.navigate("AccountEdit")}>
                            {
                                theme.theme === "dark" ?
                                    <Images
                                        type="svg"
                                        name="Pen"
                                        width={windowwidth * 0.05}
                                    />
                                    :
                                    <Images
                                        type="svg"
                                        name="PenDark"
                                        width={windowwidth * 0.05}
                                    />
                            }
                        </Pressable>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: theme.theme === "dark" ? Colors.dune : theme.boderColor }} />
                    <View style={[style.between, { paddingHorizontal: "5%", paddingTop: "8%" }]}>
                        <Text style={{ color: theme.secondarytext }}>User ID</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                            <Text style={{ marginRight: "8%" }}>{shortenText(userId)}</Text>
                            <Pressable onPress={() => copyData(userId)}>
                                <VectorIcons
                                    family="Ionicons"
                                    name="copy-outline"
                                    size={18}
                                />
                            </Pressable>
                        </View>
                    </View>
                    <View style={[style.between, { paddingHorizontal: "5%", marginTop: '5%' }]}>
                        <Text style={{ color: theme.secondarytext }}>Email Id</Text>
                        <Text>{email}</Text>
                    </View>

                    <View style={[style.between, { paddingHorizontal: "5%", marginTop: '5%' }]}>
                        <Text style={{ color: theme.secondarytext }}>Referral Code</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                            <Text style={{ marginRight: "8%" }}>{referralCode}</Text>
                            <Pressable onPress={() => copyData(referralCode)}>
                                <VectorIcons
                                    family="Ionicons"
                                    name="copy-outline"
                                    size={18}
                                />
                            </Pressable>
                        </View>
                    </View>

                    <View style={style.verifiedContainer}>
                        {kycStatus == "rejected" &&
                            <>
                                <Flexcomponent width={"100%"} justifyContent="flex-start" >
                                    <Text color={theme.secondarytext} >KYC status</Text>
                                    <Text color={"red"} family="semiBold" left={"7.5%"} >Rejected</Text>
                                </Flexcomponent>
                                <Flexcomponent style={{ marginBottom: "2.5%" }} width={"100%"} justifyContent="flex-start" >
                                    <Text color={theme.secondarytext} >Reason      </Text>
                                    <Text family="regular" left={"7.5%"} >{reason}</Text>
                                </Flexcomponent>
                            </>
                        }

                        {kycStatus == "pending" &&
                            <Flexcomponent style={{ marginBottom: "2.5%" }} width={"100%"} justifyContent="flex-start" >
                                <Text color={theme.secondarytext} >KYC status</Text>
                                <Text color={theme.inversetext} family="semiBold" left={"7.5%"} >{kycStatus}</Text>
                            </Flexcomponent>
                        }
                        {(kycStatus == "notVerified" || kycStatus == "rejected" || kycStatus == "pending") &&
                            <Button
                                title={(kycStatus == "rejected" || kycStatus == "pending") ? "Retry" : "Get Verified"}
                                // onPress={() => navigation.navigate("KYCVerification")}
                                onPress={() => cashfreesubmit()}
                                buttonStyle={[style.verified, { marginTop: (kycStatus == "rejected" || kycStatus == "pending") ? "2.5%" : 0 }]}
                                loading={isLoading}
                                rightContent={
                                    <View style={{ marginLeft: "8%", }}>
                                        <VectorIcons
                                            family="Ionicons"
                                            name="chevron-forward"
                                            iconcolor={Colors.white}
                                            size={18}
                                        />
                                    </View>
                                }
                            />

                        }
                    </View>
                </Card>
            </View>

            {kycpopup &&
                <WebviewModal
                    title="KYC"
                    url={data?.result?.data?.url}
                    onCloseHandler={() => {
                        triggeruserdetails()
                        setKycpopup(false)
                    }}
                />}
        </Mainview>
    )

}

export default MyAccount;