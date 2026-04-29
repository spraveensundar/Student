import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Button,
} from 'react-native';
import Mainview from '../Components/mainview';
import { apiEndPoints } from '../Common/apiConstants';
import config from '../Common/config';
import useCustomHooks, { UsePaymemt } from '../Actions/Hooks/customhook';


const TestScreen = () => {
  const { theme } = useCustomHooks()
  const [loader, setLoader] = useState(false)
  const paymentcreate = async () => {
    console.log(config.BACKEND_URL, apiEndPoints.addAddress, "apiEndPoints");
    setLoader(true)
    await UsePayment({
      amount: 100,
      _id: "6921571e8069273407dc8afb"
    })
    setLoader(false)

  }

  return (
    <Mainview
      headertitle='Test Payment'
      isscollable={false}
      isoverlaploader={loader}
    >
      <View style={{ flex: 1, justifyContent: "center", }} >
        <Button title='Test payment' onPress={() => paymentcreate()} />
      </View>
    </Mainview>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFFFFF',
  },

  searchBox: {
    height: 50,
    backgroundColor: '#5f3535ff',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  input: {
    fontSize: 16,
    color: '#000',
  },

  item: {
    paddingVertical: 12,
    borderBottomWidth: 0.7,
    borderBottomColor: '#E0E0E0',
  },

  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },

  subtitle: {
    fontSize: 13,
    marginTop: 2,
    color: '#6D6D6D',
  },
});
