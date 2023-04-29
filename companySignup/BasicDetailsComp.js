import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';

export default function PersonalDetails({ formData, setFormData }) {
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [logo, setLogo] = React.useState();

    const category = [
        { key: '1', value: 'Agriculture' },
        { key: '2', value: 'Delivery' },
        { key: '3', value: 'Survey Mapping' },
        { key: '4', value: 'Events' },
    ]

    const [te, setTe] = useState(false);
    const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const getAddress = async(pincode) => {

    const options = {
      method: 'GET',
      url: 'https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/' + pincode,
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': '87ef83b0camsh60700ab8953b291p1c1423jsn5fbe5c77e28b',
        'X-RapidAPI-Host': 'india-pincode-with-latitude-and-longitude.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      if(response.data.length > 0) {
        const state = response.data[0]["state"];
        const city = response.data[0]["district"];
        console.log(state +' '+ city +' '+ pincode)
        handleCityChange(city);
        setCity(city)
        handleStateChange(state);
        setState(state)
        setPincode(pincode)
        if(pincode.length === 6 && state.length >= 5 && city.length >= 3)
          setFormData({...formData, city:city, cityIsSet:true, pincode:pincode, pinIsSet: true, state:state, stateIsSet:true })
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
    const handleGSTChange = (GSTno) => {
      if (GSTno.trim().length >= 5) {
          setFormData({ ...formData, GSTno: GSTno, gstIsSet:true });
      } else {
          setFormData({ ...formData, GSTno: GSTno, gstIsSet:false });
      }
    }
    const handleCINChange = (CINno) => {
        if (CINno.trim().length >= 5) {
            setFormData({ ...formData, CINno:CINno, cinIsSet:true });
        } else {
            setFormData({ ...formData, CINno:CINno, cinIsSet:false });
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
           
            <View style={styles.inputView}>
                <TextInput
                    style={[formData.cinIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='CIN Number *'
                    keyboardType='numeric'
                    //   maxLength={6}
                    value={formData.CINno}
                    onChangeText={(CINno) => handleCINChange(CINno)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={[formData.gstIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='GST Number *'
                    keyboardType='numeric'
                    //   maxLength={6}
                    value={formData.GSTno}
                    onChangeText={(GSTno) => handleGSTChange(GSTno)}
                />
            </View>
            <View style={{marginBottom: 20, width:280}}>
                <MultipleSelectList
                    setSelected={(val) => {
                        setSelectedCategory(val);
                        setTe(true);
                    }}
                    data={category}
                    search={false}
                    placeholder='Select Category *'
                    save="value"
                    boxStyles={[formData.categoryIsSet ? null : {borderColor : "red"}, {backgroundColor: "white", padding:16}]}
                    label="Category"
                    onSelect={() => {
                        setFormData({ ...formData, category:selectedCategory, categoryIsSet:te});
                    }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={[formData.addressIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Address Building No/Street No/Area *'
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
          value={city}
          onChangeText={(city) => handleCityChange(city)}
        />
      </View>
      <View>
        <TextInput
          style={[formData.stateIsSet ? styles.TextInput : styles.errorTextInput]}
          placeholderTextColor="grey"
          placeholder='State *'
          required={true}
          value={state}
          onChangeText={(state) => handleStateChange(state)}
        />
      </View>
        </View>
    )
}

const styles = StyleSheet.create({
    TextInput: {
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey',
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
        right: 10
    }
})