import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, View, TextInput, ScrollView, Linking, PermissionsAndroid, BackHandler, TouchableOpacity } from 'react-native';
import styles from "../Location/styles"
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button, Image } from "react-native-elements";
import Images, { icons, lotties } from "../../Utilities/images";
import Mainview from "../../Components/mainview";
import useCustomHooks from "../../Actions/Hooks/customhook";
import Text from "../../Components/text";
import VectorIcons from "../../Utilities/vectorIcons";
import { windowwidth } from "../../Utilities/dimensions";
import { Colors } from "../../Utilities/uiasset";
import { useFocusEffect } from "@react-navigation/native";
import { isEmpty, loginCheck, returnAddressFormat, returnArrayOnly, toastFn } from "../../Common/commonFunction";
import { setItem } from "../../Common/localStorage";
import { constantData } from "../../Common/constant";
import { useDispatch } from "react-redux";
import { setAddress } from "../../Common/redux/authSliceReducer";
import { addAddress, editAddress, fetchLatLng, fetchLocationDetail } from "../../Common/axiosHooks/userHooks";
import { getCurrentLocation, requestLocationPermission } from "../../Common/geoLocationFuntion";
import { useGetMyDetailQuery } from "../../Common/redux/userHook";

import { Input } from "../../Components/Field";
import { googleMapAutoComplete, googleMapPlaceIdFetch } from "../../Common/axiosHooks/thirdPartyHooks";
import { FlatList } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import AutoCompleteAddressInput from "../../Components/Field/Input/AutoCompleteAddressInput";
import ErrorText from "../../Components/ErrorText";
import { NavigationProp, stackNavProp } from "../../Actions/types";
import Lottie from "../../Components/lottieview";


// type UpdateLocationProps = {
//   route: {
//     params: {
//       locationData: any;
//       redirectTo: string;
//       dataFrom: string;
//     };
//   };
//   navigation: NavigationProp;
// };

type UpdateLocationProps = {
    navigation: NavigationProp;
    route: stackNavProp<'UpdateLocation'>['route'];
};

interface PlacePrediction {
    description: string;
    place_id: string;
}

interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

interface PlaceDetailsResult {
    formatted_address: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
    address_components: AddressComponent[];
}

let defaultFormData = {
    id: null,
    location: [0, 0],
    addressType: "Home",
    sector: "",
    flatNo: "",
    area: "",
    city: "",
    country: "",
    isDisplay: false,
    fullAddress: "",
    addressData: {},
};


let previousData: any = defaultFormData;

const UpdateLocation: React.FC<UpdateLocationProps> = ({ route }) => {


    const { refetch } = useGetMyDetailQuery(undefined);
    const dispatch = useDispatch();


    const params: any = route?.params;
    const locationData = params?.locationData, dataFrom = params?.dataFrom;


    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const [formData, setFormData] = useState<any>({ ...defaultFormData });
    const [selectedTab, setSelectedTab] = useState("Home");
    const [liveLocationData, setLiveLocationData] = useState<any>({});
    const [disableStatus, setDisableStatus] = useState(false);
    const [validateErrors, setValidateErrors] = useState<any>({});
    const [results, setResults] = useState<PlacePrediction[]>([]);
    const [marker, setMarker] = useState({
        latitude: 0,
        longitude: 0,
    });

    const mapRef = useRef<MapView>(null);


    console.log('liveLocationDataliveLocationData', formData, locationData)

    useFocusEffect(
        useCallback(() => {
            if (locationData?._id) {
                previousData = {
                    ...formData,
                    location: [locationData?.lat, locationData?.lng],
                    sector: locationData?.sector ?? "",
                    flatNo: locationData?.flatNo ?? "",
                    area: locationData?.area,
                    city: locationData?.city,
                    id: locationData?._id,
                    state: locationData?.state,
                    country: locationData?.country,
                    isDisplay: locationData?.isDisplay,
                    fullAddress: locationData?.fullAddress,
                    addressData: locationData?.addressData,
                }
                updateLocationInMap(locationData?.lat, locationData?.lng, false, true);
            }
            else if (locationData?.addressData) {
                previousData = {
                    ...formData,
                    location: [locationData?.lat, locationData?.lng],
                    sector: locationData?.addressData?.street,
                    flatNo: locationData?.addressData?.doorNumber,
                    area: locationData?.addressData?.area,
                    city: locationData?.addressData?.city,
                    state: locationData?.addressData?.state,
                    country: locationData?.addressData?.country,
                    fullAddress: locationData?.addressData?.fullAddress,
                    addressData: locationData?.addressData,
                }
                updateLocationInMap(locationData?.lat, locationData?.lng, false, true);
            }
            else {
                previousData = { ...formData };
            }
            setFormData(previousData)
        }, [])
    )

    const onChange = (value: any, id: any) => {
        setDisableStatus(false);
        setValidateErrors({});
        let setData = {
            ...formData,
            [id]: value,
        }
        if (id == "fullAddress") {
            setData = {
                ...setData,
                location: [0, 0],
                flatNo: "",
                sector: "",
                area: "",
                city: "",
                state: "",
                country: "",
                addressData: {},
            }
        }
        setFormData(setData)
    }

    const validate = () => {
        let errors: any = {};
        if (isEmpty(formData.flatNo)) {
            errors.flatNo = "Enter Flatno, apartment name";
        }
        if (isEmpty(formData?.fullAddress)) {
            errors.fullAddress = "Enter address";
        }
        else if (formData?.latitude == 0 && formData?.longitude == 0) {
            errors.fullAddress = "Select valid address";
        }
        // if(isEmpty(formData.sector)){
        //     errors.sector = "Enter sector";
        // }
        // if(isEmpty(formData.city)){
        //     errors.city = "Enter city";
        // }
        return errors;
    }

    const goBottomTab = () => {
        navigation.goBack();
        navigation.goBack();
    }

    const saveAddress = async () => {
        setDisableStatus(true);
        try {
            let errors = validate();
            if (isEmpty(errors)) {
                let sendData: any = {
                    addressType: formData?.addressType,
                    sector: formData?.sector,
                    flatNo: formData?.flatNo,
                    city: formData?.city,
                    state: formData?.state,
                    country: formData?.country,
                    isDisplay: formData?.isDisplay,
                    address: formData?.fullAddress,
                    addressData: JSON.stringify(formData?.addressData),
                };
                if (formData?.area) {
                    sendData.area = formData?.area;
                }
                let successNavigateTo = params?.redirectTo ?? "Bottomtab";
                console.log('checkkkk', loginCheck())
                if (loginCheck()) {
                    if (
                        formData?.location?.[0] == locationData?.lat &&
                        formData?.location?.[1] == locationData?.lng &&
                        locationData?.address
                    ) {
                        sendData.latitude = locationData?.lat;
                        sendData.longitude = locationData?.lng;
                    }
                    else if (formData?.location && (formData?.location?.[0] != 0 || formData?.location?.[1] != 0)) {
                        sendData.latitude = formData?.location?.[0];
                        sendData.longitude = formData?.location?.[1];
                    }
                    if (formData?.id) {
                        sendData.id = formData?.id;
                        let resp = await editAddress(sendData);
                        console.log('respppspsp', resp, sendData)
                        if (resp?.status) {
                            if (sendData?.isDisplay) {
                                setItem(constantData.currentAddress, JSON.stringify(resp?.data));
                                dispatch(
                                    setAddress(sendData)
                                );
                            }
                            toastFn("Address updated");
                            await refetch();
                            goBottomTab();
                            previousData = defaultFormData;
                            // navigation.navigate(successNavigateTo);
                        }
                        else {
                            toastFn(resp?.message ?? "Location not recognized")
                        }
                    }
                    else {
                        let resp = await addAddress(sendData);
                        console.log('respppspsp', resp)
                        if (resp?.status) {
                            if (sendData?.isDisplay) {
                                setItem(constantData.currentAddress, JSON.stringify(resp?.data));
                                dispatch(
                                    setAddress(sendData)
                                );
                            }
                            toastFn("Address added");
                            await refetch();
                            goBottomTab()
                            previousData = defaultFormData;
                            // navigation.navigate(successNavigateTo);
                        }
                        else {
                            toastFn(resp?.message ?? "Location not recognized")
                        }
                    }
                }
                else {
                    console.log('checkkk', formData?.location, locationData)
                    sendData.fullAddress = formData?.fullAddress;
                    sendData.location = formData.location;
                    setItem(constantData.currentAddress, JSON.stringify(sendData));
                    dispatch(
                        setAddress(sendData)
                    );
                    toastFn("Address updated");
                    previousData = defaultFormData;
                    navigation.navigate(successNavigateTo);
                    // if (
                    //     formData?.location?.[0] == locationData?.lat &&
                    //     formData?.location?.[1] == locationData?.lng &&
                    //     locationData?.address
                    // ) {
                    //     sendData.fullAddress = formData?.fullAddress;
                    //     sendData.location = formData.location;
                    //     setItem(constantData.currentAddress, JSON.stringify(sendData));
                    //     dispatch(
                    //         setAddress(sendData)
                    //     );
                    //     toastFn("Address updated");
                    //     previousData = defaultFormData;
                    //     navigation.navigate(successNavigateTo);
                    // }
                    // else {
                    //     let resp = await fetchLatLng(sendData);
                    //     if (resp?.status) {
                    //         // sendData.fullAddress = resp?.data?.address;
                    //         // sendData.addressData = resp?.data?.addressData;
                    //         // sendData.location = [resp?.data?.latitude, resp?.data?.longitude]
                    //         sendData.fullAddress = formData?.fullAddress;
                    //         sendData.location = formData.location;
                    //         setItem(constantData.currentAddress, JSON.stringify(sendData));
                    //         dispatch(
                    //             setAddress(sendData)
                    //         );
                    //         toastFn("Address updated");
                    //         previousData = defaultFormData;
                    //         navigation.navigate(successNavigateTo);
                    //     }
                    //     else {
                    //         toastFn(resp?.message ?? "Location not recognized")
                    //     }
                    // }
                }
            }
            else {
                setValidateErrors(errors);
                // toastFn("Enter address");
                // toastFn(Object.values(errors)?.[0]);
                toastFn("Fix all validations");
            }
        }
        catch (error: any) {
            console.log("saveAddress_error", error);
        }
        setDisableStatus(false);
    }

    const getMyLocation = async () => {
        let finalLatLng: any = {}
        const locationPermission = await requestLocationPermission();
        console.log('locationPermissionlocationPermission', locationPermission)
        if (locationPermission != PermissionsAndroid.RESULTS.GRANTED) {
            if (locationPermission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                Linking.openSettings();
                toastFn("Enable location access to fetch live location");
            }
            else {
                toastFn("Cannot fetch live location");
            }
            return;
        }

        let position: any;
        // console.log('useeefffectttt')
        try {
            position = await getCurrentLocation();
        }
        catch (err) {
            console.log('getCurrentLocationDetail_error', err);
        }

        if (position?.error) {
            return toastFn(position?.error?.message ?? "Cannot fetch live location");
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
            toastFn("Fetched live location")
        }
        else {
            toastFn(`Cannot fetch live location detail, lat: ${position.coords.latitude},lng: ${position.coords.longitude}`)
        }

        let setData = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: resp?.data?.address,
            addressData: resp?.data?.addressData,
        }
        setLiveLocationData({
            fullAddress: setData?.addressData?.fullAddress,
            location: [setData?.lat, setData?.lng],
            flatNo: setData?.addressData?.doorNumber,
            sector: setData?.addressData?.street,
            city: setData?.addressData?.city,
            state: setData?.addressData?.state,
            country: setData?.addressData?.country,
        })

        updateLocationInMap(setData?.lat, setData?.lng);

        setFormData({
            ...formData,
            fullAddress: setData?.addressData?.fullAddress,
            location: [setData?.lat, setData?.lng],
            flatNo: setData?.addressData?.doorNumber,
            sector: setData?.addressData?.street,
            area: setData?.addressData?.area,
            city: setData?.addressData?.city,
            state: setData?.addressData?.state,
            country: setData?.addressData?.country,
            addressData: setData?.addressData,
        });

    }

    console.log('heyyyyyy_out', dataFrom)

    const goBackFunction = () => {

        console.log('heyyyyyy', dataFrom)
        if (dataFrom == "LiveLocation") {
            navigation.goBack();
            navigation.goBack();
            return true;
        }
        navigation.goBack();
        return true;
    }

    useFocusEffect(
        useCallback(() => {


            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                goBackFunction,
            );

            return () => backHandler.remove();
        }, [])
    )

    const onSelect = async (data: PlacePrediction) => {

        setFormData({
            ...formData,
            fullAddress: data?.description,
        });

        const details = await googleMapPlaceIdFetch(data.place_id);

        const result = details?.result;
        if (result) {
            let addressData = returnAddressFormat(result);
            if (isEmpty(addressData?.city)) {

                setFormData({
                    ...formData,
                    fullAddress: "",
                    location: [0, 0],
                    flatNo: "",
                    sector: "",
                    area: "",
                    city: "",
                    state: "",
                    country: "",
                })
                toastFn("Choose more accurate address");
                return false;
            }
            let lat = result?.geometry?.location?.lat, lng = result?.geometry?.location?.lng;
            setFormData({
                ...formData,
                fullAddress: data?.description,
                location: [lat, lng],
                flatNo: addressData?.doorNumber,
                sector: addressData?.street,
                area: addressData?.area,
                city: addressData?.city,
                state: addressData?.state,
                country: addressData?.country,
                addressData: addressData,
            })
            updateLocationInMap(lat, lng, false, true);
        }
        else {
            toastFn(details?.message);
        }
        console.log('detailsdetails', details)
    }

    const updateLocationInMap = async (lat: number, lng: number, updateAddress?: boolean, defaultDelta?: boolean) => {
        console.log('latttttt', lat, lng)
        if (lat && lng && mapRef.current) {

            const updateInMarker = () => {
                setMarker({
                    latitude: lat,
                    longitude: lng,
                });
                if (mapRef?.current && defaultDelta) {
                    mapRef.current.animateToRegion(
                        {
                            latitude: lat,
                            longitude: lng,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        },
                        500 // duration in ms
                    );
                }
            }

            if (updateAddress) {
                let sendData = {
                    latitude: String(lat),
                    longitude: String(lng),
                }
                let resp = await fetchLocationDetail(sendData);
                console.log('respresp', resp)
                if (resp?.status) {
                    let setData = {
                        lat: lat,
                        lng: lng,
                        address: resp?.data?.address,
                        addressData: resp?.data?.addressData,
                    }
                    setFormData({
                        ...formData,
                        fullAddress: setData?.addressData?.fullAddress,
                        location: [setData?.lat, setData?.lng],
                        flatNo: setData?.addressData?.doorNumber,
                        sector: setData?.addressData?.street,
                        area: setData?.addressData?.area,
                        city: setData?.addressData?.city,
                        state: setData?.addressData?.state,
                        country: setData?.addressData?.country,
                        addressData: setData?.addressData,
                    })
                    updateInMarker();
                }
                else {
                    toastFn(`Cannot fetch live location detail, lat: ${lat},lng: ${lng}`)
                }
            }
            else {
                updateInMarker();
            }
        }
    }


    return (
        <Mainview
            isheader={true}
            statusbarcontent="dark"
            headertitle={locationData ? "Update Location" : "Add Location"}
            onleftfn={() => goBackFunction()}
            bottomContent={
                <View style={{ paddingHorizontal: "6%", marginBottom: "5%" }}>
                    <Button title="Save Address" buttonStyle={style.button} onPress={() => saveAddress()} />
                </View>}
            isscollable
        >
            {/* <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={style.scrollContainer}
            > */}
            <View style={{
                gap: 20,
                display: 'flex',
            }}>
                <View style={style.map}>
                    <MapView
                        ref={mapRef}
                        style={[style.map,]}
                        initialRegion={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}

                        // onPress={(e) => {
                        //     const latitude = e?.nativeEvent?.coordinate?.latitude, longitude = e?.nativeEvent?.coordinate?.longitude;
                        //     updateLocationInMap(latitude, longitude, true);
                        // }}
                        // onPoiClick={(e) => {
                        //     const latitude = e?.nativeEvent?.coordinate?.latitude, longitude = e?.nativeEvent?.coordinate?.longitude;
                        //     updateLocationInMap(latitude, longitude, true);
                        // }}
                        onRegionChangeComplete={(region: { latitude: number, longitude: number }) => updateLocationInMap(region.latitude, region.longitude, true)}
                    >
                        {/* <Marker
                        coordinate={marker}
                        draggable
                        onDragEnd={(e) => {
                            const { latitude, longitude } = e.nativeEvent.coordinate;
                            setMarker({ latitude, longitude });
                        }}
                    /> */}


                    </MapView>
                    <Images
                        type="image"
                        source={icons.Mappin}
                        width={"17.5%"}
                        height={"17.5%"}
                        style={{ position: 'absolute', top: '40%', left: '40%', alignSelf: 'center' }}
                    />
                </View>

                {/* <GoogleMapView
                        latitude={marker.latitude}
                        longitude={marker?.longitude}
                        onRegionChangeComplete={(lat, lng)=>updateLocationInMap(lat, lng, true)}
                        viewStyle={style.map}
                        mapViewStyle={style.map}
                    /> */}

                <Text family="bold" size={"medium"}>Address Type</Text>

                <View style={style.menutab}>
                    <Pressable style={[style.tab, selectedTab === 'Home' && style.activeTab]} onPress={() => setSelectedTab('Home')}>
                        <Text style={[style.tabText, selectedTab === 'Home' && style.activeTabText]}>Home</Text>
                    </Pressable>

                    {/* <Pressable style={[style.tab, selectedTab === 'Office' && style.activeTab]} onPress={() => setSelectedTab('Office')}>
                            <Text style={[style.tabText, selectedTab === 'Office' && style.activeTabText]}>Office</Text>
                        </Pressable>

                        <Pressable style={[style.tab, selectedTab === 'Others' && style.activeTab]} onPress={() => setSelectedTab('Others')}>
                            <Text style={[style.tabText, selectedTab === 'Others' && style.activeTabText]}>Others</Text>
                        </Pressable> */}
                </View>

                <AutoCompleteAddressInput
                    value={formData?.fullAddress}
                    onChange={(e) => onChange(e, "fullAddress")}
                    onSelect={(data) => onSelect(data)}
                    placeHolderText={"Enter address"}
                    scrollEnabled={false}
                />

                {
                    validateErrors?.fullAddress
                        ?
                        <ErrorText
                            errorMessage={validateErrors?.fullAddress}
                        />
                        :
                        <></>
                }


                {/* <TextInput
                        style={style.input}
                        placeholder="Enter address"
                        value={formData?.fullAddress}
                        placeholderTextColor={'#9C9C9C'}
                        onChangeText={(e)=>fetchPlaces(e)}
                    />

                    <FlatList
                        data={results}
                        keyExtractor={(item) => item.place_id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => onSelect(item)}
                                style={{
                                    padding: 12,
                                    backgroundColor: "white",
                                    borderBottomWidth: 1,
                                    borderColor: "#ccc",
                                }}
                            >
                                <Text>{item.description}</Text>
                            </TouchableOpacity>
                        )}
                    /> */}


                <Text family="bold" size={"medium"}>Apartment Name/House No</Text>
                <TextInput
                    style={style.input}
                    // placeholder="Flat No, Apartment Name"
                    placeholder="Apartment name/house no"
                    placeholderTextColor={'#9C9C9C'}
                    onChangeText={(e) => onChange(e, "flatNo")}
                    value={formData.flatNo}
                // editable={false}
                />
                {
                    validateErrors?.flatNo
                        ?
                        <ErrorText
                            errorMessage={validateErrors?.flatNo}
                        />
                        :
                        <></>
                }

                <Text family="bold" size={"medium"}>Sector Name</Text>
                <TextInput
                    style={style.input}
                    placeholder="Sector / Locality"
                    placeholderTextColor={'#9C9C9C'}
                    onChangeText={(e) => onChange(e, "sector")}
                    value={formData.sector}
                    editable={(!formData?.addressData?.street && (formData?.location?.[0] || formData?.location?.[1])) ? true : false}
                />
                {/* {
                        validateErrors?.sector
                        ?
                        <View>
                            <Text style={style.errorText}>{validateErrors?.sector}</Text>
                        </View>
                        :
                        <></>
                    } */}

                <Text family="bold" size={"medium"}>City</Text>
                <TextInput
                    style={style.input}
                    placeholder="City"
                    placeholderTextColor={'#9C9C9C'}
                    onChangeText={(e) => onChange(e, "city")}
                    value={formData.city}
                    editable={false}
                />
                {/* {
                        validateErrors?.city
                        ?
                        <View>
                            <Text style={style.errorText}>{validateErrors?.city}</Text>
                        </View>
                        :
                        <></>
                    } */}


                <Pressable style={style.locFetch}
                    onPress={getMyLocation}
                >
                    <Lottie
                        src={lotties.locationpin}
                        style={style.locPin}
                    />
                    <Text size="medium" family="GRegular" style={{ marginTop: 10 }}>
                        Fetch my location
                    </Text>
                </Pressable>


                {
                    loginCheck()
                        ?
                        <>
                            <View style={style.select}>
                                <Text style={style.tabText}>Set as default address</Text>
                                <Pressable
                                    onPress={() => setFormData({ ...formData, isDisplay: !formData.isDisplay })}
                                    style={{
                                        borderWidth: 2,
                                        borderColor: theme.btnColor,
                                        borderRadius: 20,
                                        padding: formData.isDisplay ? 3 : 10,
                                        backgroundColor: formData.isDisplay ? theme.btnColor : "transparent",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {formData.isDisplay && (
                                        <VectorIcons
                                            family="AntDesign"
                                            name="check"
                                            size={14}
                                            iconcolor={"#FFF"} />
                                    )}
                                </Pressable>
                            </View>
                        </>
                        :
                        <></>
                }

            </View>
            {/* </ScrollView> */}


        </Mainview>

    )
}

export default UpdateLocation;