import React, { useCallback, useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import ScrappingPerson from "./Person";
import ScrappingAddress from "./Address";
import ScrappingPicture from "./Pictures";
import ScrappingDetail from "./ScrapVehicle";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { confirmAlert, isEmpty } from "../../../../Common/commonFunction";
import { setResetScrapData } from "../../../../Common/redux/scrapService";
import { Stacknavigationtypes } from "../../../../Navigations/stacknavigationtypes";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'ScrappingDetails'>;

const ScrappingDetails: React.FC<Props> = () => {
    const { navigation } = useCustomHooks();
    const [currentPage, setCurrentPage] = useState("ScrapDetail");
    const scrapData = useSelector((state: any) => state.scrapService.scrapData);
    const dispatch = useDispatch();

    const [loadingStatus, setLoadingStatus] = useState({
        noData: false,
        overLapLoader: false,
        mainLoader: false,
        noDataContent: "No data found",
    })

    type PageType = "ScrappingPerson" | "ScrapDetail" | "ScrappingAddress" | "ScrappingPicture"

    const handleNext = (pageName: PageType) => {
        setCurrentPage(pageName);
    };

    console.log("currentPage", currentPage)
    const handleBack = () => {
        switch (currentPage) {
            case "ScrappingPerson":
                setCurrentPage("ScrapDetail");
                break;
            case "ScrappingAddress":
                setCurrentPage("ScrappingPerson");
                break;
            case "ScrappingPicture":
                setCurrentPage("ScrappingAddress");
                break;
            default:
                if (!isEmpty(currentPage)) {
                    confirmAlert(
                        "If you go back, the data you entered will be cleared",
                        () => {
                            dispatch(setResetScrapData());
                            navigation.goBack();
                        },
                        () => { }
                    )
                }
                else {
                    dispatch(setResetScrapData());
                    navigation.goBack();
                }
        }
    };

    const renderContent = () => {
        switch (currentPage) {
            case "ScrapDetail":
                return <ScrappingDetail onNext={() => handleNext("ScrappingPerson")} />;
            case "ScrappingPerson":
                return <ScrappingPerson onNext={() => handleNext("ScrappingAddress")} />;
            case "ScrappingAddress":
                return <ScrappingAddress onNext={() => handleNext("ScrappingPicture")} />;
            case "ScrappingPicture":
                return <ScrappingPicture onNext={() => navigation.navigate("ScrapStatus", {
                    origin: 'ScrappingPicture',
                    content: 'Your post was upload successfully !',
                    button: {
                        title: 'Go to home',
                        onButtonPress: () => navigation.navigate('DrawerNavigator'),
                    },
                    status: 'success'
                })} />;
            default:
                return null;
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


    useEffect(() => {
        console.log("Updated scrapData:", scrapData);
    }, [scrapData]);



    return (
        <Mainview
            isheader={true}
            headertitle="Car Scrapping Service"
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

export default ScrappingDetails;