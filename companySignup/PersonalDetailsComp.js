import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-modern-datepicker';

export default function PersonalDetails({ formData, setFormData }) {
  const [date, setDate] = useState('');
    const handleButtonOpen = () => {
        setOpen(!open);
        if(date.length !== '') setFormData({ ...formData, foundedin: date, dateIsSet: true });
        else setFormData({ ...formData, foundedin: date, dateIsSet: false });
    }
    const [open, setOpen] = useState(false)
    const date1 = new Date();
    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const day = date1.getDate();
    const todaysDate = year + '-0' + month + '-' + day;


    const [nameIsSet, setNameIsSet] = useState(false);
    const [dateIsSet, setDateIsSet] = useState(false);
    const [emailIsSet, setEmailIsSet] = useState(false);

    const handleNameChange = (name) => {
        if (name.trim().length > 2) {
            setFormData({ ...formData, name:name, nameIsSet: true});
        } else {
            setFormData({ ...formData, name:name, nameIsSet: false});
        }
    }
    const handleEmailChange = (email) => {
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(validRegex)) {
            setFormData({ ...formData, email:email, emailIsSet:true });
        } else {
            setFormData({ ...formData, email:email, emailIsSet:false });
        }
    }
  return (
    <View>
      <View style={styles.inputView}>
        <TextInput
          style={[formData.nameIsSet ? styles.TextInput : styles.errorTextInput]}
          placeholderTextColor="grey"
          placeholder='Full Name *'
          value={formData.name}
          onChangeText={(name) => handleNameChange(name)}
        />
      </View>
      <View style={[styles.inputView]}>
        <TextInput
          style={[formData.emailIsSet ? styles.TextInput : styles.errorTextInput]}
          placeholderTextColor="grey"
          placeholder='Email *'
          value={formData.email}
          onChangeText={(email) => handleEmailChange(email)}
        />
      </View>
      <View style={{ marginBottom: 20, width: 270 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        editable={false}
                        placeholderTextColor="grey"
                        placeholder='Founded In *'
                        value={formData.foundedin}
                        style={[formData.dateIsSet ? { color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', padding: 5, borderColor: 'grey', marginRight: 20, marginBottom: 15 } : { color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', padding: 5, borderColor: 'red', marginRight: 20, marginBottom: 15 }]}
                    />

                    {open ? <TouchableOpacity onPress={handleButtonOpen} style={{ padding: 0 }}><Text style={styles.btn}>Close</Text></TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setOpen(!open) }} style={{ padding: 0 }}><Text style={styles.btn}>Choose Date</Text></TouchableOpacity>
                    }
                </View>
                {open ? <DatePicker
                    onSelectedChange={(date) => {
                        setDate(date)
                    }}
                    mode="calendar"
                    maximumDate={todaysDate}
                /> : null}
            </View >
    </View>
  )
}

const styles = StyleSheet.create({
  inputView: {
    width: 280,
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
},
TextInput: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
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
      right: 10
  }
})