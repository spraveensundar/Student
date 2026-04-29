// import { getItem } from './localstorage';

import { Colors } from "./uiasset";

export type ThemeType = {
  theme: string;
  background?: string;
  primarytext?: string;
  secondarytext?: string;
  textinput?: string;
  darktext?: string
  inversetext?: string;
  bottomheader?: string
  boderColor?: string
  boderlight?: string
  midblack?: string
  card?: string,  
  futuretext?: string,
  activetab?:string,
  textNobel?:string
  tabactive?: string,
  activetabtext?:string,
  datebgColor?:string
  homegreen?: string,
  futuregreen?: string,
  futurered?: string,


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
    primarytext: "#202020",
    secondarytext: "#050505",
    textinput: "#383838",
    card: "#F5F5F5",
    darktext: "#111111",
    inversetext: "#1C1C1C",
    bottomheader: "#F3F3F3",
    boderColor: "#ddd",
    boderlight: "#2F2F2F",
    midblack: "#EBEBF599",
    futuretext: "#202020",
    textNobel:"#2F2F2F",
    tabactive: "#000",
    activetabtext:"#DDDDDF",
    datebgColor:"#D9D9D9",
    homegreen: Colors.btnBgGreen,
    futuregreen: "#D5FFF9",
    futurered: "#FFD3E5"
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
    textNobel:"#B5B5B5",
    tabactive: "#fff",
    activetabtext: "#2E2E2E",
    datebgColor:"#292B2F",
    homegreen: Colors.tradegreen,
    futuregreen: "#122D29",
    futurered: "#3E1B29"





  },
};

export default theme;

