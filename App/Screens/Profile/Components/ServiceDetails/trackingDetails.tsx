import React, { useEffect, useState } from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { Pressable, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Flexcomponent from "../../../../Components/flexcomponent";
import Images, { icons } from "../../../../Utilities/images";
import { windowwidth } from "../../../../Utilities/dimensions";
import Text from "../../../../Components/text";
import VectorIcons from "../../../../Utilities/vectorIcons";
import styles from "./styles";
import { useRoute } from '@react-navigation/native';
import { Colors } from "../../../../Utilities/uiasset";

interface DailyTrackingProps {
    data: {
        name: string;
        time: string;
        Id: string;
        status: string;
    };
}

const TrackingDetails: React.FC = () => {
    const route = useRoute();
    const { data } = route.params as DailyTrackingProps;
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);
    const [rating, setRating] = useState(3);
    const [steps, setSteps] = useState([
        { title: "Cleaner arrived", subtitle: "21st Sept, 2021 | 15:02", status: "completed" },
        { title: "Car wash in progress", subtitle: "In Progress", status: "pending" },
        { title: "Car Wash Completed", status: "pending" },

    ]);
    const [status, setStatus] = useState("On Going");

    useEffect(() => {
        if (data && data.status === "Completed") {
            setSteps(prevSteps =>
                prevSteps.map(step => ({
                    ...step,
                    status: "completed",
                }))
            );
        } else if (data && data.status === "On Hold") {
            setSteps([{ title: "Cleaner arrived", subtitle: "21st Sept, 2021 | 15:02", status: "completed" },
            { title: "On Hold", subtitle: "Hold the services", status: "On Hold" },
            ])
        }
    }, [data]);

    const completeAllSteps = () => {
        setStatus("Completed");
        const updatedSteps = steps.map(step => ({ ...step, status: "completed" }));
        setSteps(updatedSteps);
    };

    return (
        <Mainview
            isheader={true}
            headertitle="Daily Tracking"
            onleftfn={() => navigation.goBack()}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={{ gap: 20, paddingVertical: 20, borderRadius: 20 }}>
                    <Flexcomponent
                        style={[style.detail, { backgroundColor: theme.card }]}
                        paddingHorizontal={10}
                        justifyContent="space-between"
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Images
                                type="image"
                                source={icons.Swift}
                                style={{
                                    width: windowwidth * 0.2,
                                    borderRadius: 10,
                                    marginRight: 5
                                }}
                            />
                            <View style={{ gap: 5 }}>
                                <Text family="GBold" size="medium">
                                    {data.name}
                                </Text>
                                <Text
                                    family="GRegular"
                                    size="medium"
                                    color={theme.texthilight}
                                >
                                    {data.Id}
                                </Text>
                            </View>
                        </View>

                        <View style={{ marginBottom: 35 }}>
                            <Pressable onPress={completeAllSteps} style={{
                                backgroundColor:
                                    data.status === "On Going" ? "#DD9E40" : data.status === "Completed" ?
                                        theme.btnTag : Colors.pink,
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 5,
                            }} >
                                <Text
                                    family="GMedium"
                                    size="semismall"
                                    color={theme.activetabtext}
                                >
                                    {data.status}
                                </Text>
                            </Pressable>
                        </View>
                    </Flexcomponent>

                    <View style={[style.card, { padding: 0 }]}>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: '#CFCFCF',
                            }}
                        >
                            <View style={{ gap: 5 }}>
                                <Text family="GMedium" size="semilarge">
                                    Basic Service
                                </Text>
                                <Text family="GRegular" size="medium">
                                    Booking ID: 123456789
                                </Text>
                            </View>
                        </View>

                        <View style={{ gap: 15, marginTop: 10, paddingHorizontal: 20, paddingVertical: 10 }}>
                            <Text family="GBold" size="semilarge">
                                General Motors
                            </Text>
                            <View style={{ flexDirection: 'row', }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Pressable key={star} onPress={() => setRating(star)}>
                                        <VectorIcons
                                            family="Ionicons"
                                            name={star <= rating ? "star" : "star-outline"}
                                            size={14}
                                            iconcolor="#FB9506"
                                            style={{ marginRight: 4 }}
                                        />
                                    </Pressable>
                                ))}
                            </View>
                            <View
                                style={{
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    gap: 4
                                }}
                            >
                                <View>
                                    <Text family="GBold" size="semimedium">
                                        DATE
                                    </Text>
                                    <Text family="GRegular" size="small">
                                        21st Sept 2021, Monday
                                    </Text>
                                </View>

                                <View>
                                    <Text family="GBold" size="semimedium">
                                        Duration Time
                                    </Text>
                                    <Text family="GRegular" size="small">
                                        9:00-9:30am
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {data.status === "On Going" && (
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 20,
                                    borderWidth: 1,
                                    borderColor: '#CFCFCF',
                                    borderRadius: 8,
                                    overflow: "hidden",
                                }}
                            >
                                <Pressable style={{ flex: 1, alignItems: "center", paddingVertical: 10 }}>
                                    <Text family="GBold" size="medium" color={theme.btnTag}>
                                        CALL
                                    </Text>
                                </Pressable>

                                <View
                                    style={{
                                        width: 1,
                                        backgroundColor: "#CFCFCF",
                                        height: "100%",
                                    }}
                                />

                                <Pressable style={{ flex: 1, alignItems: "center", paddingVertical: 10 }}>
                                    <Text family="GBold" size="medium" color={theme.btnTag}>
                                        CHAT
                                    </Text>
                                </Pressable>
                            </View>
                        )}

                    </View>
                    <View>
                        <Text family="GMedium" size="semilarge">Track Order Details</Text>
                        <View style={[style.card, { backgroundColor: theme.card, marginTop: 20 }]}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ alignItems: "center", marginRight: 12 }}>
                                    {steps.map((step, index) => (
                                        <View key={index} style={{ alignItems: "center" }}>
                                            <View style={[
                                                style.circle,
                                                {
                                                    borderColor: step.status === "On Hold" ? Colors.pink : "#010B4F",
                                                    backgroundColor:
                                                        step.status === "completed" ? "#010B4F" : "#fff",

                                                },
                                            ]}>
                                                {step.status === "completed" && (
                                                    <VectorIcons
                                                        family="AntDesign"
                                                        name="check"
                                                        iconcolor={theme.activetabtext}
                                                        size={18}
                                                    />
                                                )}
                                            </View>
                                            {index !== steps.length - 1 && <View style={style.line} />}
                                        </View>
                                    ))}
                                </View>

                                <View style={{ flex: 1, }}>
                                    {steps.map((step, index) => (
                                        <View key={index} style={{ marginBottom: 24 }}>
                                            <Text family="GBold" size="semilarge"
                                                color={step.status === "On Hold" ? Colors.pink : theme.primarytext}>{step.title}</Text>
                                            {step.subtitle && <Text family="GRegular" size="semismall"
                                            >{step.subtitle}</Text>}
                                            {step.status === "On Hold" && (
                                                <Pressable style={{
                                                    backgroundColor: "#E2004F1A",
                                                    paddingVertical: "2%",
                                                    paddingHorizontal: "3%",
                                                    width: "20%",
                                                    marginTop: "5%"
                                                }}>
                                                    <Text family="GMedium" size="semismall" color={Colors.pink}>Reason</Text>
                                                </Pressable>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Mainview>
    )
}

export default TrackingDetails;