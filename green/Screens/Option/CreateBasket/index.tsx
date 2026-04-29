import React, { useState } from "react";
import { FlatList, Pressable, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Header from "./Header";
import { basket_data } from "../data";
import Card from "../../../Components/Card";
import Text from "../../../Components/text";
import Images from "../../../Utilities/images";
import { Input } from "../../../Components/Field";
import { Colors } from "../../../Utilities/uiasset";
import Mainview from "../../../Components/mainview";
import VectorIcons from "../../../Utilities/vectoricons";
import SegmentedControl from "../../../Components/segemental";
import useCustomHooks from "../../../Actions/Hooks/customhook";
import { windowheight, windowwidth } from "../../../Utilities/dimensions";
import { Stacknavigationtypes } from "../../../Navigations/navigationtypes";

import { styles } from "../styles";

type Props = NativeStackScreenProps<Stacknavigationtypes, 'CreateBasket'>;

const CreateBasket: React.FC<Props> = () => {
    const { theme } = useCustomHooks();
    const style = styles(theme);

    const [count, setCount] = useState(64);

    const handleOnchang = (number: any) => {
        setCount(number)
    }

    const BasketItem = ({ item, theme, style, onDelete }: {
        item?: any;
        theme?: any;
        style?: any;
        onDelete?: (newValue: any) => void;
    }) => {
        const [activeIndex, setActiveIndex] = useState(0);
        const [checked, setChecked] = useState(false);
        const [share, setShare] = useState(item.count);
        const [prices, setPrices] = useState();
        const { id, name, price, exchange, percent, } = item;

        return (
            <View style={style.basketContent} key={id}>
                <View style={[style.between]}>
                    <SegmentedControl
                        tabs={["B", "S"]}
                        currentIndex={activeIndex}
                        width={windowwidth * 0.290}
                        height={windowheight * 0.045}
                        onChange={(index: number) => setActiveIndex(index)}
                        activeSegmentBackgroundColor="#17BD84"
                        bgstyle={style.bgstyle}
                        segmentedControlBackgroundColor={theme.card}
                        buttonStyle={{ borderRadius: 12 }}

                    />
                    <Pressable onPress={onDelete}>
                        <Images
                            type="svg"
                            name={theme.theme === "dark" ? "TrashLight" : "TrashDark"}
                            width={windowwidth * 0.060}
                            height={windowheight * 0.025}
                        />
                    </Pressable>
                </View>

                <View style={{ paddingVertical: "5%" }}>
                    <View style={style.between}>
                        <Text>{name}</Text>
                        <Text>{price}</Text>
                    </View>

                    <View style={[style.between, { marginTop: "8%" }]}>
                        <Text style={{ color: Colors.graytext }}>{exchange}</Text>
                        <Text style={{ color: Colors.red }}>{percent}</Text>
                    </View>
                </View>

                <Card containerStyle={[style.amountCon, style.between]}>
                    <View style={style.priceContainer}>
                        <Text style={style.price}>Price</Text>
                        <TextInput
                            value={prices}
                            style={style.priceInput}
                            onChange={() => setPrices}
                            placeholder="Market"
                            placeholderTextColor={Colors.graytext}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={style.shareContainer}>
                        <Text style={style.share}>Shares</Text>
                        <Input
                            type="calculator"
                            initialValue={share}
                            onValueChange={setShare}
                        />
                    </View>
                </Card>

                <View style={[style.between, style.mark]}>
                    <Pressable style={style.check} onPress={() => setChecked(!checked)}>
                        <Text style={{ color: Colors.graytext }}>Market  </Text>
                        <View style={[style.checkInner, { backgroundColor: checked ? Colors.green : "transparent" }]}>
                            {checked && (
                                <VectorIcons
                                    family="Feather"
                                    name="check"
                                    iconcolor={Colors.white}
                                    size={18}
                                />
                            )}
                        </View>
                    </Pressable>
                    <Text style={{ color: Colors.graytext }}>Lot size : 75  Total : 1 lot</Text>
                </View>
            </View>
        );
    };

    return (
        <Mainview
            isheader={false}
            isscollable={false}
            horizontalpadding={0}
            customheader={<Header />}
        >
            <View style={style.contentContainer}>
                <View style={[style.between, { paddingBottom: "8%" }]}>
                    <Text style={{ color: theme.secondarytext }}>NIFTY   <Text>520.00</Text> <Text style={{ color: Colors.red }}> (0.87 %)</Text></Text>
                    <Card containerStyle={style.down}>
                        <Text>NRML</Text>
                        <VectorIcons
                            name="chevron-down"
                            family="Feather"
                            size={18}
                        />
                    </Card>
                </View>
                <Card containerStyle={style.strikes}>
                    <Text size="semimedium">Set Qty Foe All Strikes As</Text>
                    <Input
                        type="calculator"
                        initialValue={count}
                        onValueChange={handleOnchang}
                    />
                </Card>
            </View>

            <FlatList
                data={basket_data}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                renderItem={({ item }) => (
                    <BasketItem
                        item={item}
                        theme={theme}
                        style={style}
                        onDelete={(id: any) => console.log("delete", id)}
                    />
                )}
                bounces={false}
            />
        </Mainview>
    )

}

export default CreateBasket;