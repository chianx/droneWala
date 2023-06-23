import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-native-modern-datepicker';
import * as ImagePicker from 'expo-image-picker'
import validator from 'validator'
import {storage} from '../firebase/firebase'
import { ref, getDownloadURL,uploadBytesResumable, uploadBytes} from 'firebase/storage';

export default function PersonalDetails({ formData, setFormData }) {

    const [date, setDate] = useState('');
    const handleButtonOpen = () => {
        setOpen(!open);
        if (date.trim() !== '') setFormData({ ...formData, foundedin: date, dateIsSet: true });
        else setFormData({ ...formData, foundedin: date, dateIsSet: false });
    }
    const [open, setOpen] = useState(false)
    const date1 = new Date();
    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const day = date1.getDate();
    const todaysDate = year + '-0' + month + '-' + day;


    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            // Save image code starts from here
            
            const metadata = {
                contentType: 'image/jpeg'
            };
            const storageRef = ref(storage, 'profiles/' + Date.now())
            const blobImage = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function () {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", result.assets[0].uri, true);
                xhr.send(null);
            })
            const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setFormData({ ...formData, logo: downloadURL, logoIsSet: true })
                        console.log('File available at', downloadURL);
                    });
                });
            // Save image code ends from here
        }

    };

    if (hasGalleryPermission === false) {
        return <Text>No access to gallery</Text>
    }

    const handleNameChange = (name) => {
        if (name.trim().length > 2) {
            setFormData({ ...formData, name: name, nameIsSet: true });
        } else {
            setFormData({ ...formData, name: name, nameIsSet: false });
        }
    }
    const handleInstNameChange = (instituteName) => {
        if (instituteName.trim().length > 3) {
            setFormData({ ...formData, instituteName: instituteName, instituteIsSet: true });
        } else {
            setFormData({ ...formData, instituteName: instituteName, instituteIsSet: false });
        }
    }
    const handleEmailChange = (email) => {
        email = email.trim();
        var validRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if (email.match(validRegex)) {
            setFormData({ ...formData, email: email, emailIsSet: true });
        } else {
            setFormData({ ...formData, email: email, emailIsSet: false });
        }
    }
    const handlePNoChange = (contactNum) => {
        if (contactNum.trim().length === 10) {
            setFormData({ ...formData, contactNum: contactNum, contactNumIsSet:true });
        } else {
            setFormData({ ...formData, contactNum: contactNum, contactNumIsSet:false });
        }
      }
      const handleRegChange = (registrationNum) => {
        if (registrationNum.trim().length === 10) {
            setFormData({ ...formData, registrationNum: registrationNum, registrationNumIsSet:true });
        } else {
            setFormData({ ...formData, registrationNum: registrationNum, registrationNumIsSet:false });
        }
      }
    return (
        <View>
            <View style={{ width: '100%', marginBottom: 20, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => pickImage()} style={[styles.logobtn, formData.logoIsSet ? null : { borderColor: "red" }]}><Text style={{ color: 'grey', fontSize: 17 }}>Select Logo * (Click Here)</Text></TouchableOpacity>
                {image && <Image source={{ uri: image }} style={{ width: 180, height: 180, marginBottom: 15, borderRadius: 10 }} />}
            </View>
            <View>
                <TextInput
                    style={[formData.instituteIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Institute Name *'
                    value={formData.instituteName}
                    onChangeText={(instituteName) => handleInstNameChange(instituteName)}
                />
            </View>
            <View>
                <TextInput
                    style={[formData.nameIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Contact Person Name *'
                    value={formData.name}
                    onChangeText={(name) => handleNameChange(name)}
                />
            </View>
            <View>
                <TextInput
                    style={[formData.emailIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Email *'
                    value={formData.email}
                    onChangeText={(email) => handleEmailChange(email)}
                />
            </View>
            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'column' }}>
                    
                    <Text style={{paddingBottom: 10}}>Founded In: *</Text>
                    {open ? <TouchableOpacity onPress={handleButtonOpen} style={{ padding: 0 }}><TextInput
                        editable={false}
                        placeholderTextColor="grey"
                        placeholder='Date of Founding *'
                        value={formData.foundedin}
                        style={{ width: 300, fontSize: 17, height: 55, color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', borderColor: formData.dateIsSet ? 'grey' : 'red', marginBottom: 15 }}
                    /></TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setOpen(!open) }} style={{ padding: 0 }}>
                        <TextInput
                            editable={false}
                            placeholderTextColor="grey"
                            placeholder='Date of Founding *'
                            value={formData.foundedin}
                            style={{ width: 300, fontSize: 17, height: 55, color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', borderColor: formData.dateIsSet ? 'grey' : 'red', marginBottom: 15 }}
                    /></TouchableOpacity>
                    }
                </View>
                <View>
                    {open ? <DatePicker
                        onSelectedChange={(date) => {
                            setFormData({ ...formData, foundedin: date, dateIsSet: true });
                            setOpen(!open);
                        }}
                        mode="calendar"
                        maximumDate={todaysDate}
                    /> : <></>}
                </View>
            </View>
            <View>
                <TextInput
                style={[formData.contactNumIsSet ? styles.TextInput : styles.errorTextInput]}
                placeholderTextColor="grey"
                placeholder='Phone Number *'
                keyboardType='numeric'
                required={true}
                maxLength={10}
                value={formData.contactNum}
                onChangeText={(contactNum) => handlePNoChange(contactNum)}
                />
            </View>
            <View>
                <TextInput
                style={[formData.registrationNumIsSet ? styles.TextInput : styles.errorTextInput]}
                placeholderTextColor="grey"
                placeholder='Registration Number *'
                keyboardType='numeric'
                required={true}
                maxLength={10}
                value={formData.registrationNum}
                onChangeText={(registrationNum) => handleRegChange(registrationNum)}
                />
            </View>
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
        // alignItems: "flex-start",
        justifyContent: "center",
        padding: 15,
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
        // alignItems: "flex-start",
        justifyContent: "center",
        padding: 15,
        fontSize: 17,
        color: 'grey'
    },
    passwordContainer: {
        position: 'absolute',
        right: 10
    },
    btn: {
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#A9A9A9',
        fontSize: 15,
        borderRadius: 8,
        height: 55,
        padding: 15,
        width: 135,
        color: 'white'
    },
      logobtn: {
        backgroundColor: "white",
        borderColor: "black",
        borderRadius: 8,
        width: 300,
        height: 55,
        marginBottom: 10,
        // alignItems:'center',
        borderWidth:1,
        borderColor:'grey',
        paddingHorizontal: 15,
        justifyContent: 'center'
      }
})