import react from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Learning({navigation}) {
  return (
    <View style={styles.container}>
      <Text>This is Learning Screen for courses</Text> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
