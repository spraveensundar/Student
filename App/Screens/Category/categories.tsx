import { useState } from "react";
import Mainview from "../../Components/mainview";
import Text from "../../Components/text";
import Services from "./otherservice";


const Categories: React.FC = () => {
    const [overlapload, setOverlapload] = useState(false)

    return (
        <Mainview
            isboxshadow={false}
            isoverlaploader={overlapload}
        >
            <Text family="GBold" size="large" >Vendor Category</Text>
            <Text family="GRegular" size="medium" top={"2.5%"} >Select Vendor Category</Text>
            <Services onload={setOverlapload} />
        </Mainview>
    )

}

export default Categories;