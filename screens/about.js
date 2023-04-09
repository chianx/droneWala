import react from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Images from '../images/index'

export default function About({navigation}) {
  return (
        <View style={styles.container}>
            {/* <Text>This is About Screen </Text> */}
            <Image source={Images.loading}  style={styles.gif} />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0aa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    height:300,
    width:'100%'
  }
});
