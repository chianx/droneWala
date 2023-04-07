import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function PersonalDetails({ formData, setFormData }) {
  const [secureEntry, setSecureEntry] = useState(true)
  

  const handleAddressChange = (address) => {
    if (address.trim().length >= 4) {
        setFormData({ ...formData, address:address, addressIsSet: true});
    } else {
        setFormData({ ...formData, address:address, addressIsSet: false});
    }
  }
  const handleCityChange = (city) => {
    if (city.trim().length >= 3) {
        setFormData({ ...formData, city:city, cityIsSet:true });
    } else {
        setFormData({ ...formData, city:city, cityIsSet:false });
    }
  }
  const handleStateChange = (state) => {
    if (state.trim().length >= 5) {
        setFormData({ ...formData, state:state, stateIsSet:true });
    } else {
        setFormData({ ...formData, state:state, stateIsSet:false });
    }
  }
  const handleAadhaarChange = (aadhar) => {
    if (aadhar.trim().length === 12) {
        setFormData({ ...formData, aadhar: aadhar, aadhaarIsSet: true });
    } else {
        setFormData({ ...formData, aadhar: aadhar, aadhaarIsSet: false });
    }
  }
  const handlePinChange = (pincode) => {
    if (pincode.trim().length === 6) {
        setFormData({ ...formData, pincode:pincode, pinIsSet: true });
    } else {
        setFormData({ ...formData, pincode:pincode, pinIsSet: false });
    }
  }
  return (
    <View>
      <View>
        <TextInput
          style={[formData.addressIsSet ? styles.TextInput : styles.errorTextInput]}
          placeholderTextColor="grey"
          placeholder='Address House No/Street No/Area *'
          required={true}
          value={formData.address}
          onChangeText={(address) => handleAddressChange(address)}
        />
      </View>
      <View>
        <TextInput
          style={[formData.cityIsSet ? styles.TextInput : styles.errorTextInput]}
          placeholderTextColor="grey"
          placeholder='City *'
          required={true}
          value={formData.city}
          onChangeText={(city) => handleCityChange(city)}
        />
      </View>
      <View>
        <TextInput
          style={[formData.stateIsSet ? styles.TextInput : styles.errorTextInput]}
          placeholderTextColor="grey"
          placeholder='State *'
          required={true}
          value={formData.state}
          onChangeText={(state) => handleStateChange(state)}
        />
      </View>
      <View>
        <TextInput
          style={[formData.pinIsSet ? styles.TextInput : styles.errorTextInput]}
          placeholderTextColor="grey"
          placeholder='Pincode *'
          keyboardType='numeric'
          required={true}
          maxLength={6}
          value={formData.pincode}
          onChangeText={(pincode) => handlePinChange(pincode)}
        />
      </View>
      <View>
        <TextInput
          style={[formData.aadhaarIsSet ? styles.TextInput : styles.errorTextInput]}
          placeholderTextColor="grey"
          placeholder='Aadhaar *'
          keyboardType='numeric'
          required={true}
          maxLength={12}
          value={formData.aadhar}
          onChangeText={(aadhar) => handleAadhaarChange(aadhar)}
          secureTextEntry={secureEntry}
        />
        <TouchableOpacity
                style={styles.passwordContainer}
                onPress={() => {setSecureEntry((prev) => !prev)}}
            >
                <Text style={styles.text}>{ secureEntry ? 'Show' : 'Hide' }</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  TextInput: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth:1,
    borderColor:'grey',
    width: 280,
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
    fontSize: 15,
    color: 'grey'
},
errorTextInput: {
  backgroundColor: "white",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: 'red',
  width: 280,
  height: 45,
  marginBottom: 20,
  alignItems: "flex-start",
  justifyContent: "center",
  padding: 10,
  fontSize: 15,
  color: 'grey'
},
  passwordContainer: {
      position: 'absolute',
      right: 15,
      top:13
  }
})