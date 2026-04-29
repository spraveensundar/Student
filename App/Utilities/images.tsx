import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  ImageProps,
  ImageRequireSource,
} from 'react-native';

import IndiaImg from '../Assets/images/india.png';
import Location from '../Assets/images/location.gif';
import Map from '../Assets/images/map.png';
import Log from '../Assets/images/log.gif';
import Premium from '../Assets/images/premium1.gif';
import Home from '../Assets/svgicons/home.svg';
import Orders from '../Assets/svgicons/orders.svg';
import Ordersactive from '../Assets/svgicons/orders_active.svg';

import Homeactive from '../Assets/svgicons/homeactive.svg';
import Profile from '../Assets/svgicons/profile.svg';
import Profileactive from '../Assets/svgicons/profileactive.svg';
import Support from '../Assets/svgicons/support.svg';
import Supportactive from '../Assets/svgicons/supportactive.svg';

import { borderradius, windowwidth } from './dimensions';
import { SvgProps } from 'react-native-svg';
import Popular from '../Assets/images/popular.png';
import Trending from '../Assets/images/trending.png';
import Scrap from '../Assets/images/scrap.png';
import OnDemand from '../Assets/images/on-demand.png';
import RTO from '../Assets/images/rto.png';
import Car from '../Assets/images/car.gif';
import Bike from '../Assets/images/bike.gif';
import Audi from '../Assets/images/audi.png';
import BMW from '../Assets/images/bmw.png';
import Honda from '../Assets/images/honda.png';
import Hyundai from '../Assets/images/hyundai.png';
import MG from '../Assets/images/mg.png';
import Nissan from '../Assets/images/nissan.png';
import Skoda from '../Assets/images/skoda.png';
import Suzuki from '../Assets/images/suzuki.png';
import Toyota from '../Assets/images/toyota.png';
import Volvo from '../Assets/images/volvo.png';
import Wolves from '../Assets/images/wolves.png';
import Mini from '../Assets/images/mini.png';
import Baleno from '../Assets/images/baleno.png';
import Swift from '../Assets/images/swift.png';
import Dzire from '../Assets/images/dzire.png';
import Alto from '../Assets/images/alto.png';
import SCross from '../Assets/images/scross.png';
import Ertiga from '../Assets/images/ertiga.png';
import XL6 from '../Assets/images/xl6.png';
import Jimmy from '../Assets/images/jimmy.png';
import Invicto from '../Assets/images/invicto.png';
import Omni from '../Assets/images/omni.png';
import Gypsy from '../Assets/images/gypsy.png';
import SX4 from '../Assets/images/sx4.png';
import SPremium from '../Assets/images/premium.png';
import PrmCard from '../Assets/images/prmCard.png';
import StandardPlan from '../Assets/images/standrdPlan.png';
import ElitePlan from '../Assets/images/elitePlan.png';
import Stdplan from '../Assets/images/stdplan.png';
import PremiumPlan from '../Assets/images/premiumPlan.png';
import Ratings from '../Assets/images/ratings.png';
import CarSpa from '../Assets/images/carSpa.png';
import PrmPlan from '../Assets/images/prmPlan.png';
import Elite from '../Assets/images/elite.png';
import Offers from '../Assets/images/offers.png';
import Account from '../Assets/images/accountLogo.png';
import Man from '../Assets/images/man.png';
import Whatsapp from '../Assets/images/whatsapp.png';
import Message from '../Assets/images/message.png';

import Ondemand from '../Assets/images/on-demand.png';

import Book from '../Assets/svgicons/book.svg';
import Certificate from '../Assets/svgicons/certificate.svg';
import Stamp from '../Assets/svgicons/stamp.svg';
import Search from '../Assets/svgicons/search.svg';
import Booking from '../Assets/svgicons/booking.svg';

import Toll from '../Assets/images/toll.png';
import Challan from '../Assets/images/challan.png';
import Guarantee from '../Assets/images/guarantee.png';
import Affordable from '../Assets/images/affordable.png';
import Geninune from '../Assets/images/geninune.png';
import Doorstep from '../Assets/images/doorstep.png';
import Loop from '../Assets/images/loop.png';
import Banner from '../Assets/images/banner.png';
import ReService1 from '../Assets/images/reservice1.png';
import ReService2 from '../Assets/images/reservice2.png';
import Refferal from '../Assets/images/referral.png';
import User from '../Assets/images/User.png';
import Customer from '../Assets/images/customer.png';
import Faq from '../Assets/images/faq.png';
import Mail from '../Assets/images/mail.png';
import About from '../Assets/images/about.png';
import Settings from '../Assets/images/settings.png';
import Service from '../Assets/images/service.png';
import Feedback from '../Assets/images/feedback.png';
import Warenty from '../Assets/images/warenty.png';

import Diamond from '../Assets/images/diamond.png';
import Myprofile from '../Assets/images/myprofile.png';
import Reffer from '../Assets/images/reffer.png';
import Profileloc from '../Assets/images/profileloc.png';
import Profileservice from '../Assets/images/profileservice.png';
import Profilecar from '../Assets/images/profilecar.png';
import Profilenoti from '../Assets/images/profilenoti.png';
import Profilephone from '../Assets/images/profilephone.png';

import Picture from '../Assets/svgicons/picture.svg';
import Post from '../Assets/svgicons/post.svg';
import Filter from '../Assets/svgicons/filter.svg';

import AirFreshener from '../Assets/images/airFreshener.png';
import CarSeatCleaning from '../Assets/images/carSeatCleaning.png';
import RoofCleaning from '../Assets/images/roofCleaning.png';
import TissueBox from '../Assets/images/tissueBox.png';

import AfterWash1 from '../Assets/images/afterWash1.png';
import AfterWash2 from '../Assets/images/afterWash2.png';
import BeforeWash1 from '../Assets/images/beforeWash1.png';
import BeforeWash2 from '../Assets/images/dirtycar.png';
import carSpaOT from '../Assets/images/carSpaOT.png';

import FastImage, {
  FastImageProps,
  ImageStyle,
  Priority,
} from '@d11/react-native-fast-image';

import Driver from '../Assets/images/driver.png';
import Oneway from '../Assets/images/oneway.png';
import Refresh from '../Assets/images/refresh.png';
import Car1 from '../Assets/images/car1.png';
import Car2 from '../Assets/images/car2.png';
import Car3 from '../Assets/images/car3.png';
import Share from '../Assets/images/share.png';
import carservice from '../Assets/images/carservice.png';
import logo from '../Assets/images/logo.png';

import Caricon from '../Assets/svgicons/caricon.svg';
import Cash from '../Assets/svgicons/cash.svg';
import Googlepay from '../Assets/svgicons/googlepay.svg';
import Paypal from '../Assets/svgicons/paypal.svg';
import Upi from '../Assets/svgicons/upi.svg';
import Driverman from '../Assets/svgicons/driverman.svg';

import Cancel from '../Assets/images/cancel.png';
import Energy from '../Assets/images/energy.png';
import FeedbackRatings from '../Assets/images/feedbackRatings.png';
import Group from '../Assets/images/group.png';
import Tracking from '../Assets/images/tracking.png';
import UpArrow from '../Assets/images/upgrade.png';
import Profilepic from '../Assets/images/profile.png';
import AttendanceProfile from '../Assets/images/attendanceProfile.png';
import Checkmark from '../Assets/images/checkmark.png';
import History from '../Assets/images/history.png';
import Gmail from '../Assets/images/gmail.png';

import EliteBg from '../Assets/images/eliteBg.png';
import StdBg from '../Assets/images/stdBg.png';
import PrmBg from '../Assets/images/prmBg.png';
import Reschedule from '../Assets/images/reschedule.png';
import Calendar from '../Assets/images/calendar.png';
import WetCleaning from '../Assets/images/wetCleaning.png';
import WaterRinse from '../Assets/images/waterRinse.png';
import HardWax from '../Assets/images/hardWax.png';
import CarPolish from '../Assets/images/carPolish.png';
import MatClean from '../Assets/images/matClean.png';
import DashboardClean from '../Assets/images/dashboardClean.png';
import Tick from '../Assets/images/tick.png';
import Receipt from '../Assets/images/receipt.png';
import LicensePlate from '../Assets/images/licensePlate.png';
import License from '../Assets/images/license.png';

import ScrapCar from '../Assets/images/scrap-car.png';
import StatusInfo from '../Assets/images/statusInfo.png';

import CalendarIcon from '../Assets/svgicons/calendarIcon.svg';
import Notifications from '../Assets/svgicons/notification.svg';

import Axis from '../Assets/images/axis.png';
import Sbi from '../Assets/images/sbi.png';
import Idfc from '../Assets/images/idfc.png';
import Icici from '../Assets/images/icici.png';
import Bell from '../Assets/images/bell.png';
import Logout from '../Assets/images/logout.png';
import Mappin from '../Assets/images/mappin.png';

export const icons = {

  Baleno: Baleno,
  Swift: Swift,
  Dzire: Dzire,
  Alto: Alto,
  SCross: SCross,
  Ertiga: Ertiga,
  XL6: XL6,
  Jimmy: Jimmy,
  Invicto: Invicto,
  Omni: Omni,
  Gypsy: Gypsy,
  SX4: SX4,
  India_Img: IndiaImg,
  Location: Location,
  Map: Map,
  Log: Log,
  Home: Home,
  Orders: Orders,
  Homeactive: Homeactive,
  Profile: Profile,
  Support: Support,
  Premium: Premium,
  Popular: Popular,
  Trending: Trending,
  Scrap: Scrap,
  OnDemand: OnDemand,
  RTO: RTO,
  Car: Car,
  Bike: Bike,
  Audi: Audi,
  BMW: BMW,
  Honda: Honda,
  Hyundai: Hyundai,
  MG: MG,
  Nissan: Nissan,
  Skoda: Skoda,
  Suzuki: Suzuki,
  Toyota: Toyota,
  Volvo: Volvo,
  Wolves: Wolves,
  Mini: Mini,
  Book: Book,
  Certificate: Certificate,
  Stamp: Stamp,
  Search: Search,
  SPremium: SPremium,
  PrmCard: PrmCard,
  StandardPlan: StandardPlan,
  ElitePlan: ElitePlan,
  Stdplan: Stdplan,
  PremiumPlan: PremiumPlan,
  Ratings: Ratings,
  CarSpa: CarSpa,
  PrmPlan: PrmPlan,
  Elite: Elite,
  Account: Account,
  ordersactive: Ordersactive,
  supportactive: Supportactive,
  profileactive: Profileactive,
  Ondemand: Ondemand,
  toll: Toll,
  challan: Challan,
  Guarantee: Guarantee,
  Affordable: Affordable,
  Geninune: Geninune,
  Doorstep: Doorstep,
  Loop: Loop,
  banner: Banner,
  ReService1: ReService1,
  ReService2: ReService2,
  Refferal: Refferal,
  User: User,
  Offers: Offers,
  Booking: Booking,
  Man: Man,
  Whatsapp: Whatsapp,
  Message: Message,
  Picture: Picture,
  Post: Post,
  Customer: Customer,
  Mail: Mail,
  Faq: Faq,
  About: About,
  Settings: Settings,
  Service: Service,
  Feedback: Feedback,
  Warenty: Warenty,
  Diamond: Diamond,
  Myprofile: Myprofile,
  Reffer: Reffer,
  Profileloc: Profileloc,
  Profileservice: Profileservice,
  Profilecar: Profilecar,
  Profilenoti: Profilenoti,
  Profilephone: Profilephone,
  Filter: Filter,
  AirFreshener: AirFreshener,
  CarSeatCleaning: CarSeatCleaning,
  RoofCleaning: RoofCleaning,
  TissueBox: TissueBox,
  AfterWash1: AfterWash1,
  AfterWash2: AfterWash2,
  BeforeWash1: BeforeWash1,
  // BeforeWash2: BeforeWash2,
  carSpaOT: carSpaOT,
  Driver: Driver,
  Oneway: Oneway,
  Refresh: Refresh,
  Caricon: Caricon,
  Cash: Cash,
  Googlepay: Googlepay,
  Paypal: Paypal,
  Upi: Upi,
  Car1: Car1,
  Car2: Car2,
  Car3: Car3,

  UpArrow: UpArrow,
  Tracking: Tracking,
  Group: Group,
  Cancel: Cancel,
  FeedbackRatings: FeedbackRatings,
  Energy: Energy,
  Profilepic: Profilepic,
  AttendanceProfile: AttendanceProfile,
  Checkmark: Checkmark,
  History: History,
  Gmail: Gmail,
  Share: Share,
  Driverman: Driverman,
  carservice: carservice,
  logo: logo,
  EliteBg: EliteBg,
  StdBg: StdBg,
  PrmBg: PrmBg,
  Reschedule: Reschedule,
  Calendar: Calendar,

  WetCleaning: WetCleaning,
  WaterRinse: WaterRinse,
  HardWax: HardWax,
  CarPolish: CarPolish,
  MatClean: MatClean,
  DashboardClean: DashboardClean,
  Tick: Tick,

  Receipt: Receipt,
  LicensePlate: LicensePlate,
  License: License,
  ScrapCar: ScrapCar,
  StatusInfo: StatusInfo,

  CalendarIcon: CalendarIcon,
  Notifications: Notifications,

  Axis: Axis,
  Sbi: Sbi,
  Idfc: Idfc,
  Icici: Icici,

  Bell: Bell,
  Logout: Logout,
  Mappin: Mappin,
};

export type name =
  | 'Support'
  | 'Profile'
  | 'Orders'
  | 'Home'
  | 'Homeactive'
  | 'Book'
  | 'Certificate'
  | 'Stamp'
  | 'Search'
  | 'ordersactive'
  | 'supportactive'
  | 'profileactive'
  | 'Booking'
  | 'Post'
  | 'Picture'
  | 'Customer'
  | 'Filter'
  | 'Caricon'
  | 'Cash'
  | 'Googlepay'
  | 'Paypal'
  | 'Upi'
  | 'Driverman';

type Cache = 'immutable' | 'web' | 'cacheOnly';

type Source = {
  uri?: string;
  headers?: {
    [key: string]: string;
  };
  priority?: Priority;
  cache?: Cache;
};
type reseize = 'center' | 'contain' | 'cover' | 'stretch';
interface ImageProp {
  width?: any;
  height?: any;
  borderRadius?: any;
  resizeMode?: reseize;
  style?: StyleProp<ImageStyle>;
  source?: Source | ImageRequireSource;
  props?: FastImageProps;
  type: 'svg' | 'image';
  name?: name;
  fill?: string;
  svgprops?: SvgProps;
}

export default function Images({
  width = windowwidth * 0.1,
  height = windowwidth * 0.1,
  borderRadius = borderradius * 1,
  resizeMode = 'contain',
  style,
  source,
  type = 'image',
  name,
  props,
  fill,
  svgprops,
}: ImageProp) {
  if (type == 'image' && source) {
    return (
      <FastImage
        source={source}
        style={[
          { width: width, height: height, borderRadius: borderRadius },
          style,
        ]}
        tintColor={fill}
        resizeMode={resizeMode}
        {...props}
      />
    );
  }
  if (type == 'svg' && name) {
    const Component = icons?.[name];
    return (
      <Component width={width} height={height} style={style} {...svgprops} />
    );
  }
}

import Upgrade from '../Assets/lotties/premium.json';
import locationpin from '../Assets/lotties/locationpin.json';
import Bikejson from '../Assets/lotties/bike.json';
import Carjson from '../Assets/lotties/car.json';
import Locationjson from '../Assets/lotties/location.json';
import Offerjson from '../Assets/lotties/offer.json';
import locationLodjson from '../Assets/lotties/locationLod.json';
import Tickjson from '../Assets/lotties/tick.json';
import MsgLoadingjson from '../Assets/lotties/msgLoading.json';
import Splash from '../Assets/lotties/carigo.json';
import SadEmoji from '../Assets/lotties/sadEmoji.json';
import promojsn from '../Assets/lotties/promo.json';
import Nodata from '../Assets/lotties/nodata.json';

export const lotties = {
  upgrade: Upgrade,
  locationpin: locationpin,
  bike: Bikejson,
  car: Carjson,
  location: Locationjson,
  Offer: Offerjson,
  locationLod: locationLodjson,
  Tick: Tickjson,
  MsgLoading: MsgLoadingjson,
  Splash: Splash,
  SadEmoji: SadEmoji,
  promo: promojsn,
  NoData: Nodata
};
