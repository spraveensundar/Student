import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { isEmpty } from "lodash";
import { walletSelector } from "../../Slices/wallet";
import { toCutOff } from "../../Utilities/helerfunction";

const usePriceConversion = (base = 'USDT', quote = 'INR') => {
    const { pricedetails } = useSelector(walletSelector)
    console.log("usePriceConversion", base, quote)
    const [conversionRate, setConversionRate] = useState<any>({});
    useEffect(() => {
        try {
            if (!isEmpty(pricedetails)) {
                let conversionRate = pricedetails.find((val: any) => (val.pair == `${base}${quote}`))
                if (!isEmpty(conversionRate)) {
                    setConversionRate(conversionRate)
                } else {
                    conversionRate = pricedetails.find((val: any) => (val.pair == `${quote}${base}`))
                    conversionRate.price = 1 / conversionRate.price
                    setConversionRate(conversionRate)
                }
            }

        } catch (error) {
            console.error("Error writing to localStorage:", error);
        }
    }, [pricedetails, base, quote])


    const convertValue = (value: any) => {
        try {
            let amount = parseFloat(value)
            if (!isEmpty(conversionRate)) {
                amount = parseFloat(value) * conversionRate.price
            }
            return amount
        } catch (err) {
            console.log('convertValue__err', err)
            return value
        }
    }


    //    const convertSecValue = (value:any, pip = 2) => {
    //     try {
    //         let amount = parseFloat(value)
    //         amount = isNaN(amount) || !isFinite(amount) ? 0 : amount

    //         if (amount !== 0 && !isEmpty(conversionRate) && (secondaryCurrency !== "USD")) {
    //             amount = (parseFloat(value) * conversionRate.price)
    //         }

    //         // amount = amount.toFixed(pip)
    //         amount = formatValue(amount, pip)
    //         return (secondaryCurrency === 'INR' ? <span className="inrTag">₹ {amount} </span> : <span>$ {amount}</span>)

    //     } catch (err) {
    //         console.log('convertSecValue_err', err)
    //         return (secondaryCurrency === 'INR' ? <span className="inrTag">₹ {value} </span> : <span>$ {value}</span>)
    //     }
    // }


    const ChangeConversionRate = (base = 'USD', quote = 'INR') => {
        try {
            if (!isEmpty(pricedetails)) {
                let conversionRate = pricedetails.find((val: any) => (val.pair == `${base}${quote}`))
                if (!isEmpty(conversionRate)) {
                    setConversionRate(conversionRate)
                } else {
                    conversionRate = pricedetails.find((val: any) => (val.pair == `${quote}${base}`))
                    conversionRate.price = 1 / conversionRate.price
                    setConversionRate(conversionRate)
                }
            }
        } catch (err) {
            console.log('convertValue__err', err)
        }
    }

    return { convertValue, conversionRate, ChangeConversionRate }
}


export default usePriceConversion;




export const getPorfitCalculation = (entryPrice: any, closePrice: any, quantity: any, positionSide: any) => {
    try {
        let profit = 0
        let percentage = 0
        if (positionSide == 'short') {
            profit = (parseFloat(entryPrice) - parseFloat(closePrice)) * quantity
            percentage = (parseFloat(entryPrice) - parseFloat(closePrice)) / entryPrice
        } else {
            profit = (parseFloat(closePrice) - parseFloat(entryPrice)) * quantity
            percentage = (parseFloat(closePrice) - parseFloat(entryPrice)) / entryPrice
        }
        return { profit: profit, percentage: percentage }
    } catch (err) {
        console.log("getPorfitCalculation_err", err)
        return { profit: 0, percentage: 0 }
    }
}

export const quantityToLot = (value: any, lotSize: any, decimal = 0) => {
    try {
        let lot: any = parseFloat(value) / parseFloat(lotSize)
        lot = isNaN(lot) || !isFinite(lot) ? 0 : parseFloat(lot).toFixed(0)
        return lot
    } catch (err) {
        console.log(err, "quantityToLot___err")
        return value
    }
}

export const LotToquantity = (value: any, lotSize: any, decimal: any) => {
    try {
        let quantity: any = parseFloat(value) * parseFloat(lotSize)
        quantity = isNaN(quantity) || !isFinite(quantity) ? 0 : parseFloat(quantity).toFixed(decimal)
        return quantity
    } catch (err) {
        console.log(err, "quantityToLot___err")
        return value
    }
}


export const QuantityToVolume = (value: any, price: any, decimal: any) => {
    try {
        let quantity: any = parseFloat(value) * parseFloat(price)
        quantity = isNaN(quantity) || !isFinite(quantity) ? 0 : toCutOff(quantity, decimal)
        return quantity
    } catch (err) {
        console.log(err, "quantityToLot___err")
        return value
    }
}

export const VolumeToquantity = (value: any, price: any, decimal: any) => {
    try {
        let quantity = parseFloat(value) / parseFloat(price)
        quantity = isNaN(quantity) || !isFinite(quantity) ? 0 : toCutOff(quantity, decimal)
        return quantity
    } catch (err) {
        console.log(err, "quantityToLot___err")
        return value
    }
}


export const calcLiquidationPrice = (side: any, price: any, leverage: any, margin: any) => {
    try {
        price = parseFloat(price) || 0;
        leverage = parseFloat(leverage) || 1;
        margin = parseFloat(margin) || 0;
        let liqPrice: any = 0;

        if (side === "long") {
            liqPrice = (price * leverage) / (leverage + 1 - (margin / 100) * leverage);
            if (liqPrice > price) {
                liqPrice = price - (price * (margin / 100)) / leverage;
            }
        } else if (side === "short") {
            liqPrice = (price * leverage) / (leverage - 1 + (margin / 100) * leverage);
            if (liqPrice < price) {
                liqPrice = price + (price * (margin / 100)) / leverage;
            }
        }
        return liqPrice.toFixed(2);
    } catch {
        return 0;
    }
};