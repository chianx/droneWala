import { View, Text, Button, TextInput, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Precise from './Precise';
import Description from './Description';
import {db} from '../firebase/databaseConfig'
import {set, ref, push} from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JobForm() {
    const [screen, setScreen] = useState(0)
    const FormTitle = [
        "Precise Details",
        "Descriptions"
    ]
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState(
        {
            // ShortDetails
            jobId: "",
            jobTitle: "",
            salRange: "",
            ftORpt: "",
            numOpen: "",
            date: "",
            jobTitleIsSet: false,
            salRangeIsSet: false,
            ftORptIsSet: false,
            numOpenIsSet: false,
            dateIsSet: false,
            logo: "",
            

            // LongDetails
            aboutJob: "",
            whoApply: "",
            aboutJobIsSet: false,
            whoApplyIsSet: false,
        }
    )
    const ScreenDisplay = () => {
        if (screen === 0) {
            return <Precise formData={formData} setFormData={setFormData}/>
        } else {
            return <Description formData={formData} setFormData={setFormData}/>
        }
    }
    const createUserInFirebase = () => {
        if(screen === 1) {
            var errMsg = "";
            var validate = false;
            
            // validate name
            if (!formData.aboutJobIsSet) {
                errMsg = "Invalid About"
                formData.aboutJobIsSet = false
            }else if(!formData.whoApplyIsSet)  {
                errMsg = "Invalid Who can Apply"
                formData.whoApplyIsSet = false
            }else validate = true;
            
            if(validate && formData.aboutJobIsSet && formData.whoApplyIsSet) {
                // navigation.navigate("Login")
                setErrorMessage("");
                var final =  { jobTitle: formData.jobTitle,salRange: formData.salRange,ftORpt: formData.ftORpt,numOpen: formData.numOpen,date: formData.date,aboutJob: formData.aboutJob,whoApply: formData.whoApply, }
                AsyncStorage.getItem("userData", (error, result) => {
                    if(error != null || result != null) {
                        console.error("Error in reading user logo");
                        return
                    }
                    var userJson = JSON.parse(result);
                    var refs = push(ref(db, "jobs/"));
                    setFormData({...final, jobId: refs.key, logo: userJson.logo});
                    set(refs, formData);
                })
            }
            else {
                setErrorMessage(errMsg);
            }
        }
    } 
    const callNext = () => {
        console.log(formData);
        if(screen === 0) {
            var errMsg = "";
            var validate = false;
            
            // validate name
            if(!formData.jobTitleIsSet)  {
                errMsg = "Invalid Job Title"
                formData.jobTitleIsSet = false
            }else if(!formData.salRangeIsSet) {
                errMsg = "Invalid Salary Range"
                formData.salRangeIsSet = false
            }else if (!formData.ftORptIsSet) {
                errMsg = "Set Job Type FT/PT"
                formData.ftORptIsSet = false
            }else if (!formData.numOpenIsSet) {
                errMsg = "Set Number of Openings"
                formData.numOpenIsSet = false
            }else if (!formData.dateIsSet) {
                errMsg = "Invalid Date of Form Close"
                formData.dateIsSet = false
            }else validate = true;
            
            if(validate && formData.jobTitleIsSet && formData.salRangeIsSet && formData.ftORptIsSet && formData.numOpenIsSet && formData.dateIsSet) {
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
                <TouchableOpacity
                    disabled={screen === 0}
                    onPress={() => {
                        setScreen((currScreen) => currScreen - 1)
                    }}>
                    <Text style={styles.button}>Previous</Text>
                </TouchableOpacity>
                {screen === 1 ? <TouchableOpacity onPress={() => {createUserInFirebase()}} style={styles.button}><Text>Submit</Text></TouchableOpacity> 
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