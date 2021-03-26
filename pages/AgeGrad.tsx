import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';

export default function AgeGrad() {
  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Content title="AgeGrad" />
      </Appbar.Header>
      <View style={ageStyles.root}>
        <TextInput
          mode="outlined"
          label="Current Age"
          value="Type something"
          dense
          disabled
          style={ageStyles.currentAge}
        />

        <Button mode="contained" onPress={() => console.log('AgeGrad')}>
          AgeGrad
        </Button>
      </View>
    </ScrollView>
  );
}

const ageStyles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  currentAge: {
    marginTop: 20,
    marginBottom: 20,
  },
});
