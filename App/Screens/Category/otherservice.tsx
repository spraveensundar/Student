import React, { useCallback, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import Images, { icons } from "../../Utilities/images";
import { borderradius, windowwidth } from "../../Utilities/dimensions";
import Text from "../../Components/text";
import Flexcomponent from "../../Components/flexcomponent";
import useCustomHooks from "../../Actions/Hooks/customhook";
import { useSelector } from "react-redux";
import { setServiceManInfo } from '../../Slices/auth';
import { helperSelector, update_dailywashstate, update_onetimewashstate, update_servicestype } from "../../Slices/helper";
import { useServicemanDetailsMutation } from "../../Slices/auth";
import { getItem, setItem } from "../../Actions/Storage/localStorage";
import { setPersistservice } from "../../Slices/persistor";


interface Otherprops {
    image: any,
    title: string,
    onpress?: () => void,
    top?: any
}
interface serviceprops {
    onload?: (isload: boolean) => void
}
const Services: React.FC<serviceprops> = ({
    onload
}) => {
    const { navigation, dispatch } = useCustomHooks();
    const [servicemanDetails, { isLoading }] = useServicemanDetailsMutation();
    const loaderstate = useCallback(() => {
        onload?.(isLoading)
    }, [isLoading])

    useEffect(() => {
        loaderstate()
    }, [loaderstate])
    const [gdata, setGetData] = useState();

    const token = getItem("token");

    const { cleaningstatus, servicetype } = useSelector(helperSelector);

    const callResend = async () => {
        // alert(servicetype)
        try {

            const response = await servicemanDetails(0).unwrap();
            console.log("response", response)
            if (response.status === true) {
                dispatch(setServiceManInfo(response?.data));
                setGetData(response?.data?.verificationStatus)

                if (response?.data?.isVerified === true) {
                    navigation?.navigate("Vendorhome");
                    dispatch(setPersistservice(servicetype ?? "dailywash"))
                } else if (response?.data?.profileCompleted === false) {
                    navigation?.navigate("FetchLocation");
                } else if (!response?.data?.aadharFrontImage && !response?.data?.aadharBackImage) {
                    navigation?.navigate("Aadharverification");
                } else if (response?.data?.isReUpload === true) {
                    navigation?.navigate("SupportPartnerConfirmation");
                } else {
                    navigation?.navigate("Manualverification");
                    setItem("KeyAcc", "")
                    setItem("token", "")
                }
            }
        } catch (error) {
            console.log('SERVICE-MAN-DETAILS-ERROR', error);
        }
    }


    return (
        <Flexcomponent
            style={{
                gap: 10,
                flexWrap: 'wrap',
            }}
            alignItems='flex-start'
            justifyContent='flex-start'
            top={'4%'}
        >
            <Common
                image={icons.Dailycarcleaning}
                title="Daily Car Care"
                onpress={() => {
                    if (cleaningstatus === "complted") {
                        dispatch(update_servicestype("dailywash"))
                        dispatch(update_dailywashstate("request"))
                        dispatch(update_onetimewashstate("offine"))
                        navigation?.navigate("Vendorhome")
                    }
                    else {
                        //navigation?.navigate("CleaningResiter")
                        dispatch(update_servicestype("dailywash"))

                        token === "" || token === undefined ?
                            navigation?.navigate("Login") :
                            callResend()
                    }
                }
                }
            />
            <Common
                image={icons.Onetime}
                title='One time Car Care'
                onpress={() => {
                    if (cleaningstatus === "complted") {
                        dispatch(update_servicestype("onetimewash"))
                        dispatch(update_onetimewashstate("offine"))
                        dispatch(update_dailywashstate("request"))
                        navigation?.navigate("Vendorhome")
                    }
                    else {
                        //navigation?.navigate("CleaningResiter")
                        dispatch(update_servicestype("onetimewash"))
                        // navigation?.navigate("Login")
                        token === "" || token === undefined ?
                            navigation?.navigate("Login") :
                            callResend()
                    }
                }}
            />
            <Common
                image={icons.Rtocat}
                title='RTO agent'
                onpress={() =>
                    // dispatch(update_servicestype('rto'));
                    navigation?.navigate('SupportPartnerRegister')}
            />
            <Common
                image={icons.Scrap}
                title='Scrap Dealers'
                onpress={() => {
                    dispatch(update_servicestype('scrapdealer'));
                    token === "" || token === undefined ?
                        navigation?.navigate("Login") :
                        callResend()
                    // navigation?.navigate('ScrapDealerRegister')
                }}
                top={'10%'}
            />
        </Flexcomponent>
    )
}


export default Services;

export const Common = ({
    image,
    title,
    onpress,
    top = 0
}: Otherprops) => {
    const { theme } = useCustomHooks();

    return (
        <View style={{ width: '31%' }} >
            <Pressable onPress={onpress} style={{ width: '100%', backgroundColor: theme.cardbg, borderRadius: borderradius * 0.5, alignItems: 'center', justifyContent: 'center', paddingVertical: windowwidth * 0.05, borderWidth: 1, borderColor: '#CFCFCF', marginTop: top }} >
                <Images
                    type='image'
                    source={image}
                    style={{ width: windowwidth * 0.15, height: windowwidth * 0.15, }}
                />
            </Pressable>
            <Text top={'5%'} style={{ textAlign: 'center', width: '100%', alignSelf: 'center' }} family='GRegular' size='semimedium'>{title}</Text>

        </View>

    )
};