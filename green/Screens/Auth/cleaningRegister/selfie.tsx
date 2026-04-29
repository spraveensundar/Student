import { Platform, Pressable, StyleSheet, View } from "react-native"
import Mainview from "../../../Components/mainview"
import { borderradius, windowheight, windowwidth } from "../../../Utilities/dimensions"
import { Button } from "../../../Components/Field"
import Text from "../../../Components/text"
import Images, { icons } from "../../../Utilities/images"
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'
import { useEffect, useRef, useState } from "react"
import Orientation from 'react-native-orientation-locker'
import Flexcomponent from "../../../Components/flexcomponent"
import Card from "../../../Components/Card"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import { helperSelector, update_otpparams, update_servivecheck } from "../../../Slices/helper"
import { useLivenessCheckApiMutation, useLoginMutation } from "../../../Slices/auth"
import { delay } from "../../../Actions/location/location"
import RNFS from 'react-native-fs';
import { Toastfn } from "../../../Utilities/helerfunction"
import useApiError from "../../../Actions/Hooks/errorhook"
import { useFaceverificationaftercheckMutation, useFaceverificationbeforecheckMutation, useLazyGetservicedetailQuery } from "../../../Slices/services"
import { useSelector } from "react-redux"
import { cleaningSelector } from "../../../Slices/cleaning"
import { otpbackparams } from "../../../Slices/types"
import { persistorSelector } from "../../../Slices/persistor"

const Selfie: React.FC = (props: any) => {
    const params = props?.route?.params;
    const { hasPermission, requestPermission } = useCameraPermission()

    useEffect(() => {
        requestPermission()
    }, [])

    // Lock orientation to portrait when component mounts
    useEffect(() => {
        Orientation.lockToPortrait()

    }, [])
    console.log(hasPermission, "hasPermissionhasPermissionhasPermissionhasPermission");
    const device = useCameraDevice('front')
    const camera = useRef<any>(null)
    const [picture, setPicture] = useState<any>("")
    const [takeload, setTakeload] = useState(false)
    const { navigation, dispatch } = useCustomHooks()
    const [livenessCheckApi, { isLoading: uploadlivepic, error }] = useLivenessCheckApiMutation()

    useApiError(error ?? false);
    const callUploadImage = async () => {
        console.log("Uploading image: ", picture);

        const originalPath = picture?.path;
        const date = new Date();
        const newPath = `${RNFS.DownloadDirectoryPath}/selfie_${date.getSeconds()}.jpg`;
        await RNFS.copyFile(originalPath, newPath);
        const uploadUri = `file://${picture.path}`;

        console.log(uploadUri, "uploadUriuploadUriuploadUriuploadUri");

        const formData = new FormData();
        const fileName = picture?.fileName ?? picture?.filename ?? "image.jpg";
        const mime = picture?.mime ?? picture?.type ?? "image/jpeg";
        formData.append("liveFile", {
            uri: uploadUri,
            name: fileName,
            type: mime === "image/jpg" ? "image/jpeg" : mime,
        } as any);
        console.log(formData, "formDataformDataformDataformDatav");
        try {
            const response = await livenessCheckApi(formData).unwrap()
            await RNFS.unlink(newPath)
            await RNFS.unlink(originalPath)
            if (response.status == true) {
                console.log("LogRes=> ", response)
                Toastfn(response.message);
                navigation?.navigate("Successreg")
            } else {
                Toastfn(response.message);

            }
            console.log("SelfieSend ==> ", response?.json())

        } catch (error) {
            await RNFS.unlink(newPath)
            await RNFS.unlink(originalPath)
            console.log("SelfieError ==> ", error)
        }

    }
    const { selectedservice } = useSelector(cleaningSelector)
    const { serviceinprogress } = useSelector(persistorSelector)
    const { servicetype } = useSelector(helperSelector)
    const [faceverificationbeforecheck, { isLoading: faceverificationbefore, error: isbefore }] = useFaceverificationbeforecheckMutation()
    const [faceverificationaftercheck, { isLoading: faceverificationafter, error: isafter }] = useFaceverificationaftercheckMutation()

    useApiError(isafter || isbefore)
    const [getservicedetail, { isFetching: fetchservice, error: fetchserviceerror }] = useLazyGetservicedetailQuery()

    const checkliveness = async () => {

        const originalPath = picture?.path;
        const newPath = `${RNFS.DownloadDirectoryPath}/selfie_${Date.now()}.jpg`;
        await RNFS.copyFile(originalPath, newPath);
        const uploadUri = `file://${picture.path}`;

        console.log(uploadUri, "uploadUriuploadUriuploadUriuploadUri");

        const formData = new FormData();
        const fileName = picture?.fileName ?? picture?.filename ?? "image.jpg";
        const mime = picture?.mime ?? picture?.type ?? "image/jpeg";
        formData.append("liveFile", {
            uri: uploadUri,
            name: fileName,
            type: mime === "image/jpg" ? "image/jpeg" : mime,
        } as any);
        formData.append("serviceId", serviceinprogress?._id ?? selectedservice?._id)
        console.log(formData, "FORMDATAOFCHCEK");
        let res

        try {
            const response = await getservicedetail({ serviceId: selectedservice?._id })
            console.log(response?.data?.data, "DETAILFROMSERVICESELFIE");
            const service = response?.data?.data
            console.log(service?.beforeFaceCheckStatus, "BEFORESTATUS");

            res = service?.beforeFaceCheckStatus ? await faceverificationaftercheck(formData).unwrap() : await faceverificationbeforecheck(formData).unwrap()
            await RNFS.unlink(newPath)
            await RNFS.unlink(originalPath)
            if (res?.status && servicetype == "onetimewash") {
                const payload: otpbackparams = {
                    from: "selfie",
                    params: {
                        serviceId: serviceinprogress?._id ?? selectedservice?._id
                    }
                }
                dispatch(update_otpparams(payload))
                navigation?.navigate("OTP")
            }
            else if (res?.status && servicetype == "dailywash") {
                navigation?.pop(1)
                dispatch(update_servivecheck({ type: "before", value: true }))
                dispatch(update_servivecheck({ type: "after", value: true }))
            }
            console.log(res, "RESPONSEEEEEEEEEEE");
        } catch (error) {
            await RNFS.unlink(newPath)
            await RNFS.unlink(originalPath)
        }



    }
    return (
        <Mainview
            isscollable={false}
            isboxshadow={false}
            isoverlaploader={faceverificationbefore || uploadlivepic || faceverificationafter}
        >
            <View style={{ flex: 1 }} >
                <Text family="GBold" style={{ textAlign: "center", width: "80%", alignSelf: "center" }} size="semilarge" >Great Photo! Now it’s time to Take a Selfie</Text>
                <View style={{ width: "80%", height: windowheight * 0.3, alignSelf: "center", marginTop: "10%", alignItems: "center", justifyContent: "center" }} >
                    <Images
                        type="image"
                        source={icons.Selfieframe}
                        width={"100%"}
                        height={"100%"}
                    />
                    <View style={{ width: windowwidth * 0.52, height: windowwidth * 0.52, position: "absolute", borderRadius: borderradius * 5, justifyContent: "center", overflow: "hidden" }} >
                        {picture?.path ?
                            <>

                                <Images
                                    type="image"
                                    source={{ uri: 'file://' + picture?.path }}
                                    width={"100%"}
                                    height={"100%"}
                                    resizeMode="cover"
                                />
                            </>
                            :
                            <>
                                {(device && hasPermission) &&
                                    <Camera
                                        ref={camera}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: borderradius * 10
                                        }}
                                        device={device}
                                        isActive={true}
                                        preview={true}
                                        photo={true}
                                        isMirrored={true}



                                    />}
                            </>}
                    </View>
                </View>
                <Text family="GRegular" style={{ textAlign: "center", width: "80%", alignSelf: "center" }} top={"7.5%"} size="medium" >We’ll compare it to the photo in your passport to make sure it’s you.</Text>
            </View>
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", height: windowheight * 0.1 }} >
                {picture?.path ?
                    <>
                        <Flexcomponent justifyContent="space-between" style={{ width: "100%" }} >
                            <Card ispress onPress={() => setPicture("")} containerStyle={{ width: "47.5%", height: windowheight * 0.060, justifyContent: "center", alignItems: "center", borderRadius: borderradius * 3 }} >
                                <Text>ReTake</Text>
                            </Card>

                            <Button
                                title="Upload"
                                width={"47.5%"}
                                onPress={() => {
                                    if (params?.origin && params?.origin === 'register') {
                                        //navigation?.navigate("Aadharverification")
                                        callUploadImage();

                                    }
                                    else if (params?.origin == "check") {
                                        checkliveness()
                                    }
                                    else {
                                        const payload = {
                                            params: "",
                                            from: "job"
                                        }
                                        dispatch(update_otpparams(payload))
                                        navigation.navigate('OTP')
                                    }
                                }}

                            />
                        </Flexcomponent>
                    </> :
                    <Button
                        title="Take Selfie"
                        loading={takeload}
                        onPress={async () => {
                            setTakeload(true)
                            const photo = await camera.current.takePhoto()
                            await delay(1000)
                            setTakeload(false)
                            setPicture(photo)
                        }}
                    />}
            </View>
        </Mainview>
    )

}

export default Selfie