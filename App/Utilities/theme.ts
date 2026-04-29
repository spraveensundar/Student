// import { getItem } from '../Common/localstorage';

import { Colors } from "./uiasset";

export type ThemeType = {
    theme: string;
    background?: string;
    primarytext?: string;
    secondarytext?: string;
    primarytextHighlight?: string;
    lightGrey?: string;
    btnColor?: string;
    green1?: string;
    green2?: string;
    green3?: string;
    skyblue?: string;
    skyblue1?: string;
    purple?: string;
    purple1?: string;
    textinput?: string;
    darktext?: string;
    inversetext?: string;
    bottomheader?: string
    boderColor?: string
    boderlight?: string
    midblack?: string
    card?: string,
    texthilight?: string,
    activetab?: string,
    textNobel?: string
    tabactive?: string,
    activetabtext?: string,
    datebgColor?: string
    homegreen?: string,
    futuregreen?: string,
    futurered?: string,
    cardLeft?: string,
    cardLeft1?: string,
    helpInfo?: string,
    btnTag?: string,
    cardBg?: string,
    cardborder?: string,
    cardbg?: string,
    grayText?: string,
    lightBorder?: string
    placeholderColor?: string

};

export type ThemeKeyType = 'light' | 'dark';

export type ThemeCollection = {
    light: ThemeType;
    dark: ThemeType;
};

// const appProperties = getItem('appProperties');
const appProperties = null;

const theme: ThemeCollection = appProperties ? JSON.parse(appProperties)?.theme : {
    light: {
        theme: 'light',
        background: '#FFFFFF',
        primarytext: "#1B2431",
        secondarytext: "#323232",
        primarytextHighlight: "#000C51",
        btnColor: "#000C51",
        lightGrey: '#F3F3F3',
        green1: '#009431',
        green2: '#00A983',
        green3: '#D3FFF5',
        skyblue: '#0A7EA7',
        skyblue1: '#D3F3FF',
        purple: '#37019A',
        purple1: '#EBE0FF',
        textinput: "#383838",
        card: "#F3F3F3",
        darktext: "#111111",
        inversetext: "#020101ff",
        bottomheader: "#F3F3F3",
        boderColor: "#ddd",
        boderlight: "#2F2F2F",
        midblack: "#EBEBF599",
        texthilight: "#0D442A",
        textNobel: "#2F2F2F",
        tabactive: "#000C51",
        activetabtext: "#FFFFFF",
        datebgColor: "#D9D9D9",
        futuregreen: "#D5FFF9",
        futurered: "#FFD3E5",
        cardLeft: "#5D37C5",
        cardLeft1: "#E5672C",
        helpInfo: "#DC2020",
        btnTag: "#1F9165",
        cardBg: "#E6E6E6",
        cardborder: "#CFCFCF",
        cardbg: "#F3F3F3",
        grayText: "#475569",
        lightBorder: '#E3E3E3',
        placeholderColor: '#959FAE',
        errorContainer: "#DC2020",
    },
    dark: {
        theme: 'dark',
        background: '#131517',
        primarytext: "#FFFFFF",
        secondarytext: "#EBEBF599",
        textinput: "#ffffff",
        card: "#202225",
        darktext: "#ffffff",
        inversetext: "#FFFFFF",
        bottomheader: "#1B1D20",
        boderColor: "#1E2022",
        boderlight: "#2F2F2F",
        midblack: "#131517",
        futuretext: "#DDDDDF",
        textNobel: "#B5B5B5",
        tabactive: "#fff",
        activetabtext: "#2E2E2E",
        datebgColor: "#292B2F",
        // homegreen: Colors.tradegreen,
        futuregreen: "#122D29",
        futurered: "#3E1B29",
        cardbg: "#F3F3F3",
        grayText: "#475569",
        lightBorder: '#F1F5F9',
        placeholderColor: '#959FAE',




    },
};

export default theme;

