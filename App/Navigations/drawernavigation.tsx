import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import { DrawerParamList } from './stacknavigationtypes';
import React, { useEffect, useState } from 'react';
import DrawerScreen from '../Screens/Others/Common/drawerscreen';
import { windowwidth } from '../Utilities/dimensions';
import ScrapPostOverView from '../Screens/Category/Scrap/ScrapPostOverView';
import { useSelector } from 'react-redux';
import { helperSelector } from '../Slices/helper';
import MakeBid from '../Screens/Category/Scrap/MakeBid';
import Home from '../Screens/Carwash/Home/home';

const Drawer = createDrawerNavigator<DrawerParamList>();

const Vendorhome: React.FC = () => {
    const { servicetype } = useSelector(helperSelector);
    const [initialRouteName, setInitialRouteName] = useState<keyof DrawerParamList | null>(null);

    console.log("servicetype", servicetype)

    useEffect(() => {
        switch (servicetype) {
            case 'dailywash':
                setInitialRouteName('Home');
                break;
            case 'scrapdealer':
                setInitialRouteName('ScrapPostOverView');
                break;
            default:
                setInitialRouteName('ScrapPostOverView');
                break;
        }
    }, [servicetype]);


    if (!initialRouteName) return null;

    return (
        <Drawer.Navigator
            drawerContent={(props: any) => <DrawerScreen {...props} />}
            screenOptions={{
                headerShown: false,
                drawerPosition: 'left',
                drawerStyle: {
                    width: windowwidth
                }
            }}
            initialRouteName={initialRouteName}
        >
            {initialRouteName === 'ScrapPostOverView' ? (
                <>
                    <Drawer.Screen name="ScrapPostOverView" component={ScrapPostOverView} />
                    <Drawer.Screen name={"MakeBid"} component={MakeBid} />
                    <Drawer.Screen name="Home" component={Home} />
                </>
            ) : (
                <>
                    <Drawer.Screen name="Home" component={Home} />
                    <Drawer.Screen name="ScrapPostOverView" component={ScrapPostOverView} />
                    <Drawer.Screen name={"MakeBid"} component={MakeBid} />
                </>
            )}
        </Drawer.Navigator>
    )
}

export default Vendorhome
