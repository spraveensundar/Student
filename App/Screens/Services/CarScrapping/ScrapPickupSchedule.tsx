import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import Text from "../../../Components/text";
import Mainview from "../../../Components/mainview";
import { Button, Input } from "../../../Components/Field";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { formatPickupDateTime } from "../../../Utilities/Helper";
import WheelPickerModal from "../../../Components/WheelPickerModal";
import { NavigationProp, stackNavProp } from "../../../Actions/types";
import { updatePickupDetail } from "../../../Common/axiosHooks/userHooks";
import SelectDateTime from "../../DriverOnDemand/Components/SelectDateTime";
import { dateToDateYearTime, toastFn } from "../../../Common/commonFunction";
import { useLazyViewPickupDetailsQuery } from "../../../Common/redux/scrapService";

import styles from "./styles";

type Props = {
    navigation: NavigationProp;
    route: stackNavProp<'ScrapPickupScheldule'>['route'];
};

const ScrapPickupScheldule: React.FC<Props> = ({ route }) => {
    const { bidId, data } = route.params;
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    const [loading, setLoading] = useState(false);
    const [selectedHours, setSelectedHours] = useState(2);
    const [selectedDate, setSelectedDate] = useState(new Date().getTime());
    const [dateVisible, setDateVisible] = useState(false);
    const [pickupDetails, setPickupDetails] = useState<any>([]);
    const [address, setAddress] = useState("");

    const [viewPickupDetails, { isFetching }] = useLazyViewPickupDetailsQuery();

    const handleViewPickupDetails = async () => {
        const params = {
            vehicleScrapId: data?._id
        }
        const response = await viewPickupDetails(params).unwrap();
        setPickupDetails(response?.data)
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const { pickupDate, pickupTime } = formatPickupDateTime(selectedDate);
            const payload = {
                bidId: bidId,
                pickupDate: pickupDate,
                pickupTime: pickupTime,
                pickupLocation: address
            };
            const response = await updatePickupDetail(payload);
            if (response?.status) {
                toastFn(response?.message);
                navigation.navigate("ScrapStatus", {
                    origin: 'ScrapPickupScheldule',
                    content: 'Your pickup has been scheduled ',
                    button: {
                        title: 'View Order History',
                        onButtonPress: () => navigation.navigate('ScrapBookingHistory'),
                    },
                    status: 'info'
                })
            } else {
                toastFn(response?.message || "Submission failed!");
            }
        } catch (error: any) {
            console.log("Error submitting scrap form:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleViewPickupDetails();
    }, [data])

    useEffect(() => {
        if (pickupDetails?.pickupLocation) {
            setAddress(pickupDetails.pickupLocation);
        }
    }, [pickupDetails]);

    return (
        <Mainview
            isheader={true}
            isscollable={true}
            ismainloading={isFetching}
            headertitle="Schedule Pickup"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={style.buttonContainer}>
                    <Button
                        loading={loading}
                        title="Confirm Schedule"
                        onPress={() => handleSubmit()}
                    />
                </View>
            }
        >
            <View style={[style.container]}>
                <Text size="xxmedium" family="GMedium" style={{ marginBottom: windowwidth * 0.05 }}>{'Scrap pickup details'}</Text>
                <SelectDateTime
                    label={"Select pickup date & time"}
                    selectedHours={selectedHours}
                    onSelectHour={setSelectedHours}
                    selectedDate={dateToDateYearTime(selectedDate)}
                    onPressDate={() => setDateVisible(true)}
                    enableTimeDurationPicker={false}
                    containerStyle={{
                        marginBottom: windowwidth * 0.05,
                    }}
                />
                <Input
                    label={'Address'}
                    placeHolder='Address'
                    value={address}
                    onChange={(text) => setAddress(text)}
                    style={{ height: 100, textAlignVertical: 'top' }}
                    inputProps={{ multiline: true, numberOfLines: 5 }}
                />

                {
                    pickupDetails?.pickupStatus === "rescheduled" && (
                        <FlatList
                            data={pickupDetails?.rescheduledBackup}
                            keyExtractor={(item, index) => index.toString()}
                            ListHeaderComponent={
                                <Text size="xxmedium" family="GMedium" style={{ marginBottom: 4, marginTop: 10 }}>
                                    Pickup Rescheduled
                                </Text>}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ flexDirection: "row", marginBottom: 16 }}>
                                        <View style={{ flex: 1, borderRadius: 10 }}>
                                            <Text family="GRegular" size="medium" style={{ marginBottom: 6 }}>
                                                {item?.rescheduledMessage?.trim()}
                                            </Text>
                                            <Text size="small" color="#666">
                                                {new Date(item?.pickupDate).toLocaleDateString()} •{" "}
                                                {new Date(item?.pickupTime).toLocaleTimeString()}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    )
                }
            </View>
            <WheelPickerModal
                visible={dateVisible}
                setVisible={setDateVisible}
                selectedTime={selectedDate}
                onConfirmTiming={(selected: number) => {
                    setSelectedDate(selected);
                }}
            />
        </Mainview>
    )

}

export default ScrapPickupScheldule;