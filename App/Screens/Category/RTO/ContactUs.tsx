import Mainview from '../../../Components/mainview'
import Text from '../../../Components/text'
import useCustomHooks from '../../../Actions/Hooks/customhook'
import { View } from 'react-native'
import { borderradius, windowwidth } from '../../../Utilities/dimensions'
import VectorIcons from '../../../Utilities/vectorIcons'
import LinearGradient from 'react-native-linear-gradient'

const ContactUs: React.FC = () => {
    const { theme, navigation } = useCustomHooks()

    return (
        <Mainview
            headertitle='Contact US'
            bottomContent
            isbottomload={false}
            bottomtext='Done'
            onBottompress={() => navigation?.navigate('Categories')}
        >
            <Text family='GMedium' size='semilarge' top={'5%'} >{'Contact details'}</Text>
            <Text top={"2.5%"} family="GRegular" size="medium" >{'Have a question, feedback, or partnership idea? We’re always happy to help. Reach out to us using the form below or contact us directly through the given details.'}</Text>
            <View style={{
                width: '100%',
                backgroundColor: theme.cardbg,
                borderRadius: borderradius * 0.5,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#CFCFCF',
                padding: windowwidth * 0.05,
                marginTop: "5%",
            }} >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: windowwidth * 0.05,
                    }}
                >
                    <LinearGradient
                        colors={['#FDC60F', '#EB533A']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 0.5, y: 1 }}
                        style={{
                            width: windowwidth * 0.15,
                            height: windowwidth * 0.15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: windowwidth * 0.15,
                        }}
                    >
                        <VectorIcons
                            family={'MaterialIcons'}
                            name={'wifi-calling-3'}
                            iconcolor={'#FFFFFF'}
                            size={windowwidth * 0.07}
                        />
                    </LinearGradient>
                    <View
                        style={{
                            flex: 1,
                            marginLeft: windowwidth * 0.05,
                        }}
                    >
                        <Text family='GRegular' size='medium' >{'Contact number'}</Text>
                        <Text top={"2.5%"} family="GBold" size='large' >{'+91-7428126137'}</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <LinearGradient
                        colors={['#FF5A54', '#a33b3cff']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 0.5, y: 1 }}
                        style={{
                            width: windowwidth * 0.15,
                            height: windowwidth * 0.15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: windowwidth * 0.15,
                        }}
                    >
                        <VectorIcons
                            family={'Ionicons'}
                            name={'mail'}
                            iconcolor={'#FFFFFF'}
                            size={windowwidth * 0.07}
                        />
                    </LinearGradient>
                    <View
                        style={{
                            flex: 1,
                            marginLeft: windowwidth * 0.05,
                        }}
                    >
                        <Text family='GRegular' size='medium' >{'Email address'}</Text>
                        <Text top={"2.5%"} family="GBold" size='large' >{'support@carigato.com'}</Text>
                    </View>
                </View>
            </View>
        </Mainview>
    )
}

export default ContactUs;