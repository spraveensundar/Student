import React, { useCallback, useEffect, useState } from "react";
import ServiceDetails from "./serviceDetails";
import VehicleType from "./vehicleType";
import VechicleBrand from "./vechicleBrand";
import VarientType from "./varientType";
import SelectVehicle from "./selectVehicle";
import { useFocusEffect, useRoute } from '@react-navigation/native';
import useCustomHooks from "../../../Actions/Hooks/customhook";
import Mainview from "../../../Components/mainview";
import { useAppSelector } from "../../../Store/reduxHooks";
import { useDispatch, useSelector } from "react-redux";
import { removeNewCleaningService, setCleaningType, setNewCleaningService } from "../../../Common/redux/serviceReducer";
import { confirmAlert, isEmpty, returnArrayOnly } from "../../../Common/commonFunction";
import { BackHandler } from "react-native";
import { useGetMyVehiclesQuery } from "../../../Common/redux/userHook";
import VehicleParkType from "../../Profile/Components/VehicleManage/vehicleParkType";
import { constantData } from "../../../Common/constant";




const CleaningService: React.FC = () => {



    const serviceType = useSelector(
        (state: any) => state?.serviceData?.cleaningType,
    );
    const dispatch = useDispatch();
    const newCleaningService = useSelector((state: any) => state?.serviceData?.newCleaningService)
    const { data, refetch } = useGetMyVehiclesQuery({ page: 1, limit: 100 });



    const { navigation } = useCustomHooks();



    const [currentPage, setCurrentPage] = useState("ServiceDetails");
    const [loadingStatus, setLoadingStatus] = useState({
        noData: false,
        overLapLoader: false,
        mainLoader: false,
        noDataContent: "No data found",
    })




    const vehicleList = returnArrayOnly(data?.data);


    type PageType = "ServiceDetails" | "VehicleType" | "VechicleBrand" | "VarientType" | "VehicleParkType" | "SelectVehicle";
    const handleNext = (pageName: PageType) => {
        setCurrentPage(pageName);
    };

    console.log('pageNamepageNamecurrentPage', currentPage)

    const handleBack = () => {
        switch (currentPage) {
            case "VehicleType":
                setCurrentPage("SelectVehicle");
                break;
            case "VechicleBrand":
                setCurrentPage("VehicleType");
                break;
            case "VarientType":
                setCurrentPage("VechicleBrand");
                break;
            case "SelectVehicle":
                setCurrentPage("ServiceDetails");
                break;
            case "VehicleParkType":
                setCurrentPage("VarientType");
                break;
            case "ServiceDetails":
            default: {
                if (!isEmpty(newCleaningService)) {
                    confirmAlert(
                        "If you go back, the data you entered will be cleared",
                        () => {
                            dispatch(
                                removeNewCleaningService()
                            );
                            navigation.goBack();
                        },
                        () => { }
                    )
                }
                else {
                    dispatch(
                        removeNewCleaningService()
                    );
                    navigation.goBack();
                }
            }
        }
    };

    useFocusEffect(
        useCallback(() => {

            const backAction = () => {
                handleBack();
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }, [currentPage])
    )

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    )

    useEffect(() => {
        if (serviceType) {
            let setData = {
                serviceType: serviceType,
            }
            dispatch(setCleaningType(""));
            dispatch(setNewCleaningService(setData));

        }
    }, [serviceType])

    const changeLoadingStatus = (statusObject: any) => {
        setLoadingStatus({
            ...loadingStatus,
            ...statusObject,
        });
    }


    const renderContent = () => {
        // if (serviceType === "onetimeCarCleaning" && currentPage === "ServiceDetails") {
        //     return <VehicleType onNext={() => handleNext("VechicleBrand")} />;
        // }
        switch (currentPage) {
            case "ServiceDetails":
                return <ServiceDetails onNext={() => handleNext("SelectVehicle")} changeLoadingStatus={(e) => changeLoadingStatus(e)} />;
            case "VehicleType":
                return <VehicleType onNext={() => handleNext("VechicleBrand")} changeLoadingStatus={(e) => changeLoadingStatus(e)} />;
            case "VechicleBrand":
                return <VechicleBrand onNext={() => handleNext("VarientType")} changeLoadingStatus={(e) => changeLoadingStatus(e)} />;
            case "VarientType":
                return <VarientType onNext={() => handleNext("VehicleParkType")} changeLoadingStatus={(e) => changeLoadingStatus(e)} />;
            case "VehicleParkType":
                return <VehicleParkType onNext={() => handleNext("SelectVehicle")} changeLoadingStatus={(e) => changeLoadingStatus(e)} />;
            case "SelectVehicle":
                return <SelectVehicle onNext={() => handleNext("VehicleType")} changeLoadingStatus={(e) => changeLoadingStatus(e)} />;
            default:
                return null;
        }
    };


    return (
        <Mainview
            isheader={true}
            headertitle={newCleaningService?.serviceType === constantData.subscriptionType.ots ? "One Time Car Cleaning" : "Daily Car Cleaning Service"}
            onleftfn={handleBack}
            isnodata={loadingStatus?.noData}
            nodatacontent={loadingStatus.noDataContent}
            isoverlaploader={loadingStatus?.overLapLoader}
            ismainloading={loadingStatus?.mainLoader}
        >
            {renderContent()}

        </Mainview>
    )
}

export default CleaningService;
