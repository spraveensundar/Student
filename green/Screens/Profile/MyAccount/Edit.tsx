import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import Card from "../../../Components/Card";
import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import Mainview from "../../../Components/mainview";
import { Fontsize } from "../../../Utilities/uiasset";
import useApiError from "../../../Actions/Hooks/errorhook";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks, { useApihooks } from "../../../Actions/Hooks/customhook";
import { getMimeType } from "../../../Utilities/helerfunction";
import { Button, FileUpload } from "../../../Components/Field";
import { PROFILEURL } from "../../../Actions/Constant/constant";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";
import { useLazyCashfreestatusQuery, useLazyChangeOldMobileNumberQuery, useLazyUserDetailsQuery, useUpdateSettingsMutation } from "../../../Slices/auth";

import { styles } from "../styles";
import Confirm from "../Security/Helpers/Confirm";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'AccountEdit'>;

const AccountEdit: React.FC<Props> = () => {
    const { theme, navigation, successtoast, failuretoast, copyData, bottomsheetref, openbottomsheet, closebottomsheet } = useCustomHooks();
    const style = styles(theme);
    const bottomref = useRef<BottomSheetModal>(null);
    const { email, referralCode, userId, profileImage, firstName, lastName, mobileNumber, countryCode } = useSelector((state: any) => state.auth.userData);
    const [frontImage, setFrontImage] = useState<{ uri: string, fileName: string } | false | undefined>();

    const [update, { error, isLoading }] = useUpdateSettingsMutation();
    const { triggeruserdetails } = useApihooks();

    console.log("frontImage", profileImage)

    useApiError(error ?? false);

    const handleSubmit = async (type: any) => {
        if (!frontImage) return;
        const formData = new FormData();
        formData.append("attachment", {
            uri: frontImage.uri,
            name: frontImage.fileName,
            type: getMimeType(frontImage.fileName),
        } as any);
        formData.append("type", "profile");
        formData.append("profilestatus", type);
        console.log("formData", formData)
        const response = await update(formData).unwrap();
        if (response.success) {
            triggeruserdetails()
            successtoast("Success", response.message)
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    const [changePhone, { data }] = useLazyChangeOldMobileNumberQuery();
    useEffect(() => {
        if (!data) return;
        console.log("API Response:", data);
        if (data?.result?.data?.success) {
            successtoast("Success", data.result.data.message);
            navigation.navigate("ChangeNumber");
        } else {
            failuretoast("Error", data?.result?.data?.message || "Something went wrong!");
        }
    }, [data]);


    const handleChangePhone = async () => {
        try {
            await changePhone(true);
            console.log("API called successfully");
        } catch (error) {
            console.error("Error calling API:", error);
            failuretoast("Error", "Request failed!");
        }
    };


    useEffect(() => {
        if (frontImage) {
            handleSubmit("add")
            triggeruserdetails()
        }
    }, [frontImage])


    console.log(`${PROFILEURL}${profileImage}`, "profileImages")
    return (
        <Mainview
            isheader={true}
            isscollable={true}
            headertitle={"Profile Settings"}
            scrollprops={{
                contentContainerStyle: {
                    flexGrow: 1
                }
            }}
            onleftfn={() => navigation.goBack()}
        >
            <View style={style.container}>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View>
                        {
                            profileImage ?
                                <Images
                                    type="image"
                                    source={{ uri: `${PROFILEURL}${profileImage}` }}
                                    width={windowwidth * 0.18}
                                    height={windowwidth * 0.18}
                                    style={{ borderRadius: 100, }}
                                    resizeMode="cover"

                                />
                                :
                                <Images
                                    type="svg"
                                    name={theme.theme == "dark" ? "DarkUser" : "EmptyUser"}
                                    width={windowwidth * 0.18}
                                    height={windowwidth * 0.18}
                                />
                        }
                    </View>
                    <View style={profileImage && { marginRight: -60 }}>
                        <FileUpload
                            source="sheet"
                            mediaData={frontImage}
                            preview={false}
                            component={
                                <Card containerStyle={style.card}>
                                    <Text style={{ fontSize: Fontsize.small, color: theme.darktext }}>Change</Text>
                                </Card>
                            }
                            onChange={(data) => {
                                setFrontImage(data);
                            }}

                        />
                    </View>
                    {
                        profileImage && (
                            <Button
                                title="Remove"
                                onPress={() => handleSubmit("remove")}
                                buttonStyle={style.changes}
                                loading={isLoading}
                                textStyle={{ fontSize: Fontsize.small, color: theme.darktext }}
                            />
                        )
                    }
                </View>


                <View style={[style.between, { marginTop: '8%' }]}>
                    <View>
                        <Text style={{ color: theme.secondarytext }}>Display Name</Text>
                        <Text style={{ marginTop: "5%" }}>{firstName}-{lastName}</Text>
                    </View>
                    <Button
                        title="Change"
                        onPress={() => navigation.navigate("UpdateName")}
                        buttonStyle={style.changes}
                        textStyle={{ fontSize: Fontsize.small, color: theme.darktext }}
                    />
                </View>



                <View style={[style.between, { marginTop: '8%' }]}>
                    <View>
                        <Text style={{ color: theme.secondarytext }}>Email Address</Text>
                        <Text style={{ marginTop: "5%" }}>{email}</Text>
                    </View>
                    <Button
                        title="Change"
                        onPress={() => openbottomsheet(bottomsheetref)}
                        buttonStyle={style.changes}
                        textStyle={{ fontSize: Fontsize.small, color: theme.darktext }}
                    />
                </View>

                <View style={[style.between, { marginTop: '8%' }]}>
                    <View>
                        <Text style={{ color: theme.secondarytext }}>User ID</Text>
                        <Text style={{ marginTop: "5%" }}>{userId}</Text>
                    </View>
                </View>

                <View style={[style.between, { marginTop: '8%' }]}>
                    <View>
                        <Text style={{ color: theme.secondarytext }}>Referral Code</Text>
                        <Text style={{ marginTop: "5%" }}>{referralCode}</Text>
                    </View>
                    <Button
                        title="Copy"
                        onPress={() => copyData(referralCode)}
                        buttonStyle={style.changes}
                        textStyle={{ fontSize: Fontsize.small, color: theme.darktext }}
                    />
                </View>

                <View style={[style.between, { marginTop: '8%' }]}>
                    <View>
                        <Text style={{ color: theme.secondarytext }}>Login password</Text>
                        <Text style={{ marginTop: "5%" }}>*************</Text>
                    </View>
                    <Button
                        title="Change"
                        onPress={() => navigation.navigate("UpdatePassword")}
                        buttonStyle={style.changes}
                        textStyle={{ fontSize: Fontsize.small, color: theme.darktext }}
                    />
                </View>

                {
                    mobileNumber ? (
                        <View style={[style.between, { marginTop: '8%' }]}>
                            <View>
                                <Text style={{ color: theme.secondarytext }}>Mobile number</Text>
                                <Text style={{ marginTop: "5%" }}>+{countryCode} {mobileNumber}</Text>
                            </View>
                            <Button
                                title="Change"
                                onPress={() => { openbottomsheet(bottomref) }}
                                buttonStyle={style.changes}
                                textStyle={{ fontSize: Fontsize.small, color: theme.darktext }}
                            />
                        </View>
                    ) : (
                        <View style={[style.between, { marginTop: '8%' }]}>
                            <View>
                                <Text style={{ color: theme.secondarytext }}>Registered mobile number</Text>
                            </View>
                            <Button
                                title="Add"
                                onPress={() => { navigation.navigate("RegisterNumber") }}
                                buttonStyle={style.changes}
                                textStyle={{ fontSize: Fontsize.small, color: theme.darktext }}
                            />
                        </View>
                    )
                }
            </View>

            <Confirm
                ref={bottomsheetref}
                title={"Are You Sure You Want to Change Your Email Address?"}
                description={"withdrawal will be temporarily disabled for 24 hours after any change in your password, mobile number, or email."}
                cancel={() => closebottomsheet(bottomsheetref)}
                confirm={() => { navigation.navigate("UpdateEmail"), closebottomsheet(bottomsheetref) }}
            />

            <Confirm
                ref={bottomref}
                title={"Are You Sure You Want to Change Your Phone Number?"}
                description={"withdrawal will be temporarily disabled for 24 hours after any change in your password, mobile number, or email."}
                cancel={() => closebottomsheet(bottomref)}
                confirm={() => { handleChangePhone(), navigation.navigate("ChangeNumber"), closebottomsheet(bottomref) }}
            />
        </Mainview>
    )

}

export default AccountEdit;