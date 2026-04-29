import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Text from "../../../../Components/text";
import { Button } from "../../../../Components/Field";
import { Colors } from "../../../../Utilities/uiasset";
import { toastFn } from "../../../../Common/commonFunction";
import FileUpload from "../../../../Components/Field/FileUpolad";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { setResetScrapData } from "../../../../Common/redux/scrapService";
import { createScrapPost } from "../../../../Common/axiosHooks/userHooks";

import styles from "../styles";

type Props = { onNext: () => void; }
const ScrappingPicture: React.FC<Props> = ({ onNext }) => {
    const { theme } = useCustomHooks();
    const style = styles(theme);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const scrapData = useSelector((state: any) => state.scrapService.scrapData);
    const [frontImage, setFrontImage] = useState<any>(scrapData.vehiclePicture || undefined);

    const handleSubmit = async () => {
        try {
            if (!frontImage?.length) {
                toastFn("Please Upload Vehicle Picture!");
                return;
            }
            setLoading(true);
            const payload = {
                vehicleType: scrapData.vehicleType,
                vehicleMake: scrapData.vehicleMake,
                vehicleModel: scrapData.vehicleModel,
                vehicleYear: scrapData.vehicleYear,
                vehicleRegisterDate: scrapData.vehicleRegisterDate,
                vehicleRegistrationNo: scrapData.vehicleRegistrationNo,
                vehicleTitle: scrapData.vehicleTitle,
                vehicleDescription: scrapData.vehicleDescription,
                vehiclePrice: scrapData.vehiclePrice,
                vehicleOwnerName: scrapData.vehicleOwnerName,
                vehicleOwnerMobileNo: scrapData.vehicleOwnerMobileNo,
                gender: scrapData.gender,
                aadharNo: scrapData.aadharNo,
                state: scrapData.state,
                city: scrapData.city,
                sector: scrapData.sector,
                appartmentName: scrapData.appartmentName,
                flatNo: scrapData.flatNo,
                blockNo: scrapData.blockNo,
                longitude: scrapData?.location?.longitude,
                latitude: scrapData?.location?.latitude,
                rcCopyImage: scrapData.rcCopyImage,
                vehiclePicture: frontImage
            };

            const response = await createScrapPost(payload);
            if (response?.status) {
                dispatch(setResetScrapData())
                onNext();
            } else {
                toastFn(response?.message || "Submission failed!");
            }
        } catch (error: any) {
            console.log("Error submitting scrap form:", error);
            toastFn(error?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={[style.container]}>
                    <Text size="xxmedium" family="GMedium" style={{ marginBottom: 10 }}>Product Details</Text>
                    <FileUpload
                        label="Vehicle pictures ( Approx 10-20 pictures )"
                        source="sheet"
                        mediaData={frontImage}
                        multiple={true}
                        onChange={(data) => {
                            setFrontImage(data);
                        }}
                        background={Colors.lightGrey}
                        maxFiles={20}
                    />
                </View>
            </ScrollView>
            <Button
                title="Submit"
                loading={loading}
                onPress={() => handleSubmit()}
            />
        </>
    )

}

export default ScrappingPicture;