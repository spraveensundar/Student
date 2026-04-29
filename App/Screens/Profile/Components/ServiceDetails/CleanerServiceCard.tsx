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
import FastImage from "@d11/react-native-fast-image";
import VectorIcons from "../../../../Utilities/vectorIcons";


interface Props {
    data: any;
    index?: number;
}

const CleanerServiceCard: React.FC<Props> = ({
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

    const isServiceCompleted = () => {
        if (data?.status === constantData.serviceStatus.completed) {
            return true;
        }
        return false;
    }

    return (
        <View style={[style.addOns, { justifyContent: 'flex-start' }]}>
            <FastImage source={{uri: returnOriginalFile(data?.packageDetail?.packageImage)}} style={{ width: windowwidth * 0.2, height: windowwidth * 0.2, borderRadius: 10, overflow: 'hidden' }} />
            <View style={{ gap: 20 }}>
                <View style={{ gap: 4 }}>
                    <Text family="GMedium" size="medium">
                        {data?.packageDetail?.heading}
                    </Text>
                    <Text family="GRegular" size="semimedium">{dateDisplay(new Date(data.serviceStartTime))}</Text>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        <Text family="GRegular" size="semimedium">
                            {returnServiceStatusDisplay(data)}
                        </Text>
                        {
                            isServiceCompleted()
                            ?
                            <VectorIcons
                            family="Ionicons"
                            name="checkmark-circle-sharp"
                            iconcolor={theme.btnTag}
                            size={20}
                        />
                            :
                            <></>
                        }
                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Pressable onPress={() => navigation.navigate("WatchActivity", { serviceId: data?._id })} style={[style.btn, { backgroundColor: '#02BC7D', }]}>
                        <Text family="GMedium" size="semismall" color={theme.activetabtext} style={{ textAlign: 'center', }}>View details</Text>
                    </Pressable>
                    <Pressable style={[style.btn, { backgroundColor: '#E2004F1A', }]}>
                        <Text family="GMedium" size="semismall" color={Colors.pink} style={{ textAlign: 'center', }}>Report</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default CleanerServiceCard;
