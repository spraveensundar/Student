import { useState } from "react"
import Flexcomponent from "../../../Components/flexcomponent"
import Listcomponent from "../../../Components/listcomponent"
import Text from "../../../Components/text"
import Toptabs from "../../../Components/toptabs"
import { windowwidth } from "../../../Utilities/dimensions"
import { icons } from "../../../Utilities/images"
import Gradientlist from "../../Others/Common/gradientlist"

interface earingsprops {
    data?: any
}

const Earningsheader: React.FC<earingsprops> = ({
    data
}) => {

    function secondsToHMS(totalSeconds: any) {
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        // const seconds = totalSeconds % 60

        return hours + ":" + minutes
    }
    return (
        <>

            <Text size="medium" >Earning Dashboard</Text>

            <Flexcomponent justifyContent="space-between" top={"5%"} >
                <Gradientlist
                    source={icons.Earnings}
                    title="My Earning"
                    value={"₹" + data?.myEarnings}
                    colors={["#380600", "#993328"]}
                />

                <Gradientlist
                    source={icons.Hours}
                    title="Duration"
                    value={secondsToHMS(data?.durations ?? 0) + " hrs"}
                    colors={["#1C5E56", "#006D60"]}
                />


            </Flexcomponent>

            {/* <Listcomponent
                src={icons.Serviceearnings}
                title="Completed Services"
                righticon={
                    <>
                        <Text size="medium" >8/10</Text>
                    </>
                }
            /> */}
            <Text top={"5%"} size="medium" >Earning History</Text>

        </>
    )

}

export default Earningsheader