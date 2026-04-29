import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import useCustomHooks from '../Actions/Hooks/customhook';
import CommonStyles from '../Utilities/fontStyle';
import Wheel from './Wheel';
import { windowheight, windowwidth } from '../Utilities/dimensions';
import { Fontsize } from '../Utilities/uiasset';
import { Button } from './Field';
import UseModal from './useModal';
import { dateToDateTime, minuteHourFormat, numberChange, roundToNext } from '../Common/commonFunction';

interface WheelPickerModalProps {
  visible: boolean;
  setVisible: (v:boolean) => void;
  selectedTime?: number;
  onConfirmTiming?: (v: number) => void;
}

const WheelPickerModal: React.FC<WheelPickerModalProps> = ({
  visible,
  setVisible,
  selectedTime,
  onConfirmTiming,
}) => {
  const { theme } = useCustomHooks();
  const CommonStyle = CommonStyles(theme);

  const getOptions = () => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    return options;
  }

  const dateList = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const options = getOptions();
    const label = date.toLocaleDateString('en-US', options);
    const value = date.getTime();

    return { label, value };
  });


  const hourList = Array.from({ length: 12 }, (_, i) => {
    const v = (i + 1).toString().padStart(2, '0');
    return { label: v, value: v };
  });

  const colonList = Array(20).fill(':');

  const minuteList = [
    '00',
    '05',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55',
  ].map(m => ({ label: m, value: m }));

  const ampmList = ['AM', 'PM'].map(p => ({ label: p, value: p }));


  const [currentDateTime, setCurrentDateTime] = useState('');
  const [ timingData, setTimingData ] = useState({
    selectedDate: dateList[0].value,
    selectedHour: hourList[0].value,
    selectedMinute: minuteList[0].value,
    selectedPeriod: ampmList[0].value,
    currentDateTime: '',
    choosenTime: new Date().getTime(),
  })
  const [ disableStatus, setDisableStatus ] = useState(false)

  useEffect(() => {
    // const timer = setInterval(() => {
    //   const now = new Date();

    //   const months = [
    //     'Jan',
    //     'Feb',
    //     'Mar',
    //     'Apr',
    //     'May',
    //     'Jun',
    //     'Jul',
    //     'Aug',
    //     'Sep',
    //     'Oct',
    //     'Nov',
    //     'Dec',
    //   ];

    //   const month = months[now.getMonth()];
    //   const day = now.getDate();

    //   let hours = now.getHours();
    //   const minutes = now.getMinutes().toString().padStart(2, '0');

    //   const ampm = hours >= 12 ? 'PM' : 'AM';
    //   hours = hours % 12 || 12; // convert to 12-hour format

    //   setCurrentDateTime(`${month} ${day}, ${hours}:${minutes} ${ampm}`);
    // }, 1000);

    // return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // setIsRender(false);
    let newTime;
    if (selectedTime) {
      newTime = new Date(selectedTime);
    }
    else {
      newTime = new Date();
    }
    let hours = minuteHourFormat(newTime.getHours() > 12 ? (newTime.getHours() - 12) : newTime.getHours()),
      minutes = minuteHourFormat(roundToNext(newTime.getMinutes(), 5)),
      period = newTime.getHours() >= 12 ? "PM" : "AM";
    newTime.setMinutes(numberChange(minutes));
    // setChoosenTime(newTime.getTime());
    // setSelectedDate(newTime.getTime());
    // setSelectedHour(String(hours));
    // setSelectedMinute(String(minutes));
    // setSelectedPeriod(period);
    // setCurrentDateTime(dateToDateTime(newTime));

    console.log('timeee',newTime.getTime())
    setTimingData({
      selectedDate: newTime.getTime(),
      selectedHour: String(hours),
      selectedMinute: String(minutes),
      selectedPeriod: period,
      currentDateTime: dateToDateTime(newTime),
      choosenTime: newTime.getTime(),
    })

    // setTimeout(()=>{
    //   setIsRender(true);
    // },10)
  }, [selectedTime])

  // useEffect(()=>{
  //   let finalDate = new Date();
  //   if(selectedDate){
  //     finalDate = new Date(selectedDate);
  //   }
  //   if(selectedHour){
  //     let hour:number = 0;
  //     if(selectedPeriod == "PM" && numberChange(selectedHour) < 12){
  //       hour = (numberChange(selectedHour)+12);
  //     }
  //     else{
  //       hour = (numberChange(selectedHour));
  //     }
  //     finalDate.setHours(hour);
  //   }
    
  //   if(selectedMinute){
  //     finalDate.setMinutes(numberChange(selectedMinute));
  //   }
  //   console.log('selectedDateselectedDate333',finalDate.getTime())
  //   setChoosenTime(finalDate.getTime());
  //   setCurrentDateTime(dateToDateTime(finalDate));
  // },[selectedDate,selectedHour,selectedMinute,selectedPeriod])

  console.log('selectedDateselectedDateselcteddd',timingData,timingData.choosenTime,dateToDateTime(timingData.choosenTime),currentDateTime)

  const onChange = (value: string|number, id: string) => {
    setDisableStatus(true);
    let setData = {
      ...timingData,
      [id]: value,
    }
    let instChoosenTime = new Date(setData.choosenTime);
    console.log('valuevaluevalue',value,id)
    if(id=="selectedDate"){
      instChoosenTime = new Date(value);
    }
    if(id=="selectedHour"){
      instChoosenTime.setHours(numberChange(value));
    }
    if(id=="selectedMinute"){
      instChoosenTime.setMinutes(numberChange(value));
    }
    if(id=="selectedPeriod"){
      console.log('cehekckck',value,value == "PM",(value == "PM" && instChoosenTime.getHours() < 12),((value == "PM" && instChoosenTime.getHours() < 12) ? instChoosenTime.getHours() + 12 : instChoosenTime.getHours()))
      instChoosenTime.setHours((value == "PM" && instChoosenTime.getHours() < 12) ? (instChoosenTime.getHours() + 12) : (instChoosenTime.getHours() > 12 ? instChoosenTime.getHours() - 12 : instChoosenTime.getHours()) );
    }
    console.log('instChoosenTimeinstChoosenTime',instChoosenTime.getTime())
    setData = {
      ...setData,
      choosenTime: instChoosenTime.getTime(),
      currentDateTime: dateToDateTime(instChoosenTime),
    }
    setTimingData({...setData})
    setDisableStatus(false);
  }

  const onConfirm = () => {
    setVisible(false);
    if (onConfirmTiming) {
      onConfirmTiming(timingData.choosenTime);
    }
  }

  console.log('timingDatatimingData',timingData)

  return (
    <UseModal
      visible={visible}
      setVisible={setVisible}
      containerStyle={{ height: windowheight * 0.4, paddingHorizontal: 0 }}
    >
      <View
        style={{ paddingHorizontal: windowwidth * 0.05, paddingBottom: 10 }}
      >
        <Text style={CommonStyle.textGMedium}>Schedule Ride</Text>
        <Text
          style={[CommonStyle.textGRegular, { fontSize: Fontsize.semimedium }]}
        >
          {timingData.currentDateTime}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          borderTopWidth: 1,
          borderTopColor: theme.cardborder,
        }}
      >
        <Wheel
          data={dateList}
          value={timingData.selectedDate}
          onChange={(e)=>onChange(numberChange(e),'selectedDate')}
          mainStyle={{ width: '45%' }}
          itemStyle={{ paddingLeft: windowwidth * 0.05 }}
          disabled={disableStatus}
          checkSameDate = {true}
        />

        <Wheel
          data={hourList.map(h => h.label)}
          value={timingData.selectedHour}
          onChange={(e)=>onChange(numberChange(String(e?e:"")),"selectedHour")}
          mainStyle={{ width: '10%' }}
          disabled={disableStatus}
        />

        <Wheel
          data={colonList}
          value={':'}
          onChange={() => { }}
          loop={true}
          mainStyle={{ width: '5%' }}
          disabled={disableStatus}
        />

        <Wheel
          data={minuteList.map(m => m.label)}
          value={timingData.selectedMinute}
          onChange={(e)=>onChange(String(e?e:""),"selectedMinute")}
          mainStyle={{ width: '25%' }}
          disabled={disableStatus}
        />

        <Wheel
          data={['AM', 'PM']}
          value={timingData.selectedPeriod}
          onChange={(e)=>onChange(String(e?e:""),"selectedPeriod")}
          loop={false}
          mainStyle={{ width: '15%' }}
          itemStyle={{ paddingRight: windowwidth * 0.05 }}
          disabled={disableStatus}
        />
      </View>
      
      <View
        style={{
          paddingHorizontal: windowwidth * 0.05,
          position: 'absolute',
          bottom: 15,
          width: '100%',
        }}
      >
        <Button
          title="Confirm"
          onPress={() => onConfirm()}
          textStyle={{ fontSize: Fontsize.medium }}
          disabled={disableStatus}
        />
      </View>
    </UseModal>
  );
};

export default WheelPickerModal;

const styles = StyleSheet.create({});
