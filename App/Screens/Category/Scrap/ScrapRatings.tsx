import { useState } from "react";
import { Pressable, View } from "react-native";

import { Input } from "../../../Components/Field";
import Mainview from "../../../Components/mainview";
import VectorIcons from "../../../Utilities/vectorIcons";
import { windowwidth } from "../../../Utilities/dimensions";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { useScrapRatingsMutation } from "../../../Slices/scrap";

const ScrapRatings: React.FC = ({ route }: any) => {
    const { vehicleScrapId } = route?.params;
    const { navigation, failuretoast, successtoast } = useCustomHooks();

    const [scrapRating, { isLoading }] = useScrapRatingsMutation();
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('vehicleScrapId', vehicleScrapId);
            formData.append('ratings', rating);
            formData.append('feedback', feedback);
            const response = await scrapRating(formData).unwrap();
            console.log("resadsf", response)
            if (response?.status) {
                successtoast(response?.message);
            }
            failuretoast(response?.message ?? 'Something went wrong!');
        } catch (error: any) {
            failuretoast(error?.data?.message ?? 'Something went wrong!');
        }
    }

    return (
        <Mainview
            headertitle='Feedback'
            bottomContent
            isbottomload={isLoading}
            bottomtext={"Submit"}
            onBottompress={handleSubmit}
        >
            <View style={{ flex: 1, marginBottom: windowwidth * 0.05 }} >
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
                <Input
                    label={'Feedback'}
                    placeHolder='Tell about something'
                    value={feedback}
                    onChange={(text) => setFeedback(text)}
                    style={{ height: 100, textAlignVertical: 'top' }}
                    inputprops={{ multiline: true, numberOfLines: 5 }}
                />
            </View>
        </Mainview>
    )
}

export default ScrapRatings;