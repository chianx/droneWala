import { View, Text, Button, TextInput, StyleSheet, Pressable, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import BasicDetails from './BasicDetailsComp';
import PersonalDetails from './PersonalDetailsComp';
import CompanyDetails from './CompanyDetails';

export default function Form({navigation}) {
    const [screen, setScreen] = useState(0)
    const FormTitle = [
        "Personal Details",
        "Basic Details",
        "Company Details"
    ]
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState(
        {
            // PersonalDetails
            name: "",
            email: "",
            foundedin : "",
            nameIsSet:false,
            dateIsSet:false,
            emailIsSet:false,

            // BasicDetails
            CINno: "",
            GSTno: "",
            category: [],
            address: "",
            city: "",
            state: "",
            pincode: "",
            addressIsSet:false,
            cityIsSet:false,
            stateIsSet:false,
            pinIsSet:false,
            cinIsSet:false,
            gstIsSet:false,

            // CompanyDetails
            logo: "", // Fix Later
            website: "",
            about: "",
            numPeople: "",
            websiteIsSet : false,
            aboutIsSet: false,
        }
    )
    const ScreenDisplay = () => {
        if (screen === 0) {
            return <PersonalDetails formData={formData} setFormData={setFormData}/>
        } else if (screen === 1) {
            return <BasicDetails formData={formData} setFormData={setFormData}/>
        } else {
            return <CompanyDetails formData={formData} setFormData={setFormData}/>
        }
    }
    const createUserInFirebase = () => {
        if(screen === 2) {
            var errMsg = "";
            var validate = false;
            
            // validate name
            if(!formData.websiteIsSet)  {
                errMsg = "Invalid Website, Try including https"
                formData.websiteIsSet = false
            }else if (!formData.aboutIsSet) {
                errMsg = "Invalid About"
                formData.aboutIsSet = false
            }else validate = true;
            
            if(validate && formData.websiteIsSet && formData.aboutIsSet) {
                navigation.navigate("Login")
                setErrorMessage("");
            }
            else {
                setErrorMessage(errMsg);
            }
            console.log(formData)
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
            }else if (!formData.emailIsSet) {
                errMsg = "Invalid Email"
                formData.emailIsSet = false
            }else if(!formData.dateIsSet) {
                errMsg = "Date Not Set"
                formData.dateIsSet = false
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
            if(!formData.cinIsSet) {
                errMsg = "Invalid CIN Number"
                formData.cinIsSet = false
            }else if(!formData.gstIsSet) {
                errMsg = "Invalid GST Number"
                formData.gstIsSet = false
            }else if(!formData.addressIsSet)  {
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
            }else validate = true;
            
            if(validate && formData.cinIsSet && formData.gstIsSet && formData.addressIsSet && formData.cityIsSet && formData.stateIsSet && formData.pinIsSet) {
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
        marginTop: 10
    },
    wrapper: {
        // display: "flex",
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
