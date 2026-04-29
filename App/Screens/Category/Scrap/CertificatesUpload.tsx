import { useState } from 'react';
import { View } from 'react-native';

import Text from '../../../Components/text';
import Mainview from '../../../Components/mainview';
import { getMimeType } from '../../../Slices/helper';
import VectorIcons from '../../../Utilities/vectorIcons';
import useApiError from '../../../Actions/Hooks/errorhook';
import { windowwidth } from '../../../Utilities/dimensions';
import FileUpload from '../../../Components/Field/FileUpolad';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import { setScrapperDetails, useLazyGetScrapperDetailsQuery, useRvsfFileUpdateMutation } from '../../../Slices/scrap';

const CertificateUpload: React.FC = () => {
    const { navigation, successtoast, failuretoast, dispatch } = useCustomHooks();
    const [certificate, setCertificate] = useState<any>(undefined);
    const [company, setCompany] = useState<any>(undefined);
    const [facility, setFacility] = useState<any>(undefined);

    const [rvsfFileUpdate, { error, isLoading }] = useRvsfFileUpdateMutation();
    const [scrapUserDetails] = useLazyGetScrapperDetailsQuery();

    console.log("error", error)

    useApiError(error)

    const handleSubmit = async () => {
        try {
            const formDatas = new FormData();
            if (certificate?.length) {
                certificate.forEach((file: any, index: number) => {
                    formDatas.append("rvscCertificate", {
                        uri: file.uri,
                        name: file.fileName || `rvscCertificate${index}.jpg`,
                        type: getMimeType(file.fileName),
                    } as any);
                });
            }
            if (company?.length) {
                company.forEach((file: any, index: number) => {
                    formDatas.append("rvscCompanyRegCertificate", {
                        uri: file.uri,
                        name: file.fileName || `rvscCompanyRegCertificate${index}.jpg`,
                        type: getMimeType(file.fileName),
                    } as any);
                });
            }
            if (facility?.length) {
                facility.forEach((file: any, index: number) => {
                    formDatas.append("facilityPicture", {
                        uri: file.uri,
                        name: file.fileName || `facilityPicture${index}.jpg`,
                        type: getMimeType(file.fileName),
                    } as any);
                });
            }
            const response = await rvsfFileUpdate(formDatas).unwrap();
            const scrapRes = await scrapUserDetails(0).unwrap();
            console.log("responseasdfs", response)
            if (response?.status) {
                successtoast("Success", response.message);
                dispatch(setScrapperDetails(scrapRes?.data))
                navigation?.navigate('ScrapDealerConfirmation', {
                    origin: 'CertificateUpload',
                    content: 'Please review and verify the submitted documents carefully. Ensure all details are valid and match the applicant’s profile before approval.',
                    button: {
                        title: 'Continue',
                        onButtonPress: () => navigation.navigate('ScrapDealerApproval'),
                    }
                })
            } else {
                failuretoast("Error", "Something went wrong!");
            }
        } catch (err) {
            console.log(err, "upload_error");
            failuretoast("Error", "Upload failed");
        }
    };

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
            bottomContent
            bottomtext='Continue'
            isboxshadow={false}
            onBottompress={() => handleSubmit()}
            isbottomload={isLoading}

        >
            <View style={{
                marginBottom: windowwidth * 0.05,
                paddingBottom: windowwidth * 0.05,
                borderBottomWidth: 0.5,
                borderBottomColor: '#B7B7B7'
            }}>
                <FileUpload
                    source="sheet"
                    label={"RVSF Certificate"}
                    mediaData={certificate}
                    multiple={true}
                    maxFiles={2}
                    component={renderItem()}
                    onChange={(data) => {
                        setCertificate(data);
                    }}
                />
            </View>
            <View
                style={{
                    marginBottom: windowwidth * 0.05,
                    paddingBottom: windowwidth * 0.05,
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#B7B7B7'
                }}
            >
                <FileUpload
                    source="sheet"
                    label={"RVSF Company Reg-Certificate"}
                    mediaData={company}
                    multiple={true}
                    maxFiles={2}
                    component={renderItem()}
                    onChange={(data) => {
                        setCompany(data);
                    }}
                />
            </View>
            <View style={{ marginBottom: windowwidth * 0.08 }}>
                <FileUpload
                    source="sheet"
                    label={"Facility picture"}
                    mediaData={facility}
                    multiple={true}
                    maxFiles={2}
                    component={renderItem()}
                    onChange={(data) => {
                        setFacility(data);
                    }}
                />
            </View>
        </Mainview>
    )
}

export default CertificateUpload;