import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function BasicDetails({ formData, setFormData }) {
    const [secureEntry, setSecureEntry] = useState(true)
    const [secureEntryC, setSecureEntryC] = useState(true)
  return (
    <>
        <View>
            <TextInput
                style={styles.TextInput}
                placeholderTextColor="grey"
                placeholder='Full Name'
                value={formData.name}
                onChangeText={(name) => {
                    let isName = true;
                    setFormData({ ... formData, name,isName });
                }}
            />
        </View>
        <View>
            <TextInput
                style={styles.TextInput}
                placeholderTextColor="grey"
                placeholder='Email'
                value={formData.email}
                onChangeText={(email) => {
                    let isEmail = true;
                    setFormData({ ... formData, email, isEmail });
                }}
            />
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    TextInput: {
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth:1,
        borderColor:'grey',
        width: 280,
        height: 45,
        marginBottom: 20,
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 10,
        fontSize: 15,
        color: 'grey'
    },
    passwordContainer: {
        position: 'absolute',
        right: 15,
        top:13
    }
})