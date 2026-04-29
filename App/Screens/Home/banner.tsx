import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { windowheight, windowwidth } from "../../Utilities/dimensions";
import PagerView from 'react-native-pager-view';
import Images, { icons } from "../../Utilities/images";



const Banner: React.FC = () => {
    const pagerRef = useRef<any>(null)
    const [currentpage, setCurrentpage] = useState(0)
    const banners = ["1", "2", "3"]
    useEffect(() => {
        const time = setInterval(() => {
            setCurrentpage(prev => {
                let next = prev + 1
                if (next >= banners?.length)  next = 0
                pagerRef?.current?.setPage(next)
                return next
            })
        }, 3000)
        return () => clearInterval(time)
    }, [])
    return (
        <View style={{ width: "100%", height: windowheight * 0.15, marginTop: "5%" }} >
            <PagerView
                style={{ flex: 1 }}
                ref={pagerRef}
                initialPage={0}
                onPageSelected={(e) => setCurrentpage(e?.nativeEvent?.position)}
            >
                {banners?.map((e) => (
                    <Images
                        type="image"
                        source={icons.banner}
                        width={"100%"}
                        height={windowheight * 0.15}
                        resizeMode="stretch"
                    />
                ))}
            </PagerView>
        </View>
    )

}

export default Banner;