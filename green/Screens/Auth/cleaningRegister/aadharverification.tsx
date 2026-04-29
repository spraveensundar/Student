import { View } from "react-native"
import Mainview from "../../../Components/mainview"
import Text from "../../../Components/text"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import { Input } from "../../../Components/Field"
import { Colors, Fontfamily, Fontsize } from "../../../Utilities/uiasset"
import { useState } from "react"
import FileUpload from "../../../Components/Field/FileUpolad"
import { windowheight, windowwidth } from "../../../Utilities/dimensions"
import VectorIcons from "../../../Utilities/vectorIcons"
import Preview from "../../../Components/Field/FileUpolad/Preview"
import Card from "../../../Components/Card"
import { Toastfn } from "../../../Utilities/helerfunction"
import { getMimeType } from "../../../Slices/helper"
import { aadharProofProps } from "../../../Actions/Types/formDataTypes"
import { validator } from "../../../Actions/Constants/validation"
import { useAadharVerificationMutation } from "../../../Slices/cleaning"
import { useSelector } from "react-redux"
import { authSelector } from "../../../Slices/auth"

const Aadharverification: React.FC = () => {
    const { navigation } = useCustomHooks();
    const { serviceMan } = useSelector(authSelector);
    const [aadharProof, setAadharProof] = useState<aadharProofProps>({
        aadharNo: {
            value: '',
            rules: { required: true, minLength: 12, maxLength: 12 },
            messages: { required: 'Aadhar number is required!', minLength: 'Invalid aadhar number!', maxLength: 'Invalid aadhar number!' },
            isValid: true,
        },
        frontAadhar: {
            value: '',
            rules: { required: true },
            messages: { required: 'Aadhar front photo is required!' },
            isValid: true,
        },
        backAadhar: {
            value: '',
            rules: { required: true },
            messages: { required: 'Aadhar back photo is required!' },
            isValid: true,
        },
    });

    const [triggerAadharVerification, { isLoading }] = useAadharVerificationMutation();

    const handleSubmit = async () => {
        try {
            const validationResult = validator(aadharProof);
            setAadharProof({ ...validationResult?.data });
            if (validationResult?.isValid) {
                const formData = new FormData();

                formData.append("aadharFrontImage", {
                    uri: aadharProof.frontAadhar.value?.uri,
                    name: aadharProof.frontAadhar?.value.fileName,
                    type: getMimeType(aadharProof.frontAadhar.value.fileName),
                } as any);
                formData.append("aadharBackImage", {
                    uri: aadharProof.backAadhar.value?.uri,
                    name: aadharProof.backAadhar?.value.fileName,
                    type: getMimeType(aadharProof.backAadhar.value.fileName),
                } as any);
                formData.append("aadharNo", aadharProof?.aadharNo?.value);

                console.log('formData', formData);

                const aadharVerifyResult = await triggerAadharVerification(formData).unwrap();

                if (aadharVerifyResult?.status) {
                    Toastfn(aadharVerifyResult?.message);
                    navigation?.navigate("Selfie",{origin:"register"});
                }
            } else {
                Toastfn("Please complete all fields correctly.");
            }
        } catch (error) {
            console.log('AADHAR-VERIFICATION-ERROR', error);
        }
    }

    console.log('AADHAR-PROOF', aadharProof);

    return (
        <Mainview
            headertitle="Verification"
            bottomContent
            isscollable={false}
            bottomtext="Get Verification"
            onBottompress={() => {
                handleSubmit()
            }}
            ismainloading={isLoading}
        >
            <Text top={"5%"} family="GBold" size="large" >Aadhar Card Verification</Text>
            <Text top={"2.5%"} family="GRegular" size="medium" >Validate the documents</Text>
            <View style={{ flex: 1, marginTop: 20, }} >

                <Input
                    label="Aadhar Number"
                    labelStyle={{ fontFamily: Fontfamily.GMedium, fontSize: Fontsize.medium }}
                    containerprops={{ borderWidth: 0 }}
                    placeHolder="Enter Aadhar Number"
                    value={aadharProof?.aadharNo?.value}
                    onChange={(text: any) => setAadharProof(prev => ({ ...prev, aadharNo: { ...prev.aadharNo, value: text } }))}
                    isValid={aadharProof?.aadharNo?.isValid}
                    errorMessage={aadharProof?.aadharNo?.errorMessage}
                    keyboardType="numeric"
                />


                <Text top={"5%"} family="GMedium" size="medium" >Upload Document</Text>

                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 15, alignSelf: "center", marginBottom: "6%" }} >


                    <FileUpload
                        source="sheet"
                        mediaData={aadharProof.frontAadhar.value}
                        preview={false}
                        onChange={(img) => {
                            setAadharProof((prev) => ({
                                ...prev,
                                frontAadhar: { ...prev.frontAadhar, value: img[0] },
                            }));
                        }}
                        component={
                            <Card
                                containerStyle={{
                                    marginTop: 15,
                                    height: windowheight * 0.2,
                                    width: windowwidth * 0.4,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                isValid={aadharProof?.frontAadhar?.isValid}
                            >
                                {aadharProof.frontAadhar.value ? (
                                    <Preview
                                        containerStyle={{ padding: 0 }}
                                        mediaData={aadharProof.frontAadhar.value}
                                        onEmpty={() => {
                                            setAadharProof((prev) => ({
                                                ...prev,
                                                frontAadhar: { ...prev.frontAadhar, value: '' },
                                            }));
                                        }}
                                    />
                                ) : (
                                    <>
                                        <VectorIcons
                                            family="Lucide"
                                            name="image-plus"
                                            iconcolor="#000000"
                                            size={windowwidth * 0.08}
                                        />
                                        <Text
                                            family="GRegular"
                                            size="medium"
                                            style={{
                                                fontSize: Fontsize.small,
                                                color: Colors.grey,
                                                marginTop: 10,
                                            }}
                                        >
                                            Upload Front Side
                                        </Text>
                                    </>
                                )}
                            </Card>
                        }
                    />


                    {/* back aadhar upload */}

                    <FileUpload
                        source="sheet"
                        mediaData={aadharProof.backAadhar.value}
                        preview={false}
                        onChange={(img) => {
                            setAadharProof((prev) => ({
                                ...prev,
                                backAadhar: { ...prev.backAadhar, value: img[0] },
                            }));
                        }}
                        component={
                            <Card
                                containerStyle={{
                                    marginTop: 15,
                                    height: windowheight * 0.2,
                                    width: windowwidth * 0.4,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                isValid={aadharProof?.backAadhar?.isValid}
                            >
                                {aadharProof.backAadhar.value ? (
                                    <Preview
                                        containerStyle={{ padding: 0 }}
                                        mediaData={aadharProof.backAadhar.value}
                                        onEmpty={() => {
                                            setAadharProof((prev) => ({
                                                ...prev,
                                                backAadhar: { ...prev.backAadhar, value: '' },
                                            }));
                                        }}
                                    />
                                ) : (
                                    <>
                                        <VectorIcons
                                            family="Lucide"
                                            name="image-plus"
                                            iconcolor="#000000"
                                            size={windowwidth * 0.08}
                                        />
                                        <Text
                                            family="GRegular"
                                            size="medium"
                                            style={{
                                                fontSize: Fontsize.small,
                                                color: Colors.grey,
                                                marginTop: 10,
                                            }}
                                        >
                                            Upload Back Side
                                        </Text>
                                    </>
                                )}
                            </Card>
                        }
                    />


                </View>

                {serviceMan?.verificationStatus?.isDocumentVerified === "rejected" && (
                    <>
                        <Text top={"2.5%"} family="GMedium" size="medium" style={{ color: Colors.red }} >Rejection Reason :</Text>
                        <Text family="GRegular" size="semimedium" style={{ textAlign: "left", color: Colors.red,paddingLeft: 10 }} >{serviceMan?.verificationStatus?.isDocumentVerifiedRejectReason}</Text>
                    </>
                )}


                {/* <Images
                    type="image"
                    source={icons.Aadharpreview}
                    width={"80%"}
                    height={"80%"}
                /> */}
                {/* <Text family="GBold" size="medium" style={{ textAlign: "center", bottom: "12.5%", width: "70%" }} >Verify your Aadhaar card instantly through DigiLocker.Your details will be securely fetched from DigiLocker for quick identity verification.</Text> */}
            </View>
        </Mainview>
    )

}

export default Aadharverification