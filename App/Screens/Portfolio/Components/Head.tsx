import React from "react";

import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import VectorIcons from "../../../Utilities/vectoricons";
import { windowwidth } from "../../../Utilities/dimensions";
import Flexcomponent from "../../../Components/flexcomponent";
import { getTokenImage } from "../../../Utilities/helerfunction";

interface Headprops {
    pairname?: string
}

const Head: React.FC<Headprops> = ({
    pairname
}) => {
    return (
        <Flexcomponent alignItems="center" justifyContent="space-between" paddingHorizontal={10}>
            <Flexcomponent width={"auto"}>
                <Flexcomponent width={"auto"}>
                    <Images
                        type="image"
                        source={getTokenImage(pairname)}
                        width={windowwidth * 0.075}
                        height={windowwidth * 0.075}
                    />
                </Flexcomponent>
                <Text family="medium" size="semimedium" style={{ marginLeft: 10 }}>{pairname}</Text>
            </Flexcomponent>
            <VectorIcons
                family="Fontisto"
                name={"share-a"}
                size={windowwidth * 0.04}
                style={{ marginLeft: 10 }}
            />
        </Flexcomponent>
    )
}

export default Head;