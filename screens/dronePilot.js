import react from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PilotForm from '../pilotSignup/form'

export default function Pilot({loginNav, navigation}) {
  return (
        
    <PilotForm loginNav={loginNav}/>
        
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
