import { View, Text, Button, ScrollView, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BasicDetails from './BasicDetails';
import PersonalDetails from './PersonalDetails';
import PilotDetails from './PilotDetails';
// import firestore from '@react-native-firebase/firestore';
import { db } from '../firebase/databaseConfig'
import {ref, set} from 'firebase/database'

export default function PilotForm({navigation}) {
    const [screen, setScreen] = useState(0)
    const FormTitle = [
        "Basic Details",
        "Personal Details",
        "Pilot Details"
    ]
    const [formData, setFormData] = useState(
        {
            // BasicDetails
            name: "",
            email: "",
            password: "",
            cpassword: "",
            contactNo: "",

            // PersonalDetails
            address: "",
            city: "",
            state: "",
            pincode: "",
            aadhar: "",

            // PilotDetails
            dcgaCert: false,
            certNum: "",
            droneSelect: [],
            experience: "",
        }
    )
    const ScreenDisplay = () => {
        if (screen === 0) {
            return <BasicDetails formData={formData} setFormData={setFormData}/>
        } else if (screen === 1) {
            return <PersonalDetails formData={formData} setFormData={setFormData}/>
        } else {
            return <PilotDetails formData={formData} setFormData={setFormData}/>
        }
    }
    const createUserInFirebase = () => {
        set(ref(db, 'users/'), {formData})

        console.log(formData)
        navigation.navigate("Login")
    } 
    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={styles.content}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>{FormTitle[screen]}</Text>
                <View>{ScreenDisplay()}</View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={screen === 0}
                    onPress={() => {
                        setScreen((currScreen) => currScreen - 1)

                    }}>
                    <Text style={styles.button}>Previous</Text>
                </Pressable>
                <Pressable 
                    disabled={screen === 2}
                    onPress={() => {
                        setScreen((currScreen) => currScreen + 1)
                    }}>
                    {screen === 2 ? <TouchableOpacity onPress={() => {createUserInFirebase()}} style={styles.button}><Text>Submit</Text></TouchableOpacity> 
                    : <Text style={styles.button}>Next</Text>}
                    
                </Pressable>
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    content: {
        marginTop:70
    },
    wrapper: {
        display: "flex",
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        color: "coral",
        fontWeight: "bold",
        marginVertical: 30
        // fontFamily: 
    },
    buttonContainer: {
        flexDirection: "row", 
        display: "flex", 
        alignItems: "center",
    },
    button: {
        justifyContent: "center", 
        color: "white",
        backgroundColor: "coral", 
        paddingVertical: 5, 
        paddingHorizontal: 25, 
        marginLeft: 35, 
        textAlign: "center",
        borderRadius: 10,
    }
})