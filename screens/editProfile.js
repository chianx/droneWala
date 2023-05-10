import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import DatePicker from 'react-native-modern-datepicker';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { configureProps } from 'react-native-reanimated/lib/reanimated2/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileModal = ({ visible, onClose, onSave }) => {

  const [user, setUser] = useState({});
    const mount = async() => {
      const userdata = await AsyncStorage.getItem("userData");
      const val = JSON.parse(userdata)
      setUser(val);
    }
    useEffect(() => {
      mount();
    }, []);
  

  const [open, setOpen] = useState(false)
    const [date, setDate] = useState();

  const handleSave = () => {
    if(user.nameIsSet && user.dateIsSet && user.addressIsSet && user.stateIsSet && user.cityIsSet && user.pinIsSet) {
      // onSave({name, address, state, city, pincode, date, experience, drones, interests,});
      console.log(user.name, user.address, user.state, user.city, user.pincode, user.dob, user.experience, user.droneSelect, user.interests,)
      onClose();
    }
  };
  const handleButtonOpen =() => {
    setOpen(!open);
    setUser({...user, dob:date, dateIsSet:true})
  }
  const exp = [
    { key: '1', value: '0-1 Years'},
    { key: '2', value: '1-2 Years'},
    { key: '3', value: '2-3 Years'},
    { key: '4', value: '3-5 Years'},
    { key: '5', value: '5+ Years'},
  ]
  const dronesList = [
    { key: '1', value: 'Tropogo' },
    { key: '2', value: 'Slider' },
    { key: '3', value: 'Agri' },
    { key: '4', value: 'Delivery' },
    { key: '5', value: 'Survey Mapping' },
  ]
  const category = [
    { key: '1', value: 'Agriculture' },
    { key: '2', value: 'Delivery' },
    { key: '3', value: 'Survey Mapping' },
    { key: '4', value: 'Events' },
  ]

  const [shouldShow, setshouldShow] = useState(false)
  const handleNameChange = (name) => {
    if (name.trim().length > 2) {
      setUser({...user, name, nameIsSet:true})
    } else {
      setUser({...user, name, nameIsSet:false})
    }
  }
  const handleAddressChange = (address) => {
    if (address.trim().length >= 4) {
      setUser({...user, address, addressIsSet:true})
    } else {
      setUser({...user, address, addressIsSet:false})
    }
  }
  const handleCityChange = (city) => {
    if (city.trim().length >= 3) {
      setUser({...user, city, cityIsSet:true})
    } else {
      setUser({...user, city, cityIsSet:false})
    }
  }
  const handleStateChange = (state) => {
    if (state.trim().length >= 5) {
      setUser({...user, state, stateIsSet:true})
    } else {
      setUser({...user, state, stateIsSet:false})
    }
  }
  const handlePinChange = (pincode) => {
    if (pincode.trim().length === 6) {
      setUser({...user, pincode, pinIsSet:true})
    } else {
      setUser({...user, pincode, pinIsSet:false})
    }
  }

  return (
    <Modal visible={visible} animationType="slide">
    <View style={{ alignItems:'center', padding:15, backgroundColor:'coral', elevation:15}}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <AntDesign name="close" size={28} color="white" />
      </TouchableOpacity>
      <Text style={styles.heading}>Edit Profile</Text>
    </View>
    <ScrollView>
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={[user.nameIsSet ? styles.TextInput : styles.errorTextInput]}
                placeholderTextColor="grey"
                placeholder={user.name}
                value={user.name}
                onChangeText={(name) => {
                  handleNameChange(name)
                }}
            />
            <Text style={styles.label}>Address House No/Street No/Area</Text>
            <TextInput
              style={[user.addressIsSet ? styles.TextInput : styles.errorTextInput]}
              placeholderTextColor="grey"
              placeholder={user.address}
              value={user.address}
              onChangeText={(address) => handleAddressChange(address)}
            />
            <Text style={styles.label}>State</Text>
            <TextInput
                style={[user.stateIsSet ? styles.TextInput : styles.errorTextInput]}
                placeholderTextColor="grey"
                placeholder={user.state}
                value={user.state}
                onChangeText={(state) => handleStateChange(state)}
            />
            <Text style={styles.label}>City</Text>
            <TextInput
                style={[user.cityIsSet ? styles.TextInput : styles.errorTextInput]}
                placeholderTextColor="grey"
                placeholder={user.city}
                value={user.city}
                onChangeText={(city) => handleCityChange(city)}
            />
            <Text style={styles.label}>Pincode</Text>
            <TextInput
                style={[user.pinIsSet ? styles.TextInput : styles.errorTextInput]}
                placeholderTextColor="grey"
                placeholder={user.pincode}
                value={user.pincode}
                onChangeText={(pincode) => handlePinChange(pincode)}
                keyboardType='numeric'
                maxLength={6}
            />

            <View style={{marginBottom:10, width: 300}}>
            <Text style={styles.label}>Date of Birth</Text>
              <View style={{flexDirection:'row'}}>
                <TextInput
                    editable={false}    
                    placeholderTextColor="grey"
                    placeholder= {user.dob}   
                    value={user.dob}
                    style={[user.dateIsSet ? { width:140, color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', padding: 5, borderColor: 'grey', marginRight: 20, marginBottom: 15 } : {width:140,  color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', padding: 5, borderColor: 'red', marginRight: 20, marginBottom: 15 }]}    
                />
                
                {open? <TouchableOpacity onPress={handleButtonOpen} style={{padding:0}}><Text style={styles.btn}>Select</Text></TouchableOpacity> : 
                    <TouchableOpacity onPress={()=> {setOpen(!open)}} style={{padding:0}}><Text style={styles.btn}>Choose Date</Text></TouchableOpacity>
                }
              </View>
              {open? <DatePicker
                onSelectedChange={date => setDate( date )}
                mode="calendar"
              /> : <></>}
            </View>   
            
            <View style={{marginBottom:20, width:300}}>
              <Text style={styles.label}>Experience</Text>
              <SelectList
                placeholder={user.experience}
                search={false}
                setSelected={(val) => {
                  if(val === '') {
                    setUser({...user, experience:val, experienceIsSet:false})
                  }else {
                    setUser({...user, experience:val, experienceIsSet:true})
                  }
                }}
                data={exp}
                save="value"
                boxStyles={[user.experienceIsSet ? {} : { borderColor: "red", backgroundColor: "white" }]}
                label="Experience"
              />
            </View>

            <View style={{marginBottom:20, width:300}}>
              <Text style={styles.label}>My Drones</Text>
              <MultipleSelectList
                // placeholder='Select Drones'
                notFoundText='Drone not found'
                setSelected={(val) => {
                  if(val.length === 0) {
                    setUser({...user, droneSelect:val, selectedDroneIsSet:false})
                  }else {
                    setUser({...user, droneSelect:val, selectedDroneIsSet:true})
                  }
                }}
                data={dronesList}
                save="value"
                boxStyles={[user.selectedDroneIsSet ? null : { borderColor: "red" }, { backgroundColor: "white" }]}
                label="Drones"
              />
            </View>

            <View style={{marginBottom:20, width:300}}>
            <Text style={styles.label}>Interests</Text>
              <MultipleSelectList
                setSelected={(val) => {
                  if(val === []) {
                    setUser({...user })
                  }
                }}
                data={category}
                save="value"
                label="Categories"
                boxStyles={[user.interestIsSet ? null : { borderColor: "red" }, { backgroundColor: "white" }]}
              />
            </View>

          </View>
          </View>
          </ScrollView>

          <View style={{alignItems:'center', width:'100%', backgroundColor:'white',position:'absolute', bottom:0, borderTopWidth:1, borderTopColor:'grey', marginVertical:7}}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    // backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom:60
  },
  heading: {
    fontSize: 22,
    fontWeight: 500,
    color:'white'
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 7,
    marginLeft:3,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: 'coral',
    paddingVertical: 10,
    width:'90%',
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems:'center',
    elevation:5
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight:500
  },
  TextInput: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth:1,
    borderColor:'grey',
    width: 300,
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
    width: 300,
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
    fontSize: 15,
    color: 'grey'
},
  btn : {
    textAlign:'center',
    justifyContent:'center',
    backgroundColor:'#A9A9A9',
    fontSize:15,
    borderRadius:8,
    padding:9,
    width:135,
    color:'white'
}
});

export default EditProfileModal;
