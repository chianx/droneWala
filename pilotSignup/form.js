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
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState(
        {
            // BasicDetails
            name: "",
            email: "",
            dob: "",
            nameIsSet:false,
            dateIsSet:false,
            emailIsSet:false,

            // PersonalDetails
            address: "",
            city: "",
            state: "",
            pincode: "",
            aadhar: "",
            addressIsSet: false,
            cityIsSet: false,
            stateIsSet: false,
            pinIsSet: false,
            aadhaarIsSet: false,

            // PilotDetails
            dcgaCert: false,
            certNum: "",
            droneSelect: [],
            experience: "",
            selectedDroneIsSet: false,
            dcgaCertIsSet: false,
            experienceIsSet: false,
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
        if(screen === 2) {
            var errMsg = "";
            var validate = false;
            
            // validate name
            if (formData.dcgaCert && !formData.dcgaCertIsSet) {
                errMsg = "Enter the DCGA Number!"
                formData.dcgaCert = false
                formData.experienceIsSet = false
            }else if(!formData.experienceIsSet)  {
                errMsg = "Select the Experience!"
                formData.experienceIsSet = false
            }else validate = true;
            
            if(validate && formData.experienceIsSet && (!formData.dcgaCert || (formData.dcgaCert && formData.dcgaCertIsSet))) {
                navigation.navigate("Login")
                setErrorMessage("");
                var final =  { name: formData.name, email: formData.email, dob: formData.dob, address: formData.address, city: formData.city, state: formData.state, pincode: formData.pincode, aadhar: formData.aadhar, dcgaCert: formData.dcgaCert, certNum: formData.certNum, droneSelect: formData.droneSelect, experience: formData.experience}
                console.log(final)
            }
            else {
                setErrorMessage(errMsg);
            }
            // console.log(formData)
            
        }
        // set(ref(db, 'users/'), {formData})
        // Screen 2 Vadilaton
        // const userData = {name:formData.name}
    } 
    const callNext = () => {
        console.log(formData);
        if(screen === 0) {
            var errMsg = "";
            var validate = false;
            
            // validate name
            if(!formData.nameIsSet)  {
                errMsg = "Name Length too short"
                formData.nameIsSet = false
            }else if(!formData.dateIsSet) {
                errMsg = "DOB Not Set"
                formData.dateIsSet = false
            }else if (!formData.emailIsSet) {
                errMsg = "Invalid Email"
                formData.emailIsSet = false
            }
            else validate = true;
            
            if(validate && formData.nameIsSet && formData.dateIsSet && formData.emailIsSet) {
                setScreen((currScreen) => currScreen + 1);
                setErrorMessage("");
            }
            else {
                setErrorMessage(errMsg);
            }
        }else if(screen === 1) {
            var errMsg = "";
            var validate = false;
            
            // validate name
            if(!formData.addressIsSet)  {
                errMsg = "Invalid Address"
                formData.addressIsSet = false
            }else if (!formData.cityIsSet) {
                errMsg = "Invalid City"
                formData.cityIsSet = false
            }else if(!formData.stateIsSet) {
                errMsg = "Invalid State"
                formData.stateIsSet = false
            }else if(!formData.pinIsSet) {
                errMsg = "Invalid PIN Code"
                formData.pinIsSet = false
            }else if(!formData.aadhaarIsSet) {
                errMsg = "Invalid Aadhaar Number"
                formData.aadhaarIsSet = false
            }else validate = true;
            
            if(validate && formData.aadhaarIsSet && formData.addressIsSet && formData.cityIsSet && formData.stateIsSet && formData.pinIsSet) {
                setScreen((currScreen) => currScreen + 1);
                setErrorMessage("");
            }
            else {
                setErrorMessage(errMsg);
            }
        }
                
    }
    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={styles.content}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>{FormTitle[screen]}</Text>
                <View>{ScreenDisplay()}</View>
            </View>
            {errorMessage != "" ? <View style={{marginLeft:20, marginBottom: 20}}><Text style={{color:'red', borderRadius: 8, textAlign: 'center',width: 160, height: 30, }}>{errorMessage}</Text></View> : <></>}
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={screen === 0}
                    onPress={() => {
                        setScreen((currScreen) => currScreen - 1)

                    }}>
                    <Text style={styles.button}>Previous</Text>
                </Pressable>
                {screen === 2 ? <TouchableOpacity onPress={() => {createUserInFirebase()}} style={styles.button}><Text>Submit</Text></TouchableOpacity> 
                : <TouchableOpacity onPress={callNext}><Text style={styles.button}>Next</Text></TouchableOpacity>}
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
});