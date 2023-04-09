import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-modern-datepicker';

export default function BasicDetails({ formData, setFormData }) {
    const [date, setDate] = useState('');
    const handleButtonOpen = () => {
        setOpen(!open);
        if(date.length !== '') setFormData({ ...formData, dob: date, dateIsSet: true });
        else setFormData({ ...formData, dob: date, dateIsSet: false });
    }
    const [open, setOpen] = useState(false)
    const date1 = new Date();
    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const day = date1.getDate();
    const todaysDate = year + '-0' + month + '-' + day;

    const handleNameChange = (name) => {
        if (formData.name.trim().length >= 2) {
            setFormData({ ...formData, name:name, nameIsSet: true});
        } else {
            setFormData({ ...formData, name:name, nameIsSet: false});
        }
    }
    const handleEmailChange = (email) => {
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (formData.email.match(validRegex)) {
            setFormData({ ...formData, email: email, emailIsSet: true });
        } else {
            setFormData({ ...formData, email: email, emailIsSet: false });
        }
    }

    return (
        <>
            <View style={styles.inputView}>
                <TextInput
                    style={[formData.nameIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Full Name *'
                    value={formData.name}
                    onChangeText={(name) => handleNameChange(name)}
                />
            </View>

            <View style={{ marginBottom: 20, width: 270 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        editable={false}
                        placeholderTextColor="grey"
                        placeholder='Date of Birth *'
                        value={formData.dob}
                        style={[formData.dateIsSet ? { color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', padding: 5, borderColor: 'grey', marginRight: 20, marginBottom: 15 } : { color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', padding: 5, borderColor: 'red', marginRight: 20, marginBottom: 15 }]}
                    />

                    {open ? <TouchableOpacity onPress={handleButtonOpen} style={{ padding: 0 }}><Text style={styles.btn}>Select</Text></TouchableOpacity> :
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
            <View style={styles.inputView}>
                <TextInput
                    style={[formData.emailIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Email *'
                    value={formData.email}
                    onChangeText={(email) => handleEmailChange(email)}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
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
    btn: {
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#A9A9A9',
        fontSize: 15,
        borderRadius: 8,
        // height:40,
        padding: 9,
        width: 135,
        color: 'white'
    }
})