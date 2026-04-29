import { useState } from 'react'
import { Dropdown, Input } from '../../../Components/Field'
import Mainview from '../../../Components/mainview'
import Text from '../../../Components/text'
import Toptabs from '../../../Components/toptabs'
import useCustomHooks from '../../../Actions/Hooks/customhook'

const SupportPartnerRegister: React.FC = () => {
    const [currentindex, setCurrentindex] = useState(0)
    const { navigation } = useCustomHooks()

    return (
        <Mainview
            headertitle='RTO support partner'
            bottomContent
            isbottomload={false}
            bottomtext='Continue'
            onBottompress={() => navigation?.navigate('SupportPartnerConfirmation')}
        >
            <Text family='GMedium' size='semilarge' top={'5%'} >Registration Form</Text>
            <Input
                key={'Name'}
                label={'Name'}
                labelStyle={{ marginTop: '5%' }}
                placeHolder='Enter name'
            />
            <Text family='GRegular' size='medium' top={'2.5%'} >Gender</Text>
            <Toptabs
                tabs={['Male', 'Female']}
                activeindex={currentindex}
                onchange={setCurrentindex}
                width={60}
            />
            <Input
                key={'Mail ID'}
                label={'Mail ID'}
                labelStyle={{ marginTop: '5%' }}
                placeHolder='Enter mail ID'
            />
            <Input
                key={'Mobile number'}
                label={'Mobile number'}
                labelStyle={{ marginTop: '5%' }}
                placeHolder='Enter mobile number'
                keyboardType={'number-pad'}
            />
            <Input
                key={'Address'}
                label={'Address'}
                labelStyle={{ marginTop: '5%' }}
                placeHolder='Address'
                style={{ height: 100, textAlignVertical: 'top' }}
                inputprops={{ multiline: true, numberOfLines: 5 }}
            />
            <Dropdown
                key='City'
                label='City'
                conatinerstyle={{ marginTop: '5%' }}
            />
            <Dropdown
                key='District'
                label='District'
                conatinerstyle={{ marginTop: '5%' }}
            />
            <Dropdown
                key='State'
                label='State'
                conatinerstyle={{ marginTop: '5%' }}
            />
        </Mainview>
    )
}

export default SupportPartnerRegister;