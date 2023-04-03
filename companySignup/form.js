import { View, Text, Button, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
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
    const [formData, setFormData] = useState(
        {
            // PersonalDetails
            name: "",
            email: "",
            password: "",
            cpassword: "",

            // BasicDetails
            logo: "",
            CINno: "",
            GSTno: "",
            category: "",
            address: "",
            city: "",
            state: "",
            pincode: "",

            // CompanyDetails
            website: "",
            about: "",
            founded: "",
            numPeople: "",
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
    const handleSubmit = () => {
        // set(ref(db, 'posts/' + "101"), {formData})

        console.log(formData)
        navigation.navigate("Login")
    }
    return (
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
                    {screen === 2 ? <TouchableOpacity onPress={() => {handleSubmit()}} style={styles.button}><Text style={{color:'white'}}>Submit</Text></TouchableOpacity> 
                    : <Text style={styles.button}>Next</Text>}
                </Pressable>
            </View>
        </View>
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