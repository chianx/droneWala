import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';

export default function PersonalDetails({ formData, setFormData }) {
  const [secureEntry, setSecureEntry] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [state, setState] = useState(formData.city);
  const [city, setCity] = useState(formData.state);
  const [pincode, setPincode] = useState(formData.pincode);
  
  const getAddress = async(pincode) => {

    // const options = {
    //   method: 'GET',
    //   url: 'https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/' + pincode,
    //   headers: {
    //     'content-type': 'application/octet-stream',
    //     'X-RapidAPI-Key': '87ef83b0camsh60700ab8953b291p1c1423jsn5fbe5c77e28b',
    //     'X-RapidAPI-Host': 'india-pincode-with-latitude-and-longitude.p.rapidapi.com'
    //   }
    // };
    const options = {
      method: 'POST',
      url: 'https://get-details-by-pin-code-india.p.rapidapi.com/detailsbypincode',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '87ef83b0camsh60700ab8953b291p1c1423jsn5fbe5c77e28b',
        'X-RapidAPI-Host': 'get-details-by-pin-code-india.p.rapidapi.com'
      },
      data: {pincode: pincode}
    };
    try {
      const response = await axios.request(options);
      console.log(response.data);
      if(response.data != "No Data Found" && response.data["details"].length > 0) {
        const state = response.data["details"][0]["state_name"];
        const city = response.data["details"][0]["city_name"];
        console.log(state +' '+ city +' '+ pincode)
        handleCityChange(city);
        setCity(city)
        handleStateChange(state);
        setState(state)
        setPincode(pincode)
        if(pincode.length === 6 && state.length >= 5 && city.length >= 3) {
          setCanEdit(false);
          setFormData({...formData, city:city, cityIsSet:true, pincode:pincode, pinIsSet: true, state:state, stateIsSet:true })
        }else
          setCanEdit(true);
      }else {
        setCanEdit(true);
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddressChange = (address) => {
    if (address.trim().length >= 4) {
        setFormData({ ...formData, address:address, addressIsSet: true});
    } else {
        setFormData({ ...formData, address:address, addressIsSet: false});
    }
  }
  const handleCityChange = (city) => {
    if (city.trim().length >= 3) {
        setCity(city)
        setFormData({ ...formData, city:city, cityIsSet:true });
    } else {
      setCity(city)
        setFormData({ ...formData, city:city, cityIsSet:false });
    }
  }
  const handleStateChange = (state) => {
    if (state.trim().length >= 5) {
      setState(state)
        setFormData({ ...formData, state:state, stateIsSet:true });
    } else {
      setState(state)
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
        getAddress(pincode);
        setFormData({ ...formData, pincode:pincode, pinIsSet: true });
        setPincode(pincode)
    } else {
      setPincode(pincode)

        setFormData({ ...formData, pincode:pincode, pinIsSet: false });
    }
  }
  return (
    <View>
      <View>
        <TextInput
          style={[formData.addressIsSet ? styles.TextInput : styles.errorTextInput]}
          placeholderTextColor="grey"
          placeholder='Address House No/Street No *'
          required={true}
          value={formData.address}
          onChangeText={(address) => handleAddressChange(address)}
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
          value={pincode}
          onChangeText={(pincode) => handlePinChange(pincode)}
        />
      </View>
      <View>
        <TextInput
          style={[formData.cityIsSet ? styles.TextInput : styles.errorTextInput]}
          placeholderTextColor="grey"
          placeholder='City *'
          required={true}
          editable={canEdit}
          value={city}
          onChangeText={(city) => handleCityChange(city)}
        />
      </View>
      <View>
        <TextInput
          style={[formData.stateIsSet ? styles.TextInput : styles.errorTextInput]}
          placeholderTextColor="grey"
          placeholder='State *'
          editable={canEdit}
          required={true}
          value={state}
          onChangeText={(state) => handleStateChange(state)}
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
    height: 55,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
    fontSize: 17,
    color: 'grey'
},
errorTextInput: {
  backgroundColor: "white",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: 'red',
  width: 280,
  height: 55,
  marginBottom: 20,
  alignItems: "flex-start",
  justifyContent: "center",
  padding: 15,
  fontSize: 17,
  color: 'grey'
},
  passwordContainer: {
      position: 'absolute',
      right: 15,
      top:13
  }
})