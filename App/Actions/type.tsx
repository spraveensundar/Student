export interface validationRules {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    email?: boolean;
    url?: boolean;
    time?: boolean;
    date?: boolean;
    number?: boolean;
    equalTo?: any;
}

export interface validationMessages {
    required?: string;
    minLength?: string;
    maxLength?: string;
    email?: string;
    url?: string;
    time?: string;
    date?: string;
    number?: string;
    equalTo?: string;
}

export interface fieldProps {
    value?: any;
    rules?: validationRules;
    messages?: validationMessages;
    isValid?: boolean;
    errorMessage?: string;
}

export interface athuDataProps {
    profile?: fieldProps;
    userType?: fieldProps;
    firstName?: fieldProps;
    lastName?: fieldProps;
    email?: fieldProps;
    age?: fieldProps;
    gender?: fieldProps;
    phoneNumber?: fieldProps;
    address?: fieldProps;
    city?: fieldProps;
    province?: fieldProps;
    country?: fieldProps;
    postalCode?: fieldProps;
    password?: fieldProps;
    confirmPassword?: fieldProps;
    dob?: fieldProps
    referral?: fieldProps,
    otp?: fieldProps
    requestedEmail?: fieldProps
    newPassword?: fieldProps,
    oldPassword?: fieldProps,
    mobileNumber?: fieldProps
    countryCode?: fieldProps
    name?: fieldProps,
    amount?: fieldProps,
    placeOfResidence?: fieldProps,
    fullName?: fieldProps,
    contactInformation?: fieldProps
    referralCode?: fieldProps,
    channelDetails?: fieldProps,
    promotionIdeas?: fieldProps,
    followersCount?: fieldProps,
    tradingExperience?: fieldProps,
    youtube?: fieldProps,
    telegram?: fieldProps,
    discord?: fieldProps,
    instagram?: fieldProps,
    twitch?: fieldProps,
    facebook?: fieldProps,
    x?: fieldProps,
    pairId?: any,
    positionSide?: any,
    entryPrice?: any,
    positionFilled?: any,
    exitPandL?: any,
    stopPandL?: any,
    takeProfit?: any,
    stopLoss?: any;
    orderId?: any,
    isTake?: any
    isStop?: any
}


export const orderTypeEnum: any = {
    'bracket_tp_market': "Bracket - TP",
    'bracket_sl_market': "Bracket - SL",
    'bracket_tp_limit': "Bracket - TP",
    'bracket_sl_limit': "Bracket - SL",
    "stop_limit": "Stop Limit",
    "stop_market": "Stop Market",
    "take_profit_limit": "Take Profit Limit",
    "take_profit": "Take Profit Market",
    "limit": 'Limit',
    "market": 'Market',
}


export interface OrderList {
    pairname: string;
    filledQuantity: any;
    baseCurrency: any;
    notional: any;
    orderQty: any;
    orderType: any;
    price: any;
    isMaker: any;
    orderId: any;
    filledId: any;
    fee: any;
    created_at: any;
    side: any;
    pairId: any;
    quantity: any
    orderDate: any;
    _id: any;
    buyorsell: any;
    status: any;
    stopPrice: any;
    exePrice: any;
    pairName: any;
    reduce_only: any;
    positionSide: any;
    positionFilled: any;
    pairData: any;
    entryPrice: any;
    quoteDecimal: any;
    close_price: any;
    liquidityPrice: any;
    initialMargin: any;
    pnl: any;
    takeprofit: any;
    stoploss: any;
    bracketOrders: any;





}

export const sideEnum: any = {
    "buy": "Buy",
    "sell": "Sell",
}






export interface futureState {
    pairId?: any,
    price?: any,
    quantity?: any,
    buyorsell?: string,
    reduce_only?: boolean,
    makeronly?: boolean,
    isTrailingOrder?: boolean,
    trailPrice?: any,
    trailTypePrice?: any,
    trailType?: string,
    orderType?: any,
    isTake?: boolean,
    isStop?: boolean,
    typeTIF?: any,
    orderCost?: any,
    orderValue?: any,
    margin?: any,
    fees?: any,
    stopPrice?: any,
    leverage?: any,
    takeProfit?: any,
    stopLoss?: any,
    positionSide?: any,
}
