import { useState } from 'react';

import Text from '../../../Components/text';
import { Input } from '../../../Components/Field';
import Mainview from '../../../Components/mainview';
import { Toastfn } from '../../../Utilities/helerfunction';
import useCustomHooks from '../../../Actions/Hooks/customhook';
import { getItem } from '../../../Actions/Storage/localStorage';
import { useScrapReg_FormMutation } from '../../../Slices/auth';
import { validator } from '../../../Actions/Constants/validation';
import { scrapRegFormProps } from '../../../Actions/Types/formDataTypes';
import { persistorSelector, scrapStatus } from '../../../Slices/persistor';
import { useSelector } from 'react-redux';
import { scrapSelector } from '../../../Slices/scrap';

const ScrapDealerRegister: React.FC = () => {
    const { navigation, dispatch } = useCustomHooks()
    const { scrapstatus } = useSelector(persistorSelector);
    const [triggerScrapRegister, { isLoading }] = useScrapReg_FormMutation();
    const { scrapDetails } = useSelector(scrapSelector);


    const [userData, setUserData] = useState<scrapRegFormProps>({
        companyName: {
            value: "",
            rules: { required: true },
            messages: { required: 'Company Name is required!' },
            isValid: true,
        },
        dealerName: {
            value: "",
            rules: { required: true },
            messages: { required: 'Dealer Name is required!' },
            isValid: true,
        },
        address: {
            value: "",
            rules: { required: true },
            messages: { required: 'Address is required!' },
            isValid: true,
        },

    });


    const handleVerifyForm = async () => {
        // navigation.navigate('CertificateUpload');
        const token = getItem("token");
        try {
            const validatedResult = validator(userData);
            setUserData({ ...validatedResult?.data });

            if (validatedResult?.isValid) {
                const formData = new FormData();
                formData.append('rvscCompanyName', userData?.companyName?.value);
                formData.append('rvscDealerName', userData?.dealerName?.value);
                formData.append('rvscAddress', userData?.address?.value);
                console.log('RegFormData ==>', formData);
                const registerResult = await triggerScrapRegister(formData).unwrap();
                if (registerResult?.status) {
                    Toastfn(registerResult?.message ?? 'Registration completed!');
                    dispatch(scrapStatus(registerResult?.data?.verificationStatus))
                    navigation?.navigate('ScrapDealerConfirmation', {
                        origin: 'ScrapDealerRegister',
                        content: 'Please review and verify the submitted documents carefully. Ensure all details are valid and match the applicant’s profile before approval.',
                        button: {
                            title: 'Continue',
                            onButtonPress: (scrapDetails?.verificationStatus?.facilityFiles === "approved" || scrapDetails?.verificationStatus?.facilityFiles == "submitted") ? () => navigation.navgiate("ScrapDealerApproval") : () => navigation.navigate('CertificateUpload'),
                        }
                    })
                }
            } else {
                Toastfn('Invalid form submition, Please check the form!');
            }


        } catch (error) {
            console.log('VERIDY-MAIL-ID-ERROR', error);
        }
    }

    return (
        <Mainview
            headertitle='Scrap Dealer RVSF'
            bottomContent
            bottomtext='Submit'
            onBottompress={() => handleVerifyForm()}
            isbottomload={isLoading}
        >
            <Text family='GMedium' size='semilarge' top={'5%'} >Registration Form</Text>
            <Input
                key={'RVSF Company Name'}
                label={'RVSF Company Name'}
                labelStyle={{ marginTop: '5%' }}
                placeHolder='RVSF Company Name'
                value={userData.companyName?.value}
                onChange={(text: any) => setUserData(prev => ({ ...prev, companyName: { ...prev.companyName, value: text } }))}
                isValid={userData.companyName?.isValid}
                errorMessage={userData.companyName?.errorMessage}
            />
            <Input
                key={'RVSF Dealer Name'}
                label={'RVSF Dealer Name'}
                labelStyle={{ marginTop: '5%' }}
                placeHolder='RVSF Dealer Name'
                value={userData.dealerName?.value}
                onChange={(text: any) => setUserData(prev => ({ ...prev, dealerName: { ...prev.dealerName, value: text } }))}
                isValid={userData.dealerName?.isValid}
                errorMessage={userData.dealerName?.errorMessage}
            />
            <Input
                key={'Address'}
                label={'Address'}
                labelStyle={{ marginTop: '5%' }}
                placeHolder='Address'
                style={{ height: 100, textAlignVertical: 'top' }}
                inputprops={{ multiline: true, numberOfLines: 5 }}
                value={userData.address?.value}
                onChange={(text: any) => setUserData(prev => ({ ...prev, address: { ...prev.address, value: text } }))}
                isValid={userData.address?.isValid}
                errorMessage={userData.address?.errorMessage}
            />
        </Mainview>
    )
}

export default ScrapDealerRegister;