import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MultipleSelectList } from 'react-native-dropdown-select-list'

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
    const [secureEntry, setSecureEntry] = useState(true)
    const [addressIsSet, setAddressIsSet] = useState(false);
    const [cityIsSet, setCityIsSet] = useState(false);
    const [stateIsSet, setStateIsSet] = useState(false);
    const [pinIsSet, setPinIsSet] = useState(false);
    const [cinIsSet, setCINIsSet] = useState(false);
    const [gstIsSet, setGSTIsSet] = useState(false);
    const [categoryIsSet, setcategoryIsSet] = useState(false)
 
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
          setFormData({ ...formData, pincode: pincode, pinIsSet:true });
      } else {
          setFormData({ ...formData, pincode: pincode, pinIsSet:false });
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
            <View style={[styles.inputView]}>
                <TextInput
                    style={[formData.cityIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='City *'
                    value={formData.city}
                    onChangeText={(city) => handleCityChange(city)}
                />
            </View>
            <View style={[styles.inputView]}>
                <TextInput
                    style={[formData.stateIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='State *'
                    value={formData.state}
                    onChangeText={(state) => handleStateChange(state)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={[formData.pinIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Pincode *'
                    keyboardType='numeric'
                    maxLength={6}
                    value={formData.pincode}
                    onChangeText={(pincode) => handlePinChange(pincode)}
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