import React, { useCallback, useState } from "react";
import { Pressable, View } from 'react-native';
import Mainview from "../../Components/mainview";
import VectorIcons from "../../Utilities/vectorIcons";
import Images, { icons } from "../../Utilities/images";
import { windowwidth } from "../../Utilities/dimensions";
import { useFocusEffect } from "@react-navigation/native";
import { useLazyGetMySubscriptionPackagesListQuery } from "../../Common/redux/vehicleServiceHook";
import { constantData } from "../../Common/constant";
import OrderHistoryCard from "./dailycarwashorder";
import { FlashList } from "@shopify/flash-list";
import { limit } from "../../Utilities/uiasset";
import { returnArrayOnly } from "../../Common/commonFunction";
import { Text } from "react-native-elements";
import OrderModal from "./orderModal";


const defaultOrderData = {
  page: 1,
  limit: 10,
  data: [],
  isLoadMore: false,
}
const defaultTab = constantData.subscriptionFilter.active;

const Orders: React.FC = () => {


  const [visible, setVisible] = useState(false)

  const [trigger, { isLoading }] = useLazyGetMySubscriptionPackagesListQuery();



  const [loadingStatus, setLoadingStatus] = useState({
    noData: false,
    overLapLoader: false,
    mainLoader: false,
    noDataContent: "No data found",
    contentRendered: false,
  })
  const [tab, setTab] = useState([defaultTab]);
  const [orders, setOrders] = useState({
    [defaultTab]: {...defaultOrderData}
  })



  useFocusEffect(
    useCallback(() => {
      fetchMyPackageList(false, true);
      return () => {
        setLoadingStatus({
          noData: false,
          overLapLoader: false,
          mainLoader: false,
          noDataContent: "No data found",
          contentRendered: false,
        });
        setOrders({ [defaultTab]: {...defaultOrderData} });
        setTab([defaultTab]);
      }
    }, [])
  )

  const changeLoadingStatus = (statusObject: any) => {
    setLoadingStatus({
      ...loadingStatus,
      ...statusObject,
    });
  }

  const fetchMyPackageList = async (isRefresh?: boolean, initialCall?: boolean, tabName?: Array<string>) => {

    tabName = tabName ? tabName : tab;
    let staticKey = defaultTab;
    console.log('sendDatasendDatatabNametabName',tabName,tab)
    let page = isRefresh ? 1 : (orders?.[staticKey]?.page ? orders?.[staticKey]?.page : defaultOrderData?.page);
    if (initialCall||(page==1&&!isRefresh)) {
      changeLoadingStatus({
        mainLoader: true,
      })
    }
    if(isRefresh){
      changeLoadingStatus({
        overLapLoader: true,
      })
    }

    let sendData = {
      type: JSON.stringify(tabName),
      page: page,
      limit: defaultOrderData?.limit,
    }

    console.log('sendDatasendData',sendData)

    let resp = await trigger(sendData);

    console.log('sendDatasendDataresp',resp)
    const response = resp?.data;

    let setData: any = {
      page: page + 1,
      limit: sendData?.limit,
      data: [],
      isLoadMore: false,
    }

    if (sendData?.page == 1) {
      setData.data = returnArrayOnly(response?.data);
    }
    else {
      setData.data = [
        ...returnArrayOnly(orders?.[staticKey]?.data),
        ...returnArrayOnly(response?.data)
      ];
    }
    setData.isLoadMore = returnArrayOnly(response?.data).length >= defaultOrderData?.limit ? true : false;


    setOrders({
      ...(initialCall?{}:orders),
      ...{
        [staticKey]: setData,
      },
    });

    changeLoadingStatus({
      mainLoader: false,
      overLapLoader: false,
    })
  }

  const onRefresh = () => {
    if (
      !loadingStatus.mainLoader
    ) {
      fetchMyPackageList(true)
    }
  }

  const onTabChange = (tabName: Array<string>) => {
    setTab(tabName);
    fetchMyPackageList(true, false, tabName);
  }

  const onEndReached = () => {
    if (
      !loadingStatus.mainLoader
      &&
      loadingStatus?.contentRendered
      &&
      orders?.[defaultTab]?.isLoadMore
    ) {
      fetchMyPackageList()
    }
  }

  const onContentSizeChange = (w: number, h: number) => {
    if (h > 1) {
      changeLoadingStatus({
        contentRendered: true,
      })
    }
    else if (h < 1 && !loadingStatus.mainLoader) {
      changeLoadingStatus({
        contentRendered: true,
      })
    }
  };

  const data = [1, 2, 3, 4, 5, 6]
  const isDisabled = orders?.[defaultTab]?.data?.length <= 0;

  console.log('ordersorders',orders,tab)
  return (
    <>
      <Mainview
        headertitle="Order History"
        lefticon={<></>}
        horizontalpadding={"4%"}
        // filter={true}
        rightfn={
          <Pressable
            // disabled={isDisabled}
            onPress={() => setVisible(true)}
          >
            <VectorIcons
              family="Ionicons"
              name="options-outline"
              // iconcolor={isDisabled ? "#999" : "#000"}
              iconcolor={"#000"}
            />
          </Pressable>
        }
        ismainloading={loadingStatus.mainLoader}
        isoverlaploader={loadingStatus.overLapLoader}
        isnodata={orders?.[defaultTab]?.data?.length <= 0 ? true : false}
      >
        <View style={{ paddingTop: "2.5%", flex: 1 }} >
          <FlashList
            estimatedItemSize={80}
            onEndReachedThreshold={0.3}
            data={orders?.[defaultTab]?.data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <OrderHistoryCard
                data={item}
              />
            )}
            onEndReached={() => onEndReached()}
            onRefresh={() => onRefresh()}
            refreshing={loadingStatus.mainLoader}
            onContentSizeChange={(w, h) => onContentSizeChange(w, h)}
          />
        </View>


      </Mainview>
      {
        visible
        ?
        <OrderModal
          visible={visible}
          setVisible={setVisible}
          onSelect={onTabChange}
          selectedFilter={tab}
        />
        :
        <></>
      }
    </>
  )
}

export default Orders;