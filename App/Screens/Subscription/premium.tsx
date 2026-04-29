import React, { useCallback, useState } from "react";
import Mainview from "../../Components/mainview";
import useCustomHooks from "../../Actions/Hooks/customhook";
import styles from "./styles";
import { View, ScrollView, Pressable } from "react-native";
import Text from "../../Components/text";
import StandardPlan from "./standardPlan";
import PremiumPlan from "./premiumPlan";
import ElitePlan from "./elitePlan";
import VectorIcons from "../../Utilities/vectorIcons";
import ExplorePremium from "./explorePremium";
import { useFocusEffect } from "@react-navigation/native";
import { useGetPackageDetailQuery, useGetPackageListQuery, useGetPlansListQuery } from "../../Common/redux/vehicleServiceHook";
import { constantData } from "../../Common/constant";
import { isEmpty, loginCheck, numberChange, returnArrayOnly } from "../../Common/commonFunction";
import { useGetFeesQuery } from "../../Common/redux/userHook";
import { useDispatch, useSelector } from "react-redux";
import { setNewCleaningService } from "../../Common/redux/serviceReducer";

const Premium: React.FC = () => {



    const dispatch = useDispatch();
    const { data, refetch, isLoading, } = useGetPackageListQuery({ type: constantData.subscriptionType.subscribe, page: 1, limit: 10 });
    const planData: any = useGetPlansListQuery({ page: 1, limit: 10 });
    const newCleaningService = useSelector((state: any)=>state?.serviceData?.newCleaningService)
    const selectedPackageDetail = useGetPackageDetailQuery({ packageId: newCleaningService?.packageId });
    const feesData = useGetFeesQuery({});


    const { theme, navigation } = useCustomHooks();
    const style = styles(theme);

    
    const [visible, setVisible] = useState(false)
    const [ selectedPlanType, setSelectedPlanType ] = useState("");
    const [loadingStatus, setLoadingStatus] = useState({
        noData: false,
        overLapLoader: false,
        mainLoader: false,
        noDataContent: "No data found",
    })




    const packageList = returnArrayOnly(data?.data).filter((value)=>(((isEmpty(selectedPlanType)||selectedPlanType==value?.planId)&&isEmpty(newCleaningService?.newPlanId))||(!isEmpty(newCleaningService?.newPlanId)&&newCleaningService?.newPlanId==value?.planId)));
    const planList = returnArrayOnly(planData?.data?.data);
    const feesDetail = feesData?.data?.data;

    console.log('planListplanList',packageList,feesData,newCleaningService,planList)


    const changeLoadingStatus = (statusObject: any) => {
        setLoadingStatus({
            ...loadingStatus,
            ...statusObject,
        });
    }

    useFocusEffect(
        useCallback(()=>{
            refetch();
            planData?.refetch();
        },[])
    )

    useFocusEffect(
        useCallback(() => {
            changeLoadingStatus({
                overLapLoader: isLoading
            })
        }, [isLoading])
    )

    const onPriceSelect = (durationData: any, currentPlanData: any) => {
        if (loginCheck()) {

            let vehicleSquareMetre = numberChange(newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.totalSquareMeter) > 0 ? numberChange(newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.totalSquareMeter, 2) : 20;

            let perDayPrice = 0, monthPrice = 0, perSquareMetreCost = 0;
            if (newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.vehicleModel == constantData.model.luxury) {
                perDayPrice = numberChange((currentPlanData?.luxuryVehicleAmount / 30), 2);
                monthPrice = perDayPrice * 30;
                perSquareMetreCost = numberChange(currentPlanData?.luxuryVehicleAmount , 2);
            }
            else {
                perDayPrice = numberChange(((numberChange(vehicleSquareMetre) * numberChange(currentPlanData?.normalVehicleAmount)) / 30).toFixed(2));
                monthPrice = perDayPrice * 30;
                perSquareMetreCost = numberChange(currentPlanData?.normalVehicleAmount , 2);
            }
            
            let planPrice = perDayPrice * numberChange(durationData?.days);
            let planDiscount = numberChange(durationData?.discount);
            let planDiscountPrice = Math.round(planPrice * (planDiscount / 100));
            let planDiscountedPrice = numberChange(planDiscount ? (planPrice - planDiscountPrice) : planPrice);

            console.log('planPriceplanPrice',planPrice, currentPlanData, perDayPrice, newCleaningService?.selectedVehicleDetail?.newBrandVehicleDetail?.vehicleModel)
            let setData = {
                ...newCleaningService,
                vehicleSquareMetre: vehicleSquareMetre,
                perDayPrice: perDayPrice,
                monthPrice: monthPrice,
                duration: durationData,
                planId: currentPlanData?.planId,
                packageId: currentPlanData?._id,
                packageDetail: currentPlanData,
                planPrice: planPrice,
                planDiscountPercent: planDiscount,
                planDiscountPrice: planDiscountPrice,
                planDiscountedPrice: planDiscountedPrice,
                couponDiscountPercent: 0,
                couponDiscountPrice: 0,
                couponCode: "",
                couponId: "",
            }

            // if(newCleaningService?.packageId != setData?.packageId){
            //     setData.selectedSlotType= {};
            //     setData.selectedDateSlot= {};
            //     setData.selectedTimeSlot= {};
            //     setData.slotDiscount= 0;
            //     setData.slotDiscountPrice= 0;
            // }

            dispatch(
                setNewCleaningService(setData)
            )
            selectedPackageDetail.refetch();
            navigation.navigate('TimeSlot');
        }
        else {
            navigation.navigate('Login', { redirectTo: 'TimeSlot' });
        }
    }

    console.log('plandatttaa',data)

    return (
        <Mainview
            isheader={true}
            headertitle="Premium Plans"  
            onleftfn={() => navigation.goBack()}
            rightfn={
                <Pressable onPress={() => setVisible(true)}>
                    <VectorIcons
                        family="Ionicons"
                        name="options-outline"
                        
                    />
                </Pressable>
            }
            isnodata={(packageList?.length<=0 && !loadingStatus?.overLapLoader)?true:false}
            nodatacontent={loadingStatus.noDataContent}
            isoverlaploader={loadingStatus?.overLapLoader}
            ismainloading={loadingStatus?.mainLoader}    
        >
            <View style={style.container}>
                <View>
                    <Text family="GMedium" size="semilarge">Choose your premium plans</Text>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            packageList.map((value: any)=>{

                                return (
                                    <>
                                        <StandardPlan
                                            planData = {value}
                                            selectedPackageDetail = {selectedPackageDetail}
                                            feesData = {feesDetail}
                                            onPriceSelect={onPriceSelect}
                                        />
                                        <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 10 }} />
                                    </>
                                )
                            })
                        }
                        {/* <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 10 }} />
                        <PremiumPlan />
                        <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 10 }} />
                        <ElitePlan /> */}
                    </ScrollView>
                </View>
            </View>

            {
                visible
                ?
                <ExplorePremium
                   visible={visible} 
                   setVisible={setVisible}
                   planList={planList}
                   setSelectedPlanType={setSelectedPlanType}
                   />
                :
                <></>
            }
            
        </Mainview >

    )
}

export default Premium;