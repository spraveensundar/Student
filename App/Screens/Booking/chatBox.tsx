import React, { useCallback, useState } from "react";
import Mainview from "../../Components/mainview";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { FlatList, Pressable, TextInput, View, Image } from "react-native";
import Text from "../../Components/text";
import VectorIcons from "../../Utilities/vectorIcons";
import Images, { icons } from "../../Utilities/images";
import styles from "./styles";
import { windowheight } from "../../Utilities/dimensions";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { FlashList } from "@shopify/flash-list";
import Flexcomponent from "../../Components/flexcomponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../Navigations/stacknavigationtypes";
import { useLazyGetServiceChatMessagesQuery } from "../../Common/redux/vehicleServiceHook";
import { useFocusEffect } from "@react-navigation/native";
import { dateToMonthDate, formatDate, returnArrayOnly, returnOriginalFile, toastFn } from "../../Common/commonFunction";
import { sendServiceChatMessage } from "../../Common/axiosHooks/vehicleServiceHooks";
import { useGetMyDetailQuery } from "../../Common/redux/userHook";
import useSocket from "../../Actions/Sockets/sockethook";
import { useGlobalsocket } from "../../Actions/Sockets/globalsocket";
import { constantData, SOCKET_URL } from "../../Common/constant";

type Message = {
    id: string;
    text: string;
    sender: "me" | "other";
    image?: any;
};

type Props = NativeStackScreenProps<Stacknavigationtypes, 'ChatBox'>;


const initialData = {
    data: [],
    page: 1,
    limit: 10,
    isLoading: false,
    isLoadMore: false,
    initialLoading: false,
    isRefreshing: false,
    contentRendered: false,
    noDataContent: "No messages",
};

let instanceMessageData: any = {};

const ChatBox: React.FC<Props> = ({ route }) => {



    const [trigger] = useLazyGetServiceChatMessagesQuery();
    const { data, isLoading } = useGetMyDetailQuery(undefined);



    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);



    const [messages, setMesssages] = useState<any>(initialData)
    const [inputText, setInputText] = useState("");


    const serviceId = route?.params?.serviceDetail?._id, serviceDetail = route?.params?.serviceDetail;

    console.log('serviceDetailserviceDetail', serviceDetail)

    const sendMessage = async () => {
        if (!inputText.trim()) return;


        let sendData = {
            text: inputText,
            serviceId: serviceId,
        };

        let resp = await sendServiceChatMessage(sendData);
        console.log('dsfsdfsd', resp);
        if (resp?.status) {
            toastFn(resp?.message || "Message sent successfully");
            instanceMessageData = {
                ...instanceMessageData,
                data: [
                    ...instanceMessageData?.data,
                    resp?.data,
                ]
            };
            setMesssages({
                ...instanceMessageData
            })
        }
        else {
            toastFn(resp?.message || "Failed to send message");
        }

        setInputText("");
    };

    console.log('checkcheck', messages)

    const events: any = {
        [constantData.socketEvents.vehicleServiceChatNewMessage]: useCallback((data: any) => {
            console.log('dataaa', data, messages)
            if (data?.instanceId == serviceDetail?.instanceId && serviceDetail?.instanceId) {

                instanceMessageData = {
                    ...instanceMessageData,
                    data: [
                        ...instanceMessageData?.data,
                        data,
                    ]
                };
                console.log('instanceMessageDatainstanceMessageData', instanceMessageData)
                setMesssages({
                    ...instanceMessageData,
                })
            }
        }, [])
    }
    const { isConnected } = useSocket({
        events: events,
        autoConnect: !!data?.data?._id,
        url: SOCKET_URL,
        options: { query: { userId: data?.data?._id }, },
    })

    console.log('isConnectedisConnected', isConnected)

    useFocusEffect(
        useCallback(() => {
            fetchMyMessageList(true, true);
        }, [])
    )



    const fetchMyMessageList = async (isRefresh?: boolean, initialCall?: boolean,) => {

        if (initialCall) {
            setMesssages({
                ...messages,
                initialLoading: true,
            })
        }
        else if (isRefresh) {
            setMesssages({
                ...messages,
                isRefreshing: true,
            })
        }
        else {
            setMesssages({
                ...messages,
                isLoading: true,
            })
        }


        let page = isRefresh ? 1 : messages?.page;

        let sendData = {
            page: page,
            limit: messages?.limit,
            serviceId: serviceId,
            lastMessageId: messages?.data?.[0]?._id,
        }

        let resp = await trigger(sendData);

        console.log('respresprespa', resp)

        let response = { ...resp?.data };

        let setData: any = {
            page: page + 1,
            limit: sendData?.limit,
            data: [],
            isLoadMore: false,
            isLoading: false,
            initialLoading: false,
            isRefreshing: false,
        }

        let data = [...returnArrayOnly(response?.data)].sort((a, b) => new Date(a?.createdAt).getTime() - new Date(b?.createdAt).getTime());
        if (sendData?.page == 1) {
            setData.data = data;
        }
        else {
            setData.data = [
                ...data,
                ...returnArrayOnly(messages?.data),
            ];
        }
        setData.isLoadMore = returnArrayOnly(response?.data).length >= messages?.limit ? true : false;

        instanceMessageData = {
            ...messages,
            ...setData,
        }
        setMesssages({
            ...instanceMessageData
        });
    }

    console.log('messagesmessages', messages)

    // const onTabChange = (tabName:string) => {
    //   setTab(tabName);
    //   fetchMyMessageList(false, false, tabName);
    // }

    const onTopReached = () => {
        console.log('fafafsafadfds', messages, (
            !messages.initialLoading
            &&
            messages?.contentRendered
            &&
            !messages.isLoading
            &&
            messages?.isLoadMore
        ))
        if (
            !messages.initialLoading
            &&
            messages?.contentRendered
            &&
            !messages.isLoading
            &&
            messages?.isLoadMore
        ) {
            fetchMyMessageList()
        }
    }

    const onContentSizeChange = (w: number, h: number) => {
        if (h > 1) {
            setMesssages({
                ...messages,
                contentRendered: true,
            });
        }
        else if (h < 1 && !messages?.initialLoading) {
            setMesssages({
                ...messages,
                contentRendered: true,
            });
        }
    };


    const renderItem = ({ item }: { item: any }) => {
        const isMe = item?.senderId === data?.data?._id;
        console.log('itemitemitem', item, data?.data?._id, data?.data)
        let senderDetail = item?.senderDetail ? item?.senderDetail : (item?.members?.find((mem: any) => mem?._id !== mem?.senderId));
        return (
            <View
                style={[
                    style.messageRow,
                    { justifyContent: isMe ? "flex-end" : "flex-start" },
                ]}
            >
                {
                    (!isMe && senderDetail?.profile)
                        ?
                        (
                            <Image source={{ uri: returnOriginalFile(senderDetail?.profile) }} style={style.profileImage} />
                        )
                        :
                        <></>
                }

                <View
                    style={[
                        style.bubble,
                        {
                            backgroundColor: isMe ? theme.btnColor : theme.card,
                            borderTopLeftRadius: isMe ? 24 : 0,
                            borderBottomRightRadius: isMe ? 0 : 24,
                            borderBottomLeftRadius: 24,
                            borderTopRightRadius: 24,
                        },
                    ]}
                >
                    <Text
                        size="medium"
                        color={isMe ? "#fff" : theme.primarytext}
                        family="GMedium"

                    >
                        {item.text}
                    </Text>
                </View>
            </View>
        );
    };

    console.log('serviceDetail?.servicemanDetail', serviceDetail?.servicemanDetail)

    const isOnline = () => {
        if (serviceDetail?.servicemanDetail?.isOnline) {
            return true;
        }
        return false;
    }


    return (
        <Mainview
            isheader={false}
            // onleftfn={() => navigation.goBack()}
            // rightfn={
            //     <Pressable style={style.headerRightBtn}>
            //         <VectorIcons
            //             name="dots-three-horizontal"
            //             family="Entypo"
            //             size={20}
            //         />
            //     </Pressable>
            // }
            // headerCB={
            //     <View style={{ marginLeft: "35%", flexDirection: 'row', gap: 15 }}>
            //         <Images type="image" source={icons.Man} />
            //         <View>
            //             <Text family="GMedium" size="medium"
            //             >Nathaniel Louis</Text>
            //             <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            //                 <View
            //                     style={{
            //                         width: 8,
            //                         height: 8,
            //                         borderRadius: 6,
            //                         backgroundColor: "#00E278",
            //                     }}
            //                 />
            //                 <Text family="GRegular" size="small" color="#72777A">
            //                     Always active
            //                 </Text>
            //             </View>
            //         </View>
            //     </View>
            // }


            isscollable={false}
        >
            <Flexcomponent paddingVertical={"5%"} >
                <Pressable
                    style={{ width: "20%" }}
                    onPress={() => navigation.goBack()}
                >
                    <VectorIcons family="Ionicons" name="chevron-back" />

                </Pressable>
                <View style={{ flexDirection: 'row', gap: 15, width: "80%" }}>
                    <Images
                        type="image"
                        source={serviceDetail?.servicemanDetail?.profile ? { uri: returnOriginalFile(serviceDetail?.servicemanDetail?.profile) } : icons.Man}
                    />
                    <View>
                        <Text family="GMedium" size="medium"
                        >
                            {
                                serviceDetail?.servicemanId
                                    ?
                                    (serviceDetail?.servicemanDetail?.name || "Serviceman")
                                    :
                                    "Serviceman not assigned"
                            }
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                            {/* {
                                serviceDetail?.servicemanDetail?._id
                                    ?
                                    <>
                                        <View
                                            style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: 6,
                                                backgroundColor: isOnline()?"#00E278":"red",
                                            }}
                                        />
                                        <Text family="GRegular" size="small" color="#72777A">
                                            {isOnline()?"Always active":"Offline"}
                                        </Text>
                                    </>
                                    :
                                    <></>
                            } */}
                            <Text family="GRegular" size="small" color="#72777A">
                                {formatDate(new Date())}
                            </Text>
                        </View>
                    </View>
                </View>
                {/* <Pressable style={style.headerRightBtn}>
                    <VectorIcons
                        name="dots-three-horizontal"
                        family="Entypo"
                        size={20}
                    />
                </Pressable> */}
            </Flexcomponent>
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, }}
                keyboardVerticalOffset={windowheight * 0.04}
            >
                <FlashList
                    data={messages.data}
                    keyExtractor={(item: any) => item?._id}
                    renderItem={renderItem}
                    contentContainerStyle={style.listContainer}
                    showsVerticalScrollIndicator={false}
                    onScroll={(e) => {
                        if (e.nativeEvent.contentOffset.y <= 0) {
                            onTopReached();
                        }
                    }}
                    onContentSizeChange={onContentSizeChange}
                />


                <View style={style.inputContainer}>
                    <View style={style.inputWrapper}>
                        <TextInput
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Type a message…"
                            placeholderTextColor="#404040"
                            style={style.textInput}
                        />
                    </View>

                    <Pressable style={style.sendBtn} onPress={sendMessage}>
                        <VectorIcons name="send" family="Feather" size={18} iconcolor={"white"} />
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </Mainview>

        // <View style={{ flex: 1 }} >
        //     <View style={{ width: "100%", height: windowheight * 0.1, backgroundColor: "yellow" }} />
        //     <KeyboardAvoidingView
        //         behavior="padding"
        //         style={{ flex: 1, }}
        //         keyboardVerticalOffset={windowheight * 0.04}
        //     >
        //         <FlatList
        //             data={messages}
        //             keyExtractor={(item) => item.id}
        //             renderItem={renderItem}
        //             contentContainerStyle={style.listContainer}
        //         />
        //         <View style={{ width: "100%", height: windowheight * 0.1, justifyContent: "center",backgroundColor:"green" }} >
        //             <TextInput
        //              placeholder="Enter text"
        //             />
        //         </View>
        //     </KeyboardAvoidingView>
        // </View>
    );
};

export default ChatBox;
