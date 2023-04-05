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
            isName:false,
            isEmail:false,
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
        // set(ref(db, 'users/'), {formData})
        // Screen 2 Vadilaton
        console.log(formData)
        // const userData = {name:formData.name}
        navigation.navigate("Login")
    } 

    const callNext = () => {
        console.log(formData);
        if(screen === 0) {
            var errMsg = "";
            var validate = false;
            // validate name
            if(formData.name.length <= 2)  errMsg = "Name length... short"
            // else if (email is wrong) errorMsg = "...."
            else validate = true;

            if(validate && formData.isName && formData.isEmail) {
                setScreen((currScreen) => currScreen + 1);
            }
            else {
                setErrorMessage(errMsg);
            }
        }else if(screen === 1) {
            // validate address 
            // validate city, pincode, etc
            // if(validate === true && isAdhar && isCity) {
                setScreen((currScreen) => currScreen + 1);
            // }else {
                // show error message in red generated through validation process
            // }
        }
                
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

                {screen === 2 ? <TouchableOpacity onPress={() => {createUserInFirebase()}} style={styles.button}><Text>Submit</Text></TouchableOpacity> 
                : <TouchableOpacity onPress={callNext}><Text style={styles.button}>Next</Text></TouchableOpacity>}
                    

            </View>
            {errorMessage != "" ? <View><Text style={{color:'red'}}>{errorMessage}</Text></View> : <></>}
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