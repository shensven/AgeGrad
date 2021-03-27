import React, {useState} from 'react';
import {Dimensions, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Button, Chip, TextInput} from 'react-native-paper';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';

const windowHeight = Dimensions.get('window').height;
const windoWidth = Dimensions.get('window').width;
const halfWindowHeight = windowHeight / 2;
const halfWindoWidth = windoWidth / 2;

const AgeGrad = () => {
  const [androidDatePickerModal, setAndroidDatePickerModal] = useState(false);
  const [date, setDate] = useState(new Date());

  const onPress = () => {
    console.log('hola AgeGrid');
  };

  const PopupAndroidDatePickerModal = () => {
    setAndroidDatePickerModal(true);
  };

  const DissmissAndroidDatePickerModal = (e: Event) => {
    if (e.type === 'dismissed') {
      setAndroidDatePickerModal(false);
    }
  };

  if (Platform.OS === 'ios') {
    //
    // ################################################################ render for iOS
    //
    return (
      <ScrollView>
        <Appbar.Header>
          <Appbar.Content title="AgeGrad" />
          <Appbar.Action
            icon="dots-vertical"
            onPress={() => console.log('AgeGrad')}
          />
        </Appbar.Header>

        <View style={ageStyles.root}>
          <TextInput
            label="Current Age"
            value="1"
            mode="outlined"
            dense
            disabled
            style={ageStyles.currentAge}
          />
          <View style={ageStyles.iOSDateTimePickerBox}>
            <DateTimePicker value={date} mode="datetime" />
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
        <Appbar.Header>
          <Appbar.Content title="AgeGrad" />
          <Appbar.Action
            icon="dots-vertical"
            onPress={() => console.log('AgeGrad')}
          />
        </Appbar.Header>

        <View style={ageStyles.root}>
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
                onPress={PopupAndroidDatePickerModal}
              />
            }
            style={ageStyles.androidBirthdayTextInputBox}
          />

          {/* debug */}
          <View style={ageStyles.androidDebugBtnBox}>
            <Button
              mode="contained"
              onPress={() => console.log(androidDatePickerModal)}>
              debug
            </Button>
          </View>

          {/* DatePickerModal */}
          {androidDatePickerModal && (
            <DateTimePicker
              value={date}
              onChange={e => DissmissAndroidDatePickerModal(e)}
            />
          )}
        </View>
      </ScrollView>
    );
  } else {
    //
    // ################################################################ render for unknow device
    //
    return (
      <ScrollView style={ageStyles.unknowDeviceScrollView}>
        <View style={ageStyles.root}>
          <View style={ageStyles.unknowDeviceCenter}>
            <View style={ageStyles.unknowDeviceChipCenter}>
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

  unknowDeviceScrollView: {
    backgroundColor: '#990000',
  },
  unknowDeviceCenter: {
    marginTop: halfWindowHeight - 100,
  },
  unknowDeviceChipCenter: {flexDirection: 'row', justifyContent: 'center'},
});

export default AgeGrad;
