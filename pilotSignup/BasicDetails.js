import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import validator from 'validator'
import {storage} from '../firebase/firebase'
import { ref, getDownloadURL,uploadBytesResumable, uploadBytes} from 'firebase/storage';
import DatePicker from 'react-native-modern-datepicker';

export default function BasicDetails({ formData, setFormData }) {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [fname, setFname] = useState(formData.name);
    const [fnameSet, setFnameSet] = useState(formData.nameIsSet);

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
      console.log("Hello", image);
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
            setFormData({ ...formData, profile: downloadURL, profileIsSet: true })
            console.log('File available at', downloadURL);
          });
        });
      // Save image code ends from here
    }

  };

  if (hasGalleryPermission === false) {
    return <Text>No access to gallery</Text>
  }
    const [date, setDate] = useState('');
    const handleButtonOpen = () => {
        setOpen(!open);
        if(date.length !== '') setFormData({ ...formData, dob: date, dateIsSet: true });
        else setFormData({ ...formData, dob: date, dateIsSet: false });
    }
    const [open, setOpen] = useState(false)
    const date1 = new Date();
    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const day = date1.getDate();
    const todaysDate = year + '-0' + month + '-' + day;

    const handleNameChange = (name) => {
      setFname(name);
        if (formData.name.trim().length >= 2) {
          setFnameSet(true);
            setFormData({ ...formData, name:name, nameIsSet: true});
        } else {
          setFnameSet(false);
          setFormData({ ...formData, name:name, nameIsSet: false});
        }
    }
    const handleEmailChange = (email) => {
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (formData.email.match(validRegex)) {
            setFormData({ ...formData, email: email, emailIsSet: true });
        } else {
            setFormData({ ...formData, email: email, emailIsSet: false });
        }
    }

    return (
        <>
        <View style={{ width: '100%', marginBottom:20, alignItems:'center'}}>
        <TouchableOpacity onPress={() => pickImage()} style={[styles.logobtn, formData.profileIsSet ? null : {borderColor: "red"}]}><Text style={{ color: 'grey', fontSize: 17 }}>Select Profile (Click Here)</Text></TouchableOpacity>
        {image && <Image source={{ uri: image }} style={{ width: 180, height: 180, marginBottom: 15, borderRadius:10}} />}
      </View>
            <View style={styles.inputView}>
                <TextInput
                    style={[fnameSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Full Name *'
                    value={fname}
                    onChangeText={(name) => handleNameChange(name)}
                />
            </View>

            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'column' }}>
                    
                    <Text style={{paddingBottom: 10}}>Date of Birth: *</Text>
                    {open ? <TouchableOpacity onPress={handleButtonOpen} style={{ padding: 0 }}><TextInput
                        editable={false}
                        placeholderTextColor="grey"
                        placeholder='Date of Birth *'
                        value={formData.dob}
                        style={{ width: 280, fontSize: 17, height: 55, color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', borderColor: formData.dateIsSet ? 'grey' : 'red', marginRight: 20, marginBottom: 15 }}
                    /></TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setOpen(!open) }} style={{ padding: 0 }}><TextInput
                        editable={false}
                        placeholderTextColor="grey"
                        placeholder='Date of Birth *'
                        value={formData.dob}
                        style={{ width: 280, fontSize: 17, height: 55, color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', borderColor: formData.dateIsSet ? 'grey' : 'red', marginRight: 20, marginBottom: 15 }}
                    /></TouchableOpacity>
                    }
                </View>
                <View>
                    {open ? <DatePicker
                        onSelectedChange={(date) => {
                          setFormData({ ...formData, dob: date, dateIsSet: true });
                          setOpen(!open);
                        }}
                        mode="calendar"
                        maximumDate={todaysDate}
                    /> : <></>}
                </View>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={[formData.emailIsSet ? styles.TextInput : styles.errorTextInput]}
                    placeholderTextColor="grey"
                    placeholder='Email *'
                    value={formData.email}
                    onChangeText={(email) => handleEmailChange(email)}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    TextInput: {
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey',
        width: 280,
        height: 55,
        marginBottom: 20,
        alignItems: "flex-start",
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
        width: 280,
        height: 55,
        marginBottom: 20,
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 15,
        fontSize: 17,
        color: 'grey'
    },
    btn: {
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#A9A9A9',
        fontSize: 15,
        borderRadius: 8,
        height:55,
        padding: 15,
        width: 135,
        color: 'white'
    },
    logobtn: {
        backgroundColor: "white",
        borderColor: "black",
        borderRadius: 8,
        width: 280,
        height: 55,
        marginBottom: 10,
        // alignItems:'center',
        borderWidth:1,
        borderColor:'grey',
        paddingHorizontal: 15,
        justifyContent: 'center'
      },
      errorlogobtn: {
          backgroundColor: "white",
          borderColor: "red",
          borderRadius: 8,
          width: 280,
          height: 55,
          marginBottom: 10,
          // alignItems:'center',
          borderWidth:1,
          borderColor:'grey',
          paddingHorizontal: 15,
          justifyContent: 'center'
        }
})