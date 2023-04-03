import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function Description({ formData, setFormData }) {
  return (
    <View>
      <Text style={{paddingBottom:7}}>Explain your requirements</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textArea}
          placeholderTextColor="grey"
          placeholder='Job Description'
          multiline
          numberOfLines={8}
          value={formData.aboutJob}
          onChangeText={(aboutJob) => {
            setFormData({ ...formData, aboutJob });
          }}
        />
      </View>
      <Text style={{paddingBottom:7}}>Eligibility Criteria</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textArea}
          placeholderTextColor="grey"
          placeholder='Who can Apply'
          multiline={true}
          numberOfLines={8}
          value={formData.whoApply}
          onChangeText={(whoApply) => {
            setFormData({ ...formData, whoApply });
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputView: {
      backgroundColor: "#ffc0cb",
      borderRadius: 15,
      width: 300,
      marginBottom: 20,
      alignItems: "flex-start", 
      justifyContent: "center",
  },
  textArea: {
    borderWidth:1.5,
    borderColor:'#b0b0b0',
    width:'100%',
    padding:10,
    borderRadius:12,
    display:'flex',
    color:'#696969',
    backgroundColor:'white',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    fontSize:15
  },
})