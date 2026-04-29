import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
} from 'react-native';
import useCustomHooks from '../Actions/Hooks/customhook';
import CommonStyles from '../Utilities/fontStyle';
import { Fontsize } from '../Utilities/uiasset';
import { isSameDay } from '../Common/commonFunction';

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 3;
const CENTER_INDEX = 1;

interface WheelProps {
  data: string[]|any[];
  value: string|number;
  onChange: (value: string|number) => void;
  loop?: boolean;
  mainStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  checkSameDate?: boolean;
}

const Wheel: React.FC<WheelProps> = ({
  data,
  value,
  onChange,
  loop = true,
  mainStyle,
  itemStyle,
  disabled= false,
  checkSameDate= false,
}) => {
  const listRef = useRef<any>(null);
  const { theme } = useCustomHooks();
  const style = styles(theme);
  const CommonStyle = CommonStyles(theme);
  const loopedData = loop ? [...data, ...data, ...data] : data;

  const middleIndex = data.length;

  useEffect(() => {
    // setTimeout(() => {
    //   listRef.current?.scrollToOffset({
    //     offset: ITEM_HEIGHT * middleIndex,
    //     animated: false,
    //   });
    // }, 0);
  }, []);

  useEffect(() => {
    if (value !== undefined && listRef?.current?.scrollToOffset) {
      const index = data.findIndex(item => {
        if(checkSameDate){
          return isSameDay((item?.value||item),value);
        }
        else{
          return ((item?.value||item) === value);
        }
      });
      console.log('valuevalue', value, index, data,)
      if (index >= 0) {
        setTimeout(() => {
          listRef.current.scrollToOffset({
            offset: index * ITEM_HEIGHT,
            animated: false,
          });
        }, 0)
      }
    }
  }, [value, data]);

  const onScrollEnd = (e: any) => {
    const offset = e.nativeEvent.contentOffset.y;
    const index = Math.round(offset / ITEM_HEIGHT);

    if (loop) {
      const safeIndex = index % data.length;
      console.log('safeIndexsafeIndex',safeIndex,index,data[safeIndex < 0 ? safeIndex + data.length : safeIndex])
      let value = (data[safeIndex < 0 ? safeIndex + data.length : safeIndex]?.value ?? data[safeIndex < 0 ? safeIndex + data.length : safeIndex]);
      onChange(value);
    }
    else {
      const safeIndex = Math.max(0, Math.min(index, data.length - 1));
      let value = (data[safeIndex]?.value ?? data[safeIndex]);
      onChange(value);
    }
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={[style.container, mainStyle]}>
      <View style={style.highlight} pointerEvents="none" />

      <Animated.FlatList
        ref={listRef}
        data={loopedData.map((item)=>item?.label||item)}
        showsVerticalScrollIndicator={false}
        bounces={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        contentContainerStyle={{
          paddingVertical: ITEM_HEIGHT * CENTER_INDEX,
        }}
        // renderItem={({ item }) => (
        //   <View style={[style.item, itemStyle]}>
        //     <Text
        //       style={[CommonStyle.textGMedium, { fontSize: Fontsize.medium }]}
        //     >
        //       {item}
        //     </Text>
        //   </View>
        // )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_HEIGHT,
            index * ITEM_HEIGHT,
            (index + 1) * ITEM_HEIGHT,
          ];

          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3], // fade above & below
            extrapolate: 'clamp',
          });

          return (
            <Animated.View style={{ opacity }}>
              <View style={[style.item, itemStyle]}>
                <Text
                  style={[
                    CommonStyle.textGMedium,
                    { fontSize: Fontsize.medium },
                  ]}
                >
                  {item}
                </Text>
              </View>
            </Animated.View>
          );
        }}
        aria-disabled={disabled?true:false}
      />
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      height: ITEM_HEIGHT * VISIBLE_ITEMS,
      overflow: 'hidden',
    },
    item: {
      height: ITEM_HEIGHT,
      justifyContent: 'center',
    },
    label: {
      fontSize: 20,
      color: '#333',
    },
    highlight: {
      position: 'absolute',
      top: ITEM_HEIGHT * CENTER_INDEX,
      height: ITEM_HEIGHT,
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.1)',
      zIndex: -1,
      pointerEvents: 'none',
    },
    fadeTop: {
      position: 'absolute',
      top: 0,
      height: ITEM_HEIGHT,
      width: '100%',
      backgroundColor: 'rgba(255,255,255,0.6)',
      zIndex: 10,
    },
    fadeBottom: {
      position: 'absolute',
      bottom: 0,
      height: ITEM_HEIGHT,
      width: '100%',
      backgroundColor: 'rgba(255,255,255,0.6)',
      zIndex: 10,
    },
  });

export default Wheel;
