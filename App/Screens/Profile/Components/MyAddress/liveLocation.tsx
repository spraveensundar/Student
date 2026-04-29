import React, { useCallback, useEffect, useState } from "react";
import { Linking, PermissionsAndroid, View } from "react-native";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import styles from "./styles";
import Lottie from "../../../../Components/lottieview";
import { lotties } from "../../../../Utilities/images";
import { Colors } from "../../../../Utilities/uiasset";
import Text from "../../../../Components/text";
import { getCurrentLocation, requestLocationPermission } from "../../../../Common/geoLocationFuntion";
import { toastFn } from "../../../../Common/commonFunction";
import { fetchLocationDetail } from "../../../../Common/axiosHooks/userHooks";
import { useFocusEffect } from "@react-navigation/native";



const LiveLocation: React.FC = () => {


    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);



    const [isLocationFetched, setIsLocationFetched] = useState(false);
    const [displayText, setDisplayText] = useState({
        heading: "Fetching locations",
        location: "",
    });
    const [location, setLocation] = useState<any>({});



    useFocusEffect(
        useCallback(()=>{
            startLiveLocation();
        },[])
    );

    const navigateOnLoad = (sendData: any = {}) => {
        return navigation.navigate('UpdateLocation', { locationData: sendData, dataFrom: "LiveLocation" });
    }


    const startLiveLocation = async () => {
        let finalLatLng: any = {}
        const locationPermission = await requestLocationPermission();
        console.log('locationPermissionlocationPermission', locationPermission)
        if (locationPermission != PermissionsAndroid.RESULTS.GRANTED) {
            if (locationPermission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                Linking.openSettings();
                toastFn("Enable location access to fetch live location");
                setDisplayText({
                    heading: "Cannot fetch location",
                    location: "Please enable location access",
                });
            }
            else {
                toastFn("Cannot fetch live location");
                setDisplayText({
                    heading: "Cannot fetch location",
                    location: "",
                });
            }
            return;
        }

        console.log('heyyyy')

        let position: any;
        // console.log('useeefffectttt')
        try {
            position = await getCurrentLocation();
        }
        catch (err) {
            console.log('getCurrentLocationDetail_error', err);
        }
        setIsLocationFetched(true)
        console.log('positionposition', position)
        if (position?.error) {
            toastFn(position?.error?.message ?? "Cannot fetch live location");
            setTimeout(()=>{
                navigateOnLoad();
            },1000);
            return;
        }
        else {
            finalLatLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        }

        let sendData = {
            latitude: String(finalLatLng.lat),
            longitude: String(finalLatLng.lng),
        }

        let resp = await fetchLocationDetail(sendData);
        console.log('respppp', resp);
        if (resp?.status) {
            setDisplayText({
                heading: "Fetched live location",
                location: `${resp?.data?.addressData?.city}, ${resp?.data?.addressData?.country}`,
            })
        }
        else {
            setDisplayText({
                heading: "Cannot fetch live location detail",
                location: `lat: ${position.coords.latitude},lng: ${position.coords.longitude}`,
            })
        }

        let setData = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: resp?.data?.address,
            addressData: resp?.data?.addressData,
        }

        setLocation(setData);

        setTimeout(()=>{
            navigateOnLoad(setData);
        },2000)
        return;

    };

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
        }}>
            <Lottie
                src={lotties.location}
                width={"80%"}
                height={"80%"}
            />
            <View style={{ bottom: "25%", alignItems: "center" }} >
                {
                    isLocationFetched
                        ?
                        <>
                            <Text style={{ color: Colors.green }} family="bold" size={"large"}>{displayText?.heading}</Text>
                            <Text family="bold" size={"medium"}>{displayText?.location}</Text>
                        </>
                        :
                        <>
                            <Text style={{ color: Colors.green }} family="bold" size={"large"}>Fetching location...</Text>
                        </>
                }
            </View>
        </View>
    )
}

export default LiveLocation;