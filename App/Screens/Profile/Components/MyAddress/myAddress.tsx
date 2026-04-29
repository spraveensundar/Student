import React, { useEffect, useState } from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { Pressable, View } from "react-native";
import { Button } from "../../../../Components/Field";
import Text from "../../../../Components/text";
import styles from "./styles";
import DeleteAddress from "./deleteAddress";
import { useSelector } from "react-redux";
import { isEmpty, loginCheck, returnArrayOnly, toastFn } from "../../../../Common/commonFunction";
import { deleteAddressAxios } from "../../../../Common/axiosHooks/userHooks";
import { useGetMyDetailQuery } from "../../../../Common/redux/userHook";
import { getItem, removeItem } from "../../../../Common/localStorage";
import { constantData } from "../../../../Common/constant";

const MyAddress: React.FC = () => {



    const { refetch } = useGetMyDetailQuery(undefined);



    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);



    const [visible, setVisible] = useState(false);
    const [deleteAddressData, setDeleteAddressData] = useState<any>({});
    const [ disableStatus, setDisableStatus ] = useState(false);



    const userData = useSelector((state:any)=>state?.userData);

    
    console.log('userDatauserData',userData);

    const noAccessRedirect = (navigateTo: any) => {
        if (navigateTo) {
            if (loginCheck()) {
                return navigation.navigate(navigateTo);
            }
            return navigation.navigate("Login", { redirectTo: navigateTo });
        }
    }

    const myAddressList = [
        ...(
            loginCheck()
                ?
                returnArrayOnly(userData?.userDetail?.location)
                :
                (userData?.currentAddress?[userData?.currentAddress]:[])
        )
    ]

    const editAddress = (address: any) => {
        console.log('editAddresseditAddress',address)
        let setData = {
            ...address,
            lat: address?.location?.[0],
            lng: address?.location?.[1],
            address: address?.fullAddress,
            addressData: address?.addressData,
        }

        return navigation.navigate('UpdateLocation',{locationData: setData, redirectTo: "MyAddress" });
    }

    const onDelete = (address: any) => {
        setDeleteAddressData(address)
        setVisible(true)
    }

    const onDeleteHide = () => {
        setVisible(false);
        setDeleteAddressData({});
    }

    const onConfirmDelete = async() => {
        setDisableStatus(true);
        if(isEmpty(deleteAddressData?._id)){
            setDisableStatus(false);
            return toastFn("Invalid data");
        }
        let sendData = {
            id: deleteAddressData?._id,
        }
        let resp = await deleteAddressAxios(sendData);
        if(resp?.status){
            let getCurrentAddress = getItem(constantData.currentAddress);
            if(getCurrentAddress?._id == deleteAddressData?._id){
                removeItem(constantData.currentAddress);
            }
            await refetch();
            toastFn(resp?.message??"Address deleted");
            onDeleteHide();
        }
        else{
            toastFn(resp?.message??"Try-Again");
        }
        setDisableStatus(false);
    }

    return (
        <Mainview
            isheader={true}
            headertitle="My Address"
            onleftfn={() => navigation.goBack()}
            bottomContent={
                <View style={{ paddingHorizontal: "6%", marginBottom: "5%", gap: 20 }}>
                    {
                        loginCheck()
                        ?
                        <>
                        <Button title="Go to fetch live locations" onPress={() => navigation.navigate('LiveLocation')} />
                    <Button title="Add new address" onPress={() => navigation.navigate('UpdateLocation')}
                        buttonStyle={{
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderColor: theme.btnColor,
                        }} textStyle={{ color: theme.btnColor }} />
                        </>
                        :
                        <>
                    <Button title="Log-In Add new address" onPress={() => noAccessRedirect('UpdateLocation')}
                        buttonStyle={{
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderColor: theme.btnColor,
                        }} textStyle={{ color: theme.btnColor }} />
                        </>
                    }
                    
                </View>
            }
            isscollable={true}
        >
            {
                myAddressList?.length > 0
                    ?
                    <>
                        {
                            myAddressList?.map((val: any, index: number) => {
                                console.log("jhfjdsfdsfsd",val)
                                return (
                                    <>
                                        <View style={{ marginTop: "5%", gap: 20, backgroundColor: theme.card, borderWidth: 1, borderColor: theme.cardborder, padding: 20, borderRadius: 5,  ...(index+1 >= myAddressList?.length ? {marginBottom: "5%"} : {}) }}>
                                            <View style={{ gap: 10 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Text family="bold" size="semimedium"></Text>
                                                    {
                                                        val?.isDisplay
                                                        ?
                                                        <Pressable style={[style.btn, { backgroundColor: theme.btnTag }]}><Text family="bold" size="semimedium" color={theme.activetabtext}>Current</Text></Pressable>
                                                        :
                                                        <Pressable></Pressable>
                                                    }
                                                </View>
                                                <View>
                                                    {
                                                        val?.flatNo
                                                        ?
                                                        <Text size="semimedium" family="GRegular">{val?.flatNo}</Text>
                                                        :
                                                        <></>
                                                    }
                                                    {
                                                        val?.sector
                                                        ?
                                                        <Text size="semimedium" family="GRegular">{val?.sector}</Text>
                                                        :
                                                        <></>
                                                    }
                                                    {
                                                        val?.city
                                                        ?
                                                        <Text size="semimedium" family="GRegular">{val?.city}</Text>
                                                        :
                                                        <></>
                                                    }
                                                    {
                                                        val?.addressData?.country
                                                        ?
                                                        <Text size="semimedium" family="GRegular">{val?.addressData?.country}</Text>
                                                        :
                                                        <></>
                                                    }
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Pressable disabled={disableStatus} onPress={() => editAddress(val)} style={[style.btn, { backgroundColor: '#252525' }]}><Text size="medium" family="GMedium" color={theme.activetabtext} >Edit Address</Text></Pressable>
                                                {
                                                    loginCheck()
                                                        ?
                                                        <Pressable disabled={disableStatus} onPress={() => onDelete(val)} style={[style.btn, { backgroundColor: '#FF3F3F1A' }]}><Text size="medium" family="GMedium" color="#FF3F3F">Delete</Text></Pressable>
                                                        :
                                                        <></>
                                                }
                                            </View>
                                        </View>
                                    </>
                                )
                            })
                        }
                    </>
                    :
                    <>
                        <View style={{ marginTop: "5%", gap: 20, backgroundColor: theme.card, borderWidth: 1, borderColor: theme.cardborder, padding: 20, borderRadius: 5, marginBottom: "5%" }}>
                            <Text>
                                No address added
                            </Text>
                        </View>
                    </>
            }
            {/* <View style={{ marginTop: "5%", gap: 20, backgroundColor: theme.card, borderWidth: 1, borderColor: theme.cardborder, padding: 20, borderRadius: 5 }}>
                <View style={{ gap: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text family="bold" size="semimedium">Carigato Users</Text>
                        <Pressable style={[style.btn, { backgroundColor: theme.btnTag }]}><Text family="bold" size="semimedium" color={theme.activetabtext}>Home</Text></Pressable>
                    </View>
                    <View>
                        <Text size="semimedium" family="GRegular">Flat No. 204, Block B, Green Park Residency,</Text>
                        <Text size="semimedium" family="GRegular">Near Hauz Khas Metro Station,</Text>
                        <Text size="semimedium" family="GRegular">New Delhi – 110016,</Text>
                        <Text size="semimedium" family="GRegular">Delhi, India.</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable onPress={() => navigation.navigate('UpdateLocation')} style={[style.btn, { backgroundColor: '#252525' }]}><Text size="medium" family="GMedium" color={theme.activetabtext} >Edit Address</Text></Pressable>
                    <Pressable onPress={() => setVisible(true)} style={[style.btn, { backgroundColor: '#FF3F3F1A' }]}><Text size="medium" family="GMedium" color="#FF3F3F">Delete</Text></Pressable>
                </View>
            </View>
            <DeleteAddress visible={visible} setVisible={setVisible} /> */}
            {
                visible
                ?
                <DeleteAddress onConfirmDelete={onConfirmDelete} onHide={onDeleteHide} />
                :
                <></>
            }
            
        </ Mainview >
    )
}

export default MyAddress;