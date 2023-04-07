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
        { key: '3', value: 'Internship' },
        { key: '4', value: 'Freelance' }
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
    const handlesalRange = (salRange) => {
        var r = /^[0-9]*\s-\s[0-9]*$/;
        if(formData.salRange.match(r)) {
            setFormData({ ...formData, salRange:salRange, salRangeIsSet: true });
        }else {
            setFormData({ ...formData, salRange:salRange, salRangeIsSet: false });
        }
    }
    const handlenumOpen = (numOpen) => {
        if(formData.numOpen.trim() === '') {
            setFormData({ ...formData, numOpen:numOpen, numOpenIsSet: true });
        }else {
            setFormData({ ...formData, numOpen:numOpen, numOpenIsSet: false });
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
                    style={[formData.salRangeIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Salary Range Eg : (from - to)/month *'
                    value={formData.salRange}
                    onChangeText={(salRange) => handlesalRange(salRange)}
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
            <View style={{ marginBottom: 20, width: 270 }}>
                <TextInput
                    style={[formData.numOpenIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Number of Openings *'
                    keyboardType='numeric'
                    value={formData.numOpen}
                    onChangeText={(numOpen) => handlenumOpen(numOpen)}
                />
            </View>
            <View style={{ marginBottom: 20, width: 270 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        editable={false}
                        placeholderTextColor="grey"
                        placeholder='Last date to Apply *'
                        value={formData.date}
                        style={[formData.dateIsSet ? { color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', padding: 5, borderColor: 'grey', marginRight: 20, marginBottom: 15 } : { color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', padding: 5, borderColor: 'red', marginRight: 20, marginBottom: 15 }]}
                    />

                    {open ? <TouchableOpacity onPress={handleButtonOpen} style={{ padding: 0 }}><Text style={styles.btn}>Close</Text></TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setOpen(!open) }} style={{ padding: 0 }}><Text style={styles.btn}>Choose Date</Text></TouchableOpacity>
                    }
                </View>
                {open ? <DatePicker
                    onSelectedChange={date => setDate(date)}
                    mode="calendar"
                    minimumDate={todaysDate}
                /> : <></>}
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
