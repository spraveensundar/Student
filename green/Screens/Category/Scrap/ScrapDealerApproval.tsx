import { View } from "react-native"
import Mainview from "../../../Components/mainview"
import Text from "../../../Components/text"
import Images, { lotties } from "../../../Utilities/images"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import { update_servicestype } from "../../../Slices/helper"
import Lottie from "../../../Components/lottieview"
import { windowheight, windowwidth } from "../../../Utilities/dimensions"
import { useSelector } from "react-redux"
import { scrapSelector } from "../../../Slices/scrap"
import { Colors, Fontfamily, Fontsize } from "../../../Utilities/uiasset"
import Card from "../../../Components/Card"
import VectorIcons from "../../../Utilities/vectorIcons"
import { getStatusIcon } from "../../../Utilities/helerfunction"

const ScrapDealerApproval: React.FC = () => {
    const { navigation, dispatch, theme } = useCustomHooks();
    const { scrapDetails } = useSelector(scrapSelector);

    const verification = scrapDetails?.verificationStatus?.information === "approved" && scrapDetails?.verificationStatus?.facilityFiles === "approved" && scrapDetails?.isVerified === true;

    const informationStatus = getStatusIcon(
        scrapDetails?.verificationStatus?.information
    );

    const facilityStatus = getStatusIcon(
        scrapDetails?.verificationStatus?.facilityFiles
    );

    console.log("scrapDetails", scrapDetails, verification)

    return (
        <Mainview
            headertitle={"Verification"}
            isheader={verification ? false : true}
            bottomContent={verification ? true : false}
            isscollable={false}
            bottomtext={"Go to home"}
            onBottompress={() => {
                dispatch(update_servicestype("scrapdealer"));
                navigation?.navigate("Vendorhome");
            }}
        >
            {
                verification === false ?
                    (
                        <>
                            <Text size="semilarge" style={{ marginTop: 20, marginBottom: 5 }}>Please wait verification on process</Text>
                            <Text color={"#939392"} family="GRegular" size="xmedium">Validate the documents</Text>
                            <Card containerStyle={{ borderColor: "#12110D1F", marginTop: 15, paddingVertical: 15, alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", borderRadius: 30, flexDirection: "row", paddingHorizontal: 20, }} ispress={scrapDetails?.verificationStatus?.information === "rejected" ? true : false} onPress={() => navigation.navigate("ScrapDealerRegister")}>
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontFamily: Fontfamily.medium, fontSize: Fontsize.xmedium, color: "#000000" }}>
                                        Document Informations
                                    </Text>
                                    {
                                        scrapDetails?.verificationStatus?.informationRejectReason && (
                                            <Text color={"#939392"} numoflines={2} style={{ marginTop: 2 }} size="semimedium" family="GRegular">{scrapDetails?.verificationStatus?.facilityFilesRejectReason}</Text>
                                        )
                                    }
                                </View>
                                <VectorIcons
                                    family="Ionicons"
                                    iconcolor={informationStatus.color}
                                    name={informationStatus.name}
                                />
                            </Card>
                            <Card containerStyle={{ borderColor: "#12110D1F", marginTop: 15, paddingVertical: 15, alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", borderRadius: 30, flexDirection: "row", paddingHorizontal: 20, }} ispress={scrapDetails?.verificationStatus?.facilityFiles === "rejected" ? true : false} onPress={() => navigation.navigate("CertificateUpload")}>
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontFamily: Fontfamily.medium, fontSize: Fontsize.xmedium, color: "#000000" }}>
                                        Document Certificates
                                    </Text>
                                    {
                                        scrapDetails?.verificationStatus?.facilityFilesRejectReason && (
                                            <Text color={"#939392"} numoflines={2} style={{ marginTop: 2 }} size="semimedium" family="GRegular">{scrapDetails?.verificationStatus?.facilityFilesRejectReason}</Text>
                                        )
                                    }
                                </View>
                                <VectorIcons
                                    family="Ionicons"
                                    iconcolor={facilityStatus.color}
                                    name={facilityStatus.name}
                                />
                            </Card>
                        </>
                    )
                    : (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                            <Lottie
                                src={lotties.Success}
                                style={{ width: windowwidth * 0.4, height: windowheight * 0.4 }}
                            />
                            <Text family="GBold" size="medium" style={{ textAlign: "center", width: "70%" }} >
                                {'Your document was Approved successfully !'}
                            </Text>
                        </View>
                    )
            }
        </Mainview>
    )
}

export default ScrapDealerApproval;