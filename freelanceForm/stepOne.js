import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'

import DatePicker from 'react-native-modern-datepicker';

export default function StepOne({ formData, setFormData }) {

    const handleButtonOpen = () => {
        setOpen(!open);
    };
    const [open, setOpen] = useState(false);
    const date1 = new Date();
    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const day = date1.getDate();
    const todaysDate = year + "-0" + month + "-" + day;
    const handleTitle = (title) => {
        if (title.trim().length >= 4) {
            setFormData({ ...formData, title: title, titleIsSet: true });
        } else {
            setFormData({ ...formData, title: title, titleIsSet: false });
        }
    }
    const handleAreaSize = (areaSize) => {
        if (parseInt(areaSize.trim()) > 0) {
            setFormData({ ...formData, areaSize: areaSize, areaSizeIsSet: true });
        } else {
            setFormData({ ...formData, areaSize: areaSize, areaSizeIsSet: false });
        }
    }
    const handleAreaLocation = (areaLoc) => {
        if (areaLoc.trim().length >= 4) {
            setFormData({ ...formData, areaLoc: areaLoc, areaLocIsSet: true });
        } else {
            setFormData({ ...formData, areaLoc: areaLoc, areaLocIsSet: false });
        }
    }
    const handleWorkDurationFrom = (workDuration) => {
        if(parseInt(workDuration.trim()) > 0 && parseInt(workDuration.trim()) < formData.workDurationToIsSet ? formData.workDurationTo : 9007199254740991) {
            setFormData({ ...formData, workDurationFrom: workDuration.trim(), workDurationFromIsSet: true });
        }else {
            setFormData({ ...formData, workDurationFrom: workDuration.trim(), workDurationFromIsSet: false });
        }
    }
    const handleWorkDurationTo = (workDuration) => {
        if(parseInt(workDuration.trim()) > 0 && parseInt(workDuration.trim()) > formData.workDurationFrom) {
            setFormData({ ...formData, workDurationTo: workDuration.trim(), workDurationToIsSet: true });
        }else {
            setFormData({ ...formData, workDurationTo: workDuration.trim(), workDurationToIsSet: false });
        }
    }
    const handlePayload = (payload) => {
        setFormData({ ...formData, payload: payload, payloadIsSet: true });
    }

    // areaSize: "",
    // areaLoc: "",
    // workDuration: "",
    // payload: "",
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
                    onChangeText={(title) => handleTitle(title)}
                />
            </View>

            {formData.category === "Aerial Survey" || formData.category === "Agricultural Survey" ?

                <View style={[styles.inputView]}>
                    <TextInput
                        style={[formData.areaSizeIsSet ? styles.TextInput : styles.errorTextInput]}
                        placeholderTextColor="grey"
                        placeholder='Area Size (in acres) *'
                        keyboardType='numeric'
                        value={formData.areaSize}
                        onChangeText={(areaSize) => handleAreaSize(areaSize)}
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
                    onChangeText={(areaLoc) => handleAreaLocation(areaLoc)}
                />
            </View>

            <Text style={{ color: "coral", marginBottom: 10 }}>Enter Work Duration (in weeks)</Text>
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    // style={[formData.workDurationFromIsSet ? styles.TextInput : styles.errorTextInput, { width: 180}]}
                    style={{ backgroundColor: "white", borderRadius: 8, borderWidth: 1, marginRight: 35, borderColor: formData.workDurationFromIsSet ? 'grey' : 'red', width: 140, height: 55, marginBottom: 20, alignItems: "flex-start", justifyContent: "center", padding: 10, fontSize: 17, color: 'grey' }}
                    placeholderTextColor="grey"
                    placeholder='Duration From*'
                    keyboardType='numeric'
                    value={formData.workDurationFrom}
                    onChangeText={(workDuration) => handleWorkDurationFrom(workDuration)}
                />
                <TextInput
                    // style={[formData.workDurationToIsSet ? styles.TextInput : styles.errorTextInput, { width: 180}]}
                    style={{ backgroundColor: "white", borderRadius: 8, borderWidth: 1, borderColor: formData.workDurationToIsSet ? 'grey' : 'red', width: 130, height: 55, marginBottom: 20, alignItems: "flex-start", justifyContent: "center", padding: 10, fontSize: 17, color: 'grey' }}
                    placeholderTextColor="grey"
                    placeholder='Duration To*'
                    keyboardType='numeric'
                    value={formData.workDurationTo}
                    onChangeText={(workDuration) => handleWorkDurationTo(workDuration)}
                />
            </View>
            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: "column" }}>
                    <Text style={{ paddingBottom: 10 }}>Closing Date: *</Text>
                    {open ? (
                        <TouchableOpacity onPress={handleButtonOpen} style={{ padding: 0 }}>
                            <TextInput
                                editable={false}
                                placeholderTextColor="grey"
                                placeholder="Date of Closing *"
                                value={formData.date}
                                style={{ width: 280, fontSize: 17, height: 55, color: "grey", backgroundColor: "white", borderWidth: 1, borderRadius: 8, textAlign: "center", justifyContent: "center", borderColor: formData.dateIsSet ? "grey" : "red", marginRight: 20, marginBottom: 15, }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                setOpen(!open);
                            }}
                            style={{ padding: 0 }}
                        >
                            <TextInput
                                editable={false}
                                placeholderTextColor="grey"
                                placeholder="Date of Closing *"
                                value={formData.date}
                                style={{ width: 280, fontSize: 17, height: 55, color: "grey", backgroundColor: "white", borderWidth: 1, borderRadius: 8, textAlign: "center", justifyContent: "center", borderColor: formData.dateIsSet ? "grey" : "red", marginRight: 20, marginBottom: 15, }}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <View>
                    {open ? (
                        <DatePicker
                            onSelectedChange={(date) => {
                                setFormData({ ...formData, date: date, dateIsSet: true });
                                setOpen(!open);
                            }}
                            mode="calendar"
                            minimumDate={todaysDate}
                        />
                    ) : (
                        <></>
                    )}
                </View>
            </View>


            {formData.category === "Drone Delivery" ?
                <View style={styles.inputView}>
                    <TextInput
                        style={[formData.payloadIsSet ? styles.TextInput : styles.errorTextInput]}
                        placeholderTextColor="grey"
                        placeholder='Payload *'
                        keyboardType='numeric'
                        value={formData.payload}
                        onChangeText={(payload) => handlePayload(payload)}
                    />
                </View>
                : null}
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
        height: 55,
        color: 'white'
    }
})