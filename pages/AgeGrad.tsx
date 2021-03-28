import React, {useEffect, useState} from 'react';
import {Dimensions, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Button, Chip, TextInput} from 'react-native-paper';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';

const WINDOW_HEIGHT: number = Dimensions.get('window').height;
const HALF_WINDOW_HEIGHT: number = WINDOW_HEIGHT / 2;
const UNIX_TIMESTAMP_NOW: number = Math.round(new Date().getTime() / 1000);

const AgeGrad = () => {
  const [utcTimeNow] = useState(new Date());

  const [datePickerShow_android, setDatePickerShow_android] = useState(false);
  const [timePickerShow_android, setTimePickerShow_android] = useState(false);

  const [unixBirthday_iOS, setunixBirthday_iOS] = useState<number>();

  const [
    unixBirthDate_android,
    setUnixDateBirthday_android,
  ] = useState<number>();

  const [currentAge_iOS, setcurrentAge_iOS] = useState('0');

  const onPress = () => {
    console.log('hola AgeGrad');
  };

  const getBirthdayIOS = (newDateTime: string) => {
    // Convert UTC Date & Time to Unix Timestamp
    const UNIX_TIMESTAMP_BIRTHDAY: number = Date.parse(newDateTime) / 1000;
    setunixBirthday_iOS(UNIX_TIMESTAMP_BIRTHDAY);
    console.log('Date & Time Seted');
  };

  useEffect(() => {
    const UNIX_TIMESTAMP_DIFF =
      UNIX_TIMESTAMP_NOW - (unixBirthday_iOS as number);
    setcurrentAge_iOS(String(UNIX_TIMESTAMP_DIFF));
  }, [unixBirthday_iOS]);

  const getTimePickerAction_android = (evt: Event, newTime: any) => {
    if (evt.type === 'dismissed') {
      setTimePickerShow_android(false);
      console.log('Time Dismissed');
    } else if (evt.type === 'set') {
      console.log('Time Seted');
    }
  };

  const getDatePickerAction_android = (evt: Event, newDate: any) => {
    if (evt.type === 'dismissed') {
      setDatePickerShow_android(false);
      console.log('Date Dismissed');
    } else if (evt.type === 'set') {
      setDatePickerShow_android(false);
      const UNIX_TIMESTAMP_DATE_BIRTHDAY: number = Date.parse(newDate) / 1000;
      setUnixDateBirthday_android(UNIX_TIMESTAMP_DATE_BIRTHDAY);
      setTimePickerShow_android(true);
      console.log('Date Seted');
    }
  };

  if (Platform.OS === 'ios') {
    //
    // ################################################################ render for iOS
    //
    return (
      <ScrollView>
        {/* HeaderBar */}
        <Appbar.Header>
          <Appbar.Content title="AgeGrad" />
          <Appbar.Action
            icon="dots-vertical"
            onPress={() => console.log('AgeGrad')}
          />
        </Appbar.Header>

        {/* Current Age */}
        <View style={ageStyles.root}>
          <TextInput
            label="Current Age"
            value={currentAge_iOS}
            mode="outlined"
            dense
            disabled
            style={ageStyles.currentAge}
          />

          {/* Date & Time Picker Button */}
          <View style={ageStyles.iOSDateTimePickerBox}>
            <DateTimePicker
              value={utcTimeNow}
              mode="datetime"
              onChange={(evt: Event, newDateTimeIOS: any) => {
                getBirthdayIOS(newDateTimeIOS);
              }}
            />
          </View>

          {/* debug */}
          <View style={ageStyles.androidDebugBtnBox}>
            <Button
              mode="contained"
              onPress={() => console.log('什么都没定义')}>
              debug
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  } else if (Platform.OS === 'android') {
    //
    // ################################################################ render for android
    //
    return (
      <ScrollView>
        {/* HeaderBar */}
        <Appbar.Header>
          <Appbar.Content title="AgeGrad" />
          <Appbar.Action
            icon="dots-vertical"
            onPress={() => console.log('AgeGrad')}
          />
        </Appbar.Header>

        <View style={ageStyles.root}>
          {/* Current Age */}
          <TextInput
            label="Current Age"
            value={currentAge_iOS}
            mode="outlined"
            dense
            disabled
            style={ageStyles.currentAge}
          />
          <TextInput
            label="Birthday"
            value="Press Cake to Set Yours"
            mode="outlined"
            dense
            disabled
            right={
              <TextInput.Icon
                name="cake-variant"
                onPress={() => setDatePickerShow_android(true)}
              />
            }
            style={ageStyles.androidBirthdayTextInputBox}
          />

          {/* DatePickerModal */}
          {datePickerShow_android && (
            <DateTimePicker
              value={utcTimeNow}
              onChange={(evt: Event, newDate: any) =>
                getDatePickerAction_android(evt, newDate)
              }
            />
          )}

          {/* TimePickerModal */}
          {timePickerShow_android && (
            <DateTimePicker
              mode="time"
              value={utcTimeNow}
              onChange={(evt: Event, newTime: any) =>
                getTimePickerAction_android(evt, newTime)
              }
            />
          )}

          {/* debug */}
          <View style={ageStyles.androidDebugBtnBox}>
            <Button
              mode="contained"
              onPress={() => console.log('什么都没定义')}>
              debug
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    //
    // ################################################################ render for unknown device
    //
    return (
      <ScrollView style={ageStyles.unknownDeviceScrollView}>
        <View style={ageStyles.root}>
          <View style={ageStyles.unknownDeviceCenter}>
            <View style={ageStyles.unknownDeviceChipCenter}>
              <Chip icon="information" onPress={onPress}>
                Unsupported devices
              </Chip>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
};

const ageStyles = StyleSheet.create({
  root: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  currentAge: {
    marginTop: 36,
  },

  iOSDateTimePickerBox: {
    marginTop: 20,
  },
  androidBirthdayTextInputBox: {
    marginTop: 16,
  },
  androidDebugBtnBox: {
    marginTop: 60,
    width: '100%',
  },

  unknownDeviceScrollView: {
    backgroundColor: '#990000',
  },
  unknownDeviceCenter: {
    marginTop: HALF_WINDOW_HEIGHT - 100,
  },
  unknownDeviceChipCenter: {flexDirection: 'row', justifyContent: 'center'},
});

export default AgeGrad;
