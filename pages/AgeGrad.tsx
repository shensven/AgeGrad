import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, Button} from 'react-native-paper';

const AgeGrad = () => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="AgeGrad" />
      </Appbar.Header>
      <View>
        <Button mode="contained" onPress={() => console.log('AgeGrad')}>
          AgeGrad
        </Button>
      </View>
    </View>
  );
};

const myStyles = StyleSheet.create({});

export default AgeGrad;
