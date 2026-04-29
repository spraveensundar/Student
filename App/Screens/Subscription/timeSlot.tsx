import React, { useCallback, useEffect, useState } from "react";
import Mainview from "../../Components/mainview";
import useCustomHooks from "../../Actions/Hooks/customhook";
import styles from "./styles";
import { ImageBackground, Pressable, View } from "react-native";
import Text from "../../Components/text";
import { icons } from "../../Utilities/images";
import { windowwidth } from "../../Utilities/dimensions";
import { Button } from "../../Components/Field";

import { useDispatch, useSelector } from "react-redux";
import { useGetTimeSlotsListQuery } from "../../Common/redux/vehicleServiceHook";
import { useFocusEffect } from "@react-navigation/native";
import { getNextDatesWithDay, isEmpty, minuteHourFormat, numberChange, returnArrayOnly, toastFn } from "../../Common/commonFunction";
import ErrorText from "../../Components/ErrorText";
import { setNewCleaningService } from "../../Common/redux/serviceReducer";
import { constantData } from "../../Common/constant";


let defaultFormData = {
    selectedSlotType: "fixed",
    selectedDateSlot: {},
    selectedTimeSlot: {},
}

const TimeSlot: React.FC = () => {


    const { data, refetch } = useGetTimeSlotsListQuery({ slotType: "all" });
    const newCleaningService = useSelector((state: any) => state?.serviceData?.newCleaningService)
    const dispatch = useDispatch();



    const [formData, setFormData] = useState<any>(defaultFormData)
    const [validateErrors, setValidateErrors] = useState<any>({});
    const [dateSlot, setDateSlot] = useState(returnArrayOnly(getNextDatesWithDay(5,true,4)));
    const [slots, setSlots] = useState<any>({ fixedMaxCoupon: {}, flexibleMaxCoupon: {}, fixedTimeSlots: [], flexibleTimeSlots: [], });



    const fixedTimeSlots = slots?.fixedTimeSlots,
        flexibleTimeSlots = slots?.flexibleTimeSlots,
        fixedMaxCoupon = slots?.fixedMaxCoupon,
        flexibleMaxCoupon = slots?.flexibleMaxCoupon;


    // const dateSlot = [
    //     { day: "Friday", date: "10 Oct" },
    //     { day: "Saturday", date: "11 Oct" },
    //     { day: "Sunday", date: "12 Oct" },
    //     { day: "Monday", date: "13 Oct" },
    //     { day: "Tuesday", date: "14 Oct" },
    // ];

    // const timeSlot: { time: string, slot: string, discount?: number }[] = [
    //     { time: "05 - 06", slot: "AM" },
    //     { time: "06 - 07", slot: "AM" },
    //     { time: "07 - 08", slot: "AM" },
    //     { time: "08 - 09", slot: "AM" },
    //     { time: "10 - 11", slot: "AM" },
    // ];

    // const flexibleTimeSlot: { time: string, slot: string, discount?: number }[] = [
    //     { time: "09 - 12", slot: "AM" },
    //     { time: "12 - 01", slot: "PM", discount: 20 },
    // ]

    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);



    useFocusEffect(
        useCallback(() => {
            refetch()
        }, [])
    )

    useEffect(() => {
        const fixedTimeSlotArray = returnArrayOnly(data?.data?.fixedSlot);
        const flexibleTimeSlotArray = returnArrayOnly(data?.data?.flexibleSlot);
        console.log('fixedTimeSlotsfixedTimeSlots', fixedTimeSlotArray, flexibleTimeSlotArray);
        const maxDiscountFixedTime = fixedTimeSlotArray.reduce(
            (max, item) => (numberChange(item.offer) > 0 && numberChange(item.offer) > max ? numberChange(item.offer) : max),
            0
        );
        const maxDiscountFlexibleTime = flexibleTimeSlotArray.reduce(
            (max, item) => (numberChange(item.offer) > 0 && numberChange(item.offer) > max ? numberChange(item.offer) : max),
            0
        );
        setSlots({
            fixedTimeSlots: fixedTimeSlotArray,
            flexibleTimeSlots: flexibleTimeSlotArray,
            fixedMaxCoupon: maxDiscountFixedTime,
            flexibleMaxCoupon: maxDiscountFlexibleTime,
        })
    }, [data]);

    useFocusEffect(
        useCallback(() => {
            let setData: any = defaultFormData;

            if (newCleaningService?.selectedSlotType) {
                setData.selectedSlotType = newCleaningService?.selectedSlotType;
            }
            if (newCleaningService?.selectedDateSlot?.date) {
                setData.selectedDateSlot = newCleaningService?.selectedDateSlot;
            }
            if (newCleaningService?.selectedTimeSlot?.startTime) {
                setData.selectedTimeSlot = newCleaningService?.selectedTimeSlot;
            }
            setFormData(setData);
        }, [newCleaningService])
    )

    const onChange = (value: string | object, key: string) => {
        setValidateErrors({});
        let setData = {
            ...formData,
            [key]: value,
        }
        if (key == "selectedSlotType") {
            setData = {
                ...setData,
                selectedDateSlot: {},
                selectedTimeSlot: {},
            }
        }
        else if (key == "selectedDateSlot") {
            setData = {
                ...setData,
                selectedTimeSlot: {},
            }
        }
        setFormData(setData)
    }

    const validation = (data: any) => {
        let error: any = {};
        if (isEmpty(data?.selectedSlotType)) {
            error.selectedSlotType = "Select Slot type"
        }
        if (isEmpty(data?.selectedDateSlot)  && newCleaningService?.from != constantData?.packageSubsriptionFrom.renew && newCleaningService?.from != constantData?.packageSubsriptionFrom?.upgrade ) {
            error.selectedDateSlot = "Select date"
        }
        if (isEmpty(data?.selectedTimeSlot)) {
            error.selectedTimeSlot = "Select time"
        }
        return error;
    }

    const onContinue = () => {
        
        let slotDiscount = numberChange(formData?.selectedTimeSlot?.offer);
        let slotDiscountPrice = slotDiscount > 0 ? Math.round(numberChange(newCleaningService?.planPrice) * (slotDiscount / 100))  : 0

        let sendData = {
            selectedSlotType: formData?.selectedSlotType,
            selectedDateSlot: formData?.selectedDateSlot,
            selectedTimeSlot: formData?.selectedTimeSlot,
            slotDiscount: slotDiscount,
            slotDiscountPrice: slotDiscountPrice,
        }
        const validate = validation(sendData);
        if (isEmpty(validate)) {
            setValidateErrors({})
            dispatch(
                setNewCleaningService(sendData)
            );
            navigation.navigate('CustomerDetails', { onTime: false })
        }
        else {
            toastFn("Fix all validations");
            setValidateErrors(validate);
        }
    }


    return (
        <Mainview
            isheader={true}
            headertitle="Time Slot"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={{ paddingHorizontal: "6%", marginBottom: "5%" }}>
                    <Button onPress={() => onContinue()} title="Continue" />
                </View>
            }>
            <View style={[style.container, { gap: 20 }]}>
                <View style={{ gap: 20 }}>
                    <Text family="GMedium" size="semilarge">{'Select time slot'}</Text>
                    <View style={{ gap: 20, flexDirection: 'row' }}>
                        <Pressable
                            onPress={() => onChange("fixed", "selectedSlotType")}
                            style={{
                                ...style.btn,
                                backgroundColor: formData?.selectedSlotType === "fixed" ? theme.tabactive : theme.lightGrey,
                            }}
                        >
                            <Text
                                style={{ color: formData?.selectedSlotType === "fixed" ? theme.activetabtext : 'black' }}
                                family="GMedium"
                                size="medium"
                            >
                                Fixed
                            </Text>
                            {
                                fixedMaxCoupon > 0
                                    ?
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
                                            {fixedMaxCoupon}%
                                        </Text>
                                        <Text style={{ color: '#fff', fontSize: 9, fontWeight: 'bold', textAlign: 'center' }}>
                                            Off
                                        </Text>

                                    </ImageBackground>
                                    :
                                    <></>
                            }
                        </Pressable>
                        {
                            newCleaningService?.serviceType !== constantData.subscriptionType.ots
                            ?
                            (
                                <Pressable
                                    onPress={() => onChange("flexible", "selectedSlotType")}
                                    style={{
                                        ...style.btn,
                                        backgroundColor: formData?.selectedSlotType === "flexible" ? theme.tabactive : theme.lightGrey,
                                        position: 'relative',
                                    }}
                                >
                                    <Text
                                        style={{ color: formData?.selectedSlotType === "flexible" ? theme.activetabtext : 'black' }}
                                        family="GMedium"
                                        size="medium"
                                    >
                                        Flexible
                                    </Text>
                                    {
                                        flexibleMaxCoupon > 0
                                            ?
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
                                                    {flexibleMaxCoupon}%
                                                </Text>
                                                <Text style={{ color: '#fff', fontSize: 9, fontWeight: 'bold', textAlign: 'center' }}>
                                                    Off
                                                </Text>
                                                
                                            </ImageBackground>
                                            :
                                            <></>
                                    }

                                    

                                </Pressable>
                            )
                            :
                            <></>
                        }

                    </View>

                    {
                        validateErrors?.selectedSlotType
                            ?
                            <ErrorText
                                errorMessage={validateErrors?.selectedSlotType}
                            />
                            :
                            <></>
                    }

                </View>
                <View style={{ gap: 20 }}>
                    <Text family="GMedium" size="semilarge">Select date</Text>
                    <View style={{ gap: 6, flexDirection: 'row' }}>
                        {
                            (newCleaningService?.from == constantData?.packageSubsriptionFrom.renew || newCleaningService?.from == constantData?.packageSubsriptionFrom.upgrade)
                                ?
                                <Text family="GMedium" size="semilarge">
                                    {
                                        newCleaningService?.from == constantData?.packageSubsriptionFrom.renew
                                            ?
                                            "This will be activated once ongoing subscription expired"
                                            :
                                            "This will be upgraded from tomorrow"
                                    }
                                </Text>
                                :
                                <>
                                    {
                                        dateSlot.map((value, index) => (
                                            <Pressable
                                                key={index}
                                                onPress={() => onChange(value, "selectedDateSlot")}
                                                style={[
                                                    style.slotBtn,
                                                    {
                                                        backgroundColor: formData?.selectedDateSlot?.display === value?.display ? '#252525' : theme.card,
                                                    },
                                                ]}
                                            >
                                                <Text family="GMedium" size="medium" style={{ color: formData?.selectedDateSlot?.display === value?.display ? '#CFCFCF' : theme.primarytext, }}>{value.display}</Text>
                                                <Text family="GRegular" size="semismall" style={{
                                                    textAlign: 'center',
                                                    color: formData?.selectedDateSlot?.display === value?.display ? '#CFCFCF' : theme.primarytext,
                                                }}
                                                >{value.day}</Text>
                                            </Pressable>
                                        ))
                                    }
                                </>
                        }

                    </View>
                    {
                        validateErrors?.selectedDateSlot
                            ?
                            <ErrorText
                                errorMessage={validateErrors?.selectedDateSlot}
                            />
                            :
                            <></>
                    }

                </View>
                <View style={{ gap: 20 }}>
                    <Text family="GMedium" size="semilarge">Select slot</Text>
                    <View style={{ gap: 6, flexDirection: 'row' }}>
                        {(formData?.selectedSlotType === 'fixed' ? fixedTimeSlots : flexibleTimeSlots).map((timeSlot: any, index:number) => (
                            <Pressable key={index} onPress={() => onChange(timeSlot, "selectedTimeSlot")} style={[
                                style.slotBtn,
                                {
                                    backgroundColor: (formData?.selectedTimeSlot?.startTime === timeSlot?.startTime) ? '#252525' : theme.card,
                                    paddingHorizontal: 10,
                                    position: 'relative',
                                },
                            ]}>
                                <Text family="GMedium" size="semismall" style={{ color: (formData?.selectedTimeSlot?.startTime === timeSlot?.startTime) ? '#CFCFCF' : theme.primarytext, }}>
                                    {timeSlot?.startTime} - {timeSlot?.endTime}
                                </Text>
                                {/* <Text family="GRegular" size="semismall" style={{
                                    textAlign: 'center',
                                    color: (formData?.selectedTimeSlot?.startTime === timeSlot?.startTime) ? '#CFCFCF' : theme.primarytext,
                                }}
                                >
                                    {timeSlot.slot}
                                </Text> */}
                                {
                                    timeSlot?.offer
                                        ?
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
                                                {`${String(timeSlot?.offer)}%`}
                                            </Text>
                                            <Text style={{ color: '#fff', fontSize: 9, fontWeight: 'bold', textAlign: 'center' }}>
                                                Off
                                            </Text>
                                        </ImageBackground>
                                        :
                                        <></>
                                }
                            </Pressable>
                        ))}
                    </View>

                    {
                        validateErrors?.selectedTimeSlot
                            ?
                            <ErrorText
                                errorMessage={validateErrors?.selectedTimeSlot}
                            />
                            :
                            <></>
                    }
                </View>
            </View>
        </Mainview >
    )
}

export default TimeSlot;