import React, { useState } from "react";
import { View, Pressable, TextInput } from 'react-native';
import useCustomHooks from "../../Actions/Hooks/customhook";
import FastImage from '@d11/react-native-fast-image';
import styles from "../Home/styles";
import { icons, lotties } from "../../Utilities/images";
import Text from "../../Components/text";
import VectorIcons from "../../Utilities/vectorIcons";
import { Colors } from "../../Utilities/uiasset";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Lottie from "../../Components/lottieview";
import { windowwidth } from "../../Utilities/dimensions";
import { isEmpty, loginCheck, toastFn } from "../../Common/commonFunction";
import { useSelector } from "react-redux";

const HomeHeader: React.FC = () => {


    const userData = useSelector((state:any)=>state?.userData);


    const { theme, navigation } = useCustomHooks()
    const style = styles(theme);

    
    const [serviceSearch, setServiceSearch] = useState<string>('');
    

    const handleServiceSearch = (text: string) => {
        setServiceSearch(text);
    }

    const noAccessRedirect = (navigateTo: any) => {
        if (navigateTo) {
            if (loginCheck()) {
                return navigation.navigate(navigateTo);
            }
            toastFn("Login to view this");
            return navigation.navigate("Login", { redirectTo: navigateTo });
        }
    }

    console.log('userDatauserData',userData)

    return (
        <View style={style.homeHeaderContainer}>
            <View style={style.topRow}>
                <View style={style.leftSection}>
                    {/* <FastImage
                        style={style.log}
                        source={icons.Log}
                    /> */}
                    <Pressable
                        onPress={() => navigation.navigate("MyAddress")}
                    >
                        <View>
                            <Lottie
                                src={lotties.locationpin}
                                style={style.log}
                            />
                        </View>
                    </Pressable>
                    {/* <Lottie
                        src={lotties.locationpin}
                        style={style.log}
                    /> */}
                    <Pressable
                        onPress={() => navigation.navigate("MyAddress")}
                    >
                        {
                            isEmpty(userData?.currentAddress)
                                ?
                                <>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text color="white" family="medium" size="semimedium">Choose location</Text>
                                        <Pressable style={style.locationPress}>
                                        </Pressable>
                                    </View>
                                </>
                                :
                                <>

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text color="white" family="medium" size="semimedium">{userData?.currentAddress?.city}</Text>
                                        <Pressable style={style.locationPress}>
                                            <VectorIcons
                                                iconcolor="white"
                                                family="Ionicons"
                                                name="chevron-down"
                                                size={windowwidth * 0.04}
                                            />
                                            <Text color="white" size="semimedium">
                                                {userData?.currentAddress?.sector ? `${userData?.currentAddress?.sector}, ` : ""}{userData?.currentAddress?.city}
                                            </Text>
                                        </Pressable>
                                    </View>
                                </>
                        }
                    </Pressable>

                    
                </View>

                <Pressable style={style.notification} onPress={() => noAccessRedirect("HomeNotification")}>
                    <FontAwesome5Icon
                        name="bell"
                        size={20}
                        color={theme.btnColor}
                        solid
                    />
                </Pressable>
            </View>
            <Text color={Colors.yellow} size="semilarge">How can I help you today?</Text>
            <View style={style.searchContainer}>
                <VectorIcons
                    family="Feather"
                    name="search" size={20}
                    iconcolor={Colors.lightGreyy}
                />
                <TextInput
                    style={style.searchInput}
                    placeholder="looking for a service"
                    placeholderTextColor={Colors.lightGreyy}
                    value={serviceSearch}
                    onChangeText={handleServiceSearch}
                />
            </View>
        </View>

    )
}

export default HomeHeader;