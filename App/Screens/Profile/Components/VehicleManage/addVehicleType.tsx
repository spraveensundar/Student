import React, { useCallback, useState } from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import VehicleType from "../../../Services/CleaningService/vehicleType";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import VechicleBrand from "../../../Services/CleaningService/vechicleBrand";
import VarientType from "../../../Services/CleaningService/varientType";
import VehicleParkType from "./vehicleParkType";
import { BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeNewVehicle } from "../../../../Common/redux/authSliceReducer";



const AddVehicleType: React.FC = () => {



    const dispatch = useDispatch();
    const newVehicle: any = useSelector((state:any)=>state?.userData?.newVehicle);



    const { theme, navigation } = useCustomHooks();
    


    type PageName = "VechicleBrand" | "VarientType" | "VehicleParkType" | "VehicleType";
    const [currentPage, setCurrentPage] = useState<PageName>("VehicleType");
    const [loadingStatus, setLoadingStatus] = useState({
        noData: false,
        overLapLoader: false,
        mainLoader: false,
    })



    const changeLoadingStatus = (statusObject: any) => {
        setLoadingStatus(statusObject);
    }

    const renderContent = () => {

        switch (currentPage) {
            case "VehicleType":
                return <VehicleType onNext={() => setCurrentPage("VechicleBrand")} changeLoadingStatus={(e)=>changeLoadingStatus(e)} />;
            case "VechicleBrand":
                return <VechicleBrand onNext={() => setCurrentPage("VarientType")} changeLoadingStatus={(e)=>changeLoadingStatus(e)} />;
            case "VarientType":
                return <VarientType onNext={() => setCurrentPage("VehicleParkType")} changeLoadingStatus={(e)=>changeLoadingStatus(e)} />;
            case "VehicleParkType":
                return <VehicleParkType changeLoadingStatus={(e)=>changeLoadingStatus(e)} />;
        }
    };

    useFocusEffect(
        useCallback(()=>{
            if(newVehicle?.id){
                setCurrentPage("VehicleParkType");
            }
        },[newVehicle])
    )

    const goBackCheck = () => {
        if(currentPage == "VehicleType" || newVehicle?.id){
            dispatch(removeNewVehicle());
            navigation.goBack();
        }
        else if(currentPage == "VechicleBrand"){
            setCurrentPage("VehicleType");
        }
        else if(currentPage == "VarientType"){
            setCurrentPage("VechicleBrand");
        }
        else if(currentPage == "VehicleParkType"){
            setCurrentPage("VarientType");
        }
    }

    useFocusEffect(
        useCallback(()=>{
            const backAction = () => {
                goBackCheck();
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        },[currentPage])
    )

    return (
        <Mainview
            isheader={true}
            headertitle={newVehicle?.id?"Edit vehicle":"Add Vehicle"}
            onleftfn={() => goBackCheck()}
        >
            {renderContent()}
        </Mainview>
    )
}

export default AddVehicleType;