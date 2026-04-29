import React, { useEffect, useRef, useState } from "react";
import { View, Pressable, Platform, PermissionsAndroid, Linking } from 'react-native';
import styles from "../Location/styles"
import { Button, Image } from "react-native-elements";
import { Colors } from "../../Utilities/uiasset";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { icons, lotties } from "../../Utilities/images";
import Mainview from "../../Components/mainview";
import VectorIcons from "../../Utilities/vectorIcons";
import { windowwidth } from "../../Utilities/dimensions";
import Text from "../../Components/text";
import Lottie from "../../Components/lottieview";
import Geolocation from "@react-native-community/geolocation";
import { getCurrentLocation, requestLocationPermission } from "../../Common/geoLocationFuntion";
import { toastFn } from "../../Common/commonFunction";
import { fetchLocationDetail } from "../../Common/axiosHooks/userHooks";

const FetchLocation: React.FC = () => {


    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    
    const [isLocationFetched, setIsLocationFetched] = useState(false);
    const [displayText, setDisplayText] = useState({
        heading: "Fetching locations",
        location: "",
    });
    const [location, setLocation] = useState<any>({});
    // const watchIdRef = useRef({});



    const startLiveLocation = async (initial: any) => {
        
        let finalLatLng: any = {}
        const locationPermission = await requestLocationPermission();
        console.log('locationPermissionlocationPermission',locationPermission)
        if (locationPermission!=PermissionsAndroid.RESULTS.GRANTED) {
            if(locationPermission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN && !initial){
                Linking.openSettings();
                toastFn("Enable location access to fetch live location");
                setDisplayText({
                    heading: "Cannot fetch location",
                    location: "Please enable location access",
                });
            }
            else{
                toastFn("Cannot fetch live location");
                setDisplayText({
                    heading: "Cannot fetch location",
                    location: "",
                });
            }
            return;
        }

        console.log('heyyyy')

        let position:any;
        // console.log('useeefffectttt')
        try {
            position = await getCurrentLocation();
        }
        catch (err) {
            console.log('getCurrentLocationDetail_error', err);
        }
        setIsLocationFetched(true)
        console.log('positionposition',position)
        if(position?.error){
            return toastFn(position?.error?.message??"Cannot fetch live location");
        }
        else{
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
        console.log('respppp',resp);
        if(resp?.status){
            setDisplayText({
                heading:"Fetched live location",
                location: `${resp?.data?.addressData?.city}, ${resp?.data?.addressData?.country}`,
            })
        }
        else{
            setDisplayText({
                heading:"Cannot fetch live location detail",
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

        if(!initial){
            return navigation.navigate('UpdateLocation',{locationData: setData });
        }

        console.log('positionposition',position)

        // working watcher
        // Geolocation.watchPosition(
        //     position => {
        //         console.log('checkkkkkkposition', position)
        //         // setLocation({
        //         //     lat: position.coords.latitude,
        //         //     lng: position.coords.longitude
        //         // });
        //     },
        //     error => console.log("Location error", error),
        //     {
        //         enableHighAccuracy: false,
        //         distanceFilter: 0,
        //     }
        // );
        // working watcher

        // Stop old watcher
        // if (watchIdRef.current !== null) {
        //     Geolocation.clearWatch(watchIdRef.current);
        // }

        // Start new watcher
        // watchIdRef.current = Geolocation.watchPosition(
        //     position => {
        //         console.log('checkkkkkkposition',position)
        //         setLocation({
        //             lat: position.coords.latitude,
        //             lng: position.coords.longitude
        //         });
        //     },
        //     error => console.log("Location error", error),
        //     {
        //         enableHighAccuracy: true,
        //         distanceFilter: 0,
        //     }
        // );
    };

    console.log('locationlocation',location)


    const stopLiveLocation = () => {
        // if (watchIdRef.current !== null) {
        //     Geolocation.clearWatch(watchIdRef.current);
        //     watchIdRef.current = null;
        //     console.log("Stopped live location");
        // }
    };
    
    useEffect(() => {
        startLiveLocation(true);

        return () => {
            stopLiveLocation();
        };
    }, []);


    return (
        <Mainview
            isheader={false}
            isscollable={false}
            statusbarcontent="dark"
            customheader={
                <>
                    <View style={style.headerContainer}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <VectorIcons
                                family="AntDesign"
                                name="left"
                                size={windowwidth * 0.055}
                            />
                        </Pressable>
                    </View>
                </>
            }
        >
            <View style={style.autoLocContainer}>
                {!isLocationFetched && <View style={style.centerContent}>

                    <Lottie
                        src={lotties.location}
                        width={"80%"}
                        height={"80%"}
                        style={{ bottom: "10%" }}
                    />
                    <Text style={{ bottom: "35%" }} size={"large"} family="bold">Fetching location...</Text>

                </View>}
                {isLocationFetched && (
                    <View style={style.fetchedContent}>
                        <View style={style.locationStatus}>
                            <Lottie
                                src={lotties.location}
                                width={"80%"}
                                height={"80%"}
                            />
                            <View style={{ bottom: "25%", alignItems: "center" }} >
                                <Text style={{ color: Colors.green }} family="bold" size={"large"}>{displayText?.heading}</Text>
                                <Text family="bold" size={"medium"}>{displayText?.location}</Text>
                            </View>
                        </View>
                        <View style={style.buttonContainer}>
                            <Button title="Go to fetch live locations" buttonStyle={isLocationFetched ? style.button : style.buttonSelect} onPress={() => startLiveLocation(false)} />
                            <Button title="Select Manually" titleStyle={{
                                color: isLocationFetched ? theme.btnColor : 'white',
                            }} buttonStyle={!isLocationFetched ? style.button : style.buttonSelect} onPress={() => navigation.navigate('UpdateLocation')} />
                        </View>
                    </View>
                )}
            </View>
        </Mainview>

    );
}

export default FetchLocation;
