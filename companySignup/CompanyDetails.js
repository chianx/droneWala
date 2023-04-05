import { View, Text, TextInput, StyleSheet,Image, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';
// import {storage} from '../firebase/firebase';
// import { ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

export default function PersonalDetails({ formData, setFormData }) {
    const [selectedNumPeople, setSelectedNumPeople] = React.useState("");

    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
      (async () => {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
      })();

      console.log(Date.now())
    }, []);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4,3],
        quality:1
      });

      if(!result.canceled) {
        setImage(result.assets[0].uri);
        console.log(image);
      }

    };

    if(hasGalleryPermission === false) {
      return <Text>No access to gallery</Text>
    }

    const numPeople = [
      { key: '1', value: '1 - 10' },
      { key: '2', value: '10 - 20' },
      { key: '3', value: '20 - 50' },
      { key: '4', value: '50+' },
    ]
  return (
    <View>

      <View style= {{ width:'100%', heigth:210}}>
        <TouchableOpacity onPress={() => pickImage() } style={styles.logobtn}><Text style={{color:'white', fontSize:16}}>Select Logo</Text></TouchableOpacity>
        {image && <Image source={{uri:image}} style={{width:'100%', height: 130, marginBottom:15}}/> } 
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="white"
          placeholder='Website URL'
          value={formData.website}
          onChangeText={(website) => {
            setFormData({ ...formData, website });
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="white"
          placeholder='About'
          multiline={true}
          value={formData.about}
          onChangeText={(about) => {
            setFormData({ ...formData, about });
          }}
        />
      </View>
      <View >
        <SelectList
          setSelected={(val) => setSelectedNumPeople(val)}
          data={numPeople}
          save="value"
          search={false}
          onSelect={(droneSelect) => {
            setFormData({ ...formData, droneSelect });
          }}
          label="Experience"
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
      // alignItems: "flex-start", 
      justifyContent: "center",
  },
  TextInput: {
      height: 50,
      // flex: 1,
      padding: 10,
      fontSize: 15,
      color: 'black'
  },
  passwordContainer: {
      position: 'absolute',
      right: 10
  },
  logobtn: {
      backgroundColor: "coral",
      borderRadius: 15,
      width: 280,
      height: 45,
      marginBottom: 10,
      marginBottom: 10,
      // alignItems:'center',
      paddingHorizontal:15,
      justifyContent:'center'
  }
})