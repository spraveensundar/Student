import React from "react";
import {
    Image,
    ImageStyle,
    ImageSourcePropType,
    StyleProp,
    ImageProps,
} from "react-native";
import { borderradius, windowwidth } from "./dimensions";


//svg imports
import BalanceBgImg from "../Assets/images/balance_bg.png";
import eyeIcon from "../Assets/svgicons/eyeicon.svg";
import ethIcon from "../Assets/svgicons/ethIcon.svg";
import Bottomclose from "../Assets/svgicons/back.svg";
import Future from "../Assets/svgicons/future.svg";
import Futureactive from "../Assets/svgicons/futureactive.svg";
import Home from "../Assets/svgicons/home.svg";
import Homeactive from "../Assets/svgicons/homeactive.svg";
import Portfolio from "../Assets/svgicons/portfolio.svg";
import Portfolioactive from "../Assets/svgicons/portfolioactive.svg";
import Option from "../Assets/svgicons/option.svg";
import Optionactive from "../Assets/svgicons/optionactive.svg";
import Orders from "../Assets/svgicons/orders.svg";
import Ordersactive from "../Assets/svgicons/ordersactive.svg";
import profile from "../Assets/images/user.png";
import exit from "../Assets/images/log-out.png";
import darkMode from "../Assets/images/dark-mode.png";
import preference from "../Assets/images/preference.png";
import trading from "../Assets/images/dispute.png";
import refer from "../Assets/images/refer.png";
import bank from "../Assets/images/banking.png";
import analytics from "../Assets/images/analytics.png";
import sub from "../Assets/images/google.png";
import security from "../Assets/images/shield.png";
import moneytransfer from "../Assets/images/money-transfer.png";
import pen from "../Assets/svgicons/pen.svg";
import penDark from "../Assets/svgicons/penDark.svg";
import Referearn from "../Assets/svgicons/refer_earn.svg";
import badge from "../Assets/images/badge.png";
import customerservice from "../Assets/images/customer-service.png"
import demo from "../Assets/images/demo.png";
import gear from "../Assets/images/gear.png";
import megaphone from "../Assets/images/megaphone.png";
import youtube from "../Assets/images/youtube.png";
import book from "../Assets/images/book.png"
import onrampPay from "../Assets/images/onrampPay.png";
import upiPay from "../Assets/images/upiPay.png";
import Copyicon from "../Assets/svgicons/copyicon.svg";
import Phonepay from "../Assets/images/phonepay.png";
import Menuprofile from "../Assets/svgicons/profile.svg";
import Addmoney from "../Assets/svgicons/addmoney.svg";
import Optionhome from "../Assets/svgicons/optionhome.svg";
import Futurehome from "../Assets/svgicons/futurehome.svg";
import Markethome from "../Assets/svgicons/market.svg";
import Copyhome from "../Assets/svgicons/copy.svg";
import Menuprofilelight from "../Assets/svgicons/profile light.svg";
import Addmoneylight from "../Assets/svgicons/addmoneylight.svg";
import Homelight from "../Assets/svgicons/homelight.svg";
import HomelightActive from "../Assets/svgicons/homelightactive.svg";
import Futurelight from "../Assets/svgicons/futurelight.svg";
import FuturelightActive from "../Assets/svgicons/futurelightactive.svg";
import Portfoliolight from "../Assets/svgicons/portfoliolight.svg";
import PortfoliolightActive from "../Assets/svgicons/portfoliolightactive.svg";
import Optionlight from "../Assets/svgicons/optionlight.svg";
import OptionlightActive from "../Assets/svgicons/optionlightactive.svg";
import Orderslight from "../Assets/svgicons/orderslight.svg";
import OrderslightActive from "../Assets/svgicons/orderslightactive.svg";
import Analyzes from "../Assets/svgicons/Analyze.svg";
import Dollarsymbol from "../Assets/svgicons/dollarsymbol.svg";
import Analyze from "../Assets/svgicons/Analyze.svg";
import Btcicon from "../Assets/images/bitcoin.png";
import Dollerbag from "../Assets/svgicons/dollerbag.svg";
import Graph from "../Assets/svgicons/graph.svg";
import TrashLight from "../Assets/svgicons/trashLight.svg";
import TrashDark from "../Assets/svgicons/trashDark.svg";
import Bottomclosedark from "../Assets/svgicons/backDark.svg";
import Chart from "../Assets/images/chart.png";
import Star from "../Assets/svgicons/star.svg";
import Orderbook from "../Assets/svgicons/orderbook.svg";
import Crown from "../Assets/svgicons/crown.svg";
import Members from "../Assets/svgicons/members.svg";
import Heart from "../Assets/svgicons/heart.svg";
import darkUser from "../Assets/svgicons/darkUser.svg";
import Ethereum from "../Assets/images/ethereum.png";

export const icons = {
    BalanceBg_Img: BalanceBgImg,
    EyeIcon: eyeIcon,
    EthIcon: ethIcon,
    Bottomclose: Bottomclose,
    Future: Future,
    Futureactive: Futureactive,
    Home: Home,
    Homeactive: Homeactive,
    Portfolio: Portfolio,
    Portfolioactive: Portfolioactive,
    Option: Option,
    Optionactive: Optionactive,
    Orders: Orders,
    Ordersactive: Ordersactive,
    Profile: profile,
    Exit: exit,
    DarkMode: darkMode,
    Preference: preference,
    Trading: trading,
    Refer: refer,
    Bank: bank,
    Analytics: analytics,
    SubAccount: sub,
    Security: security,
    Moneytransfer: moneytransfer,
    Pen: pen,
    PenDark: penDark,
    ReferEarn: Referearn,
    Badge: badge,
    CustomerService: customerservice,
    Demo: demo,
    Gear: gear,
    Megaphone: megaphone,
    Youtube: youtube,
    Book: book,
    OnrampPay: onrampPay,
    UpiPay: upiPay,
    Menuprofile: Menuprofile,
    Copyicon: Copyicon,
    Phonepay: Phonepay,
    Addmoney: Addmoney,
    Optionhome: Optionhome,
    Futurehome: Futurehome,
    Markethome: Markethome,
    Copyhome: Copyhome,
    Menuprofilelight: Menuprofilelight,
    Addmoneylight: Addmoneylight,
    Homelight: Homelight,
    HomelightActive: HomelightActive,
    Futurelight: Futurelight,
    FuturelightActive: FuturelightActive,
    Portfoliolight: Portfoliolight,
    PortfoliolightActive: PortfoliolightActive,
    Optionlight: Optionlight,
    OptionlightActive: OptionlightActive,
    Orderslight: Orderslight,
    OrderslightActive: OrderslightActive,
    Analyzes: Analyzes,
    TrashLight: TrashLight,
    TrashDark: TrashDark,
    Bottomclosedark: Bottomclosedark,
    Dollarsymbol: Dollarsymbol,
    Analyze: Analyze,
    Dollerbag: Dollerbag,
    Graph: Graph,
    Star: Star,
    Orderbook: Orderbook,
    Crown: Crown,
    Members: Members,
    Heart: Heart,
    DarkUser: darkUser,
    EmptyUser: EmptyUser,
    NOdataLight: NOdataLight,
    NOdataDark: NOdataDark
};


//pngs
import Card from "../Assets/images/card.png";
import Bannner1 from "../Assets/images/banner1.png";
import Normaltrade from "../Assets/images/normaltrade.png";
import Sei from "../Assets/images/sei.png";
import Fun from "../Assets/images/fun.png";
import Banner2 from "../Assets/images/banner2.png";
import Chartlight from "../Assets/images/lightchart.png";
import Man from '../Assets/images/man.png'
import google from '../Assets/images/gl.png'
import affiliate from "../Assets/images/affiliate.png";
import discord from "../Assets/images/discord.png";
import Facebook from "../Assets/images/Facebook.png";
import telegram from "../Assets/images/telegram.png";
import twich from "../Assets/images/twich.png";
import twitter from "../Assets/images/twitter.png";
import youtubes from "../Assets/images/youtubes.png";
import Inta from "../Assets/images/instagram.png";
import EmptyUser from "../Assets/svgicons/emptyUser.svg";
import NOdataLight from "../Assets/svgicons/noDataWhite.svg";
import NOdataDark from "../Assets/svgicons/noDataDark.svg";

import { SvgProps } from "react-native-svg";


//export pngs
export const image = {
    card: Card,
    Bannner1: Bannner1,
    Normaltrade: Normaltrade,
    Sei: Sei,
    Fun: Fun,
    Banner2: Banner2,
    Btcicon: Btcicon,
    Chart: Chart,
    Chartlight: Chartlight,
    Man: Man,
    google: google,
    Affiliate: affiliate,
    Discord: discord,
    Facebook: Facebook,
    Telegram: telegram,
    Twich: twich,
    Twitter: twitter,
    Youtubes: youtubes,
    Inta: Inta,
    ETHICon: Ethereum
}

type name =
    | "Addmoney"
    | "Addmoneylight"
    | "BalanceBg_Img"
    | "Bank"
    | "Bottomclose"
    | "Copyhome"
    | "Copyicon"
    | "EthIcon"
    | "EyeIcon"
    | "Future"
    | "Futureactive"
    | "Futurehome"
    | "Futurelight"
    | "FuturelightActive"
    | "Home"
    | "Homeactive"
    | "Homelight"
    | "HomelightActive"
    | "Markethome"
    | "Menuprofile"
    | "Menuprofilelight"
    | "OnrampPay"
    | "Option"
    | "Optionactive"
    | "Optionhome"
    | "Optionlight"
    | "OptionlightActive"
    | "Orders"
    | "Ordersactive"
    | "Orderslight"
    | "OrderslightActive"
    | "Pen"
    | "PenDark"
    | "Phonepay"
    | "Portfolio"
    | "Portfolioactive"
    | "Portfoliolight"
    | "PortfoliolightActive"
    | "ReferEarn"
    | "UpiPay"
    | "Dollarsymbol"
    | "Dollerbag"
    | "Graph"
    | "Analyze"
    | "TrashLight"
    | "TrashDark"
    | "Bottomclosedark"
    | "Dollarsymbol"
    | "Star"
    | "Orderbook"
    | "Crown"
    | "Members"
    | "Heart"
    | "DarkUser"
    | "EmptyUser"
    | "NOdataLight"
    | "NOdataDark"

interface ImageProp {
    width?: any;
    height?: any;
    borderRadius?: any;
    resizeMode?: "center" | "contain" | "cover" | "none" | "repeat" | "stretch";
    style?: StyleProp<ImageStyle>;
    source?: ImageSourcePropType;
    props?: ImageProps,
    type: "svg" | "image",
    name?: name,
    fill?: string,
    svgprops?: SvgProps
}

export default function Images({
    width = windowwidth * 0.1,
    height = windowwidth * 0.1,
    borderRadius = borderradius * 1,
    resizeMode = "contain",
    style,
    source,
    type = "image",
    name,
    props,
    fill,
    svgprops
}: ImageProp) {
    if (type == "image" && source) {
        return (
            <Image
                source={source}
                resizeMode={resizeMode}
                style={[{ width: width, height: height, borderRadius: borderRadius, tintColor: fill }, style]}
                {...props}
            />
        );
    }
    if (type == "svg" && name) {
        const Component = icons?.[name];
        return <Component width={width} height={height} style={style} {...svgprops} />;
    }
}

export const Lotties = {
    scanqr: require("../Assets/lotties/scan.json"),
}
