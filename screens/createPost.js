import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import JobForm from '../jobForm/jobForm';

export default function CreatePost({navigation}) {
  return (
        <View style={styles.container}>
            <JobForm />
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
