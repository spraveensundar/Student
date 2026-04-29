import React, { useRef, useState } from "react";
import { View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import styles from "../Location/styles"
import Mainview from "../../../Components/mainview";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import Text from "../../../Components/text";
import { Toastfn } from "../../../Utilities/helerfunction";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";
import { GOOGLE_API_KEY } from "@env";
import MapView, { Marker } from "react-native-maps";
import { setCurrentlocation } from "../../../Slices/helper";
import { Getaddressdetail } from "../../../Actions/location/location";

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

const UpdateLocation: React.FC = () => {
    const { theme, navigation, dispatch } = useCustomHooks();
    const style = styles(theme);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<PlacePrediction[]>([]);
    const mapRef = useRef<MapView>(null);
    const [marker, setMarker] = useState({
        latitude: 12.9716,
        longitude: 77.5946,
    });

    const submitForm = async () => {

        const label = await Getaddressdetail(marker.latitude, marker?.longitude)
        console.log(label, "labelvalue");

        const payload = {
            coordinates: {
                latitude: marker.latitude,
                longitude: marker.longitude,
                accuracy: 0,    // default or from GPS
                altitude: 0,    // default
                heading: 0,     // default
                speed: 0,       // default
            },
            labeladdress: label?.formatedaddress
        }
        dispatch(setCurrentlocation(payload))
        navigation.navigate("CleaningResiter")

    }

    const fetchPlaces = async (text: string) => {
        setQuery(text);

        if (text.length < 3) {
            setResults([]);
            return;
        }

        try {
            const response = await axios.get(
                "https://maps.googleapis.com/maps/api/place/autocomplete/json",
                {
                    params: {
                        input: text,
                        key: "AIzaSyCzLqsSvk3AoCTwaaEqpJ0UTVbbcR9yOxM",
                        components: "country:in",
                    },
                }
            );
            setResults(response.data.predictions);
        } catch (error) {
            console.log("Places Error:", error);
        }
    };

    const onSelect = async (item: PlacePrediction) => {
        setQuery(item.description);
        setResults([]);

        try {
            const details = await axios.get(
                "https://maps.googleapis.com/maps/api/place/details/json",
                {
                    params: {
                        place_id: item.place_id,
                        key: "AIzaSyCzLqsSvk3AoCTwaaEqpJ0UTVbbcR9yOxM",
                    },
                }
            );

            const address = details.data.result as PlaceDetailsResult;

            // Helper to extract address components
            const getComponent = (type: string) =>
                address.address_components?.find((x) => x.types.includes(type))?.long_name || "";
            const locality = getComponent("sublocality_level_1") || getComponent("locality");
            const city = getComponent("locality") || getComponent("administrative_area_level_2");
            const state = getComponent("administrative_area_level_1");
            const pincode = getComponent("postal_code");
            const lat = address.geometry?.location?.lat;
            const lng = address.geometry?.location?.lng;

            // Save values into your userData

            setMarker({
                latitude: lat,
                longitude: lng,
            });

            console.log("Full Address:", address.formatted_address);

            if (lat && lng && mapRef.current) {
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


        } catch (err) {
            console.log("Place Details Error:", err);
        }
    };

    return (
        <Mainview
            isheader={true}
            headertitle={"Update Location"}
            onleftfn={() => navigation.goBack()}
            bottomContent
            bottomtext="Save Address"
            onBottompress={
                () => submitForm()
                //navigation.navigate('Categories')
            }

        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={style.scrollContainer}
            >
                <View style={style.locDetails}>

                    <MapView
                        ref={mapRef}
                        style={style.map}
                        initialRegion={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker
                            coordinate={marker}
                            draggable
                            onDragEnd={(e) => {
                                const { latitude, longitude } = e.nativeEvent.coordinate;
                                setMarker({ latitude, longitude });
                            }}
                        />
                    </MapView>


                    <View style={[style.input, { paddingVertical: 10, borderRadius: 10, flexDirection: "row", alignItems: "center", alignContent: "center" }]}>
                        <TextInput
                            style={{ flex: 0.7 }}
                            placeholder="Enter address"
                            value={query}
                            onChangeText={fetchPlaces}
                        />
                        {query.length > 0 && (
                            <TouchableOpacity
                                onPress={() => {
                                    setQuery("");        // Clear input
                                    setResults([]);      // Clear autocomplete results
                                    // Optionally reset marker:
                                    setMarker({ latitude: 12.9716, longitude: 77.5946 });
                                }}
                                style={{ flex: 0.5, alignItems: "flex-end" }}
                            >
                                <Text>Clear</Text>
                            </TouchableOpacity>
                        )}
                    </View>

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
                    />

                </View>
            </ScrollView>

        </Mainview>

    )
}

export default UpdateLocation;