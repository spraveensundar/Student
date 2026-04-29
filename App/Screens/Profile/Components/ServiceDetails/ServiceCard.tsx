import { Pressable, View } from "react-native";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import Flexcomponent from "../../../../Components/flexcomponent";
import { windowwidth } from "../../../../Utilities/dimensions";
import Images, { icons } from "../../../../Utilities/images";
import styles from "./styles";
import Text from "../../../../Components/text";
import { Colors } from "../../../../Utilities/uiasset";
import { capitalizeFirstLetter, formatDateWithDay, returnOriginalFile, returnServiceStatusDisplay } from "../../../../Common/commonFunction";
import { constantData } from "../../../../Common/constant";


interface Props {
    data: any;
    index?: number;
}

const ServiceCard: React.FC<Props> = ({
    data,
    index,
}) => {

    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    const dateDisplay = (date = new Date()) => {
        return (new Date(date).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }));
    }

    // const returnStatus = () => {
    //     if (data?.isSkiped) {
    //         return "Skipped"
    //     }
    //     else if (data?.isCancelled) {
    //         return "Cancelled"
    //     }
    //     else {
    //         return capitalizeFirstLetter(data?.status);
    //     }
    // }

    return (
        <Flexcomponent
            key={index}
            style={[style.detail, { backgroundColor: theme.card, marginTop: "5%" }]}
            paddingHorizontal={10}
            justifyContent="space-between"
        >
            <View>
                <Pressable
                    onPress={() => navigation.navigate('WatchActivity', { serviceId: data?._id })}
                    style={{ flexDirection: "row" }}
                >
                    <Images
                        type="image"
                        source={{ uri: returnOriginalFile(data?.brandVehicleDetail?.brandVehicleImage) }}
                        style={{
                            width: windowwidth * 0.2,
                            borderRadius: 10,
                            marginRight: 5
                        }}
                    />
                    <View style={{ gap: 5 }}>
                        <Text family="GBold" size="medium">
                            {data?.brandDetail?.brandName} {data?.brandVehicleDetail?.brandVehicleName}
                        </Text>
                        <Text
                            family="GRegular"
                            size="semimedium"
                            color={theme.texthilight}
                        >
                            {dateDisplay(new Date(data.serviceStartTime))}
                        </Text>
                        <Text family="GRegular" size="semismall">
                            {data.serviceUniqueId ?? data?._id}
                        </Text>
                    </View>
                </Pressable>
            </View>
            <View style={{ marginBottom: 35 }}>
                <Pressable
                    style={{
                        backgroundColor:
                            data.status === constantData?.serviceStatus?.started ? "#DD9E40" : data.status === constantData?.serviceStatus?.completed ?
                                theme.btnTag : Colors.pink,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 5,
                    }}
                    onPress={() => navigation.navigate('WatchActivity', { serviceId: data?._id })}
                >
                    <Text
                        family="GMedium"
                        size="semismall"
                        color={theme.activetabtext}
                    >
                        {returnServiceStatusDisplay(data)}
                    </Text>
                </Pressable>
            </View>
        </Flexcomponent>
    )
}

export default ServiceCard;
