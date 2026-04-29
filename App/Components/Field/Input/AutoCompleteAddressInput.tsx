import { TextInput, TouchableOpacity } from "react-native";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import styles from "../../../Screens/Location/styles";
import { useCallback, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import Text from "../../text";
import { googleMapAutoComplete, googleMapPlaceIdFetch } from "../../../Common/axiosHooks/thirdPartyHooks";
import { returnAddressFormat, returnArrayOnly } from "../../../Common/commonFunction";
import { useFocusEffect } from "@react-navigation/native";

interface PlacePrediction {
    description: string;
    place_id: string;
}

interface AutoCompleteAddressInputProps {
    value?: string;
    onSelect?: (item: PlacePrediction) => void;
    onChange?: (item: string) => void;
    placeHolderText?: string;
    placeholderTextColor?: string;
    inputStyle?: any;
    searchListStyle?: any;
    scrollEnabled?: boolean;
};



const AutoCompleteAddressInput: React.FC<AutoCompleteAddressInputProps> = ({
    value = "",
    onChange = () => { },
    onSelect = () => { },
    placeHolderText = "Enter address",
    placeholderTextColor= '#9C9C9C',
    inputStyle,
    searchListStyle,
    scrollEnabled= true,
}) => {


    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);


    const [addressText, setAddressText] = useState(value)
    const [results, setResults] = useState<PlacePrediction[]>([]);


    useFocusEffect(
        useCallback(() => {
            setAddressText(value);
        }, [value])
    )

    const fetchPlaces = async (text: string) => {

        setAddressText(text);
        onChange(text);
        if (text.length < 3) {
            setResults([]);
            return;
        }

        try {
            const response = await googleMapAutoComplete(text);
            console.log('responseresponse', response)
            setResults(returnArrayOnly(response?.predictions));
        }
        catch (error) {
            console.log("Places Error:", error);
        }
    };

    const onChooseLocation = ( data: PlacePrediction ) => {
        setAddressText(data?.description);
        setResults([]);
        onSelect(data);
    }

    return (
        <>
            <TextInput
                style={[style.input,inputStyle]}
                placeholder={placeHolderText}
                value={addressText}
                placeholderTextColor={placeholderTextColor}
                onChangeText={(e) => fetchPlaces(e)}
            />

            <FlatList
                data={results}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => onChooseLocation(item)}
                        style={[
                            {
                                padding: 12,
                                backgroundColor: "white",
                                borderBottomWidth: 1,
                                borderColor: "#ccc",
                            }, searchListStyle
                        ]}
                    >
                        <Text>{item.description}</Text>
                    </TouchableOpacity>
                )}
                scrollEnabled={scrollEnabled}
            />
        </>
    )
}

export default AutoCompleteAddressInput;
