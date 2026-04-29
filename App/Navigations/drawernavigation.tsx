import React from 'react';
import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import { DrawerParamList } from './stacknavigationtypes';
import DrawerScreen from './drawerscreen';
import { windowwidth } from '../Utilities/dimensions';
import Stacknavigator from './stacknavigator';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: React.FC = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props: any) => <DrawerScreen {...props} />}
            screenOptions={{
                headerShown: false,
                drawerPosition: 'right',
                drawerStyle: {
                    width: windowwidth
                },
                swipeEnabled: false
            }}
            initialRouteName={'root'}
        >
            <Drawer.Screen name={"root"} component={Stacknavigator} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;
