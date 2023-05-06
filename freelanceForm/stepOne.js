import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'

import DatePicker from 'react-native-modern-datepicker';

export default function StepOne({ formData, setFormData }) {

    const [date, setDate] = useState('');
    const [open, setOpen] = useState(false)
    const [selectedTimeFrame, setselectedTimeFrame] = useState("");

    const handleButtonOpen = () => {
        setOpen(!open);
        if (date.trim() === '') setFormData({ ...formData, date: date, dateIsSet: false });
        else setFormData({ ...formData, date: date, dateIsSet: true });
    }
    const [te, setTe] = useState(false);

    const timeFrames = [
        { key: '1', value: 'Aerial Survey', option: 'A' },
        { key: '2', value: 'Agricultural Survey', option: 'B' },
        { key: '3', value: 'Cinematography', option: 'C' },
        { key: '4', value: 'Drone Delivery', option: 'D' },
        { key: '5', value: 'Others', option: 'E' },
    ]
    const date1 = new Date();
    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const day = date1.getDate();
    const todaysDate = year + '-0' + month + '-' + day;
    const handlejobTitle = (jobTitle) => {
        if(formData.jobTitle.trim().length >= 5) {
            setFormData({ ...formData, jobTitle:jobTitle, jobTitleIsSet: true });
        }else {
            setFormData({ ...formData, jobTitle:jobTitle, jobTitleIsSet: false });
        }
    }
    const handlesalRangeFrom = (salRangeFrom) => {
        if(formData.salRangeFrom.trim().length >= 2) {
            setFormData({ ...formData, salRangeFrom:salRangeFrom, salRangeFromIsSet: true });
        }else {
            setFormData({ ...formData, salRangeFrom:salRangeFrom, salRangeFromIsSet: false });
        }
    }
    const handlesalRangeTo = (salRangeTo) => {
        if(formData.salRangeTo.trim().length >= 2) {
            setFormData({ ...formData, salRangeTo:salRangeTo, salRangeToIsSet: true });
        }else {
            setFormData({ ...formData, salRangeTo:salRangeTo, salRangeToIsSet: false });
        }
    }
    const handleJobLoaction = (location) => {
        if(formData.location.trim().length >= 4) {
            setFormData({ ...formData, location:location, locationIsSet: true });
        }else {
            setFormData({ ...formData, location:location, locationIsSet: false });
        }
    }
    // title: "",
    // areaSize: "",
    // areaLoc: "",
    // workDuration: "",
    // payload: "",
    // titleIsSet: false,
    // areaSizeIsSet: false,
    // areaLocIsSet: false,
    // workDurationIsSet: false,
    // payloadIsSet: false,
    return (
        <View>
            <View style={styles.inputView}>
                <TextInput
                    style={[formData.titleIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Project Title *'
                    value={formData.title}
                    onChangeText={(title) => null } //handlejobTitle(title)}
                />
            </View>
            { formData.category === "Aerial Survey" || formData.category === "Agricultural Survey" ? 
            
                <View style={[ styles.inputView]}>
                    <TextInput
                        style={[formData.areaSizeIsSet ? styles.TextInput : styles.errorTextInput]}
                        placeholderTextColor="grey"
                        placeholder='Area Size *'
                        keyboardType='numeric'
                        value={formData.areaSize}
                        onChangeText={(areaSize) => null } //handleJobLoaction(areaSize)}
                    />
                </View>
                : 
                null
            }
            <View style={styles.inputView}>
                <TextInput
                    style={[formData.areaLocIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Area Location *'
                    value={formData.areaLoc}
                    onChangeText={(areaLoc) => null } //handlesalRangeFrom(areaLoc)}
                />
            </View>
            <View style={[styles.inputView]}>
                <TextInput
                    style={[formData.workDurationIsSet ? styles.TextInput : styles.errorTextInput, { width: 180}]}
                    placeholderTextColor="grey"
                    placeholder='Work Duration *'
                    keyboardType='numeric'
                    value={formData.workDuration}
                    onChangeText={(workDuration) => null } //handlesalRangeTo(workDuration)}
                />
            </View>

            { formData.category === "Drone Delivery" ? 
            <View style={styles.inputView}>
                <TextInput
                    style={[formData.payloadIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Payload *'
                    value={formData.payload}
                    onChangeText={(payload) => null } //handlesalRangeFrom(payload)}
                />
            </View>
            : null }
        </View>
    )
}

const styles = StyleSheet.create({
    TextInput: {
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey',
        width: 300,
        height: 55,
        marginBottom: 20,
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 10,
        fontSize: 17,
        color: 'grey'
    },
    errorTextInput: {
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'red',
        width: 300,
        height: 55,
        marginBottom: 20,
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 10,
        fontSize: 17,
        color: 'grey'
    },
    btn: {
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#A9A9A9',
        fontSize: 15,
        borderRadius: 8,
        // height:40,
        padding: 16,
        width: 135,
        height:55,
        color: 'white'
    }
})