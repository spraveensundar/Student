import React, { useState } from "react";
import { Pressable, View } from "react-native";

import Mainview from "../../../Components/mainview";
import { Colors } from "../../../Utilities/uiasset";
import VectorIcons from "../../../Utilities/vectorIcons";
import { toastFn } from "../../../Common/commonFunction";
import { Button, Input } from "../../../Components/Field";
import FileUpload from "../../../Components/Field/FileUpolad";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { NavigationProp, stackNavProp } from "../../../Actions/types";
import { scrapCertificate } from "../../../Common/axiosHooks/userHooks";

import styles from "./styles";

type Props = {
    navigation: NavigationProp;
    route: stackNavProp<'UpdateCertificate'>['route'];
};

const UpdateCertificate: React.FC<Props> = ({ route }) => {
    const { data } = route?.params;
    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    const [frontImage, setFrontImage] = useState<any>(undefined);
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);

    console.log("data", data)

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const payload = {
                vehicleScrapId: data?._id,
                scrapCertificateImage: frontImage,
                ratings: rating,
                feedback: feedback
            };
            const response = await scrapCertificate(payload);
            if (response?.status) {
                toastFn(response?.message);
                navigation.navigate("ScrapStatus", {
                    origin: 'UpdateCertificate',
                    content: 'Your scrap certificate has been submitted successfully.',
                    button: {
                        title: 'View Order History',
                        onButtonPress: () => navigation.navigate('ScrapBookingHistory'),
                    },
                    status: 'info'
                })
            } else {
                toastFn(response?.message || "Submission failed!");
            }
        } catch (error: any) {
            console.log("Error submitting scrap form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Mainview
            isheader={true}
            isscollable={true}
            headertitle="Update Certificate"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={style.buttonContainer}>
                    <Button
                        loading={loading}
                        title="Confirm Schedule"
                        onPress={handleSubmit}
                    />
                </View>
            }
        >
            <View style={[style.container]}>
                <FileUpload
                    label="Certificate Image"
                    source="sheet"
                    mediaData={frontImage}
                    multiple={true}
                    onChange={(data) => { setFrontImage(data); }}
                    background={Colors.lightGrey}
                />
                <View style={{ marginTop: "10%" }} />
                <Input
                    label={'Feedback'}
                    placeHolder='Tell about something'
                    value={feedback}
                    onChange={(text) => setFeedback(text)}
                    style={{ height: 100, textAlignVertical: 'top' }}
                    inputProps={{ multiline: true, numberOfLines: 5 }}
                />
                <View style={{ flexDirection: "row", marginTop: "8%" }}>
                    {[1, 2, 3, 4, 5].map(star => (
                        <Pressable key={star} onPress={() => setRating(star)}>
                            <VectorIcons
                                family="FontAwesome"
                                name={star <= rating ? 'star' : 'star-o'}
                                size={30}
                                iconcolor={star <= rating ? '#FB9506' : '#354259'}
                                style={{ marginRight: 10 }}
                            />
                        </Pressable>
                    ))}
                </View>
            </View>
        </Mainview>
    )

}

export default UpdateCertificate;