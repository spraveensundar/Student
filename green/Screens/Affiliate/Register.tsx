import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Text from "../../Components/text";
import Mainview from "../../Components/mainview";
import { athuDataProps } from "../../Actions/type";
import Images, { image } from "../../Utilities/images";
import useApiError from "../../Actions/Hooks/errorhook";
import AllCountriesList from "../../Utilities/countryList";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { useAffiliateRegisterMutation } from "../../Slices/affiliate";
import { windowheight, windowwidth } from "../../Utilities/dimensions";
import { Stacknavigationtypes } from "../../Navigations/navigationtypes";
import { Button, Dropdown, Input, Textarea } from "../../Components/Field";

import styles from "./styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'AffiliateRegister'>;

const AffiliateRegister: React.FC<Props> = () => {
    const { theme, successtoast, failuretoast, navigation } = useCustomHooks();
    const style = styles(theme);
    const [activeTab, setActiveTab] = useState(1);

    const initialUserData: athuDataProps = useMemo(() => ({
        fullName: {
            value: '',
            rules: { required: true },
            messages: { required: 'Last name is required!' },
            isValid: true,
        },
        contactInformation: {
            value: '',
            rules: { required: true },
            messages: {
                required: 'Email is required!',
                email: 'Invalid email address!!',
            },
            isValid: true,
        },
        referralCode: {
            value: '',
            rules: { required: true },
            messages: {
                required: 'Password is required!',
            },
            isValid: true,
        },
        channelDetails: {
            value: '',
            rules: { required: true, equalTo: 'password' },
            messages: {
                required: 'Confirm password is required!', equalTo: 'Not matches with password',
            },
            isValid: true,
        },
        promotionIdeas: {
            value: '',
            rules: { required: true },
            messages: {
                required: 'Date of birth is required'
            },
            isValid: true,
        },
        followersCount: {
            value: '',
            rules: { required: false },
            isValid: true,
        },
        tradingExperience: {
            value: '',
            rules: { required: false },
            isValid: true,
        },
        youtube: {
            value: '',
            rules: { required: false },
            isValid: true,
        },
        telegram: {
            value: '',
            rules: { required: false },
            isValid: true,
        },
        discord: {
            value: '',
            rules: { required: false },
            isValid: true,
        },
        instagram: {
            value: '',
            rules: { required: false },
            isValid: true,
        },
        twitch: {
            value: '',
            rules: { required: false },
            isValid: true,
        },
        x: {
            value: '',
            rules: { required: false },
            isValid: true,
        },
    }), []);

    const [userData, setUserData] = useState<athuDataProps>(initialUserData);
    const [country, setContury] = useState("")

    const [register, { isLoading, error }] = useAffiliateRegisterMutation()

    useApiError(error ?? false);

    const handleSubmit = async () => {
        const payload: any = {
            "placeOfResidence": country,
            "fullName": userData.fullName?.value,
            "contactInformation": userData.contactInformation?.value,
            "referralCode": userData.referralCode?.value,
            "channelDetails": userData.channelDetails?.value,
            "promotionIdeas": userData.promotionIdeas?.value,
            "followersCount": userData.followersCount?.value,
            "tradingExperience": userData.tradingExperience?.value,
            "youtube": userData.youtube?.value,
            "telegram": userData.telegram?.value,
            "discord": userData.discord?.value,
            "instagram": userData.instagram?.value,
            "twitch": userData.twitch?.value,
            "facebook": userData.facebook?.value,
            "x": userData.x?.value
        };
        console.log(payload, "payload")
        const response = await register(payload).unwrap()
        if (response.success) {
            successtoast("Success", response.message);
            navigation.goBack();
        } else {
            failuretoast("Error", "Something went wrong!");
        }
    }

    return (
        <Mainview
            isheader={true}
            isscollable={true}
            headertitle={"GreenX Affiliate"}
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={{ paddingHorizontal: "6%", marginBottom: "5%" }}>
                    {activeTab === 1 || activeTab === 2 ? (
                        <Button
                            title="Next"
                            onPress={() => setActiveTab(activeTab + 1)}
                        />
                    ) : activeTab === 3 ? (
                        <Button
                            loading={isLoading}
                            title="Submit"
                            onPress={() => handleSubmit()}
                        />
                    ) : null}
                </View>}
        >
            <View style={style.container}>
                <View style={style.tabContainer}>
                    {[1, 2, 3].map((item) => (
                        <React.Fragment key={item}>
                            <Pressable style={[style.circle, activeTab === item && style.activeCircle]} onPress={() => setActiveTab(item)}>
                                <Text style={[style.circleText, activeTab === item && style.activeText]}>
                                    {item}
                                </Text>
                            </Pressable>
                            {item !== 3 && <View style={style.line} />}
                        </React.Fragment>
                    ))}
                </View>
                {
                    activeTab === 1 && (
                        <View style={{ marginTop: '10%' }}>
                            <Text size="medium" style={{ marginBottom: "5%" }}>Your contact information</Text>
                            <Input
                                placeHolder="Your Name"
                                value={userData.fullName?.value}
                                onChange={(text: any) => setUserData(prev => ({ ...prev, fullName: { ...prev.fullName, value: text } }))}
                            />
                            <Input
                                placeHolder="Contact information"
                                value={userData.contactInformation?.value}
                                onChange={(text: any) => setUserData(prev => ({ ...prev, contactInformation: { ...prev.contactInformation, value: text } }))}
                            />
                            <Input
                                label="Referral Code"
                                placeHolder="Enter Referral Code"
                                value={userData.referralCode?.value}
                                onChange={(text: any) => setUserData(prev => ({ ...prev, referralCode: { ...prev.referralCode, value: text } }))}
                            />
                            <View style={{ marginTop: "5%" }}>
                                <Text size="medium" style={{ marginBottom: "5%" }}>Place of Residence</Text>
                                <Dropdown
                                    list={AllCountriesList}
                                    placeholder={"Select Countries"}
                                    value={country}
                                    onChange={(value) => {
                                        setContury(value?.value)
                                    }}
                                />
                            </View>
                        </View>
                    )
                }
                {
                    activeTab === 2 && (
                        <View style={{ marginTop: '10%' }}>
                            <Text size="medium" style={{ marginBottom: "5%" }}>Your Social Channels</Text>
                            <Input
                                placeHolder="Youtube channel link"
                                leftContent={
                                    <Images
                                        type="image"
                                        source={image.Youtubes}
                                        width={windowwidth * 0.070}
                                        height={windowheight * 0.070}
                                    />
                                }
                                style={{ marginLeft: -10 }}
                                value={userData.youtube?.value}
                                onChange={(text: any) => setUserData(prev => ({ ...prev, youtube: { ...prev.youtube, value: text } }))}

                            />
                            <Input
                                placeHolder="X Profile link"
                                leftContent={
                                    <Images
                                        type="image"
                                        source={image.Twitter}
                                        width={windowwidth * 0.070}
                                        height={windowheight * 0.070}
                                    />
                                }
                                style={{ marginLeft: -10 }}
                                value={userData.x?.value}
                                onChange={(text: any) => setUserData(prev => ({ ...prev, x: { ...prev.x, value: text } }))}
                            />
                            <Input
                                placeHolder="Telegram group link"
                                leftContent={
                                    <Images
                                        type="image"
                                        source={image.Telegram}
                                        width={windowwidth * 0.070}
                                        height={windowheight * 0.070}
                                    />
                                }
                                style={{ marginLeft: -10 }}
                                value={userData.telegram?.value}
                                onChange={(text: any) => setUserData(prev => ({ ...prev, telegram: { ...prev.telegram, value: text } }))}
                            />
                            <Input
                                placeHolder="Discord group link"
                                leftContent={
                                    <Images
                                        type="image"
                                        source={image.Discord}
                                        width={windowwidth * 0.070}
                                        height={windowheight * 0.070}
                                    />
                                }
                                style={{ marginLeft: -10 }}
                                value={userData.discord?.value}
                                onChange={(text: any) => setUserData(prev => ({ ...prev, discord: { ...prev.discord, value: text } }))}
                            />
                            <Input
                                placeHolder="Instagram profile link"
                                leftContent={
                                    <Images
                                        type="image"
                                        source={image.Inta}
                                        width={windowwidth * 0.070}
                                        height={windowheight * 0.070}
                                    />
                                }
                                style={{ marginLeft: -10 }}
                                value={userData.instagram?.value}
                                onChange={(text: any) => setUserData(prev => ({ ...prev, instagram: { ...prev.instagram, value: text } }))}
                            />
                            <Input
                                placeHolder="Twich profile link"
                                leftContent={
                                    <Images
                                        type="image"
                                        source={image.Twich}
                                        width={windowwidth * 0.070}
                                        height={windowheight * 0.070}
                                    />
                                }
                                style={{ marginLeft: -10 }}
                                value={userData.twitch?.value}
                                onChange={(text: any) => setUserData(prev => ({ ...prev, twitch: { ...prev.twitch, value: text } }))}
                            />
                            <Input
                                placeHolder="Facebook profile link"
                                leftContent={
                                    <Images
                                        type="image"
                                        source={image.Facebook}
                                        width={windowwidth * 0.070}
                                        height={windowheight * 0.070}
                                    />
                                }
                                style={{ marginLeft: -10 }}
                                value={userData.facebook?.value}
                                onChange={(text: any) => setUserData(prev => ({ ...prev, facebook: { ...prev.facebook, value: text } }))}
                            />
                        </View>
                    )
                }
                {
                    activeTab === 3 && (
                        <View style={{ marginTop: '10%' }}>
                            <Text size="medium" style={{ marginBottom: "5%" }}>Other Information</Text>
                            <Textarea
                                label="Channel Details"
                                value={userData.channelDetails?.value}
                                onChange={(text: any) => setUserData(prev => ({ ...prev, channelDetails: { ...prev.channelDetails, value: text } }))}
                            />

                            <Textarea
                                label="Promotion Ideas"
                                value={userData.promotionIdeas?.value}
                                onChange={(text: any) => setUserData(prev => ({ ...prev, promotionIdeas: { ...prev.promotionIdeas, value: text } }))}
                            />

                            <Input
                                label="Followers Count"
                                value={userData.followersCount?.value}
                                onChange={(text: any) => setUserData(prev => ({ ...prev, followersCount: { ...prev.followersCount, value: text } }))}
                            />
                            <Input
                                label="Trading Experience"
                                value={userData.tradingExperience?.value}
                                onChange={(text: any) => setUserData(prev => ({ ...prev, tradingExperience: { ...prev.tradingExperience, value: text } }))}
                            />
                        </View>
                    )
                }
            </View>
        </Mainview>
    )

}

export default AffiliateRegister;