import { FlatList, Pressable, View } from "react-native"
import Mainview from "../../../Components/mainview"
import Text from "../../../Components/text";
import Toptabs from "../../../Components/toptabs";
import { useEffect, useRef, useState } from "react";
import { Fontfamily, Fontsize } from "../../../Utilities/uiasset";
import Images, { icons, lotties } from "../../../Utilities/images";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import VectorIcons from "../../../Utilities/vectorIcons";
import LinearGradient from "react-native-linear-gradient";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import Sheet from "../../../Components/bottomsheetmodal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Button } from "../../../Components/Field";
import { useCancelLeaveRequestMutation, useCheckInAndOutActionMutation, useFetchLeaveRequestMutation, useLeaveAttendanceDetailsMutation } from "../../../Slices/cleaning";
import { useSelector } from "react-redux";
import { authSelector } from "../../../Slices/auth";
import DateTimePicker from "../../../Components/Field/Input/DateTimePicker";
import moment from "moment";
import Lottie from "../../../Components/lottieview";
import { getLeaveRequestQparams } from "../../../Slices/types";
import { Toastfn } from "../../../Utilities/helerfunction";

const LeaveAttendance: React.FC = () => {
    const sheetref = useRef<BottomSheetModal | null>(null);

    const { serviceMan } = useSelector(authSelector);

    const { theme, navigation } = useCustomHooks();

    const [showDTPicker, setShowDTPicker] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const [attendanceInfo, setAttendanceInfo] = useState<any | null>(null);
    const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
    const [currentindex, setCurrentindex] = useState<number>(0);
    const [sheetActionProps, setSheetActionProps] = useState<{ isOpen: boolean, context: string, data?: any }>({ isOpen: false, context: '', data: '' });
    const [refreshing, setRefreshing] = useState<boolean>(true);

    const [triggerLeaveAttendanceInfo, { }] = useLeaveAttendanceDetailsMutation();
    const [triggerAttendanceAction, { }] = useCheckInAndOutActionMutation();
    const [triggerGetLeaveRequests, { }] = useFetchLeaveRequestMutation();
    const [triggerLeaveCancel, { }] = useCancelLeaveRequestMutation();

    useEffect(() => {
        (
            async () => {
                if (refreshing) {
                    try {
                        const formData = new FormData();

                        formData.append('servicemanId', serviceMan?._id);
                        formData.append('date', date.toISOString());

                        const leaveAttendanceInfo = await triggerLeaveAttendanceInfo(formData).unwrap();
                        if (leaveAttendanceInfo?.status) {
                            console.log('leaveAttendanceInfo', leaveAttendanceInfo);
                            setAttendanceInfo(leaveAttendanceInfo);
                        }
                    } catch (error: any) {
                        console.log('FETCH-LEAVE-ATTENDANCE-INFO-ERROR', error);
                    } finally {
                        setRefreshing(false);
                    }
                }
            }
        )();
    }, [triggerLeaveAttendanceInfo, serviceMan?._id, date, refreshing]);

    useEffect(() => {
        (
            async () => {
                try {
                    const queryParams: getLeaveRequestQparams = { servicemanId: serviceMan?._id };
                    const leaveRequestResult = await triggerGetLeaveRequests(queryParams).unwrap();
                    if (leaveRequestResult?.status) {
                        console.log('leaveRequestResult', leaveRequestResult);
                        setLeaveRequests(leaveRequestResult?.data);
                    }
                } catch (error: any) {
                    console.log('FETCH-LEAVE-REQUESTS-ERROR', error);
                }
            }
        )();
    }, [triggerGetLeaveRequests, serviceMan?._id, date]);

    const handleAttendance = async (inOrOut: string) => {
        try {
            const formData = new FormData();

            formData.append('date', new Date().toISOString());
            formData.append(inOrOut === 'checkin' ? 'checkInTime' : 'checkOutTime', new Date().toISOString());
            if (inOrOut === 'checkout' && attendanceInfo?.todayAttendance && (Object.keys(attendanceInfo?.todayAttendance) ?? []).length > 0) {
                formData.append('id', attendanceInfo?.todayAttendance?._id);
            }
            formData.append('action', inOrOut);

            console.log('formData', formData);

            const leaveAttendanceInfo = await triggerAttendanceAction(formData).unwrap();
            if (leaveAttendanceInfo?.status) {
                console.log('leaveAttendanceInfo', leaveAttendanceInfo);
                Toastfn(leaveAttendanceInfo?.message);
                setRefreshing(true);
            }
        } catch (error: any) {
            console.log('ATTENDANCE-CHECK-IN-&-OUT-ERROR', error);
        } finally {
            setSheetActionProps({ isOpen: false, context: '', data: '' });
        }
    };

    const handleLeaveCancel = async (reqId: string) => {
        try {
            const formData = new FormData();

            formData.append('leaveRequestId', reqId);

            console.log('formData', formData);

            const leaveCancelResult = await triggerLeaveCancel(formData).unwrap();
            if (leaveCancelResult?.status) {
                console.log('leaveCancelResult', leaveCancelResult);
                setSheetActionProps({ isOpen: false, context: '', data: '' });
                navigation.navigate("LeaveConfirmation", {
                    origin: 'LeaveAttendance',
                    content: 'Your leave request cancelled successfully!',
                    button: {
                        title: 'Go to home',
                        onButtonPress: () => navigation.navigate('LeaveAttendance'),
                    },
                    status: 'success'
                });
            }
        } catch (error: any) {
            console.log('LEAVE-CANCEL-ERROR', error);
        } finally {
            setSheetActionProps({ isOpen: false, context: '', data: '' });
        }
    };

    return (
        <Mainview
            isheader
            headertitle="Attendance"
            isscollable={false}
            bottomContent={currentindex === 1}
            bottomtext={currentindex === 1 ? "Apply Leave" : ""}
            onBottompress={() => {
                if (currentindex === 1) {
                    navigation.navigate('ApplyLeave');
                }
            }}
            horizontalpadding={0}
        >
            <View style={{ flex: 1 }} >
                <View
                    style={{ paddingHorizontal: windowwidth * 0.05 }}
                >
                    <Toptabs
                        tabs={['Attendance', 'Leave', 'Holidays']}
                        activeindex={currentindex}
                        onchange={setCurrentindex}
                        textStyle={{
                            fontSize: Fontsize.semimedium
                        }}
                    />
                </View>
                {currentindex === 0 &&
                    <View style={{ paddingHorizontal: windowwidth * 0.05 }}>
                        <View
                            style={{
                                marginBottom: windowwidth * 0.05,
                            }}
                        >
                            <Text family='GBold' size='semilarge' top={'5%'} >{'Attendance Details'}</Text>
                            <DateTimePicker
                                bodyContent={
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: windowwidth * 0.03,
                                            marginVertical: windowwidth * 0.05,
                                            borderWidth: 1,
                                            borderColor: '#CFCFCF',
                                            borderRadius: 5,
                                            backgroundColor: '#F3F3F3',
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Images
                                                type="image"
                                                source={icons.Myleave}
                                                width={windowwidth * 0.065}
                                                height={windowwidth * 0.065}
                                                style={{
                                                    borderRadius: 0,
                                                }}
                                            />
                                            <Text family='GMedium' size='medium' style={{ paddingHorizontal: windowwidth * 0.02 }} >{date.toDateString()}</Text>
                                        </View>
                                        <View>
                                            <VectorIcons
                                                family={"MaterialIcons"}
                                                name={"arrow-forward-ios"}
                                                iconcolor={'#1B2431'}
                                                size={windowwidth * 0.05}
                                            />
                                        </View>
                                    </View>
                                }
                                value={date}
                                showPicker={showDTPicker}
                                onPressPicker={() => setShowDTPicker(true)}
                                onDismiss={() => setShowDTPicker(false)}
                                onConfirm={(item: any) => setDate(item)}
                                datePickerProps={{ display: 'spinner' }}
                            />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <LinearGradient
                                    colors={['#7F52E1', '#4300D4']}
                                    style={{
                                        flex: 1,
                                        borderRadius: 8,
                                        padding: windowwidth * 0.05,
                                    }}
                                >
                                    <Pressable>
                                        <Images
                                            type="image"
                                            source={icons.TotalWorkingDays}
                                            width={windowwidth * 0.07}
                                            height={windowwidth * 0.07}
                                            style={{
                                                borderRadius: 0,
                                                marginBottom: windowwidth * 0.05,
                                            }}
                                        />
                                        <Text family='GRegular' size='semimedium' color="#FFFFFF" style={{ marginBottom: windowwidth * 0.02, }} >{'Total Working Days'}</Text>
                                        <Text family='GRegular' size='semimedium' color="#FFFFFF" >{`${attendanceInfo?.workingDays} Days`}</Text>
                                    </Pressable>
                                </LinearGradient>
                                <LinearGradient
                                    colors={['#2A66FF', '#193D99']}
                                    style={{
                                        flex: 1,
                                        borderRadius: 8,
                                        padding: windowwidth * 0.05,
                                        marginLeft: windowwidth * 0.02
                                    }}
                                >
                                    <Pressable>
                                        <Images
                                            type="image"
                                            source={icons.TotalCheckinDays}
                                            width={windowwidth * 0.07}
                                            height={windowwidth * 0.07}
                                            style={{
                                                borderRadius: 0,
                                                marginBottom: windowwidth * 0.05,
                                            }}
                                        />
                                        <Text family='GRegular' size='semimedium' color="#FFFFFF" style={{ marginBottom: windowwidth * 0.02, }} >{'Total Days Checkin'}</Text>
                                        <Text family='GRegular' size='semimedium' color="#FFFFFF" >{`${attendanceInfo?.workingDaysCheckInList && attendanceInfo?.workingDaysCheckInList.length} Days`}</Text>
                                    </Pressable>
                                </LinearGradient>
                            </View>
                        </View>
                        <View
                            style={{
                                marginBottom: windowwidth * 0.05,
                            }}
                        >
                            <Text family='GBold' size='semilarge' style={{ marginBottom: windowwidth * 0.05 }} >{'Today Attendance'}</Text>
                            {attendanceInfo && (!attendanceInfo?.todayAttendance || attendanceInfo?.todayAttendance && (Object.keys(attendanceInfo?.todayAttendance) ?? []).length > 0 && !attendanceInfo?.todayAttendance?.checkOutTime) &&
                                <LinearGradient
                                    colors={!attendanceInfo?.todayAttendance?.checkInTime ? ['#00634D', '#00AF87'] : ['#380600', '#993328']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        borderRadius: 8,
                                        paddingHorizontal: windowwidth * 0.05,
                                        paddingVertical: windowwidth * 0.03,
                                        marginBottom: windowwidth * 0.05,
                                    }}
                                >
                                    <Pressable
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                        onPress={() => {
                                            setSheetActionProps({ isOpen: true, context: 'InOut-confirmation', data: { inOrOut: !attendanceInfo?.todayAttendance?.checkInTime ? 'checkin' : 'checkout' } });
                                        }}
                                    >
                                        <Text family='GMedium' size='medium' color="#FFFFFF" style={{ flex: 1 }} >{!attendanceInfo?.todayAttendance?.checkInTime ? 'Check In' : 'Check Out'}</Text>
                                        <Images
                                            type="image"
                                            source={!attendanceInfo?.todayAttendance?.checkInTime ? icons.CheckIn : icons.CheckOut}
                                            width={windowwidth * 0.08}
                                            height={windowwidth * 0.08}
                                            style={{
                                                borderRadius: 0,
                                            }}
                                        />
                                    </Pressable>
                                </LinearGradient>
                            }
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Pressable
                                    style={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderColor: '#CFCFCF',
                                        borderRadius: 8,
                                        padding: windowwidth * 0.05,
                                        backgroundColor: '#F3F3F3',
                                    }}
                                >
                                    <Images
                                        type="image"
                                        source={icons.CheckIn}
                                        width={windowwidth * 0.08}
                                        height={windowwidth * 0.08}
                                        style={{
                                            borderRadius: 0,
                                            marginBottom: windowwidth * 0.05,
                                        }}
                                    />
                                    <Text family='GMedium' size='medium' color="#1B2431" style={{ marginBottom: windowwidth * 0.02, }} >{'Check In'}</Text>
                                    <Text family='GMedium' size='medium' color="#179C5F" >{attendanceInfo && attendanceInfo?.todayAttendance && (Object.keys(attendanceInfo?.todayAttendance) ?? []).length > 0 && attendanceInfo?.todayAttendance?.checkInTime ? moment(new Date(attendanceInfo?.todayAttendance?.checkInTime)).format('LT') : '--'}</Text>
                                </Pressable>
                                <Pressable
                                    style={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderColor: '#CFCFCF',
                                        borderRadius: 8,
                                        padding: windowwidth * 0.05,
                                        backgroundColor: '#F3F3F3',
                                        marginLeft: windowwidth * 0.02
                                    }}
                                >
                                    <Images
                                        type="image"
                                        source={icons.CheckOut}
                                        width={windowwidth * 0.08}
                                        height={windowwidth * 0.08}
                                        style={{
                                            borderRadius: 0,
                                            marginBottom: windowwidth * 0.05,
                                        }}
                                    />
                                    <Text family='GMedium' size='medium' color="#1B2431" style={{ marginBottom: windowwidth * 0.02, }} >{'Check Out'}</Text>
                                    <Text family='GMedium' size='medium' color="#1B2431" >{attendanceInfo && attendanceInfo?.todayAttendance && (Object.keys(attendanceInfo?.todayAttendance) ?? []).length > 0 && attendanceInfo?.todayAttendance?.checkOutTime ? moment(new Date(attendanceInfo?.todayAttendance?.checkOutTime)).format('LT') : '--'}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                }
                {currentindex === 1 &&
                    <>
                        {leaveRequests?.length > 0 ?
                            <View
                                style={{
                                    paddingHorizontal: windowwidth * 0.05
                                }}
                            >
                                <Text family='GBold' size='semilarge' top={'5%'} style={{ marginBottom: windowwidth * 0.05 }} >{'Leave History'}</Text>
                                <View
                                    style={{ marginVertical: windowwidth * 0.05 }}
                                >
                                    <FlatList
                                        data={leaveRequests ?? []}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <Pressable
                                                    key={index}
                                                    style={{
                                                        borderWidth: 1,
                                                        borderColor: '#CFCFCF',
                                                        borderRadius: 5,
                                                        backgroundColor: '#F3F3F3',
                                                        marginBottom: windowwidth * 0.05,
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'flex-start',
                                                            padding: windowwidth * 0.03,
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                flex: 1,
                                                                flexDirection: 'row',
                                                            }}
                                                        >
                                                            <VectorIcons
                                                                family={"Ionicons"}
                                                                name={"sad-outline"}
                                                                iconcolor={"#1B2431"}
                                                                size={windowwidth * 0.05}
                                                            />
                                                            <View
                                                                style={{ flex: 1, paddingHorizontal: windowwidth * 0.02 }}
                                                            >
                                                                <Text family='GMedium' size='medium' style={{ textTransform: 'capitalize', fontWeight: 'normal' }} >{`${item?.leaveType}`}</Text>
                                                                <Text family='GRegular' size='medium' >{item?.leaveReason}</Text>
                                                                <Text family='GRegular' size='medium' color="#0A685D" top={'3%'} >{item?.fromDate === item?.toDate ? moment(new Date(item?.fromDate)).format('ll') : `${moment(new Date(item?.fromDate)).format('ll')} - ${moment(new Date(item?.toDate)).format('ll')}`}</Text>
                                                            </View>
                                                        </View>
                                                        <View
                                                            style={{
                                                                borderWidth: 1,
                                                                borderColor: item?.status === 'approved' ? '#46cc6b' : (item?.status === 'cancelled' ? '#ff5a54' : '#D26E10'),
                                                                borderRadius: 5,
                                                                paddingHorizontal: windowwidth * 0.02,
                                                                paddingVertical: windowwidth * 0.01,
                                                                backgroundColor: item?.status === 'approved' ? '#d8ffe3ff' : (item?.status === 'cancelled' ? '#ffd4d2ff' : '#FCEBDB'),
                                                            }}
                                                        >
                                                            <Text family='GMedium' size='xmedium' color={item?.status === 'approved' ? '#46cc6b' : (item?.status === 'cancelled' ? '#ff5a54' : '#D26E10')} style={{ textTransform: 'capitalize' }} >{`${item?.status ?? 'Pending'}`}</Text>
                                                        </View>
                                                    </View>
                                                    {(item?.status !== 'approved' && item?.status !== 'cancelled') &&
                                                        <View
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                borderTopWidth: 1,
                                                                borderTopColor: '#CFCFCF'
                                                            }}
                                                        >
                                                            <Pressable
                                                                style={{
                                                                    flex: 1,
                                                                    alignItems: 'center',
                                                                    padding: windowwidth * 0.04
                                                                }}
                                                                onPress={() => navigation.navigate('ApplyLeave', { leaveRequest: item })}
                                                            >
                                                                <Text family='GMedium' size='medium'>{'Edit Request'}</Text>
                                                            </Pressable>
                                                            <Pressable
                                                                style={{
                                                                    flex: 1,
                                                                    alignItems: 'center',
                                                                    borderLeftWidth: 1,
                                                                    borderLeftColor: '#CFCFCF',
                                                                    padding: windowwidth * 0.03
                                                                }}
                                                                onPress={() => setSheetActionProps({ isOpen: true, context: 'delete-confirmation', data: { requestId: item?._id } })}
                                                            >
                                                                <Text family='GMedium' size='medium' color="#FF5A54">{'Cancel Request'}</Text>
                                                            </Pressable>
                                                        </View>
                                                    }
                                                </Pressable>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                            :
                            <View
                                style={{
                                    marginVertical: windowwidth * 0.05,
                                }}
                            >
                                <Images
                                    type="image"
                                    source={icons.CarWashing}
                                    width={'100%'}
                                    height={windowheight * 0.3}
                                    style={{
                                        borderRadius: 0,
                                    }}
                                    resizeMode="cover"
                                />
                                <Text family='GRegular' size='medium' color="#323232" top={windowwidth * 0.1} style={{ textAlign: 'center', paddingHorizontal: windowwidth * 0.05 }} >{'No leave applied yet. Tap “Apply Leave” to submit your request.'}</Text>
                            </View>
                        }
                    </>
                }
                {currentindex === 2 &&
                    <View style={{ flex: 1, paddingHorizontal: windowwidth * 0.05 }}>
                        <View
                            style={{
                                flex: 1,
                                marginBottom: windowwidth * 0.05,
                            }}
                        >
                            <Text family='GBold' size='semilarge' top={'5%'} >{'Holiday Details'}</Text>
                            {attendanceInfo && attendanceInfo?.holidayDates && attendanceInfo?.holidayDates.length > 0 ?
                                <View
                                    style={{ marginVertical: windowwidth * 0.05 }}
                                >
                                    <FlatList
                                        data={attendanceInfo?.holidayDates ?? []}
                                        renderItem={({ item, index }) => {
                                            const holiday = moment(item?.date);
                                            const holidayDate = holiday?.format('DD');
                                            const holidayDay = holiday?.format('ddd');
                                            return (
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            borderRightWidth: 1,
                                                            borderRightColor: '#CFCFCF',
                                                            paddingBottom: index !== ((attendanceInfo?.holidayDates ?? []).length - 1) ? windowwidth * 0.05 : 0,
                                                            paddingRight: windowwidth * 0.05,
                                                            marginRight: windowwidth * 0.05,
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                width: windowwidth * 0.175,
                                                                height: windowwidth * 0.175,
                                                                borderRadius: 5,
                                                                borderWidth: 1,
                                                                borderColor: '#CFCFCF',
                                                                backgroundColor: '#F3F3F3'
                                                            }}
                                                        >
                                                            <Text family='GBold' size='semilarge' >{holidayDate}</Text>
                                                            <Text family='GRegular' size='semilarge' >{holidayDay}</Text>
                                                        </View>
                                                    </View>
                                                    <LinearGradient
                                                        colors={item?.colors ?? ['#1C5E56', '#006D60']}
                                                        style={{
                                                            flex: 1,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            padding: windowwidth * 0.02,
                                                            borderRadius: 5,
                                                            marginBottom: index !== ((attendanceInfo?.holidayDates ?? []).length - 1) ? windowwidth * 0.05 : 0,
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        <Text family='GBold' size='semilarge' color="#FFFFFF" style={{ textAlign: 'center' }} >{item?.holidayName}</Text>
                                                        <LinearGradient
                                                            colors={item?.colors ?? ['#1C5E56', '#006D60']}
                                                            style={{
                                                                position: 'absolute',
                                                                width: windowwidth * 0.03,
                                                                height: windowwidth * 0.03,
                                                                left: - (windowwidth * 0.05),
                                                                transform: [{ translateX: -((windowwidth * 0.03) / 2) }],
                                                                borderRadius: windowwidth * 0.03,
                                                            }}
                                                        />
                                                    </LinearGradient>
                                                </View>
                                            )
                                        }}
                                    />
                                </View> :
                                <View
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Lottie
                                        src={lotties.NoData}
                                        width={windowwidth * 0.45}
                                        height={windowwidth * 0.45}
                                        loop={false}
                                    />
                                    <Text
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            paddingHorizontal: windowwidth * 0.05,
                                            fontFamily: Fontfamily.GBold,
                                            fontSize: Fontsize.medium,
                                            color: theme.primarytext,
                                        }}
                                    >{'There’s no holidays available.'}</Text>
                                </View>
                            }
                        </View>
                    </View>
                }
            </View>
            <Sheet
                sheetref={sheetref}
                visible={sheetActionProps?.isOpen}
                onDismiss={() => setSheetActionProps({ isOpen: false, context: '', data: '' })}
                bottomSheetProps={{
                    backgroundStyle: {
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)'
                    },
                    keyboardBehavior: "interactive",
                    keyboardBlurBehavior: "restore",
                    android_keyboardInputMode: "adjustPan",

                }}
                snappoint={["20%"]}
            >
                <View style={{ flex: 1, padding: windowwidth * 0.05 }} >
                    {sheetActionProps?.context === 'delete-confirmation' &&
                        <View
                            style={{ flex: 1 }}
                        >
                            <View
                                style={{
                                    marginBottom: windowwidth * 0.05
                                }}
                            >
                                <Text family='GBold' size='medium' style={{ marginBottom: windowwidth * 0.03 }} >{'Delete Request'}</Text>
                                <Text family='GRegular' size='medium' >{'Are you sure delete the request ?'}</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    title="Cancel"
                                    buttonStyle={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderColor: '#000C51',
                                        borderRadius: 50,
                                        backgroundColor: 'transparent',
                                        height: 'auto',
                                        paddingVertical: windowwidth * 0.03,
                                    }}
                                    textStyle={{
                                        color: '#000C51'
                                    }}
                                    onPress={() => setSheetActionProps({ isOpen: false, context: '', data: '' })}
                                />
                                <Button
                                    title="Delete"
                                    buttonStyle={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderColor: '#000C51',
                                        borderRadius: 50,
                                        height: 'auto',
                                        paddingVertical: windowwidth * 0.03,
                                        marginLeft: windowwidth * 0.05
                                    }}
                                    onPress={() => { handleLeaveCancel(sheetActionProps?.data?.requestId) }}
                                />
                            </View>
                        </View>
                    }
                    {sheetActionProps?.context === 'InOut-confirmation' &&
                        <View
                            style={{ flex: 1 }}
                        >
                            <View
                                style={{
                                    marginBottom: windowwidth * 0.05
                                }}
                            >
                                <Text family='GBold' size='medium' style={{ marginBottom: windowwidth * 0.03 }} >{'Attendance'}</Text>
                                <Text family='GRegular' size='medium' >{`Are you sure you want to ${sheetActionProps?.data?.inOrOut === 'checkin' ? 'check in' : 'check out'} ?`}</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    title="No"
                                    buttonStyle={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderColor: '#000C51',
                                        borderRadius: 50,
                                        backgroundColor: 'transparent',
                                        height: 'auto',
                                        paddingVertical: windowwidth * 0.03,
                                    }}
                                    textStyle={{
                                        color: '#000C51'
                                    }}
                                    onPress={() => setSheetActionProps({ isOpen: false, context: '', data: '' })}
                                />
                                <Button
                                    title="Yes"
                                    buttonStyle={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderColor: '#000C51',
                                        borderRadius: 50,
                                        height: 'auto',
                                        paddingVertical: windowwidth * 0.03,
                                        marginLeft: windowwidth * 0.05
                                    }}
                                    onPress={() => {
                                        handleAttendance(sheetActionProps?.data?.inOrOut);
                                    }}
                                />
                            </View>
                        </View>
                    }
                </View>
            </Sheet>
        </Mainview>
    )
}

export default LeaveAttendance;