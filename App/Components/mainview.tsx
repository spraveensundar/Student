import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollViewProps,
  StatusBar,
  StyleProp,
  Text,
  TextProps,
  TextStyle,
  View,
} from 'react-native';
import useCustomHooks from '../Actions/Hooks/customhook';
import { borderradius, RFvalue, windowheight, windowwidth } from '../Utilities/dimensions';
import { Fontfamily, Fontsize } from '../Utilities/uiasset';
import {
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-controller';
import VectorIcons from '../Utilities/vectorIcons';
import { useFocusEffect } from '@react-navigation/native';

interface Mainviewprops {
  headerCB?: React.ReactNode;
  isstatusbar?: boolean;
  statusbarcolor?: string;
  statusbarcontent?: string;
  bottombarcolor?: string;
  backgroundcolor?: string;
  isheader?: boolean;
  islefticon?: boolean;
  isrighticon?: boolean;
  headertitle?: string;
  lefticon?: React.ReactNode;
  righticon?: React.ReactNode;
  onleftfn?: () => void;
  onrightfn?: () => void;
  headertextprops?: TextProps;
  headerTextstyle?: StyleProp<TextStyle>;
  customheader?: React.ReactNode;
  isscollable?: boolean;
  children?: React.ReactNode;
  ismainloading?: boolean;
  isnodata?: boolean;
  nodatacontent?: string;
  isoverlaploader?: boolean;
  horizontalpadding?: any;
  scrollprops?: ScrollViewProps;
  isbottomtab?: boolean;
  bottomContent?: React.ReactNode;
  rightfn?: React.ReactNode;
  customnodata?: React.ReactNode;
  onreload?: () => void;
  isrefreshing?: boolean;
  isrefereshcontrol?: boolean;
  ismenuheader?: boolean;
}

const Mainview: React.FC<Mainviewprops> = ({
  headerCB,
  isstatusbar = true,
  statusbarcolor,
  bottombarcolor,
  backgroundcolor,
  isheader = true,
  headertitle,
  islefticon = true,
  isrighticon = true,
  lefticon,
  righticon,
  onleftfn,
  onrightfn,
  headertextprops,
  headerTextstyle,
  customheader,
  isscollable = false,
  children,
  ismainloading = false,
  isnodata = false,
  nodatacontent = 'No Data Found',
  isoverlaploader = false,
  horizontalpadding = windowwidth * 0.05,
  scrollprops,
  bottomContent,
  rightfn,
  customnodata,
  onreload,
  isrefreshing = false,
  isrefereshcontrol = false,
  statusbarcontent,
  ismenuheader = false,
}) => {
  const { theme, initialWindowMetrics, navigation } = useCustomHooks();

  // useEffect(() => {
  //     if (statusbarcontent) {
  //         StatusBar.setBarStyle(statusbarcontent == "dark" ? "dark-content" : "light-content")
  //     }
  //     else if (theme.theme == "light") {
  //         StatusBar.setBarStyle("dark-content")
  //     }
  //     else {
  //         StatusBar.setBarStyle("light-content")
  //     }
  // }, [statusbarcontent])

  useFocusEffect(
    useCallback(() => {
      if (statusbarcontent) {
        StatusBar.setBarStyle(
          statusbarcontent === 'dark' ? 'dark-content' : 'light-content',
        );
      } else if (theme.theme === 'light') {
        StatusBar.setBarStyle('dark-content');
      } else {
        StatusBar.setBarStyle('light-content');
      }
    }, [statusbarcontent, theme.theme]),
  );

  const handleLeftPress = onleftfn ? onleftfn : () => navigation.goBack();

  const handleMenupress = onrightfn ? onrightfn : () => navigation.openDrawer();

  return (
    <>
      {isstatusbar && (
        <View
          style={{
            height: StatusBar.currentHeight,
            backgroundColor: statusbarcolor ?? theme.background,
          }}
        />
      )}
      <View
        style={{ flex: 1, backgroundColor: bottombarcolor ?? theme.background }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: backgroundcolor ?? theme.background,
            marginBottom: initialWindowMetrics?.insets.bottom,
          }}
        >
          {isheader && (
            <View
              style={{
                height: windowheight * 0.09,
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.10)',
              }}
            >
              {islefticon && (
                <Pressable
                  onPress={handleLeftPress}
                  style={{
                    width: '15%',
                    height: '100%',
                    position: 'absolute',
                    left: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {lefticon ? (
                    lefticon
                  ) : (
                    <VectorIcons family="Ionicons" name="chevron-back" />
                  )}
                </Pressable>
              )}
              {headerCB && headerCB}
              <Text
                {...headertextprops}
                style={[
                  {
                    fontFamily: Fontfamily.bold,
                    fontSize: RFvalue(16),
                    width: '70%',
                    textAlign: 'center',
                  },
                  headerTextstyle,
                ]}
              >
                {headertitle}
              </Text>
              {/* Right Filter Icon */}
              {rightfn && (
                <View
                  style={{
                    position: 'absolute',
                    right: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  {rightfn}
                </View>
              )}
            </View>
          )}
          {ismenuheader &&
            <View style={{
              width: '100%',
              height: windowheight * 0.1,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: theme.btnColor,
              borderBottomLeftRadius: borderradius * 1,
              borderBottomRightRadius: borderradius * 1
            }} >
              {islefticon && (
                <Pressable
                  onPress={handleLeftPress}
                  style={{
                    width: '15%',
                    height: '100%',
                    position: 'absolute',
                    left: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {lefticon ? (
                    lefticon
                  ) : (
                    <VectorIcons family="Ionicons" name="chevron-back" iconcolor={"#FFFFFF"} />
                  )}
                </Pressable>
              )}
              <Text  {...headertextprops} style={[{ fontFamily: Fontfamily.bold, fontSize: RFvalue(16), width: "70%", textAlign: "center", color: '#FFFFFF' }, headerTextstyle]} >{headertitle}</Text>
              {isrighticon && <Pressable onPress={handleMenupress} style={{ width: "15%", height: "100%", position: "absolute", right: 0, justifyContent: "center", alignItems: "center" }} >
                {righticon ?
                  righticon :
                  <VectorIcons
                    family="Ionicons"
                    name="menu"
                    iconcolor={'#FFFFFF'}
                    size={windowwidth * 0.075}
                  />}
              </Pressable>
              }
            </View>
          }
          {customheader && customheader}
          <View style={{ flex: 1, paddingHorizontal: horizontalpadding }}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
              {ismainloading ? (
                <View
                  style={{
                    flex: 0.9,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ActivityIndicator size={'small'} color={theme.primarytext} />
                </View>
              ) : (
                <>
                  {isnodata ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {customnodata ? (
                        customnodata
                      ) : (
                        <>
                          <Text
                            style={{
                              color: theme.primarytext,
                              fontFamily: Fontfamily.medium,
                              fontSize: Fontsize.medium,
                            }}
                          >
                            {nodatacontent}
                          </Text>
                        </>
                      )}
                    </View>
                  ) : (
                    <>
                      {!isscollable ? (
                        children
                      ) : (
                        <>
                          {isrefereshcontrol ? (
                            <KeyboardAwareScrollView
                              refreshControl={
                                <RefreshControl
                                  refreshing={isrefreshing}
                                  onRefresh={() => onreload?.()}
                                />
                              }
                              showsVerticalScrollIndicator={false}
                              {...scrollprops}
                            >
                              {children}
                            </KeyboardAwareScrollView>
                          ) : (
                            <KeyboardAwareScrollView
                              showsVerticalScrollIndicator={false}
                              {...scrollprops}
                            >
                              {children}
                            </KeyboardAwareScrollView>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </KeyboardAvoidingView>
          </View>
          {bottomContent && bottomContent}
        </View>
      </View>

      {isoverlaploader && (
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 9999,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size={'small'} color={'#fff'} />
        </View>
      )}
    </>
  );
};

export default Mainview;
