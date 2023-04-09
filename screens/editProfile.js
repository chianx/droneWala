import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import DatePicker from 'react-native-modern-datepicker';
import { MultipleSelectList } from 'react-native-dropdown-select-list'

const EditProfileModal = ({ visible, onClose, user, onSave }) => {
  const [name, setName] = useState("Chintan Grover");
  const [state, setState] = useState("Rajasthan");
  const [city, setCity] = useState("Jaipur");
  const [experience, setExperience] = useState("1-2 Years");

  const [date, setDate] = useState('07/06/2002');
  const [open, setOpen] = useState(false)

  const [address, setAddress] = useState("203, Midas Heights");
  const [pincode, setPincode] = useState("302017");
  const [isCertified, setIsCertified] = useState(false);
  const [drones, setDrones] = useState(["Tropogo"]);
  const [interests, setInterests] = useState([]);

  const handleSave = () => {
    // onSave({ name, email, bio });
    onClose();
    
  };
  const handleButtonOpen =() => {
    setOpen(!open);
    setDate(date);
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
                style={styles.TextInput}
                placeholderTextColor="grey"
                placeholder={name}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Address House No/Street No/Area</Text>
            <TextInput
              style={styles.TextInput}
              placeholderTextColor="grey"
              placeholder={address}
              value={address}
              onChangeText={setAddress}
            />
            <Text style={styles.label}>State</Text>
            <TextInput
                style={styles.TextInput}
                placeholderTextColor="grey"
                placeholder={state}
                value={state}
                onChangeText={setState}
            />
            <Text style={styles.label}>City</Text>
            <TextInput
                style={styles.TextInput}
                placeholderTextColor="grey"
                placeholder={city}
                value={city}
                onChangeText={setCity}
            />
            <Text style={styles.label}>Pincode</Text>
            <TextInput
                style={styles.TextInput}
                placeholderTextColor="grey"
                placeholder={pincode}
                value={pincode}
                onChangeText={setPincode}
                keyboardType='numeric'
                maxLength={6}
            />

            <View style={{marginBottom:10, width: 270}}>
            <Text style={styles.label}>Date of Birth</Text>
              <View style={{flexDirection:'row'}}>
                <TextInput
                    editable={false}    
                    placeholderTextColor="grey"
                    placeholder='Last date to Apply'   
                    value={date}
                    style={{color:'grey', backgroundColor:'white', borderWidth:1, borderRadius:8, textAlign:'center', justifyContent:'center', padding:5, borderColor:'grey', marginRight:20, marginBottom:15}}    
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
            
            <View style={{marginBottom:20, width:280}}>
              <Text style={styles.label}>Experience</Text>
              <SelectList
                placeholder={experience}
                search={false}
                setSelected={(val) => setExperience(val)}
                data={exp}
                save="value"
                onSelect={(exp) => {
                  setExperience(exp);
                }}
                label="Experience"
              />
            </View>

            <View style={{marginBottom:20, width:300}}>
              <Text style={styles.label}>My Drones</Text>
              <MultipleSelectList
                // placeholder='Select Drones'
                notFoundText='Drone not found'
                setSelected={setDrones}
                data={dronesList}
                save="value"
                onSelect={(droneSelect) => {
                  // setDrones(droneSelect)
                  console.log(drones);
                }}
                label="Drones"
              />
            </View>

            <View style={{marginBottom:20, width:300}}>
            <Text style={styles.label}>Interests</Text>
              <MultipleSelectList
                setSelected={(val) => setInterests(val)}
                data={category}
                save="value"
                label="Categories"
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