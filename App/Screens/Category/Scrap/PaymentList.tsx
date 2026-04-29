import { useEffect, useState } from "react";
import { View } from "react-native";

import Mainview from "../../../Components/mainview";
import { windowwidth } from "../../../Utilities/dimensions";
import { useLazyGetMyScrapFeePaymentListQuery } from "../../../Slices/scrap";

const PaymentList: React.FC = () => {
    const [feePaymentList, { isFetching }] = useLazyGetMyScrapFeePaymentListQuery();

    const [fees, setFees] = useState([]);

    const handelFee = async () => {
        const reponse = await feePaymentList(0).unwrap();
        setFees(reponse?.data)
    }

    useEffect(() => {
        handelFee()
    }, [])

    return (
        <Mainview
            headertitle='Commission Amount'
            ismainloading={isFetching}
        >
            <View style={{ flex: 1, marginBottom: windowwidth * 0.05 }} >

            </View>
        </Mainview>
    )
}

export default PaymentList;