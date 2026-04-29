import React, { useCallback, useEffect, useState } from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";
import { Text } from "react-native-svg";
import { useGetCmsContentQuery } from "../../../../Common/redux/userHook";
import { constantData } from "../../../../Common/constant";

import RenderHTML from "react-native-render-html";
import { useFocusEffect } from "@react-navigation/native";
import { windowwidth } from "../../../../Utilities/dimensions";

const AboutCarigato: React.FC = () => {



    const { data, refetch } = useGetCmsContentQuery({slug: constantData.cmsSlug.about});


    const { navigation } = useCustomHooks()


    const [ contentData, setContentData ] = useState<any>({})
    

    useFocusEffect(
        useCallback(()=>{
            refetch();
        },[])
    )


    useEffect(()=>{
        console.log('dsjgfsdfsd',data?.data)
        setContentData(data?.data??"");
    },[data?.data]);
    
    
    return (
        <Mainview
            isheader={true}
            headertitle={contentData?.title??"About Carigato"}
            onleftfn={() => navigation.goBack()}
            isscollable={true}
        >
            <RenderHTML
                contentWidth={windowwidth}
                source={{ html: contentData?.description??"" }}
            />
        </Mainview>
    )
}

export default AboutCarigato;