import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { windowheight } from "../../Utilities/dimensions";
import PagerView from "react-native-pager-view";
import Videos, { video } from "../../Utilities/videos";
import { returnArrayOnly, returnOriginalFile } from "../../Common/commonFunction";


type ClnBannerProps = {
    bannerFile?: any;
}

const ClnBanner: React.FC<ClnBannerProps> = ({ bannerFile }) => {


    // const videoBanners = [
    //     video.ClnService1,
    //     video.ClnService2,
    // ];
    const pagerRef = useRef<any>(null)
    const [currentpage, setCurrentpage] = useState(0)
    const banners = ["1", "2"]


    const videoBanners: any = returnArrayOnly(bannerFile)
    
    
    useEffect(() => {
        const time = setInterval(() => {
            setCurrentpage(prev => {
                let next = prev + 1
                if (next >= banners?.length) next = 0
                pagerRef?.current?.setPage(next)
                return next
            })
        }, 3000)
        return () => clearInterval(time)
    }, [])
    
    
    return (
        <View style={{ width: "100%", height: windowheight * 0.2, padding: 0, margin: 0 }} >
            <PagerView
                style={{ flex: 1 }}
                ref={pagerRef}
                initialPage={0}
                onPageSelected={(e) => setCurrentpage(e.nativeEvent.position)}
            >
                {videoBanners.map((videoSource: any, index: any) => (
                    <View key={index} style={{ width: "100%", height: "100%" }}>
                        <Videos type="video" source={{uri:returnOriginalFile(videoSource)}} />
                    </View>
                ))}
            </PagerView>
        </View>
    )
}

export default ClnBanner;