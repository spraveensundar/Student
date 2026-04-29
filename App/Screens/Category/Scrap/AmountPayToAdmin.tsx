import { useState } from "react";
import { View } from "react-native";

import Text from "../../../Components/text";
import Mainview from "../../../Components/mainview";
import VectorIcons from "../../../Utilities/vectorIcons";
import { windowwidth } from "../../../Utilities/dimensions";
import FileUpload from "../../../Components/Field/FileUpolad";
import { getMimeType } from "../../../Utilities/helerfunction";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { useAmountPayToAdminMutation } from "../../../Slices/scrap";

const AmountPayToAdmin: React.FC = ({ route }: any) => {
    const { vehicleScrapId } = route?.params;
    const { navigation, failuretoast, successtoast } = useCustomHooks();

    const [payToAdmin, { isLoading }] = useAmountPayToAdminMutation();
    const [certificate, setCertificate] = useState<any>(undefined);

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('vehicleScrapId', vehicleScrapId);
            formData.append("paymentProofImage", {
                uri: certificate.uri,
                name: certificate.fileName || `certificate.jpg`,
                type: getMimeType(certificate.fileName),
            } as any);
            const response = await payToAdmin(formData).unwrap();
            console.log("resadsf", response)
            if (response?.status) {
                successtoast(response?.message);
            }
            failuretoast(response?.message ?? 'Something went wrong!');
        } catch (error: any) {
            failuretoast(error?.data?.message ?? 'Something went wrong!');
        }
    }

    const renderItem = () => {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: windowwidth * 0.05,
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: '#B7B7B7',
                borderRadius: 8,
            }}
            >
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: windowwidth * 0.2,
                    height: windowwidth * 0.2,
                    backgroundColor: '#F3F3F3',
                    borderRadius: windowwidth * 0.2
                }}
                >
                    <VectorIcons
                        family={'Lucide'}
                        name={'image-plus'}
                        iconcolor={'#000000'}
                        size={windowwidth * 0.08}
                    />
                </View>
                <Text family='GBold' size='medium' top={'5%'} >{'Click to Upload Front Side of Card'}</Text>
                <Text family='light' size='semimedium' top={'3%'} color='#607080' >{' (Max. File size: 25 MB)'}</Text>
            </View>
        )
    }

    return (
        <Mainview
            headertitle='Commission Amount'
            bottomContent
            isbottomload={isLoading}
            bottomtext={"Submit"}
            onBottompress={handleSubmit}
        >
            <View style={{ flex: 1, marginBottom: windowwidth * 0.05 }} >
                <FileUpload
                    source="sheet"
                    label={"Payment Proof Image"}
                    mediaData={certificate}
                    multiple={true}
                    maxFiles={2}
                    component={renderItem()}
                    onChange={(data) => {
                        setCertificate(data);
                    }}
                />
            </View>
        </Mainview>
    )
}

export default AmountPayToAdmin;