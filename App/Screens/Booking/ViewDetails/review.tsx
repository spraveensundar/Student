import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles';
import { BackHandler, Pressable, TextInput, View } from 'react-native';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import Mainview from '../../../Components/mainview';
import { Button } from '../../../Components/Field';
import Text from '../../../Components/text';
import VectorIcons from '../../../Utilities/vectorIcons';
import { Fontfamily, Fontsize } from '../../../Utilities/uiasset';
import Lottie from '../../../Components/lottieview';
import { lotties } from '../../../Utilities/images';
import { Stacknavigationtypes } from '../../../Navigations/stacknavigationtypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isEmpty, numberChange, toastFn } from '../../../Common/commonFunction';
import ErrorText from '../../../Components/ErrorText';
import { constantData } from '../../../Common/constant';
import { cleanerServiceRatingFeedback } from '../../../Common/axiosHooks/vehicleServiceHooks';
import { CommonActions, useFocusEffect } from '@react-navigation/native';


const defaultFormData = {
    rating: 0,
    feedback: "",
}

type Props = NativeStackScreenProps<Stacknavigationtypes, 'Review'>;

const Review: React.FC<Props> = ({ route }) => {


  const { theme, navigation } = useCustomHooks();
  const style = styles(theme);


  const [isSubmit, setIsSubmit] = useState(false);
  const [rating, setRating] = useState(3);
  const [ formData, setFormData ] = useState(defaultFormData);
  const [ disableStatus, setDisableStatus ] = useState(false);
  const [ validateErrors, setValidateErrors ] = useState<any>({});


  const serviceId = route?.params?.serviceDetail?._id, serviceDetail = route?.params?.serviceDetail, from = route?.params?.from;


  useFocusEffect(
    useCallback(()=>{
      setFormData(defaultFormData);
      setIsSubmit(false);
      setDisableStatus(false);
      setValidateErrors({});
      fetchServiceDetail();
    },[])
  )

  useEffect(() => {
    const backAction = () => {
      goBackCheck();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  },[disableStatus])

  const goBackCheck = () => {
    if (!disableStatus) {
      navigation.goBack()
    }
    return true;
  }

  console.log('serviceDetailserviceDetail',serviceDetail)

  const fetchServiceDetail = () => {
    if(from == constantData.reviewFrom.vehicleService){
      setFormData({
        rating: numberChange(serviceDetail?.rating),
        feedback: (serviceDetail?.feedback??""),
      })
    }
  }

  const onChange = (value: any, id: string) => {
    setFormData({
      ...formData,
      [id]: value,
    });
    setValidateErrors({});
  }

  const validation = (data: any) => {
    let errors: any = {};
    if(isEmpty(data?.feedback)){
      errors.feedback = "Feedback required";
    }
    if(data?.rating<=0){
      errors.rating = "Rating required";
    }
    return errors;
  }

  const onSubmit = async() => {
    setDisableStatus(true);
    let sendData: any = {
      rating: formData?.rating,
      feedback: formData?.feedback,
    }
    let validate = validation(sendData);
    if(isEmpty(validate)){
      let resp;
      if(from == constantData.reviewFrom.vehicleService){
        sendData.rating = String(sendData?.rating);
        sendData.serviceId = serviceId;
        resp = await cleanerServiceRatingFeedback(sendData);
      }
      else{
        toastFn("Invalid review");
      }
      if(resp?.status){
        toastFn(resp?.message??"Feedback added successfully");
        setIsSubmit(true);
      }
      else{
        toastFn(resp?.message??"Try-Again");
      }
    }
    else{
      toastFn("Fix all validations");
      setValidateErrors(validate);
    }
    setDisableStatus(false);
  }

  const goToBottomtab = () => {
    navigation.navigate('Bottomtab')
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: "Bottomtab" }],
    //   })
    // );
  }

  return (
    <Mainview
      isheader
      headertitle="Review & Ratings"
      onleftfn={()=>goBackCheck()}
      islefticon={true}
      bottomContent={
        <View style={{ paddingHorizontal: '6%', marginBottom: '5%', gap: 20 }}>
          {
            isSubmit
              ?
              (
                <>
                <Button
                  title="Go back"
                  onPress={() => goBackCheck()}
                />
                <Button
                  title="Go to home"
                  onPress={() => goToBottomtab()}
                />
                </>
              )
              :
              <Button title="Submit" onPress={() => onSubmit()} />
          }
        </View>
      }
      isoverlaploader={disableStatus}
    >
      {
        isSubmit
          ?
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Lottie
              src={lotties.Tick}
              style={{ width: '50%', height: '30%' }}
              speed={0.5}
            />
            <Text family="bold" size="medium">
              Your reviews updated successfully !
            </Text>
          </View>
          :
          <View style={style.review}>
            <Text family="GMedium" size="semilarge" style={{ marginBottom: 10 }}>
              Apply Coupon and Earn Benefits
            </Text>
            <Text
              family="GRegular"
              size="semimedium"
              style={{ lineHeight: 20, marginBottom: 15 }}
            >
              Encourage users to invite friends to the platform and reward them
              with trading bonuses or wallet credits when their friends join and
              trade.
            </Text>
            <View style={{ flexDirection: 'row', marginBottom: 25 }}>
              {[1, 2, 3, 4, 5].map(star => (
                <Pressable key={star} onPress={() => onChange(star, "rating")}>
                  <VectorIcons
                    family="FontAwesome"
                    name={star <= formData?.rating ? 'star' : 'star-o'}
                    size={30}
                    iconcolor={star <= formData?.rating ? '#FB9506' : '#354259'}
                    style={{ marginRight: 10 }}
                  />
                </Pressable>
              ))}
              {
                validateErrors?.rating
                  ?
                  <ErrorText
                    errorMessage={validateErrors?.rating}
                  />
                  :
                  <></>
              }
            </View>

            <Text family="GMedium" size="semilarge" style={{ marginBottom: 12 }}>
              Can you tell us more?
            </Text>
            <TextInput
              placeholder="Tell about something"
              placeholderTextColor={theme.placeholderColor}
              multiline
              numberOfLines={5}
              style={{
                height: 150,
                padding: 15,
                paddingLeft: 20,
                borderRadius: 10,
                textAlignVertical: 'top',
                fontFamily: Fontfamily.GRegular,
                fontSize: Fontsize.semimedium,
                backgroundColor: theme.lightGrey,
                color: theme.primarytext,
              }}
              value={formData?.feedback??""}
              onChangeText={(value) => onChange(value, "feedback")}
            />
            {
              validateErrors?.feedback
                ?
                <ErrorText
                  errorMessage={validateErrors?.feedback}
                />
                :
                <></>
            }
          </View>
          }
    </Mainview>
  );
};

export default Review;
