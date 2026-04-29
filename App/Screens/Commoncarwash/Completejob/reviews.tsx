import { View } from "react-native"
import Mainview from "../../../Components/mainview"
import Lottie from "../../../Components/lottieview"
import Images, { icons, lotties } from "../../../Utilities/images"
import { windowheight, windowwidth } from "../../../Utilities/dimensions"
import Text from "../../../Components/text"
import { Input } from "../../../Components/Field"
import { Fontfamily, Fontsize } from "../../../Utilities/uiasset"

import { Rating, AirbnbRating } from 'react-native-ratings';
import useCustomHooks from "../../../Actions/Hooks/customhook"
import { update_dailywashstate, update_onetimewashstate } from "../../../Slices/helper"
import Reviewstars from "../../../Components/reviewstars"
import { useState } from "react"
import { useSelector } from "react-redux"
import { clearservice, persistorSelector } from "../../../Slices/persistor"
import { useFeedbackRatingToUserMutation } from "../../../Slices/services"
import useApiError from "../../../Actions/Hooks/errorhook"

const Reviews: React.FC = () => {
    const { navigation, dispatch } = useCustomHooks()
    const [rating, setRating] = useState<number>(-1)
    const { serviceinprogress } = useSelector(persistorSelector)
    console.log(serviceinprogress, "serviceinprogress");

    const [review, setReview] = useState("")
    const [feedbackRatingToUser, { isLoading, error }] = useFeedbackRatingToUserMutation()
    useApiError(error)
    const onrate = async () => {
        const payload = {
            serviceId: serviceinprogress?._id,
            rating: JSON.stringify(rating) ,
            feedback: review
        }
        console.log(payload,"PAYLOADGAk");
        
        const res = await feedbackRatingToUser(payload).unwrap()
        if (res?.status) {
            dispatch(update_dailywashstate("request"))
            dispatch(update_onetimewashstate("request"))
            navigation.navigate("Vendorhome")
            dispatch(clearservice())
        }
    }
    return (
        <Mainview
            headertitle="Review & Ratings"
            isboxshadow
            bottomContent
            bottomtext="Submit"
            onBottompress={() => {
                onrate()
            }}
            isbottomload={isLoading}
        >
            <Text size="semilarge" family="GMedium" top={"5%"} >Apply Coupon and Earn Benefits</Text>
            <Text size="medium" family="GRegular" top={"1%"} >Encourage users to invite friends to the platform and reward them with trading bonuses or wallet credits when their friends join and trade.</Text>

            <Reviewstars
                value={rating}
                onchange={setRating}
                maxcount={5}
                containerstyle={{ alignSelf: "flex-start", gap: 10, justifyContent: "flex-start" }}
            />

            <Input
                label={"Can you tell us more?"}
                labelStyle={{ marginTop: "5%", fontFamily: Fontfamily.GMedium, fontSize: Fontsize.medium }}
                containerprops={{
                    height: windowheight * 0.15,
                    justifyContent: "flex-start"
                }}
                placeHolder="Tell about something "
                value={review}
                onChange={(text) => setReview(text)}
            />
        </Mainview>
    )
}

export default Reviews

