import { BASE_URL, CRYPTO_SECRET_KEY, IMAGE_PROFILE, REFERURL_URL, SOCKET_URL, KYCREDIRECT_URL, SUPPORT_URL } from "@env";

export const BASEURL = BASE_URL;
export const PROFILEURL = IMAGE_PROFILE
export const REFERURL = REFERURL_URL
export const SECRETKEY = CRYPTO_SECRET_KEY;
export const SOCKETURL = SOCKET_URL
export const KYC_URL = KYCREDIRECT_URL
export const SUPPORTURL = SUPPORT_URL

console.log("Baseurl", BASE_URL, CRYPTO_SECRET_KEY, IMAGE_PROFILE, REFERURL_URL)

export const ENDPOINTS = {
    register: "/user/registration",
    registerVerify: "/user/account_verification",
    login: "/user/login",
    loginVerify: "/user/login_verification",
    forgotPassword: "/user/forgot_password",
    resend: "/user/resend_code",
    userDetails: "/user/get_user_details",
    updateSettings: "/user/update_user_settings",
    KYCVerify: "/user/internal-verification",
    changeMobileNum: "/user/change_mobilenumber",
    newNumberOTP: "/user/change_mobilenumber",
    mobileNumberNew: "/user/change_mobilenumber",
    changePassword: "/user/change_password",
    changeEmail: "/user/change_email",
    verifyMobile: "/user/mobile_verification_code",
    internalkyc: "user/internal-verification",
    twofa: "user/security/2fa-settings",
    logout: "user/logout",
    twofatype: "/user/update_2FA_type",
    transactionhistory: "user/get_transaction_history",
    getpassbook: "user/get_passbook_history",
    cashfree: "user/cashfree_create_request",
    cashfreestatus: "user/cashfree_verification_status",
    referaldetails: "user/get_user_refferal_details",
    referalhistory: "user/get_refferal_transaction_history",


    addbank: "wallet/add_bank_account",
    deletebank: "wallet/delete_bank_account",
    updatebank: "wallet/update_bank_account",
    internalfiat: "wallet/internal_fiat_deposit",
    walletTransfer: "wallet/wallet_transfer",
    withdrawcode: "wallet/get_withdraw_code",
    fiatwithdraw: "wallet/internal_fiat_withdraw",


    subAccount: "/subaccount/sub_account",
    subAccountMargin: "/subaccount/change_margin_mode",
    subAccountUpdate: "/subaccount/update_preferences",
    subAccountSwitch: "/subaccount/switch_account",


    affiliateRegister: "/affiliate/affiliate_register",
    affiliateDetails: "/affiliate/get_affliate_details",
    manageClicks: "/affiliate/manage_clicks/HILKIA",
    affiliateSummary: "/affiliate/affiliate_summary_details",
    affiliateCommission: "/affiliate/affiliate_commission_details",
    claimReward: "/affiliate/claim_reward_commission",


    getcurrency: "currency/get_currency_details",
    priceconversion: "currency/price_conversion_list",

    recoverUser: "/user/recovery_user",

    pairDetails: "future/get_pair_details",
    availableMargin: "future/availableMargin",
    positionOrders: "future/positionOrders",
    addFavouritePair: "future/addFavouritePair",
    orderBook: "future/orderBook",
    recentTrade: "future/recentTrade",
    filledHistory: "future/filledHistory",
    orderHistory: "future/orderHistory",
    updateBracket: "future/updateBracketOrders",
    orderPlaceing: "future/order_placing",
    leverage: "future/changeLeverage",
    futureClose: "future/closePosition",
    futureClosedOrders: "future/closedOrders",
    futureOpenOrders: "future/openOrder",
    removeBracket: "future/remove_bracket_orders",
    cancelOrder: "future/cancelOrder",
    editOpenOrder: "future/addEditOpenOrdersBracketOrder",
    stopOrders: "future/stopOrders"
}