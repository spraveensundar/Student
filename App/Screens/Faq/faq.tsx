import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Stacknavigationtypes } from "../../Navigations/stacknavigationtypes";
import Mainview from "../../Components/mainview";
import Listcomponent from "../../Components/listcomponent";
import { icons } from "../../Utilities/images";
import useCustomHooks from "../../Actions/Hooks/customhook";


type Props = NativeStackScreenProps<Stacknavigationtypes, 'Faq'>;

const Faq: React.FC<Props> = () => {
    const { theme, navigation } = useCustomHooks()

    return (
        <Mainview
            headertitle="FAQ’s"
        >
            <Listcomponent onpress={() => navigation.navigate("AboutCarigato")}
                src={icons.About}
                title="About Carigato"
            />
            <Listcomponent onpress={() => navigation.navigate("ServiceQuery")}
                src={icons.Settings}
                title="Service Query"
            />
            {/* <Listcomponent
                src={icons.Service}
                title="Service Bookings"
            /> */}

            <Listcomponent onpress={() => navigation.navigate("Feedback")}
                src={icons.Feedback}
                title="Feedback"
            />

            <Listcomponent onpress={() => navigation.navigate("Warrenty")}
                src={icons.Warenty}
                title="Warrenty"
            />
        </Mainview>
    )

}

export default Faq