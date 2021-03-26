import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Chip} from 'react-native-paper';

// const birthdayChip = () => {
//   <Chip icon="information" onPress={() => console.log('Pressed')}>
//     2020-01-01
//   </Chip>;
// };

export default function AgeGrad() {
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
        <View>
          <Chip
            icon="account-circle"
            onPress={() => console.log('Pressed')}
            style={ageStyles.currentAge}>
            1
          </Chip>
        </View>
        <View>
          <Chip
            icon="cake-variant"
            onPress={() => console.log('Pressed')}
            style={ageStyles.settings}>
            2020-01-01 17:00
          </Chip>
        </View>
      </View>
    </ScrollView>
  );
}

const ageStyles = StyleSheet.create({
  root: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  currentAge: {
    marginTop: 36,
  },
  settings: {
    marginTop: 20,
  },
});
