import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { Button } from "react-native-elements";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import styles from "./styles";
import Text from "../../../Components/text";
import { Dropdown, Input } from "../../../Components/Field";
import { useDispatch, useSelector } from "react-redux";
import { setNewCleaningService } from "../../../Common/redux/serviceReducer";
import { getMyLocationCommonFunction, isEmpty, returnAddressFormat, returnArrayOnly, toastFn } from "../../../Common/commonFunction";
import { useFocusEffect } from "@react-navigation/native";
import { getItem } from "../../../Common/localStorage";
import { constantData } from "../../../Common/constant";
import { fetchLocationDetail } from "../../../Common/axiosHooks/userHooks";
import AutoCompleteAddressInput from "../../../Components/Field/Input/AutoCompleteAddressInput";
import { googleMapPlaceIdFetch } from "../../../Common/axiosHooks/thirdPartyHooks";
import { ScrollView } from "react-native-gesture-handler";
import ErrorText from "../../../Components/ErrorText";
import Lottie from "../../../Components/lottieview";
import Images, { icons, lotties } from "../../../Utilities/images";
import MapView from "react-native-maps";
import { useGetApartmentListQuery, useGetAppDataQuery, useGetCityListQuery, useLazyGetApartmentListQuery } from "../../../Common/redux/userHook";

interface ServiceDetailsProps {
    onNext: () => void;
    changeLoadingStatus?: (data: any) => void;
}

interface PlacePrediction {
    description: string;
    place_id: string;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ onNext, changeLoadingStatus }) => {



    const newCleaningService = useSelector((state: any) => state?.serviceData?.newCleaningService)
    const dispatch = useDispatch();
    const appData = useGetAppDataQuery(undefined);
    const cityData = useGetCityListQuery(undefined);
    const [trigger] = useLazyGetApartmentListQuery({});


    const { theme } = useCustomHooks();
    const style = styles(theme);


    const [myLocation, setMyLocation] = useState<any>({})
    const [validateErrors, setValidateErrors] = useState<any>({});
    const [marker, setMarker] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [apartmentList, setApartmentList] = useState<any>([]);
    const [cityList, setCityList] = useState<any>([]);
    const [settingsData, setSettingsData] = useState<any>({});


    const mapRef = useRef<MapView>(null);


    useFocusEffect(
        useCallback(() => {
            console.log('heyyyyyy', getItem(constantData.currentAddress))
            let currentAddressData: any = getItem(constantData.currentAddress)
            if (!newCleaningService?.latitude && currentAddressData?.location) {
                dispatch(
                    setNewCleaningService({
                        apartmentName: "",
                        sector: currentAddressData?.sector,
                        area: currentAddressData?.area,
                        city: currentAddressData?.city,
                        landmark: "",
                        latitude: currentAddressData?.location?.[0],
                        longitude: currentAddressData?.location?.[1],
                        address: currentAddressData?.fullAddress,
                        addressData: currentAddressData?.addressData,
                    })
                );
            }
            appData?.refetch();
            cityData?.refetch();
        }, [])
    )

    const onChange = (value: string, id: string) => {
        setValidateErrors({});
        let setData = {
            ...newCleaningService,
            [id]: value,
        }
        if (id == "fullAddress") {
            setData = {
                ...setData,
                location: [0, 0],
                // flatNo: "",
                sector: "",
                // area: "",
                city: "",
                state: "",
                country: "",
            }
        }
        dispatch(
            setNewCleaningService(setData)
        );
    }

    const validate = (data: any) => {
        let errors: any = {};
        if (isEmpty(data?.blockNo)) {
            errors.blockNo = "Enter block number"
        }
        if (isEmpty(data?.flatNo)) {
            errors.flatNo = "Enter flat number"
        }
        if (isEmpty(data?.apartmentName)) {
            errors.apartmentName = "Apartment name required"
        }
        if (isEmpty(data?.address)) {
            errors.address = "Enter address";
        }
        else if (data?.latitude == 0 && data?.longitude == 0) {
            errors.address = "Select valid address";
        }
        if (isEmpty(data?.landmark)) {
            errors.landmark = "Enter Landmark";
        }
        if (isEmpty(data?.sector)) {
            errors.sector = "Enter sector"
        }
        if (data?.city) {
            if (settingsData?.cityRestrictionForOts == true && newCleaningService?.serviceType == constantData.subscriptionType.ots) {
                if (!cityList.find((val: any) => val?.city?.toLowerCase() == data?.city?.toLowerCase())) {
                    errors.city = "Service not available in your city"
                }
            }
            if (settingsData?.apatmentListForSubscribe == true && newCleaningService?.serviceType == constantData.subscriptionType.subscribe) {
                if (!cityList.find((val: any) => val?.city?.toLowerCase() == data?.city?.toLowerCase())) {
                    errors.city = "Service not available in your city"
                }
            }
        }
        // if(isEmpty(data?.city)){
        //     errors.city = "Enter city"
        // }
        return errors;
    }

    const getMyLocation = async () => {

        changeLoadingStatus?.({
            overLapLoader: true
        })
        let resp = await getMyLocationCommonFunction(true);
        let position = resp?.position;
        if (position?.error || isEmpty(position)) {
            return;
        }

        if (resp?.status) {
            toastFn("Fetched live location")
        }
        else {
            toastFn(`Cannot fetch live location detail, lat: ${position.coords.latitude},lng: ${position.coords.longitude}`)
        }

        let setData: any = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: resp?.data?.address,
            addressData: resp?.data?.addressData,
        }
        setData = {
            ...setData,
            sector: setData?.addressData?.street,
            flatNo: setData?.addressData?.doorNumber,
            city: setData?.addressData?.city,
            state: setData?.addressData?.state,
            country: setData?.addressData?.country,
        }
        setMyLocation(setData);
        dispatch(
            setNewCleaningService({
                apartmentName: setData?.flatNo,
                sector: setData?.sector,
                landmark: setData?.landmark,
                city: setData?.city,
                latitude: setData?.latitude,
                longitude: setData?.longitude,
                address: setData?.address,
                addressData: setData?.addressData,
            })
        );
        changeLoadingStatus?.({
            overLapLoader: false
        })
    }

    useEffect(() => {
        if ((newCleaningService?.latitude || newCleaningService?.longitude) && (marker?.latitude != newCleaningService?.latitude || marker?.longitude != newCleaningService?.longitude)) {
            updateLocationInMap(newCleaningService?.latitude, newCleaningService?.longitude, false, true);
        }
    }, [newCleaningService?.latitude, newCleaningService?.longitude])

    const onContinue = async () => {
        let checkError = validate(newCleaningService);
        if (isEmpty(checkError)) {
            setValidateErrors({});
            onNext();

            // backend location update

            // let currentAddressData: any = getItem(constantData.currentAddress);
            // let sameAddress = false;
            // if(
            //     myLocation?.latitude == newCleaningService?.latitude && myLocation?.longitude == newCleaningService?.longitude && 
            //     myLocation?.city == newCleaningService?.city && myLocation?.flatNo == newCleaningService?.apartmentName &&
            //     myLocation?.sector == newCleaningService?.sector
            // ){
            //     sameAddress = true;
            // }
            // else if(
            //     currentAddressData?.location?.[0] == newCleaningService?.latitude && currentAddressData?.location?.[1] == newCleaningService?.longitude &&
            //     currentAddressData?.city == newCleaningService?.city && currentAddressData?.flatNo == newCleaningService?.apartmentName &&
            //     currentAddressData?.sector == newCleaningService?.sector
            // ){
            //     sameAddress = true;
            // }
            // if(sameAddress){
            //     onNext();
            // }
            // else{
            let sendData: any = {
                latitude: newCleaningService?.latitude,
                longitude: newCleaningService?.longitude,
            };
            // let resp = await fetchLocationDetail(sendData);
            // if(resp?.status){
            //     let addressData = resp?.data?.addressData
            //     let setData = {
            //         ...newCleaningService,
            //         latitude: resp?.data?.latitude,
            //         longitude: resp?.data?.longitude,
            //         address: resp?.data?.address,
            //         addressData: addressData,
            //     };
            //     dispatch(
            //         setNewCleaningService(setData)
            //     );
            //     onNext();
            // }
            // else{
            //     toastFn(resp?.message ?? "Location not recognized")
            // }
            // }

            // backend location update


        }
        else {
            setValidateErrors(checkError);
            toastFn("Fix validations");
        }
    }

    console.log('newCleaningServicedetailll', newCleaningService, marker)

    const onSelect = async (data: PlacePrediction) => {
        setValidateErrors({});
        let setData = {
            ...newCleaningService,
            address: data?.description,
        }
        dispatch(
            setNewCleaningService(setData)
        );

        const details = await googleMapPlaceIdFetch(data.place_id);

        const result = details?.result;
        if (result) {
            let addressData = returnAddressFormat(result);
            console.log('resultresult', result, addressData)
            if (isEmpty(addressData?.city)) {
                setData = {
                    ...newCleaningService,
                    city: "",
                    sector: "",
                    address: "",
                    area: "",
                    landmark: "",
                    addressData: {},
                }
                dispatch(
                    setNewCleaningService(setData)
                );

                toastFn("Choose more accurate address");
                return false;
            }
            let lat = result?.geometry?.location?.lat, lng = result?.geometry?.location?.lng;
            setData = {
                ...setData,
                sector: addressData?.street,
                area: addressData?.area,
                city: addressData?.city,
                state: addressData?.state,
                country: addressData?.country,

                address: data?.description,
                latitude: lat,
                longitude: lng,
                addressData: addressData,
            }

            dispatch(
                setNewCleaningService(setData)
            );
        }
        else {
            toastFn(details?.message);
        }
        console.log('detailsdetails', details)
    }

    const updateLocationInMap = async (lat: number, lng: number, updateAddress?: boolean, defaultDelta?: boolean) => {
        console.log('latttttt', lat, lng)
        if (lat || lng) {

            const updateInMarker = () => {
                console.log('lattttttinnn', lat, lng, mapRef?.current)
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
                    let addressData = resp?.data?.addressData;
                    // let setData = {
                    //     lat: lat,
                    //     lng: lng,
                    //     address: resp?.data?.address,
                    //     addressData: resp?.data?.addressData,
                    // }
                    let setData = {
                        ...newCleaningService,
                        sector: addressData?.street,
                        area: addressData?.area,
                        city: addressData?.city,
                        state: addressData?.state,
                        country: addressData?.country,

                        address: resp?.data?.address,
                        latitude: lat,
                        longitude: lng,
                        addressData: addressData,
                    }
                    dispatch(
                        setNewCleaningService(setData)
                    );
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

    useEffect(() => {
        setCityList(returnArrayOnly(cityData?.data?.data));
        // setApartmentList(returnArrayOnly(apartmentData?.data?.data));
        setSettingsData(appData?.data?.data || {})
    }, [, cityData?.data?.data, appData?.data?.data])

    useEffect(() => {
        fetchApartmentList();
    }, [newCleaningService?.city, cityList])

    const fetchApartmentList = async () => {
        let getCityId = cityList?.find((check: any) => (String(check?.city).toLowerCase() == String(newCleaningService?.city).toLowerCase()))
        if (getCityId) {
            let sendData = {
                cityId: getCityId?._id
            }
            let resp = await trigger(sendData);
            setApartmentList(returnArrayOnly(resp?.data?.data));
        }
        else {
            setApartmentList([])
        }
    }

    return (
        <View style={style.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{ gap: 20 }}>

                    <View style={style.map}>
                        <MapView
                            ref={mapRef}
                            style={[style.map]}
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

                    <Text family="GMedium" size="semilarge" >Enter Details</Text>
                    {/* <Dropdown
                    label={'Sector'}
                    placeholder={'Choose sector type'}
                /> */}

                    <Input
                        label={'Tower / Block No'}
                        placeholder="Block number"
                        placeholderTextColor={theme.placeholderColor}
                        value={newCleaningService?.blockNo ?? ""}
                        onChange={(e) => onChange(e, "blockNo")}
                    />

                    {
                        validateErrors?.blockNo
                            ?
                            <ErrorText
                                errorMessage={validateErrors?.blockNo}
                            />
                            :
                            <></>
                    }

                    <Input
                        label={'Flat no/house No'}
                        placeholder="Enter Flatno/house no"
                        placeholderTextColor={theme.placeholderColor}
                        value={newCleaningService?.flatNo ?? ""}
                        onChange={(e) => onChange(e, "flatNo")}
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

                    {
                        (
                            (settingsData?.apatmentListForOts == true && newCleaningService?.serviceType == constantData.subscriptionType.ots)
                            ||
                            (settingsData?.apatmentListForSubscribe == true && newCleaningService?.serviceType == constantData.subscriptionType.subscribe)
                        )
                            ?
                            <>
                                <Dropdown
                                    label={'Apartment Name/Sector'}
                                    placeholder={'Select Apartment Name/Sector'}
                                    value={newCleaningService?.apartmentName ?? ""}
                                    onChange={(e) => onChange((e?.name ?? ""), "apartmentName")}
                                    labelField="name"
                                    valueField="name"
                                    list={apartmentList}
                                />
                            </>
                            :
                            <>
                                <Input
                                    label={'Apartment Name/Sector'}
                                    placeholder="Enter Apartment Name / sector"
                                    placeholderTextColor={theme.placeholderColor}
                                    value={newCleaningService?.apartmentName ?? ""}
                                    onChange={(e) => onChange(e, "apartmentName")}
                                />
                            </>
                    }

                    {/* <Input
                        label={'Apartment Name/Sector'}
                        placeholder="Enter Apartment Name / sector"
                        placeholderTextColor={theme.placeholderColor}
                        value={newCleaningService?.apartmentName ?? ""}
                        onChange={(e) => onChange(e, "apartmentName")}
                    /> */}

                    {
                        validateErrors?.apartmentName
                            ?
                            <ErrorText
                                errorMessage={validateErrors?.apartmentName}
                            />
                            :
                            <></>
                    }

                    <AutoCompleteAddressInput
                        value={newCleaningService?.address}
                        onChange={(e) => onChange(e, "address")}
                        onSelect={(data) => onSelect(data)}
                        placeHolderText={"Enter address"}
                        scrollEnabled={false}
                    />
                    {
                        validateErrors?.address
                            ?
                            <ErrorText
                                errorMessage={validateErrors?.address}
                            />
                            :
                            <></>
                    }


                    <Input
                        label={'Sector'}
                        placeholder="Enter sector"
                        placeholderTextColor={theme.placeholderColor}
                        value={newCleaningService?.sector ?? ""}
                        onChange={(e) => onChange(e, "sector")}
                        editable={(!newCleaningService?.addressData?.street && (newCleaningService?.latitude || newCleaningService?.longitude)) ? true : false}
                    />

                    {
                        validateErrors?.sector
                            ?
                            <ErrorText
                                errorMessage={validateErrors?.sector}
                                errorTextContainerStyle={{ marginTop: 1 }}
                            />
                            :
                            <></>
                    }

                    <Input
                        label={'Landmark'}
                        placeholder="Enter landmark"
                        placeholderTextColor={theme.placeholderColor}
                        value={newCleaningService?.landmark ?? ""}
                        onChange={(e) => onChange(e, "landmark")}
                    />

                    {
                        validateErrors?.landmark
                            ?
                            <ErrorText
                                errorMessage={validateErrors?.landmark}
                                errorTextContainerStyle={{ marginTop: 1 }}
                            />
                            :
                            <></>
                    }

                    <Input
                        label={'City'}
                        placeholder="Enter City"
                        placeholderTextColor={theme.placeholderColor}
                        value={newCleaningService?.city ?? ""}
                        onChange={(e) => onChange(e, "city")}
                        disabled={true}
                    />

                    {
                        validateErrors?.city
                            ?
                            <ErrorText
                                errorMessage={validateErrors?.city}
                                errorTextContainerStyle={{ marginTop: 1 }}
                            />
                            :
                            <></>
                    }

                    {/* <Dropdown
                    label={'City'}
                    placeholder={'Choose City'}
                /> */}

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

                </View>
            </ScrollView>
            <View >
                <Button title="Continue" buttonStyle={style.button} onPress={() => onContinue()} />
            </View>
        </View>
    )
}

export default ServiceDetails;