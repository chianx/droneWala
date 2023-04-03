import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function PersonalDetails({ formData, setFormData }) {
  const [secureEntry, setSecureEntry] = useState(true)
  return (
    <View>
      <View>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="grey"
          placeholder='Address House No/Street No/Area'
          value={formData.address}
          onChangeText={(address) => {
            setFormData({ ...formData, address });
          }}
        />
      </View>
      <View>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="grey"
          placeholder='City'
          value={formData.city}
          onChangeText={(city) => {
            setFormData({ ...formData, city });
          }}
        />
      </View>
      <View>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="grey"
          placeholder='State'
          value={formData.state}
          onChangeText={(state) => {
            setFormData({ ...formData, state });
          }}
        />
      </View>
      <View>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="grey"
          placeholder='Pincode'
          keyboardType='numeric'
          maxLength={6}
          value={formData.pincode}
          onChangeText={(pincode) => {
            setFormData({ ...formData, pincode });
          }}
        />
      </View>
      <View>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="grey"
          placeholder='Aadhaar'
          keyboardType='numeric'
          maxLength={12}
          value={formData.aadhar}
          onChangeText={(aadhar) => {
            setFormData({ ...formData, aadhar });
            console.log(formData);
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
  passwordContainer: {
      position: 'absolute',
      right: 15,
      top:13
  }
})