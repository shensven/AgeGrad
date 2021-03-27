import React, {useState} from 'react';
import {Dimensions, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Button, Chip, TextInput} from 'react-native-paper';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const HALF_WINDOW_HEIGHT = WINDOW_HEIGHT / 2;
const UNIX_TIMESTAMP_NOW = Math.round(new Date().getTime() / 1000);

const AgeGrad = () => {
  const [datePickerShowAndroid, setDatePickerShowAndroid] = useState(false);
  const [birthdayIOS, setBirthdayIOS] = useState();
  const [currentAgeIOS, setCurrentAgeIOS]: any = useState('0');

  const [date, setDate] = useState(new Date());

  const onPress = () => {
    console.log('hola AgeGrad');
  };

  const getBirthdayIOS = (arg: any) => {
    const BIRTHDAY_UNIX_TIMESTAMP: any = Date.parse(arg) / 1000;
    setBirthdayIOS(BIRTHDAY_UNIX_TIMESTAMP);
    console.log(birthdayIOS); // 此处有问题，birthdayIOS 不会马上回调，需要使用 useEffect
  };

  const popupDatePickerModalAndroid = () => {
    setDatePickerShowAndroid(true);
  };

  const dismissDatePickerAndroid = (evt: Event) => {
    if (evt.type === 'dismissed') {
      setDatePickerShowAndroid(false);
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
            value={currentAgeIOS}
            mode="outlined"
            dense
            disabled
            style={ageStyles.currentAge}
          />

          {/* Date & Time Picker Button */}
          <View style={ageStyles.iOSDateTimePickerBox}>
            <DateTimePicker
              value={date}
              mode="datetime"
              onChange={(evt, newDateTimeIOS) => {
                getBirthdayIOS(newDateTimeIOS);
              }}
            />
          </View>

          {/* debug */}
          <View style={ageStyles.androidDebugBtnBox}>
            <Button mode="contained" onPress={() => console.log('')}>
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
            value="1"
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
                onPress={popupDatePickerModalAndroid}
              />
            }
            style={ageStyles.androidBirthdayTextInputBox}
          />

          {/* DatePickerModal */}
          {datePickerShowAndroid && (
            <DateTimePicker
              value={date}
              onChange={evt => dismissDatePickerAndroid(evt)}
            />
          )}

          {/* debug */}
          <View style={ageStyles.androidDebugBtnBox}>
            <Button
              mode="contained"
              onPress={() => console.log(datePickerShowAndroid)}>
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
