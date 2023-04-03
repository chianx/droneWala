import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function PersonalDetails({ formData, setFormData }) {
  const [secureEntry, setSecureEntry] = useState(true)
  const [secureEntryC, setSecureEntryC] = useState(true)
  return (
    <View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="white"
          placeholder='Name'
          value={formData.name}
          onChangeText={(name) => {
            setFormData({ ...formData, name });
          }}
        />
      </View>
      <View style={[styles.inputView]}>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="white"
          placeholder='Email'
          value={formData.email}
          onChangeText={(email) => {
            setFormData({ ...formData, email });
          }}
        />
      </View>
      <View style={[styles.inputView]}>
            <TextInput
                style={styles.TextInput}
                placeholderTextColor="white"
                placeholder='Password'
                value={formData.password}
                onChangeText={(password) => {
                    setFormData({ ... formData, password });
                }}
                secureTextEntry={secureEntry}
            />
            <TouchableOpacity
                style={styles.passwordContainer}
                onPress={() => {setSecureEntry((prev) => !prev)}}
            >
                <Text style={styles.text}>{ secureEntry ? 'Show' : 'Hide' }</Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.inputView]}>
            <TextInput
                style={styles.TextInput}
                placeholderTextColor="white"
                placeholder='Confirm Password'
                value={formData.cpassword}
                onChangeText={(cpassword) => {
                    setFormData({ ... formData, cpassword });
                }}
                secureTextEntry={secureEntryC}
            />
            <TouchableOpacity
                style={styles.passwordContainer}
                onPress={() => {setSecureEntryC((prev) => !prev)}}
            >
                <Text style={styles.text}>{ secureEntryC ? 'Show' : 'Hide' }</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputView: {
      backgroundColor: "#ffc0cb",
      borderRadius: 15,
      width: 280,
      height: 45,
      marginBottom: 20,
      alignItems: "flex-start", 
      justifyContent: "center",
  },
  TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      fontSize: 15,
      color: 'black'
  },
  passwordContainer: {
      position: 'absolute',
      right: 10
  }
})