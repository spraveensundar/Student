import React, { useCallback, useEffect, useState } from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { useGetCmsContentQuery } from "../../../../Common/redux/userHook";
import { constantData } from "../../../../Common/constant";
import { useFocusEffect } from "@react-navigation/native";
import { windowwidth } from "../../../../Utilities/dimensions";
import RenderHTML from "react-native-render-html";

const ServiceQuery: React.FC = () => {



    const { data, refetch } = useGetCmsContentQuery({slug: constantData.cmsSlug.serviceQuery});



    const { navigation } = useCustomHooks()
    

    const [ contentData, setContentData ] = useState<any>({})
    

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    )


    useEffect(() => {
        console.log('dsjgfsdfsd', data?.data)
        setContentData(data?.data ?? "");
    }, [data?.data]);
    
    return (
        <Mainview
            isheader={true}
            headertitle={contentData?.title??"Service Query"}
            onleftfn={() => navigation.goBack()}
            isscollable={true}
        >
            <RenderHTML
                contentWidth={windowwidth}
                source={{ html: contentData?.description ?? "" }}
            />

        </Mainview>
    )
}

export default ServiceQuery;