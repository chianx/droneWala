import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import DatePicker from 'react-native-modern-datepicker';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { configureProps } from 'react-native-reanimated/lib/reanimated2/core';

const EditProfileModalComp = ({ visible, onClose, user, onSave }) => {
  const [name, setName] = useState("Chintan Grover");
  const [date, setDate] = useState('07/06/2002');
  const [email, setEmail] = useState('abc@gmail.com');
  const [address, setAddress] = useState("203, Midas Heights");
  const [state, setState] = useState("Rajasthan");
  const [city, setCity] = useState("Jaipur");
  const [pincode, setPincode] = useState("302017");
  const [about, setAbout] = useState("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  const [website, setWebsite] = useState("www.google.com");
  const [num, setNum] = useState("50+");
  const [interests, setInterests] = useState([]);

  const [open, setOpen] = useState(false)
  const [isCertified, setIsCertified] = useState(false);

  const [nameIsSet, setNameIsSet] = useState(true);
  const [dateIsSet, setDateIsSet] = useState(true);
  const [emailIsSet, setEmailIsSet] = useState(true);
  const [addressIsSet, setAddressIsSet] = useState(true);
  const [stateIsSet, setStateIsSet] = useState(true);
  const [cityIsSet, setCityIsSet] = useState(true);
  const [pinIsSet, setPinIsSet] = useState(true);
  const [numIsSet, setNumIsSet] = useState(true);
  const [interestIsSet, setInterestIsSet] = useState(true);
  const [websiteIsSet, setWebsiteIsSet] = useState(true);
  const [aboutIsSet, setAboutIsSet] = useState(true);


  const handleSave = () => {
    if(nameIsSet && dateIsSet && emailIsSet && addressIsSet && stateIsSet && cityIsSet && pinIsSet && numIsSet && interestIsSet && websiteIsSet && aboutIsSet) {
      onSave({name, date, email, address, state, city, pincode, about, website, num, interests});
      console.log({name, date, email, address, state, city, pincode, about, website, num, interests});
      onClose();
    }
  };
  
  
  const handleButtonOpen =() => {
    setOpen(!open);
    setDate(date);
    setDateIsSet(true)
  }
  const category = [
    { key: '1', value: 'Agriculture' },
    { key: '2', value: 'Delivery' },
    { key: '3', value: 'Survey Mapping' },
    { key: '4', value: 'Events' },
  ]

  const [shouldShow, setshouldShow] = useState(false)
  const numPeople = [
    { key: '1', value: '1 - 10' },
    { key: '2', value: '10 - 20' },
    { key: '3', value: '20 - 50' },
    { key: '4', value: '50+' },
  ]
  const handleWebsiteChange = (website) => {
    if (validator.isURL(website)) {
      setWebsite(website)
      setWebsiteIsSet(true);
    } else {
      setWebsite(website)
      setWebsiteIsSet(false);
    }
  }
  const handleAboutChange = (about) => {
    if (about.trim().length >= 50) {
      setAbout(about)
      setAboutIsSet(true);
    } else {
      setAbout(about)
      setAboutIsSet(false);
    }
  }
  const handleNameChange = (name) => {
    if (name.trim().length > 2) {
        setName(name)
        setNameIsSet(true);
    } else {
      setName(name)
      setNameIsSet(false);
    }
  }
  const handleAddressChange = (address) => {
    if (address.trim().length >= 4) {
      setAddress(address)
      setAddressIsSet(true);
    } else {
      setAddress(address)
      setAddressIsSet(false);
    }
  }
  const handleEmailChange = (email) => {
    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(validRegex)) {
      setEmail(email)
      setEmailIsSet(true)
    } else {
      setEmail(email)
      setEmailIsSet(false)
    }
  }
  const handleCityChange = (city) => {
    if (city.trim().length >= 3) {
      setCity(city)
      setCityIsSet(true);
    } else {
      setCity(city)
      setCityIsSet(false);
    }
  }
  const handleStateChange = (state) => {
    if (state.trim().length >= 5) {
      setState(state)
      setStateIsSet(true);
    } else {
      setState(state)
      setStateIsSet(false);
    }
  }
  const handlePinChange = (pincode) => {
    if (pincode.trim().length === 6) {
      setPincode(pincode)
      setPinIsSet(true);
    } else {
      setPincode(pincode)
      setPinIsSet(false);
    }
  }

  return (
    <Modal visible={visible} animationType="slide">
    <View style={{ alignItems:'center', padding:15, backgroundColor:'coral', elevation:15}}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <AntDesign name="close" size={28} color="white" />
      </TouchableOpacity>
      <Text style={styles.heading}>Edit Company Profile</Text>
    </View>
    <ScrollView>
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>

            <Text style={styles.label}>Company Name</Text>
            <TextInput
                style={[nameIsSet ? styles.TextInput : styles.errorTextInput]}
                placeholderTextColor="grey"
                placeholder={name}
                value={name}
                onChangeText={(name) => {
                  handleNameChange(name)
                }}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[emailIsSet ? styles.TextInput : styles.errorTextInput]}
              placeholderTextColor="grey"
              placeholder={email}
              value={email}
              onChangeText={(email) => handleEmailChange(email)}
            />
            <Text style={styles.label}>Address House No/Street No/Area</Text>
            <TextInput
              style={[addressIsSet ? styles.TextInput : styles.errorTextInput]}
              placeholderTextColor="grey"
              placeholder={address}
              value={address}
              onChangeText={(address) => handleAddressChange(address)}
            />
            <Text style={styles.label}>State</Text>
            <TextInput
                style={[stateIsSet ? styles.TextInput : styles.errorTextInput]}
                placeholderTextColor="grey"
                placeholder={state}
                value={state}
                onChangeText={(state) => handleStateChange(state)}
            />
            <Text style={styles.label}>City</Text>
            <TextInput
                style={[cityIsSet ? styles.TextInput : styles.errorTextInput]}
                placeholderTextColor="grey"
                placeholder={city}
                value={city}
                onChangeText={(city) => handleCityChange(city)}
            />
            <Text style={styles.label}>Pincode</Text>
            <TextInput
                style={[pinIsSet ? styles.TextInput : styles.errorTextInput]}
                placeholderTextColor="grey"
                placeholder={pincode}
                value={pincode}
                onChangeText={(pincode) => handlePinChange(pincode)}
                keyboardType='numeric'
                maxLength={6}
            />
            <Text style={styles.label}>Website</Text>
            <TextInput
                style={[websiteIsSet ? styles.TextInput : styles.errorTextInput]}
                placeholderTextColor="grey"
                placeholder={website}
                value={website}
                onChangeText={(website) => handleWebsiteChange(website)}
            />
            <Text style={styles.label}>About</Text>
            <TextInput
                style={[aboutIsSet ? styles.TextInput : styles.errorTextInput]}
                placeholderTextColor="grey"
                placeholder={about}
                value={about}
                onChangeText={(about) => handleAboutChange(about)}
            />

            <View style={{marginBottom:10, width: 270}}>
            <Text style={styles.label}>Founded In</Text>
              <View style={{flexDirection:'row'}}>
                <TextInput
                    editable={false}    
                    placeholderTextColor="grey"
                    placeholder='Founded In'   
                    value={date}
                    style={[dateIsSet ? { color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', padding: 5, borderColor: 'grey', marginRight: 20, marginBottom: 15 } : { color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', padding: 5, borderColor: 'red', marginRight: 20, marginBottom: 15 }]}    
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
              <Text style={styles.label}>Number of Employees</Text>
              <MultipleSelectList
                placeholder={num}
                notFoundText='Num People not found'
                setSelected={(val) => {
                  setNum(val)
                  setNumIsSet(true)
                }}
                data={numPeople}
                save="value"
                onSelect={() => {
                  // setDrones(droneSelect)
                  console.log(numPeople);
                }}
                boxStyles={[numIsSet ? null : { borderColor: "red" }, { backgroundColor: "white" }]}
                label="NumPeople"
              />
            </View>
            <View style={{marginBottom:20, width:300}}>
            <Text style={styles.label}>Categories</Text>
              <MultipleSelectList
                setSelected={(val) => {
                  setInterests(val)
                  setInterestIsSet(true)
                  if(interests == []) setInterestIsSet(false)
                }}
                data={category}
                save="value"
                onSelect={() => {
                  // setDrones(droneSelect)
                  console.log(interests);
                }}
                label="Categories"
                boxStyles={[interestIsSet ? null : { borderColor: "red" }, { backgroundColor: "white" }]}
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

export default EditProfileModalComp;