import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerParamList, Stacknavigationtypes } from "../Navigations/stacknavigationtypes";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp } from "@react-navigation/native";

export type stackNavProp<RouteName extends keyof Stacknavigationtypes = keyof Stacknavigationtypes> = NativeStackScreenProps<Stacknavigationtypes, RouteName>;
export type drawerNavProp<RouteName extends keyof DrawerParamList = keyof DrawerParamList> = DrawerNavigationProp<DrawerParamList, RouteName>;
export type NavigationProp = CompositeNavigationProp<drawerNavProp, stackNavProp['navigation']>;

export type Override<T, O extends { [F in keyof Partial<T>]: unknown }> = Omit<
    T,
    keyof O
> &
    O;