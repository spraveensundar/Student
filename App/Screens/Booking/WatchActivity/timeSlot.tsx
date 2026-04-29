import React, { useEffect, useState } from "react";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import styles from "./styles";
import { ImageBackground, Pressable, View } from "react-native";
import Text from "../../../Components/text";
import { useSelector } from "react-redux";
import { constantData } from "../../../Common/constant";
import { capitalizeFirstLetter, dateToDateMonth, returnDay } from "../../../Common/commonFunction";


type TimeSlotProps = {
    subscriptionDetail?: any;
    serviceDetail?: any;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ subscriptionDetail, serviceDetail }) => {


    const serviceType = useSelector(
        (state: any) => state.serviceData.cleaningType,
    );

    const [btnSelect, setBtnSelect] = useState("Fixed");
    const [selectedDateSlotIndex, setSelectedDateSlotIndex] = useState<number | null>(0);
    const [selectedTimeSlotIndex, setSelectedTimeSlotIndex] = useState<number | null>(2);
    const [ serviceTimeData, setServiceTimeData ] = useState<any>({})

    const dateSlot = [
        { day: "Friday", date: "10 Oct" },
        { day: "Saturday", date: "11 Oct" },
        { day: "Sunday", date: "12 Oct" },
        { day: "Monday", date: "13 Oct" },
        { day: "Tuesday", date: "14 Oct" },
    ];

    const timeSlot: { time: string, slot: string, discount?: number }[] = [
        { time: "05 - 06", slot: "AM" },
        { time: "06 - 07", slot: "AM" },
        { time: "07 - 08", slot: "AM" },
        { time: "08 - 09", slot: "AM" },
        { time: "10 - 11", slot: "AM" },
    ];

    const flexibleTimeSlot: { time: string, slot: string, discount?: number }[] = [
        { time: "09 - 12", slot: "AM" },
        { time: "12 - 01", slot: "PM", discount: 20 },
    ]

    const { theme } = useCustomHooks();
    const style = styles(theme);


    console.log('subscriptionDetailsubscriptionDetail',subscriptionDetail,serviceDetail)

    useEffect(()=> {
        let setData = {
            date: new Date(serviceDetail?.date),
            day: returnDay(new Date(serviceDetail?.date).getDay()),
            dateDisplay: dateToDateMonth(serviceDetail?.date),
            serviceStartTime: subscriptionDetail?.serviceStartTime,
            serviceEndTime: subscriptionDetail?.serviceEndTime,
        };
        setServiceTimeData(setData);
    },[subscriptionDetail,serviceDetail])

    return (
        <View style={[style.container, { gap: 20 }]}>

            <View style={{ gap: 20 }}>
                <Text family="GMedium" size="semilarge">Select Time Slot</Text>
                <View style={{ gap: 20, flexDirection: 'row' }}>
                    <Pressable
                        style={{
                            ...style.btn,
                            backgroundColor: theme.tabactive,
                        }}
                    >
                        <Text
                            style={{ color: btnSelect === "Fixed" ? theme.activetabtext : 'black' }}
                            family="GMedium"
                            size="medium"
                        >
                            {capitalizeFirstLetter(subscriptionDetail?.slotType)}
                        </Text>
                    </Pressable>

                </View>


            </View>

            <View style={{ gap: 20 }}>
                <Text family="GMedium" size="semilarge">Select date</Text>
                <View style={{ gap: 6, flexDirection: 'row' }}>

                    <Pressable key={0} style={[
                        style.slotBtn,
                        {
                            backgroundColor: '#252525',
                        },
                    ]}
                    >
                        <Text family="GMedium" size="medium" style={{ color: '#CFCFCF', }}>
                            {serviceTimeData?.dateDisplay}
                        </Text>
                        <Text family="GRegular" size="semismall" style={{
                            textAlign: 'center',
                            color: '#CFCFCF',
                        }}
                        >{serviceTimeData.day}</Text>
                    </Pressable>
                </View>
            </View>

            <View style={{ gap: 20 }}>
                <Text family="GMedium" size="semilarge">Select slot</Text>
                <View style={{ gap: 6, flexDirection: 'row' }}>
                    
                        <Pressable key={0} style={[
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
                            <Text family="GMedium" size="semismall" style={{ color: '#CFCFCF', }}>{serviceTimeData.serviceStartTime?.display} - {serviceTimeData.serviceEndTime?.display}</Text>
                            {/* <Text family="GRegular" size="semismall" style={{
                                textAlign: 'center',
                                color: '#CFCFCF',
                            }}
                            >{timeSlot.slot}</Text> */}
                            {/* {
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
                                    {`${timeSlot?.discount}% Off`}
                                </Text>
                            </ImageBackground>
                            } */}
                        </Pressable>
                </View>
            </View>

        </View>
    )
}

export default TimeSlot;