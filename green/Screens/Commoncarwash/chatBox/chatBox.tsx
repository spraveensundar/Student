import React, { useState, useRef, useEffect, useCallback } from "react";
import useCustomHooks, { usePagination, useProfile } from "../../../Actions/Hooks/customhook";
import { FlatList, Pressable, TextInput, View, Image, Keyboard, ActivityIndicator } from "react-native";
import Text from "../../../Components/text";
import VectorIcons from "../../../Utilities/vectorIcons";
import Images, { icons } from "../../../Utilities/images";
import styles from "./styles";
import { windowheight } from "../../../Utilities/dimensions";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { FlashList } from "@shopify/flash-list";
import Flexcomponent from "../../../Components/flexcomponent";
import Mainview from "../../../Components/mainview";
import { useLazyGetservicedetailQuery } from "../../../Slices/services";
import { useSelector } from "react-redux";
import { cleaningSelector } from "../../../Slices/cleaning";
import { useCreateMessageMutation, useLazyGetMessagesQuery } from "../../../Slices/chat";
import { authSelector } from "../../../Slices/auth";
import useSocket from "../../../Actions/Sockets/sockethook";
import { PROFILEURL, SOCKET_URL } from "../../../Actions/Constants/constant";
import Loader from "../../../Components/loader";

type Message = {
    id: string;
    text: string;
    sender: "me" | "other";
    image?: any;
};

const ChatBox: React.FC = () => {
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    const [messages, setMessages] = useState<Message[]>([]);

    const flashListRef = useRef<any>(null);
    const [inputText, setInputText] = useState("");
    const [showScrollButton, setShowScrollButton] = useState(false);
    const isAtBottom = useRef(true);

    useEffect(() => {
        if (messages.length > 0 && isAtBottom.current) {
            flashListRef.current?.scrollToOffset({ offset: 0, animated: true });
        }
    }, [messages]);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            if (isAtBottom.current) {
                flashListRef.current?.scrollToOffset({ offset: 0, animated: true });
            }
        });
        return () => {
            showSubscription.remove();
        };
    }, []);

    const onScroll = (event: any) => {
        const { contentOffset } = event.nativeEvent;
        const distanceFromBottom = contentOffset.y;

        // In inverted list, y=0 is bottom. Show button if we are more than 200 pixels from bottom
        setShowScrollButton(distanceFromBottom > 200);

        // Update isAtBottom ref
        isAtBottom.current = distanceFromBottom < 50;
    };

    const scrollToBottom = () => {
        flashListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };
    const [createMessage, { isLoading: createLoading, error: createError }] = useCreateMessageMutation()

    const sendMessage = async () => {
        if (!inputText.trim()) return;
        const formdata = new FormData()
        formdata.append("text", inputText)
        formdata.append("instanceId", selectedservice?.instanceId)
        const res = await createMessage(formdata)
        if (res?.data?.status) {
            setMessages(prev => [
                res?.data?.data,
                ...prev
            ]);
            setInputText("");
        }
    };
    useProfile()



    const { selectedservice } = useSelector(cleaningSelector)

    const message = usePagination(useLazyGetMessagesQuery, {
        instanceId: selectedservice?.instanceId
    })

    useEffect(() => {
        if (message.list?.length) {
            setMessages(message.list)
        }
    }, [message.list])


    const { serviceMan } = useSelector(authSelector);

    const renderItem = ({ item }: { item: any }) => {
        const isMe = serviceMan?._id === item?.senderId

        return (
            <View
                style={[
                    style.messageRow,
                    { justifyContent: isMe ? "flex-end" : "flex-start" },
                ]}
            >
                {/* {!isMe &&  (
                    <Image source={item.image} style={style.profileImage} />
                )} */}

                <View
                    style={[
                        style.bubble,
                        {
                            backgroundColor: isMe ? theme.btnColor : theme.card,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            borderBottomLeftRadius: isMe ? 15 : 0,
                            borderBottomRightRadius: isMe ? 0 : 15,
                        },
                    ]}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                        <Text
                            size="medium"
                            color={isMe ? "#fff" : theme.primarytext}
                            family="GRegular"
                            style={{ marginRight: 8 }}
                        >
                            {item.text}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
                            <Text
                                size="xsmall"
                                color={isMe ? "rgba(255,255,255,0.7)" : "#8e8e93"}
                                family="GRegular"
                                style={{ fontSize: 10, position: 'relative', bottom: -5 }}
                            >
                                {item?.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : ''}
                            </Text>
                            {/* {isMe && (
                                <VectorIcons
                                    name="checkmark-done"
                                    family="Ionicons"
                                    size={14}
                                    iconcolor="rgba(255,255,255,0.7)"
                                    style={{ marginLeft: 4, bottom: -2 }}
                                />
                            )} */}
                        </View>
                    </View>
                </View>
            </View>
        );
    };


    const events: any = {
        "vehicleServiceChatNewMessage": useCallback((data: any) => {
            console.log('dataaa', data,)
            if (data?._id) {
                setMessages(prev => [
                    data,
                    ...prev
                ]);
                setInputText("");
            }
        }, [])
    }


    const { isConnected } = useSocket({
        events: events,
        autoConnect: !!serviceMan?._id,
        url: SOCKET_URL,
        options: { query: { userId: serviceMan?._id }, },
    })
    console.log('isConnectedisConnected', isConnected)

    return (
        <Mainview
            isheader={false}
            onleftfn={() => navigation.goBack()}
            horizontalpadding={0}
            isscollable={false}
        >
            <Flexcomponent paddingVertical={"5%"} >
                <Pressable style={{ width: "10%" }} onPress={() => navigation.goBack()}>
                    <VectorIcons family="Ionicons" name="chevron-back" />

                </Pressable>
                <View style={{ flexDirection: 'row', gap: 15, width: "80%" }}>

                    <Images type="image" resizeMode="cover" source={selectedservice?.userDetail?.profile ? { uri: PROFILEURL + selectedservice?.userDetail?.profile } : icons.Myprofile} />
                    <View>
                        <Text family="GMedium" size="medium"
                        >{selectedservice?.userDetail?.name}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                            {/* <View
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 6,
                                    backgroundColor: "#00E278",
                                }}
                            /> */}
                            <Text family="GRegular" size="small" color="#72777A">
                                {selectedservice?.serviceStartTime ? new Date(selectedservice?.serviceStartTime).toLocaleDateString() : ''}

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
                style={{ flex: 1, paddingHorizontal: "2.5%" }}
                keyboardVerticalOffset={windowheight * 0.04}
            >
                <FlatList
                    ref={flashListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    inverted
                    renderItem={renderItem}
                    contentContainerStyle={style.listContainer}
                    showsVerticalScrollIndicator={false}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    onEndReached={message.loadmore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={(message.footerloader) ? <Loader isloading={true} loaderstyle={{ height: windowheight * 0.1 }} /> : <></>}
                    onContentSizeChange={() => {
                        if (isAtBottom.current) {
                            flashListRef.current?.scrollToOffset({ offset: 0, animated: true });
                        }
                    }}
                />

                {showScrollButton && (
                    <Pressable style={style.floatingScrollBtn} onPress={scrollToBottom}>
                        <VectorIcons name="chevron-down" family="Ionicons" size={24} iconcolor={"white"} />
                    </Pressable>
                )}


                <View style={style.inputContainer}>
                    <View style={style.inputWrapper}>
                        <TextInput
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Type a message…"
                            placeholderTextColor="#404040"
                            style={style.textInput}
                            multiline
                        />
                    </View>

                    <Pressable style={style.sendBtn} disabled={createLoading} onPress={sendMessage}>
                        {createLoading ?
                            <ActivityIndicator size={"small"} color={theme.white} /> :
                            <VectorIcons name="send" family="Feather" size={18} iconcolor={"white"} />}
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </Mainview>
    );
};

export default ChatBox;
