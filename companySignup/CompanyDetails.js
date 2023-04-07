import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import * as ImagePicker from 'expo-image-picker'
import validator from 'validator'
import {storage} from '../firebase/firebase'
import { ref, getDownloadURL,uploadBytesResumable, uploadBytes} from 'firebase/storage';

export default function PersonalDetails({ formData, setFormData }) {
  const [selectedNumPeople, setSelectedNumPeople] = React.useState("");
  const [websiteIsSet, setwebsiteIsSet] = useState(false)
  const [aboutIsSet, setaboutIsSet] = useState(false)
  const [peopleIsSet, setpeopleIsSet] = useState(false)
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
            setFormData({ ...formData, logo: downloadURL })
            console.log('File available at', downloadURL);
          });
        });
      // Save image code ends from here
    }

  };

  if (hasGalleryPermission === false) {
    return <Text>No access to gallery</Text>
  }

  const numPeople = [
    { key: '1', value: '1 - 10' },
    { key: '2', value: '10 - 20' },
    { key: '3', value: '20 - 50' },
    { key: '4', value: '50+' },
  ]
  const handleWebsiteChange = (website) => {
    if (validator.isURL(website)) {
      setFormData({ ...formData, website: website, websiteIsSet: true });
    } else {
      setFormData({ ...formData, website: website, websiteIsSet: false });
    }
  }
  const handleAboutChange = (about) => {
    if (about.trim().length >= 50) {
      setFormData({ ...formData, about: about, aboutIsSet: true });
    } else {
      setFormData({ ...formData, about: about, aboutIsSet: false });
    }
  }
  return (
    <View>

      <View style={{ width: '100%', marginBottom:20, alignItems:'center'}}>
        <TouchableOpacity onPress={() => pickImage()} style={[styles.logobtn]}><Text style={{ color: 'black', fontSize: 16 }}>Select Logo</Text></TouchableOpacity>
        {image && <Image source={{ uri: image }} style={{ width: 180, height: 180, marginBottom: 15, borderRadius:10}} />}
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={[formData.websiteIsSet ? styles.TextInput : styles.errorTextInput]}
          placeholderTextColor="grey"
          placeholder='Website URL *'
          value={formData.website}
          onChangeText={(website) => handleWebsiteChange(website)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={[formData.aboutIsSet ? styles.TextInput : styles.errorTextInput]}
          placeholderTextColor="grey"
          placeholder='About *'
          multiline={true}
          value={formData.about}
          onChangeText={(about) => handleAboutChange(about)}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <SelectList
          setSelected={(val) => {
            setSelectedNumPeople(val)
            setpeopleIsSet(true)
            setFormData({ ...formData, numPeople: selectedNumPeople });
            console.log(formData)

          }}
          data={numPeople}
          save="value"
          search={false}
          placeholder='Select Number of Employees *'
          boxStyles={[peopleIsSet ? null : { borderColor: "red" }, { backgroundColor: "white" }]}
          label="Employees"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputView: {
    width: 280,
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  TextInput: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
    width: 280,
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
    fontSize: 15,
    color: 'grey'
  },
  errorTextInput: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'red',
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
    right: 10
  },
  logobtn: {
    backgroundColor: "white",
    borderColor: "black",
    color: "black",
    borderRadius: 8,
    width: 280,
    height: 45,
    marginBottom: 10,
    // alignItems:'center',
    borderWidth:1,
    borderColor:'grey',
    paddingHorizontal: 15,
    justifyContent: 'center'
  }
})