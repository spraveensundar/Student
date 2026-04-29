import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-maps";

import Text from "../../../../Components/text";
import Images, { icons } from "../../../../Utilities/images";
import { genderOptions } from "../../../../Utilities/Helper";
import { validator } from "../../../../Common/redux/validation";
import { windowheight } from "../../../../Utilities/dimensions";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { isEmpty, toastFn } from "../../../../Common/commonFunction";
import { setScrapData } from "../../../../Common/redux/scrapService";
import { Button, Dropdown, Input } from "../../../../Components/Field";
import { getCurrentLocation } from "../../../../Common/geoLocationFuntion";
import { fetchLocationDetail } from "../../../../Common/axiosHooks/userHooks";

import styles from "../styles";

type Props = {
    onNext: () => void;
};

const ScrappingPerson: React.FC<Props> = ({ onNext }) => {
    const { theme } = useCustomHooks();
    const style = styles(theme);
    const dispatch = useDispatch();

    const scrapData = useSelector((state: any) => state.scrapService.scrapData);

    const mapRef = useRef<MapView>(null);

    const [marker, setMarker] = useState({
        latitude: scrapData?.location?.latitude || 0,
        longitude: scrapData?.location?.longitude || 0,
    });

    const [formData, setFormData] = useState({
        state: scrapData?.state || "",
        city: scrapData?.city || "",
        sector: scrapData?.sector || "",
        location: scrapData?.location || {
            latitude: 0,
            longitude: 0,
        },
    });

    const [person, setPerson] = useState<any>({
        gender: {
            value: scrapData?.gender || "",
            rules: { required: true },
            messages: { required: "Gender is required!" },
            isValid: true,
            errorMessage: "",
        },
        aadharNo: {
            value: scrapData?.aadharNo || "",
            rules: { required: true, number: true },
            messages: {
                required: "AadharNo is required!",
                number: "Number is required!"
            },
            isValid: true,
            errorMessage: "",
        },
        flatNo: {
            value: scrapData?.flatNo || "",
            rules: { required: true },
            messages: { required: "FlatNo is required!" },
            isValid: true,
            errorMessage: "",
        },
    });

    type VehicleField = keyof typeof person;

    const handleChange = (field: VehicleField, value: string) => {
        setPerson((prev: any) => ({
            ...prev,
            [field]: {
                ...prev[field],
                value,
                isValid: true,
                errorMessage: "",
            },
        }));
    };

    const handleSubmit = () => {

        const validatedResult = validator(person);
        setPerson({ ...validatedResult?.data });

        if (validatedResult?.isValid) {
            dispatch(
                setScrapData({
                    gender: person?.gender?.value,
                    aadharNo: person?.aadharNo?.value,
                    flatNo: person?.flatNo?.value,
                    state: formData.state,
                    city: formData.city,
                    sector: formData.sector,
                    location: formData.location,
                })
            );
            onNext();
        } else {
            console.log("Invalid form submission, Please check the form!");
        }
    };

    useEffect(() => {
        const loadLocation = async () => {
            if (scrapData?.location?.latitude && scrapData?.location?.longitude) {
                const lat = scrapData.location.latitude;
                const lng = scrapData.location.longitude;

                setMarker({ latitude: lat, longitude: lng });

                mapRef.current?.animateToRegion(
                    {
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    },
                    500
                );
                return;
            }

            const location: any = await getCurrentLocation();

            if (!location?.error) {
                const { latitude, longitude } = location.coords;
                setMarker({ latitude, longitude });
                updateLocationInMap(latitude, longitude, true);

                mapRef.current?.animateToRegion(
                    {
                        latitude,
                        longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    },
                    500
                );
            } else {
                toastFn(location?.message);
            }
        };
        loadLocation();
    }, []);

    const updateLocationInMap = async (
        lat: number,
        lng: number,
        updateAddress?: boolean
    ) => {
        if (!lat || !lng) return;
        setMarker({ latitude: lat, longitude: lng });
        setFormData((prev) => ({
            ...prev,
            location: {
                latitude: lat,
                longitude: lng,
            },
        }));
        if (updateAddress) {
            const resp = await fetchLocationDetail({
                latitude: String(lat),
                longitude: String(lng),
            });
            if (resp?.status) {
                const data = resp?.data?.addressData;
                setFormData((prev) => ({
                    ...prev,
                    state: data?.state || prev.state || "",
                    city: data?.city || prev.city || "",
                    sector: data?.street || prev.sector || "",
                }));
            } else {
                toastFn("Cannot fetch location details");
            }
        }
    };

    useEffect(() => {
        if (scrapData && isEmpty(formData.state)) {
            setFormData({
                state: scrapData?.state || "",
                city: scrapData?.city || "",
                sector: scrapData?.sector || "",
                location: scrapData?.location || {
                    latitude: 0,
                    longitude: 0,
                },
            });
        }
    }, []);

    return (
        <>
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1 }}
                keyboardVerticalOffset={windowheight * 0.12}
            >

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    <View style={[style.container]}>

                        <Text size="xxmedium" family="GMedium" style={{ marginBottom: 10 }}>
                            Product Details
                        </Text>

                        <View style={{ width: "100%", height: 200, borderRadius: 10 }}>
                            <MapView
                                ref={mapRef}
                                style={{
                                    width: "100%",
                                    height: 200,
                                    borderRadius: 10,
                                }}
                                initialRegion={{
                                    latitude: marker.latitude || 20.5937,
                                    longitude: marker.longitude || 78.9629,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                                onRegionChangeComplete={(region: any) =>
                                    updateLocationInMap(region.latitude, region.longitude, false)
                                }
                            />
                            <Images
                                type="image"
                                source={icons.Mappin}
                                width={"17.5%"}
                                height={"17.5%"}
                                style={{
                                    position: "absolute",
                                    top: "40%",
                                    left: "40%",
                                }}
                            />
                        </View>

                        <Dropdown
                            list={genderOptions}
                            label="Gender"
                            value={person.gender.value}
                            placeholder="Select Gender"
                            onChange={(value) => handleChange("gender", value?.value)}
                            isValid={person?.gender?.isValid}
                            errorMessage={person?.gender?.errorMessage}
                        />

                        <Input
                            label={"Aadhar No"}
                            placeHolder="Enter Aadhar no"
                            value={person.aadharNo.value}
                            isValid={person.aadharNo.isValid}
                            errorMessage={person.aadharNo.errorMessage}
                            onChange={(text) => handleChange("aadharNo", text)}
                        />

                        <Input
                            label={"Flat No"}
                            placeHolder="Flat number"
                            value={person.flatNo.value}
                            isValid={person.flatNo.isValid}
                            errorMessage={person.flatNo.errorMessage}
                            onChange={(text) => handleChange("flatNo", text)}
                        />

                        <Input
                            label={"State"}
                            placeHolder="Enter state"
                            value={formData.state}
                            onChange={(text) =>
                                setFormData((prev) => ({ ...prev, state: text }))
                            }
                        />

                        <Input
                            label={"City"}
                            placeHolder="Enter city"
                            value={formData.city}
                            onChange={(text) =>
                                setFormData((prev) => ({ ...prev, city: text }))
                            }
                        />

                        <Input
                            label="Sector / Locality"
                            placeHolder="Sector/locality"
                            value={formData.sector}
                            onChange={(text) =>
                                setFormData((prev) => ({ ...prev, sector: text }))
                            }
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Button title="Next" onPress={handleSubmit} />
        </>
    );
};

export default ScrappingPerson;