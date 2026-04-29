import { View } from "react-native"
import Mainview from "../../../Components/mainview"
import { windowwidth } from "../../../Utilities/dimensions"
import Images, { icons } from "../../../Utilities/images"
import Text from "../../../Components/text"
import { Fontsize } from "../../../Utilities/uiasset"
import { PROFILEURL } from "../../../Actions/Constants/constant"
import Detilsofride from "../../Others/Common/detailsofride"

interface profiledata {
    image: string,
    id: string,
    name: string,
    address: string,
    blockno?: string,
    apartmentname?: string
}

const Profileinfo: React.FC<profiledata> = ({
    image,
    id = 1848,
    name = "Carigato user",
    address,
    blockno,
    apartmentname
}) => {

    return (
        <View style={{
            paddingVertical: windowwidth * 0.04
        }} >
            <View
                style={{
                    flexDirection: 'row',
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        width: windowwidth * 0.175,
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: windowwidth * 0.175,
                            height: windowwidth * 0.175,
                            borderRadius: windowwidth * 0.175,
                            overflow: 'hidden',
                        }}
                    >
                        <Images
                            type="image"
                            source={image ? { uri: PROFILEURL + image } : icons.User}
                            width={windowwidth * 0.175}
                            height={windowwidth * 0.175}
                            resizeMode="cover"
                        />
                    </View>
                    <View
                        style={{
                            marginTop: windowwidth * 0.02,
                            padding: windowwidth * 0.01,
                            backgroundColor: '#389E0D1A',
                            borderRadius: 5,
                            alignSelf: 'center'
                        }}
                    >
                        <Text family={'GRegular'} size={'medium'} color={'#389E0D'} style={{ lineHeight: Fontsize.medium }} >#{id}</Text>
                    </View>
                </View>

                <View
                    style={{
                        flex: 1,
                        marginLeft: windowwidth * 0.05,
                    }}
                >
                    <Text family={'GMedium'} size={'semilarge'} >{name}</Text>
                    {blockno ?
                        <Text family={'GRegular'} size={'medium'} style={{ lineHeight: Fontsize.extralarge }} >Blockno   : {blockno}</Text> : null}

                    {apartmentname ?
                        <Text family={'GRegular'} size={'medium'} style={{ lineHeight: Fontsize.extralarge }} >Apartment : {apartmentname}</Text> : null}
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Text family={'GRegular'} size={'medium'} style={{ lineHeight: Fontsize.extralarge }} >Address   : </Text> */}
                        <View style={{ flex: 1 }}>
                            <Text family={'GRegular'} size={'medium'} style={{ lineHeight: Fontsize.extralarge }} >{address}</Text>
                        </View>
                    </View>
                </View>

            </View >
        </View>
    )

}

export default Profileinfo