import { View, Text, Button, TextInput, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Precise from './Precise';
import Description from './Description';

export default function JobForm() {
    const [screen, setScreen] = useState(0)
    const FormTitle = [
        "Precise Details",
        "Descriptions"
    ]
    const [formData, setFormData] = useState(
        {
            // ShortDetails
            jobTitle: "",
            salRange: "",
            ftORpt: "",
            numOpen: "",
            date: "",

            // LongDetails
            aboutJob: "",
            whoApply: ""
        }
    )
    const ScreenDisplay = () => {
        if (screen === 0) {
            return <Precise formData={formData} setFormData={setFormData}/>
        } else {
            return <Description formData={formData} setFormData={setFormData}/>
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
                <TouchableOpacity
                    disabled={screen === 0}
                    onPress={() => {
                        setScreen((currScreen) => currScreen - 1)

                    }}>
                    <Text style={styles.button}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    disabled={screen === 1}
                    onPress={() => {
                        setScreen((currScreen) => currScreen + 1)
                    }}>
                    {screen === 1 ? <TouchableOpacity onPress={() => {console.log(formData)}} style={styles.button}><Text style={{color:'white'}}>Submit</Text></TouchableOpacity> 
                    : <Text style={styles.button}>Next</Text>}
                    
                </TouchableOpacity>
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