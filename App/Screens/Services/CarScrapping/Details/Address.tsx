import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Text from "../../../../Components/text";
import { Colors } from "../../../../Utilities/uiasset";
import { toastFn } from "../../../../Common/commonFunction";
import { Button, Input } from "../../../../Components/Field";
import { validator } from "../../../../Common/redux/validation";
import FileUpload from "../../../../Components/Field/FileUpolad";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { setScrapData } from "../../../../Common/redux/scrapService";

import styles from "../styles";

type Props = {
    onNext: () => void;
    changeLoadingStatus?: (data: any) => void;
}

const ScrappingAddress: React.FC<Props> = ({ onNext, changeLoadingStatus }) => {
    const { theme } = useCustomHooks();
    const style = styles(theme);

    const dispatch = useDispatch();

    const scrapData = useSelector((state: any) => state.scrapService.scrapData);
    const [frontImage, setFrontImage] = useState<any>(scrapData.rcCopyImage || undefined);

    const [address, setAddress] = useState<any>({
        vehiclePrice: {
            value: scrapData?.vehiclePrice || "",
            rules: { required: true, number: true },
            messages: {
                required: "Price is required!",
                number: "Number is required!"
            },
            isValid: true,
            errorMessage: "",
        },
        blockNo: {
            value: scrapData?.blockNo || "",
            rules: { required: true },
            messages: { required: "BlockNo is required!" },
            isValid: true,
            errorMessage: "",
        },
        appartmentName: {
            value: scrapData?.appartmentName || "",
            rules: { required: true },
            messages: { required: "Appartment Name is required!" },
            isValid: true,
            errorMessage: "",
        },
    });


    type VehicleField = keyof typeof address;
    const handleChange = (field: VehicleField, value: string) => {
        setAddress((prev: any) => ({
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
        const validatedResult = validator(address);
        setFrontImage({ ...validatedResult?.data });
        if (validatedResult?.isValid) {
            if (!frontImage?.length) {
                toastFn("Please upload RC Copy!");
                return;
            }
            dispatch(setScrapData({
                vehiclePrice: address?.vehiclePrice?.value,
                blockNo: address?.blockNo?.value,
                appartmentName: address?.appartmentName?.value,
                rcCopyImage: frontImage
            }));
            onNext();
        } else {
            toastFn("Invalid form submission, Please check the form!");
        }
    };

    return (
        <>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={[style.container, { marginBottom: "10%" }]}>
                    <Text size="xxmedium" family="GMedium" style={{ marginBottom: 10 }}>Product Details</Text>
                    <Input
                        label="Vehicle Price"
                        placeHolder="Enter Vehicle Price"
                        value={address.vehiclePrice.value}
                        isValid={address.vehiclePrice.isValid}
                        errorMessage={address.vehiclePrice.errorMessage}
                        onChange={(text) => handleChange("vehiclePrice", text)}
                    />
                    <Input
                        label="Block No"
                        placeHolder="Enter BlockNo no"
                        value={address.blockNo.value}
                        isValid={address.blockNo.isValid}
                        errorMessage={address.blockNo.errorMessage}
                        onChange={(text) => handleChange("blockNo", text)}
                    />
                    <Input
                        label="Apartment Name"
                        placeHolder="Enter Apartment Name"
                        value={address.appartmentName.value}
                        isValid={address.appartmentName.isValid}
                        errorMessage={address.appartmentName.errorMessage}
                        onChange={(text) => handleChange("appartmentName", text)}
                    />
                    <FileUpload
                        label="RC Copy"
                        source="sheet"
                        mediaData={frontImage}
                        multiple={true}
                        onChange={(data) => { setFrontImage(data); }}
                        background={Colors.lightGrey}
                    />
                </View>
            </ScrollView>
            <Button title="Next" onPress={() => handleSubmit()} />
        </>
    )

}

export default ScrappingAddress;