import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'

import DatePicker from 'react-native-modern-datepicker';

export default function Precise({ formData, setFormData }) {

    const [date, setDate] = useState('');
    const [open, setOpen] = useState(false)
    const [selectedFTPT, setselectedFTPT] = useState("");
    const handleButtonOpen = () => {
        setOpen(!open);
        if (date.trim() === '') setFormData({ ...formData, date: date, dateIsSet: false });
        else setFormData({ ...formData, date: date, dateIsSet: true });
    }
    const [te, setTe] = useState(false);

    const FTPT = [
        { key: '1', value: 'Full Time' },
        { key: '2', value: 'Part Time' },
        { key: '3', value: 'Internship' }
    ]
    const date1 = new Date();
    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const day = date1.getDate();
    const todaysDate = year + '-0' + month + '-' + day;
    const handlejobTitle = (jobTitle) => {
        if(jobTitle.trim().length >= 5) {
            setFormData({ ...formData, jobTitle:jobTitle, jobTitleIsSet: true });
        }else {
            setFormData({ ...formData, jobTitle:jobTitle, jobTitleIsSet: false });
        }
    }
    const handlesalRangeFrom = (salRangeFrom) => {
       
        if(parseInt(salRangeFrom.trim()) > 0) {
            setFormData({ ...formData, salRangeFrom:salRangeFrom.trim(), salRangeFromIsSet: true });
        }else {
            setFormData({ ...formData, salRangeFrom:salRangeFrom.trim(), salRangeFromIsSet: false });
        }
    }
    const handlesalRangeTo = (salRangeTo) => {
        if(parseInt(salRangeTo.trim()) > 0 && parseInt(salRangeTo) > parseInt(formData.salRangeFrom)) {
            setFormData({ ...formData, salRangeTo:salRangeTo.trim(), salRangeToIsSet: true });
        }else {
            setFormData({ ...formData, salRangeTo:salRangeTo.trim(), salRangeToIsSet: false });
        }
    }
    const handlenumOpen = (numOpen) => {
        if(parseInt(numOpen.trim()) > 0) {
            setFormData({ ...formData, numOpen:numOpen.trim(), numOpenIsSet: true });
        }else {
            setFormData({ ...formData, numOpen:numOpen.trim(), numOpenIsSet: false });
        }
    }
    const handleJobLoaction = (location) => {
        if(location.trim().length >= 4) {
            setFormData({ ...formData, location:location, locationIsSet: true });
        }else {
            setFormData({ ...formData, location:location, locationIsSet: false });
        }
    }

    return (
        <View>
            <View style={styles.inputView}>
                <TextInput
                    style={[formData.jobTitleIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Job Title *'
                    value={formData.jobTitle}
                    onChangeText={(jobTitle) => handlejobTitle(jobTitle)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={[formData.locationIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Job Location *'
                    value={formData.location}
                    onChangeText={(jobLocation) => handleJobLoaction(jobLocation)}
                />
            </View>
            <View style={{flexDirection:'row'}}>
                <TextInput
                    // style={[formData.salRangeFromIsSet ? styles.TextInput : styles.errorTextInput]}
                    style={{backgroundColor: "white", borderRadius: 8, borderWidth: 1, marginRight: 40, borderColor: formData.salRangeFromIsSet?'grey':'red', width: 130, height: 55, marginBottom: 20, alignItems: "flex-start", justifyContent: "center", padding: 10, fontSize: 17, color: 'grey'}}
                    placeholderTextColor="grey"
                    placeholder='Salary From*'
                    keyboardType='numeric'
                    value={formData.salRangeFrom}
                    onChangeText={(salRangeFrom) => handlesalRangeFrom(salRangeFrom)}
                />
                <TextInput
                    // style={[formData.salRangeToIsSet ? styles.TextInput : styles.errorTextInput]}
                    style={{backgroundColor: "white", borderRadius: 8, borderWidth: 1, borderColor: formData.salRangeToIsSet?'grey':'red', width: 130, height: 55, marginBottom: 20, alignItems: "flex-start", justifyContent: "center", padding: 10, fontSize: 17, color: 'grey'}}
                    placeholderTextColor="grey"
                    placeholder='Salary To*'
                    keyboardType='numeric'
                    value={formData.salRangeTo}
                    onChangeText={(salRangeTo) => handlesalRangeTo(salRangeTo)}
                />
            </View>
            <View style={{ marginBottom: 20 }}>
                <SelectList
                    placeholder="Select Job Type *"
                    setSelected={(val) => {
                        setselectedFTPT(val)
                        setTe(true)
                    }}
                    boxStyles={[formData.ftORptIsSet ? null : { borderColor: "red" }, { backgroundColor: "white" }]}
                    data={FTPT}
                    save="value"
                    value={formData.ftORpt}
                    search={false}
                    onSelect={() => {
                        setFormData({ ...formData, ftORpt: selectedFTPT, ftORptIsSet: te });
                    }}
                    label="Job Type"
                />
            </View>
            <View style={{ marginBottom: 10, width: 270 }}>
                <TextInput
                    style={[formData.numOpenIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Number of Openings *'
                    keyboardType='numeric'
                    value={formData.numOpen}
                    onChangeText={(numOpen) => handlenumOpen(numOpen)}
                />
            </View>
            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'column' }}>
                    
                    <Text style={{paddingBottom: 10}}>Last date to apply</Text>
                    {open ? <TouchableOpacity onPress={handleButtonOpen} style={{ padding: 0 }}><TextInput
                        editable={false}
                        placeholderTextColor="grey"
                        placeholder='Last date to apply *'
                        value={formData.date}
                        style={{ width: 280, fontSize: 17, height: 55, color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', borderColor: formData.dateIsSet ? 'grey' : 'red', marginRight: 20, marginBottom: 15 }}
                    /></TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setOpen(!open) }} style={{ padding: 0 }}>
                        <TextInput
                            editable={false}
                            placeholderTextColor="grey"
                            placeholder='Last date to apply *'
                            value={formData.date}
                            style={{ width: 280, fontSize: 17, height: 55, color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', borderColor: formData.dateIsSet ? 'grey' : 'red', marginRight: 20, marginBottom: 15 }}
                        />
                        </TouchableOpacity>
                    }
                </View>
                <View>
                    {open ? <DatePicker
                        onSelectedChange={(date) => {
                            setFormData({ ...formData, date: date, dateIsSet: true });
                            setOpen(!open);
                        }}
                        mode="calendar"
                        minimumDate={todaysDate}
                    /> : <></>}
                </View>
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