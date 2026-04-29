import React, { useRef } from "react";
import { ImageBackground, Pressable, View } from "react-native";
import CustomBottomSheet from "../../Components/CustomBottomSheet";
import useCustomHooks from "../../Actions/Hooks/customhook";
import styles from "./styles";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Text from "../../Components/text";
import Images, { icons } from "../../Utilities/images";
import { windowheight, windowwidth } from "../../Utilities/dimensions";
import UseModal from "../../Components/useModal";
import { capitalizeFirstLetter, returnOriginalFile } from "../../Common/commonFunction";

interface ChoosePremiumProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    planList: any;
    setSelectedPlanType: any;
}

const ExplorePremium: React.FC<ChoosePremiumProps> = ({
    visible,
    setVisible,
    planList,
    setSelectedPlanType = () => {},
}) => {

    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const bottomsheetref = useRef<BottomSheet>(null);

    console.log('planListplanList',planList)

    const onSelect = (planTypeDetail: any) => {
        setSelectedPlanType(planTypeDetail?._id)
        setVisible(false)
    }

    return (
        <UseModal
            visible={visible}
            setVisible={setVisible}
            containerStyle={{
                height: windowheight * 0.4,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                gap: 20
            }}
        >
            <Text family="bold" size="medium">Explore Our Premium Plan</Text>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: 10
                }}
            >
                {
                    planList.map((value: any) => {

                        return (
                            <>
                                <Pressable onPress={() => onSelect(value)}>
                                    <ImageBackground
                                        source={value?.backImage?{uri:returnOriginalFile(value?.backImage)}:icons.StdBg}
                                        borderRadius={28}
                                        style={{
                                            width: windowwidth * 0.4,
                                            height: windowheight * 0.12,
                                            marginBottom: 15,
                                        }}
                                    >
                                        <View style={{ padding: 10 }}>
                                            <View style={[style.premLg]}>
                                                <Images type="image" source={value?.frontImage?{uri:returnOriginalFile(value?.frontImage)}:icons.SPremium} style={style.image} />
                                            </View>
                                            <Text style={{ marginLeft: "10%" }} family="GBold" size="semimedium" color="white">{capitalizeFirstLetter(value?.planName)}</Text>
                                        </View>
                                    </ImageBackground>
                                </Pressable>
                            </>
                        )
                    })
                }
                <Pressable onPress={() => onSelect({all:"all"})}>
                    <ImageBackground
                        source={icons.StdBg}
                        borderRadius={28}
                        style={{
                            width: windowwidth * 0.4,
                            height: windowheight * 0.12,
                            marginBottom: 15,
                        }}
                    >
                        <View style={{ padding: 10 }}>
                            <View style={[style.premLg]}>
                                <Images type="image" source={icons.SPremium} style={style.image} />
                            </View>
                            <Text style={{ marginLeft: "10%" }} family="GBold" size="semimedium" color="#1C5E3F">All</Text>
                        </View>
                    </ImageBackground>
                </Pressable>
                {/* <Pressable onPress={() => setVisible(false)}>
                    <ImageBackground
                        source={icons.StdBg}
                        borderRadius={28}
                        style={{
                            width: windowwidth * 0.4,
                            height: windowheight * 0.12,
                            marginBottom: 15,
                        }}
                    >
                        <View style={{ padding: 10 }}>
                            <View style={[style.premLg]}>
                                <Images type="image" source={icons.SPremium} style={style.image} />
                            </View>
                            <Text style={{ marginLeft: "10%" }} family="GBold" size="semimedium" color="#1C5E3F">Standard</Text>
                        </View>
                    </ImageBackground>
                </Pressable>
                <Pressable onPress={() => setVisible(false)}>
                    <ImageBackground
                        source={icons.PrmBg}
                        borderRadius={28}
                        style={{
                            width: windowwidth * 0.4,
                            marginBottom: 15,
                            height: windowheight * 0.12,
                        }}
                    >
                        <View style={{ padding: 10 }}>
                            <View style={[style.premLg]}>
                                <Images type="image" source={icons.PrmPlan} style={style.image} />
                            </View>
                            <Text style={{ marginLeft: "10%" }} family="GBold" size="semimedium" color="#5E06FF">Premium</Text>
                        </View>
                    </ImageBackground>
                </Pressable>
                <Pressable onPress={() => setVisible(false)}>
                    <ImageBackground
                        source={icons.EliteBg}
                        borderRadius={28}
                        style={{
                            width: windowwidth * 0.4,
                            marginBottom: 15,
                            height: windowheight * 0.12,
                        }}
                    >
                        <View style={{ padding: 10, }}>
                            <View style={[style.premLg]}>
                                <Images type="image" source={icons.Elite} style={style.image} />
                            </View>
                            <Text style={{ marginLeft: "10%" }} family="GBold" size="semimedium" color="#E61700">Elite</Text>
                        </View>
                    </ImageBackground>
                </Pressable> */}

            </View>
        </UseModal>

    )
}

export default ExplorePremium;