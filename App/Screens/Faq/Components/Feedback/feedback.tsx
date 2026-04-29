import React from "react";
import Mainview from "../../../../Components/mainview";
import useCustomHooks from "../../../../Actions/Hooks/customhook";

const Feedback: React.FC = () => {
    const { navigation } = useCustomHooks()
    return (
        <Mainview
            isheader={true}
            headertitle="Feedback"
            onleftfn={() => navigation.goBack()}
        ></Mainview>
    )
}

export default Feedback;