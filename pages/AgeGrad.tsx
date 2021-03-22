import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const halfHeight = Dimensions.get('window').height;

export default class AgeGrad extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.maintext}> AgeGrad </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: halfHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maintext: {
    fontSize: 42,
    fontWeight: '500',
  },
});
