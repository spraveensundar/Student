import { useEffect, useState } from "react";
import { View } from "react-native"
import Mainview from "../../../Components/mainview"
import Text from "../../../Components/text";
import { Dropdown, Input } from "../../../Components/Field";
import VectorIcons from "../../../Utilities/vectorIcons";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { getLeaveTypesQparams } from "../../../Slices/types";
import { useEditLeaveRequestMutation, useFetchLeaveTypesMutation, useLeaveRequestMutation } from "../../../Slices/cleaning";
import { leaveRequestDataProps } from "../../../Actions/Types/formDataTypes";
import DateTimePicker from "../../../Components/Field/Input/DateTimePicker";
import moment from "moment";
import { validator } from "../../../Actions/Constants/validation";
import { Toastfn } from "../../../Utilities/helerfunction";

interface showDTPickerTypes {
    startDate?: boolean;
    startTime?: boolean;
    endDate?: boolean;
    endTime?: boolean;
}

const ApplyLeave: React.FC = ({ route }: any) => {
    const request = route?.params?.leaveRequest;

    console.log('leaveRequestEdit', request);

    const { navigation } = useCustomHooks();

    const [leaveRequestData, setLeaveRequestData] = useState<leaveRequestDataProps>({
        leaveType: {
            value: request?.leaveType ?? '',
            rules: { required: true },
            messages: { required: 'Leave type is required!' },
            isValid: true,
        },
        startDate: {
            value: request?.fromDate ? new Date(request?.fromDate) : new Date(),
            rules: { required: true },
            messages: { required: 'From date is required!' },
            isValid: true,
        },
        startTime: {
            value: request?.fromTime ? new Date(request?.fromTime) : new Date(),
            rules: {},
            messages: {},
            isValid: true,
        },
        endDate: {
            value: request?.toDate ? new Date(request?.toDate) : new Date(),
            rules: { required: true },
            messages: { required: 'To date is required!' },
            isValid: true,
        },
        endTime: {
            value: request?.toTime ? new Date(request?.toTime) : new Date(),
            rules: {},
            messages: {},
            isValid: true,
        },
        reason: {
            value: request?.leaveReason ?? '',
            rules: { required: true },
            messages: { required: 'Leave reason is required!' },
            isValid: true,
        },
    });
    const [leaveTypes, setLeaveTypes] = useState<any[]>([]);
    const [showDTPicker, setShowDTPicker] = useState<showDTPickerTypes>({
        startDate: false,
        startTime: false,
        endDate: false,
        endTime: false,
    });

    const [triggerGetLeaveTypes, { }] = useFetchLeaveTypesMutation();
    const [triggerLeaveRequest, { }] = useLeaveRequestMutation();
    const [triggerEditLeaveRequest, { }] = useEditLeaveRequestMutation();

    useEffect(() => {
        (
            async () => {
                try {
                    const queryParams: getLeaveTypesQparams = {
                        page: 1,
                        limit: 50,
                    }
                    const leaveTypesResult = await triggerGetLeaveTypes(queryParams).unwrap();
                    if (leaveTypesResult?.status) {
                        console.log('leaveTypesResult', leaveTypesResult);
                        setLeaveTypes(leaveTypesResult?.data);
                    }
                } catch (error: any) {
                    console.log('FETCH-LEAVE-TYPES-ERROR', error);
                }
            }
        )();
    }, [triggerGetLeaveTypes]);

    const handleLeaveRequest = async () => {
        try {
            const validatedResult = validator(leaveRequestData);
            setLeaveRequestData(prev => ({ ...prev, ...validatedResult?.data }));
            if (validatedResult?.isValid) {
                const formData = new FormData();
                if (request) {
                    formData.append('leaveRequestId', request?._id);
                }
                formData.append('leaveType', leaveRequestData?.leaveType?.value);
                formData.append('fromDate', leaveRequestData?.startDate?.value?.toISOString());
                formData.append('toDate', leaveRequestData?.endDate?.value?.toISOString());
                formData.append('reason', leaveRequestData?.reason?.value);

                const leaveRequestResult = await (request ? triggerEditLeaveRequest(formData) : triggerLeaveRequest(formData)).unwrap();

                if (leaveRequestResult?.status) {
                    console.log('leaveRequestResult', leaveRequestResult);
                    Toastfn(leaveRequestResult?.message);
                    navigation.navigate('LeaveAttendance');
                }
            } else {
                Toastfn('Please fill the required fields');
            }
        } catch (error: any) {
            console.log('ATTENDANCE-CHECK-IN-&-OUT-ERROR', error);
        }
    };

    console.log("LEAVE-REQUEST-DATA", leaveRequestData);

    return (
        <Mainview
            isheader
            headertitle={request ? "Edit Leave" : "Apply Leave"}
            isscollable={false}
            bottomContent
            bottomtext={"Submit"}
            onBottompress={() => handleLeaveRequest()}
        >
            <View style={{ flex: 1 }} >
                <Text family="GMedium" size="semilarge" top={"5%"} >{request ? "Edit Leave" : "Apply Leave"}</Text>
                <Dropdown
                    list={leaveTypes ?? []}
                    value={leaveRequestData?.leaveType?.value}
                    onChange={(item) => setLeaveRequestData(prev => ({ ...prev, leaveType: { ...prev.leaveType, value: item?.leaveTypeName } }))}
                    labelField="leaveTypeName"
                    valueField="leaveTypeName"
                    label="Leave Type"
                    placeholder="Choose leave type"
                    conatinerstyle={{
                        marginTop: "5%"
                    }}
                    isValid={leaveRequestData?.leaveType?.isValid}
                    errorMessage={leaveRequestData?.leaveType?.errorMessage}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <DateTimePicker
                        bodyContent={
                            <Input
                                value={moment(leaveRequestData?.startDate?.value).format('DD-MM-YYYY')}
                                label={"From"}
                                // labelStyle={{ marginTop: "5%" }}
                                placeHolder="From Date"
                                inputprops={{
                                    editable: false,
                                }}
                                rightContent={
                                    <View style={{ paddingHorizontal: windowwidth * 0.03, position: "absolute", right: 0, justifyContent: "center", alignItems: "center" }} >
                                        <VectorIcons
                                            family="Lucide"
                                            size={windowwidth * 0.05}
                                            name={"calendar-days"}
                                        />

                                    </View>
                                }
                            />
                        }
                        value={leaveRequestData?.startDate?.value}
                        showPicker={showDTPicker?.startDate}
                        onPressPicker={() => setShowDTPicker(prev => ({ ...prev, startDate: true }))}
                        onDismiss={() => setShowDTPicker(prev => ({ ...prev, startDate: false }))}
                        onConfirm={(item: any) => setLeaveRequestData(prev => ({ ...prev, startDate: { ...prev.startDate, value: item }, endDate: { ...prev.endDate, value: item } }))}
                        datePickerProps={{ display: 'spinner', minimumDate: new Date() }}
                        containerStyle={{ flex: 1 }}
                        isValid={leaveRequestData?.startDate?.isValid}
                        errorMessage={leaveRequestData?.startDate?.errorMessage}
                    />
                    {/* <DateTimePicker
                        inputType={'time'}
                        bodyContent={
                            <Input
                                value={moment(leaveRequestData?.startDate?.value).format('LT')}
                                label={"Time"}
                                labelStyle={{ marginTop: "5%" }}
                                placeHolder="Time"
                                inputprops={{
                                    editable: false,
                                }}
                                rightContent={
                                    <View style={{ paddingHorizontal: windowwidth * 0.03, position: "absolute", right: 0, justifyContent: "center", alignItems: "center" }} >
                                        <VectorIcons
                                            family="Lucide"
                                            size={windowwidth * 0.05}
                                            name={"timer"}
                                        />
                                    </View>
                                }
                            />
                        }
                        value={leaveRequestData?.startTime?.value}
                        showPicker={showDTPicker?.startTime}
                        onPressPicker={() => setShowDTPicker(prev => ({ ...prev, startTime: true }))}
                        onDismiss={() => setShowDTPicker(prev => ({ ...prev, startTime: false }))}
                        onConfirm={(item: any) => setLeaveRequestData(prev => ({ ...prev, startTime: { ...prev.startTime, value: item } }))}
                        datePickerProps={{ display: 'spinner' }}
                        containerStyle={{ flex: 1, marginLeft: windowwidth * 0.025 }}
                    /> */}
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <DateTimePicker
                        bodyContent={
                            <Input
                                value={moment(leaveRequestData?.endDate?.value).format('DD-MM-YYYY')}
                                label={"To"}
                                // labelStyle={{ marginTop: "5%" }}
                                placeHolder="To Date"
                                inputprops={{
                                    editable: false,
                                }}
                                rightContent={
                                    <View style={{ paddingHorizontal: windowwidth * 0.03, position: "absolute", right: 0, justifyContent: "center", alignItems: "center" }} >
                                        <VectorIcons
                                            family="Lucide"
                                            size={windowwidth * 0.05}
                                            name={"calendar-days"}
                                        />
                                    </View>
                                }
                            />
                        }
                        value={leaveRequestData?.endDate?.value}
                        showPicker={showDTPicker?.endDate}
                        onPressPicker={() => setShowDTPicker(prev => ({ ...prev, endDate: true }))}
                        onDismiss={() => setShowDTPicker(prev => ({ ...prev, endDate: false }))}
                        onConfirm={(item: any) => setLeaveRequestData(prev => ({ ...prev, endDate: { ...prev.endDate, value: item } }))}
                        datePickerProps={{ display: 'spinner', minimumDate: leaveRequestData?.startDate?.value }}
                        containerStyle={{ flex: 1 }}
                        isValid={leaveRequestData?.endDate?.isValid}
                        errorMessage={leaveRequestData?.endDate?.errorMessage}
                    />
                    {/* <DateTimePicker
                        inputType={'time'}
                        bodyContent={
                            <Input
                                value={moment(leaveRequestData?.endTime?.value).format('LT')}
                                label={"Time"}
                                labelStyle={{ marginTop: "5%" }}
                                placeHolder="Time"
                                inputprops={{
                                    editable: false,
                                }}
                                rightContent={
                                    <View style={{ paddingHorizontal: windowwidth * 0.03, position: "absolute", right: 0, justifyContent: "center", alignItems: "center" }} >
                                        <VectorIcons
                                            family="Lucide"
                                            size={windowwidth * 0.05}
                                            name={"timer"}
                                        />
                                    </View>
                                }
                            />
                        }
                        value={leaveRequestData?.endTime?.value}
                        showPicker={showDTPicker?.endTime}
                        onPressPicker={() => setShowDTPicker(prev => ({ ...prev, endTime: true }))}
                        onDismiss={() => setShowDTPicker(prev => ({ ...prev, endTime: false }))}
                        onConfirm={(item: any) => setLeaveRequestData(prev => ({ ...prev, endTime: { ...prev.endTime, value: item } }))}
                        datePickerProps={{ display: 'spinner' }}
                        containerStyle={{ flex: 1, marginLeft: windowwidth * 0.025 }}
                    /> */}
                </View>
                <Input
                    value={leaveRequestData?.reason?.value}
                    label={"Reason For Leave"}
                    placeHolder="Reason For Leave"
                    labelStyle={{ marginTop: '5%' }}
                    style={{ height: 100, textAlignVertical: 'top' }}
                    inputprops={{ multiline: true, numberOfLines: 5 }}
                    onChange={(text) => setLeaveRequestData(prev => ({ ...prev, reason: { ...prev.reason, value: text } }))}
                    isValid={leaveRequestData?.reason?.isValid}
                    errorMessage={leaveRequestData?.reason?.errorMessage}
                />
            </View>
        </Mainview>
    )
}

export default ApplyLeave;