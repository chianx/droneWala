import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function Description({ formData, setFormData }) {
  const handleaboutJob = (aboutJob) => {
    if(formData.aboutJob.trim().length >= 100) {
      setFormData({ ...formData, aboutJob:aboutJob, aboutJobIsSet: true });
    }else {
        setFormData({ ...formData, aboutJob:aboutJob, aboutJobIsSet: false });
    }
  }
  const handlewhoApply = (whoApply) => {
    if(formData.whoApply.trim().length >= 100) {
      setFormData({ ...formData, whoApply:whoApply, whoApplyIsSet: true });
  }else {
      setFormData({ ...formData, whoApply:whoApply, whoApplyIsSet: false });
  }
  }
  return (
    <View>
      <Text style={{ paddingBottom: 7, fontSize:17, color:'grey', fontWeight:500}}>Explain your requirements</Text>
      <View style={styles.inputView}>
        <TextInput
          style={[formData.aboutJobIsSet ? styles.textArea : styles.errortextArea]}
          placeholderTextColor="grey"
          placeholder='Job Description *'
          multiline
          numberOfLines={8}
          maxLength={1000}
          value={formData.aboutJob}
          onChangeText={(aboutJob) => handleaboutJob(aboutJob)}
        />
      </View>
      <Text style={{ paddingBottom: 7, fontSize:17, color:'grey', fontWeight:500 }}>Eligibility Criteria</Text>
      <View style={styles.inputView}>
        <TextInput
          style={[formData.whoApplyIsSet ? styles.textArea : styles.errortextArea]}
          placeholderTextColor="grey"
          placeholder='Who can Apply *'
          multiline={true}
          maxLength={1000}
          numberOfLines={8}
          value={formData.whoApply}
          onChangeText={(whoApply) => handlewhoApply(whoApply)}
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
    borderWidth: 1.5,
    borderColor: '#b0b0b0',
    width: '100%',
    padding: 10,
    borderRadius: 12,
    display: 'flex',
    color: '#696969',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    fontSize: 16
  },
  errortextArea: {
    borderWidth: 1.5,
    borderColor: 'red',
    width: '100%',
    padding: 10,
    borderRadius: 12,
    display: 'flex',
    color: '#696969',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    fontSize: 16
  }
})