import { ScrollView, View } from "react-native"
import Profileinfo from "./profileinfo"
import Line from "../../../Components/line"
import { windowheight, windowwidth } from "../../../Utilities/dimensions"
import Text from "../../../Components/text"
import Toptabs from "../../../Components/toptabs"
import { useCallback, useState } from "react"
import { Button, Input } from "../../../Components/Field"
import Flexcomponent from "../../../Components/flexcomponent"
import useCustomHooks from "../../../Actions/Hooks/customhook"
import Uploadphotos from "../Servicedetails/uploadphotos"
import { Photos, photosprops } from "../../../Actions/Types/phototypes"
import { FlashList } from "@shopify/flash-list"
import { useSelector } from "react-redux"
import { cleaningSelector, update_checklist } from "../../../Slices/cleaning"

interface vechilechecklist {
    title: string,
    value: photosprops[]
}

const Startjob: React.FC = () => {
    const [currentindex, setCurrentindex] = useState(0)
    const { theme, dispatch } = useCustomHooks()

    const updatepictures = useCallback((data: photosprops[], index: number) => {
        const payload = {
            vechilevalue: data,
            index: index
        }
        dispatch(update_checklist(payload))

    }, [dispatch])
    const { checklist } = useSelector(cleaningSelector)
    return (
        <View style={{ flex: 1 }} >
            <View style={{ flex: 1 }} >
                <FlashList
                    data={checklist}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<>
                        <Profileinfo />
                        <Line width={windowwidth} conatainerstyle={{ alignSelf: "center" }} />
                        <Text family='GRegular' size='medium' top={'5%'} >{'Car Available'}</Text>
                        <Toptabs
                            tabs={['Yes', 'No']}
                            activeindex={currentindex}
                            onchange={setCurrentindex}
                            width={60}
                        />
                        <Input
                            key={'Mail ID'}
                            label={'Car Reg.No'}
                            labelStyle={{ marginTop: '5%' }}
                            placeHolder='e.g: TN-63-5426'
                        />

                        <Text top={"2.5%"} size="semilarge" family="GMedium" >Car Inspection</Text>
                        <Text family="GRegular" >Check all the items in the checklist below before cleaning. If a vehicle part is damaged, choose the category from the checklist and upload the relevant damaged part photo</Text>
                    </>}
                    renderItem={({ item, index }) => (
                        <>
                            <Uploadphotos title={item.title}
                                onchangephotos={(data) => updatepictures(data, index)}
                            />
                        </>

                    )}
                />
            </View>

            <Flexcomponent justifyContent="space-evenly" width={windowwidth} style={{ height: windowheight * 0.1, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", alignSelf: "center" }} >

                <Button
                    title="Review the Inspection"
                />
            </Flexcomponent>
        </View>
    )

}

export default Startjob