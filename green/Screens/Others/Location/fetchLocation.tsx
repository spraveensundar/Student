import React, { useState } from "react";
import { View } from 'react-native';
import styles from "../Location/styles"
import { Colors } from "../../../Utilities/uiasset";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { lotties } from "../../../Utilities/images";
import Mainview from "../../../Components/mainview";
import Text from "../../../Components/text";
import Lottie from "../../../Components/lottieview";
import { askLocationPermission } from "../../../Utilities/permission";
import { Getaddressdetail, getCurrentLocation } from "../../../Actions/location/location";
import { helperSelector, setCurrentlocation } from "../../../Slices/helper";
import { Button } from "../../../Components/Field";
import { useSelector } from "react-redux";

const FetchLocation: React.FC = () => {
    const [isLocationFetched, setIsLocationFetched] = useState(false);
    const { theme, navigation, dispatch } = useCustomHooks();
    const style = styles(theme);

    const { currentlocation } = useSelector(helperSelector);
    console.log("curremloc", currentlocation);

    const getlivelocation = async () => {
        try {
            setIsLocationFetched(true)
            const granted = await askLocationPermission();
            if (!granted) {
                console.warn("Location permission denied");
                return;
            }

            const coords: any = await getCurrentLocation();
            console.log("COORDS", coords);

            const label = await Getaddressdetail(coords.latitude, coords?.longitude)
            console.log(label, "labelvalue");

            const payload = {
                coordinates: coords,
                labeladdress: label?.formatedaddress
            }
            dispatch(setCurrentlocation(payload))
            setIsLocationFetched(false)
        } catch (err) {
            setIsLocationFetched(false)
            console.warn("Location error:", err);
        }
    }

    return (
        <Mainview
            isheader
            isscollable={false}
            isboxshadow={false}
        >
            <View style={style.autoLocContainer}>
                {isLocationFetched && <View style={style.centerContent}>

                    <Lottie
                        src={lotties.Locationjson}
                        width={"80%"}
                        height={"80%"}
                        style={{ bottom: "10%" }}
                    />
                    <Text style={{ bottom: "35%" }} size={"large"} family="bold">Fetching locations...</Text>

                </View>}
                {!isLocationFetched && (
                    <View style={style.fetchedContent}>
                        <View style={style.locationStatus}>
                            <Lottie
                                src={lotties.Locationjson}
                                width={"80%"}
                                height={"80%"}
                            />
                            <View style={{ bottom: "20%", alignItems: "center" }} >
                                <Text style={{ color: Colors.green }} family="bold" size={"large"}>Delivering your locations</Text>
                                {currentlocation?.labeladdress &&
                                    <Text top={"5%"} style={{ alignSelf: "center", textAlign: "center" }} family="bold" size={"medium"}>{currentlocation?.labeladdress}</Text>}
                            </View>
                        </View>
                        <View style={style.buttonContainer}>
                            <Button title={currentlocation?.coordinates.latitude ? "Current location" : "Go to fetch live locations"} textStyle={{ color: theme.btnColor }} buttonStyle={style.buttonSelect} onPress={() => currentlocation?.coordinates.latitude ? navigation.navigate('CleaningResiter') : getlivelocation()} />
                            <Button title="Select Manually" buttonStyle={style.button} onPress={() => navigation.navigate('UpdateLocation')} />
                        </View>
                    </View>
                )}
            </View>
        </Mainview>

    );
}

export default FetchLocation;
