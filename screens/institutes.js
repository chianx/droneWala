import React, {useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Images from '../images/index';
import InstitutionForm from '../institutionForm/form';

export default function Insitute({navigation}) {
  return (
        <InstitutionForm />
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    height:300,
    width:'100%'
  }
});
