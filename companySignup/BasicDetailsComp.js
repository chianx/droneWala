import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MultipleSelectList } from 'react-native-dropdown-select-list'

export default function PersonalDetails({ formData, setFormData }) {
    const [selectedCategory, setSelectedCategory] = React.useState([]);
    const [logo, setLogo] = React.useState();

    const category = [
        { key: '1', value: 'Agriculture' },
        { key: '2', value: 'Delivery' },
        { key: '3', value: 'Survey Mapping' },
        { key: '4', value: 'Events' },
    ]

    return (
        <View>
            
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholderTextColor="white"
                    placeholder='CIN Number'
                    keyboardType='numeric'
                    //   maxLength={6}
                    value={formData.CINno}
                    onChangeText={(CINno) => {
                        setFormData({ ...formData, CINno });
                    }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholderTextColor="white"
                    placeholder='GST Number'
                    keyboardType='numeric'
                    value={formData.GSTno}
                    onChangeText={(GSTno) => {
                        setFormData({ ...formData, GSTno });
                    }}
                />
            </View>
            <View >
                <MultipleSelectList
                    setSelected={(val) => setSelectedCategory(val)}
                    data={category}
                    save="value"
                    onSelect={(category) => {
                        setFormData({ ...formData, category });
                    }}
                    label="Category"
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholderTextColor="white"
                    placeholder='Address House No/Street No/Area'
                    value={formData.address}
                    onChangeText={(address) => {
                        setFormData({ ...formData, address });
                    }}
                />
            </View>
            <View style={[styles.inputView]}>
                <TextInput
                    style={styles.TextInput}
                    placeholderTextColor="white"
                    placeholder='City'
                    value={formData.city}
                    onChangeText={(city) => {
                        setFormData({ ...formData, city });
                    }}
                />
            </View>
            <View style={[styles.inputView]}>
                <TextInput
                    style={styles.TextInput}
                    placeholderTextColor="white"
                    placeholder='State'
                    value={formData.state}
                    onChangeText={(state) => {
                        setFormData({ ...formData, state });
                    }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholderTextColor="white"
                    placeholder='Pincode'
                    keyboardType='numeric'
                    maxLength={6}
                    value={formData.pincode}
                    onChangeText={(pincode) => {
                        setFormData({ ...formData, pincode });
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        backgroundColor: "#ffc0cb",
        borderRadius: 15,
        width: 280,
        height: 45,
        marginBottom: 20,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        fontSize: 15,
        color: 'black'
    },
    passwordContainer: {
        position: 'absolute',
        right: 10
    }
})