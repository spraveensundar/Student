import React, { useState } from "react";
import useCustomHooks from "../../Actions/Hooks/customhook";
import styles from "./styles";
import { ImageBackground, Pressable, View } from "react-native";
import Text from "../../Components/text";
import { icons } from "../../Utilities/images";
import { windowwidth } from "../../Utilities/dimensions";
import { useAppSelector } from "../../Store/reduxHooks";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../Common/commonFunction";
import VectorIcons from "../../Utilities/vectorIcons";
import { constantData } from "../../Common/constant";

interface TimeSlotProps {
    onEdit?: () => void;
    isEditable?: boolean;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ onEdit = () => { }, isEditable = false }) => {


    const newCleaningService: any = useSelector((state: any) => state?.serviceData?.newCleaningService);


    const { theme } = useCustomHooks();
    const style = styles(theme);

    return (
        <View style={[style.container, { gap: 20 }]}>
            <View style={{ gap: 20 }}>
                <Text family="GMedium" size="semilarge">Select Time Slot
                    {
                        isEditable
                            ?
                            <>
                                <Pressable onPress={() => onEdit()}>
                                    <VectorIcons iconcolor="black" family="Feather" name="edit" size={18} />
                                </Pressable>
                            </>
                            :
                            <></>
                    }
                </Text>
                <View style={{ gap: 20, flexDirection: 'row' }}>
                    <Pressable
                        style={{
                            ...style.btn,
                            backgroundColor: theme.tabactive,
                        }}
                    >
                        <Text
                            style={{ color: theme.activetabtext }}
                            family="GMedium"
                            size="medium"
                        >
                            {capitalizeFirstLetter(newCleaningService?.selectedSlotType)}
                        </Text>
                        {
                            newCleaningService?.selectedTimeSlot?.offer > 0
                                ?
                                <>
                                    <ImageBackground
                                        source={icons.Offers}
                                        style={{
                                            width: windowwidth * 0.08,
                                            height: windowwidth * 0.08,
                                            position: 'absolute',
                                            top: -10,
                                            right: -18,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text style={{ color: '#fff', fontSize: 9, fontWeight: 'bold', textAlign: 'center' }}>
                                            {newCleaningService?.selectedTimeSlot?.offer}% Off
                                        </Text>
                                    </ImageBackground>
                                </>
                                :
                                <></>
                        }

                    </Pressable>

                </View>


            </View>

            <View style={{ gap: 20 }}>
                {
                    (newCleaningService?.from == constantData?.packageSubsriptionFrom.renew || newCleaningService?.from == constantData?.packageSubsriptionFrom.upgrade)
                        ?
                        <>
                            <Text family="GMedium" size="semilarge">
                                {
                                    newCleaningService?.from == constantData?.packageSubsriptionFrom.renew
                                        ?
                                        "This will be activated once ongoing subscription expired"
                                        :
                                        "This will be upgraded from tomorrow"
                                }
                            </Text>
                        </>
                        :
                        <>
                            <Text family="GMedium" size="semilarge">Select date</Text>
                            <View style={{ gap: 6, flexDirection: 'row' }}>

                                <Pressable key={"selectedDate"} style={[
                                    style.slotBtn,
                                    {
                                        backgroundColor: '#252525',
                                    },
                                ]}
                                >
                                    <Text family="GMedium" size="medium" style={{ color: '#CFCFCF' }}>{newCleaningService?.selectedDateSlot?.display}</Text>
                                    <Text family="GRegular" size="semismall" style={{
                                        textAlign: 'center',
                                        color: '#CFCFCF',
                                    }}
                                    >{newCleaningService?.selectedDateSlot?.day}</Text>
                                </Pressable>
                            </View>
                        </>
                }

            </View>
            <View style={{ gap: 20 }}>
                <Text family="GMedium" size="semilarge">Select slot</Text>
                <View style={{ gap: 6, flexDirection: 'row' }}>
                    <Pressable key={"selectedtime"} style={[
                        style.slotBtn,
                        {
                            backgroundColor: '#252525',
                            paddingHorizontal: 9,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            position: 'relative',
                        },
                    ]}>
                        <Text family="GMedium" size="semismall" style={{ color: '#CFCFCF' }}>
                            {newCleaningService?.selectedTimeSlot?.startTime} - {newCleaningService?.selectedTimeSlot?.endTime}
                        </Text>
                        {/* <Text family="GRegular" size="semismall" style={{
                                textAlign: 'center',
                                color: '#CFCFCF',
                            }}
                            >
                                {newCleaningService?.selectedTimeSlot.slot}</Text> */}
                        {

                            newCleaningService?.selectedTimeSlot?.offer && <ImageBackground
                                source={icons.Offers}
                                style={{
                                    width: windowwidth * 0.08,
                                    height: windowwidth * 0.08,
                                    position: 'absolute',
                                    top: -10,
                                    right: -18,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: '#fff', fontSize: 9, fontWeight: 'bold', textAlign: 'center' }}>
                                    {`${newCleaningService?.selectedTimeSlot?.offer}% Off`}
                                </Text>
                            </ImageBackground>}
                    </Pressable>
                </View>
            </View>

            {/* <View style={{ gap: 20 }}>
                <Text family="GMedium" size="semilarge">Select Time Slot</Text>
                <View style={{ gap: 20, flexDirection: 'row' }}>
                    <Pressable
                        onPress={() => setBtnSelect("Fixed")}
                        style={{
                            ...style.btn,
                            backgroundColor: btnSelect === "Fixed" ? theme.tabactive : theme.lightGrey,
                        }}
                    >
                        <Text
                            style={{ color: btnSelect === "Fixed" ? theme.activetabtext : 'black' }}
                            family="GMedium"
                            size="medium"
                        >
                            Fixed
                        </Text>
                    </Pressable>
                    {serviceType !== "onetimeCarCleaning" && (
                        <Pressable
                            onPress={() => setBtnSelect("Flexible")}
                            style={{
                                ...style.btn,
                                backgroundColor: btnSelect === "Flexible" ? theme.tabactive : theme.lightGrey,
                                position: 'relative',
                            }}
                        >
                            <Text
                                style={{ color: btnSelect === "Flexible" ? theme.activetabtext : 'black' }}
                                family="GMedium"
                                size="medium"
                            >
                                Flexible
                            </Text>

                            <ImageBackground
                                source={icons.Offers}
                                style={{
                                    width: windowwidth * 0.08,
                                    height: windowwidth * 0.08,
                                    position: 'absolute',
                                    top: -10,
                                    right: -18,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: '#fff', fontSize: 9, fontWeight: 'bold', textAlign: 'center' }}>
                                    20% Off
                                </Text>
                            </ImageBackground>

                        </Pressable>
                    )}

                </View>


            </View>
            <View style={{ gap: 20 }}>
                <Text family="GMedium" size="semilarge">Select date</Text>
                <View style={{ gap: 6, flexDirection: 'row' }}>
                    {dateSlot.map((dateSlot, index) => (
                        <Pressable key={index} onPress={() => setSelectedDateSlotIndex(index)} style={[
                            style.slotBtn,
                            {
                                backgroundColor: selectedDateSlotIndex === index ? '#252525' : theme.card,
                            },
                        ]}
                        >
                            <Text family="GMedium" size="medium" style={{ color: selectedDateSlotIndex === index ? '#CFCFCF' : theme.primarytext, }}>{dateSlot.date}</Text>
                            <Text family="GRegular" size="semismall" style={{
                                textAlign: 'center',
                                color: selectedDateSlotIndex === index ? '#CFCFCF' : theme.primarytext,
                            }}
                            >{dateSlot.day}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
            <View style={{ gap: 20 }}>
                <Text family="GMedium" size="semilarge">Select slot</Text>
                <View style={{ gap: 6, flexDirection: 'row' }}>
                    {(btnSelect === 'Fixed' ? timeSlot : flexibleTimeSlot).map((timeSlot, index) => (
                        <Pressable key={index} onPress={() => setSelectedTimeSlotIndex(index)} style={[
                            style.slotBtn,
                            {
                                backgroundColor: selectedTimeSlotIndex === index ? '#252525' : theme.card,
                                paddingHorizontal: 9,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                position: 'relative',
                            },
                        ]}>
                            <Text family="GMedium" size="semismall" style={{ color: selectedTimeSlotIndex === index ? '#CFCFCF' : theme.primarytext, }}>{timeSlot.time}</Text>
                            <Text family="GRegular" size="semismall" style={{
                                textAlign: 'center',
                                color: selectedTimeSlotIndex === index ? '#CFCFCF' : theme.primarytext,
                            }}
                            >{timeSlot.slot}</Text>
                            {timeSlot?.discount && <ImageBackground
                                source={icons.Offers}
                                style={{
                                    width: windowwidth * 0.08,
                                    height: windowwidth * 0.08,
                                    position: 'absolute',
                                    top: -10,
                                    right: -18,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: '#fff', fontSize: 9, fontWeight: 'bold', textAlign: 'center' }}>
                                    {`${timeSlot?.discount}% Off`}
                                </Text>
                            </ImageBackground>}
                        </Pressable>
                    ))}
                </View>
            </View> */}
        </View>
    )
}

export default TimeSlot;