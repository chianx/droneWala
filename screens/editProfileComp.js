import React, { useState, useEffect } from 'react';
import { Image, View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import DatePicker from 'react-native-modern-datepicker';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { db } from '../firebase/databaseConfig'
import validator from 'validator';
import {storage} from '../firebase/firebase'
import { ref, getDownloadURL,uploadBytesResumable, uploadBytes} from 'firebase/storage';
import { ref as dbRef, update} from 'firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import * as ImagePicker from 'expo-image-picker'

const EditProfileModalComp = ({ visible, onClose, setUserPrev }) => {

  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const mount = async () => {
    const userdata = await AsyncStorage.getItem("userData");
    const val = JSON.parse(userdata)
    setUser(val);
  }
  useEffect(() => {
    mount();
  }, []);


  const [open, setOpen] = useState(false)
  const [date, setDate] = useState();

  const handleSave = () => {
    if (user.dateIsSet && user.emailIsSet && user.addressIsSet && user.stateIsSet && user.cityIsSet && user.pinIsSet && user.categoryIsSet && user.websiteIsSet && user.aboutIsSet) {

      update(dbRef(db, `users/${user.userId}`), user).then(() => {
        // Add loading icon.
        AsyncStorage.setItem("userData", JSON.stringify(user));
        Toast.show('Profile Updated!!', {
          backgroundColor:'#fda172',
          duration: Toast.durations.LONG,
          position: -100,
          shadow: true,
          borderRadius: 50, 
          animation: true,
          opacity: 100,
          hideOnPress: false
        });
      }).catch((error) => {
        // Correct this.
        setErrorMessage(error.toString);
        Toast.show('No Internet. Unable to update!!', {
          backgroundColor:'#fda172',
          duration: Toast.durations.LONG,
          position: -100,
          shadow: true,
          borderRadius: 50, 
          animation: true,
          hideOnPress: false
        });
      })
      console.log("DATA SAVED")
      setUserPrev(user);
      onClose();
    }
  };

  const [cat, setCat] = useState([])
  const handleButtonOpen = () => {
    setOpen(!open);
    setUser({ ...user, foundedin: date, dateIsSet: true })
  }
  const category = [
    { key: '1', value: 'Agriculture' },
    { key: '2', value: 'Delivery' },
    { key: '3', value: 'Survey Mapping' },
    { key: '4', value: 'Events' },
  ]

  const numPeople = [
    { key: '1', value: '1 - 10' },
    { key: '2', value: '10 - 20' },
    { key: '3', value: '20 - 30' },
    { key: '4', value: '30 - 50' },
    { key: '5', value: '50+' },
  ]
  const handleWebsiteChange = (website) => {
    if (validator.isURL(website)) {
      setUser({ ...user, website, websiteIsSet: true })
    } else {
      setUser({ ...user, website, websiteIsSet: true })
    }
  }
  const handleAboutChange = (about) => {
    if (about.trim().length >= 50) {
      setUser({ ...user, about, aboutIsSet: true })
    } else {
      setUser({ ...user, email, aboutIsSet: false })
    }
  }
  
  const handleAddressChange = (address) => {
    if (address.trim().length >= 4) {
      setUser({ ...user, address, addressIsSet: true })
    } else {
      setUser({ ...user, address, addressIsSet: false })
    }
  }
  const handleEmailChange = (email) => {
    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(validRegex)) {
      setUser({ ...user, email, emailIsSet: true })
    } else {
      setUser({ ...user, email, emailIsSet: false })
    }
  }
  const handleCityChange = (city) => {
    if (city.trim().length >= 3) {
      setUser({ ...user, city, cityIsSet: true })
    } else {
      setUser({ ...user, city, cityIsSet: false })
    }
  }
  const handleStateChange = (state) => {
    if (state.trim().length >= 5) {
      setUser({ ...user, state, stateIsSet: true })
    } else {
      setUser({ ...user, state, stateIsSet: false })
    }
  }
  const handlePinChange = (pincode) => {
    if (pincode.trim().length === 6) {
      setUser({ ...user, pincode, pinIsSet: true })
    } else {
      setUser({ ...user, email, pinIsSet: false })
    }
  }

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
            setUser({...user, logo: downloadURL, logoIsSet: true});
            console.log('File available at', downloadURL);
          });
        });
      // Save image code ends from here
    }

  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ alignItems: 'center', padding: 15, backgroundColor: 'coral', elevation: 15 }}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <AntDesign name="close" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.heading}>Edit Company Profile</Text>
      </View>
      <ScrollView>
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>

            <Text style={styles.label}>Company Logo</Text>
            <View style={{ width: '100%', alignItems:'center'}}>
              <TouchableOpacity onPress={() => pickImage()} style={[styles.logobtn, user.logoIsSet ? null : {borderColor: "red"}]}><Text style={{ color: 'grey', fontSize: 17 }}>Change Profile (Click Here)</Text></TouchableOpacity>
              {<Image source={{ uri: image === null ?  user.logo : image }} style={{ width: 180, height: 180, marginBottom: 15, borderRadius:10}} />}
            </View>

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[user.emailIsSet ? styles.TextInput : styles.errorTextInput]}
              placeholderTextColor="grey"
              placeholder={user.email}
              value={user.email}
              onChangeText={(email) => handleEmailChange(email)}
            />
            <Text style={styles.label}>Address House No/Street No/Area</Text>
            <TextInput
              style={[user.addressIsSet ? styles.TextInput : styles.errorTextInput]}
              placeholderTextColor="grey"
              placeholder={user.address}
              value={user.address}
              onChangeText={(address) => handleAddressChange(address)}
            />
            <Text style={styles.label}>State</Text>
            <TextInput
              style={[user.stateIsSet ? styles.TextInput : styles.errorTextInput]}
              placeholderTextColor="grey"
              placeholder={user.state}
              value={user.state}
              onChangeText={(state) => handleStateChange(state)}
            />
            <Text style={styles.label}>City</Text>
            <TextInput
              style={[user.cityIsSet ? styles.TextInput : styles.errorTextInput]}
              placeholderTextColor="grey"
              placeholder={user.city}
              value={user.city}
              onChangeText={(city) => handleCityChange(city)}
            />
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={[user.pinIsSet ? styles.TextInput : styles.errorTextInput]}
              placeholderTextColor="grey"
              placeholder={user.pincode}
              value={user.pincode}
              onChangeText={(pincode) => handlePinChange(pincode)}
              keyboardType='numeric'
              maxLength={6}
            />
            <Text style={styles.label}>Website</Text>
            <TextInput
              style={[user.websiteIsSet ? styles.TextInput : styles.errorTextInput]}
              placeholderTextColor="grey"
              placeholder={user.website}
              value={user.website}
              onChangeText={(website) => handleWebsiteChange(website)}
            />
            <Text style={styles.label}>About</Text>
            <TextInput
              style={[user.aboutIsSet ? styles.TextInput : styles.errorTextInput, { height: 160, textAlignVertical: 'top', }]}
              placeholderTextColor="grey"
              placeholder={user.about}
              value={user.about}
              multiline
              numberOfLines={8}
              maxLength={1000}
              onChangeText={(about) => handleAboutChange(about)}
            />

            <View style={{ marginBottom: 10, width: 270 }}>
              <Text style={styles.label}>Founded In</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  editable={false}
                  placeholderTextColor="grey"
                  placeholder={user.foundedin}
                  value={user.foundedin}
                  style={[user.dateIsSet ? { width: 140, color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', padding: 5, borderColor: 'grey', marginRight: 20, marginBottom: 15 } : { color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', padding: 5, borderColor: 'red', marginRight: 20, marginBottom: 15 }]}
                />

                {open ? <TouchableOpacity onPress={handleButtonOpen} style={{ padding: 0 }}><Text style={styles.btn}>Select</Text></TouchableOpacity> :
                  <TouchableOpacity onPress={() => { setOpen(!open) }} style={{ padding: 0 }}><Text style={styles.btn}>Choose Date</Text></TouchableOpacity>
                }
              </View>
              {open ? <DatePicker
                onSelectedChange={date => setDate(date)}
                mode="calendar"
              /> : <></>}
            </View>

            <View style={{ marginBottom: 20, width: 300 }}>
              <Text style={styles.label}>Number of Employees</Text>
              <SelectList
                placeholder={user.numPeople}
                setSelected={(val) => {
                  setUser({ ...user, numPeople: val, numIsSet: true })
                  
                }}
                data={numPeople}
                save="value"
                search={false}
                boxStyles={[user.numPeopleIsSet ? null : { borderColor: "red" }, { backgroundColor: "white" }]}
                label="NumPeople"
              />
            </View>
            <View style={{ marginBottom: 20, width: 300 }}>
              <Text style={styles.label}>Categories</Text>
              <MultipleSelectList
                setSelected={(val) => {
                  setCat(val)
                  
                }}
                data={category}
                save="value"
                label="Categories"
                boxStyles={[user.categoryIsSet ? null : { borderColor: "red" }, { backgroundColor: "white" }]}
                onSelect={() => {
                  setUser({ ...user, category: cat, categoryIsSet: true })
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ alignItems: 'center', width: '100%', backgroundColor: 'white', position: 'absolute', bottom: 0, borderTopWidth: 1, borderTopColor: 'grey', marginVertical: 7 }}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    // backgroundColor: '#fff',
    padding: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 60
  },
  heading: {
    fontSize: 22,
    fontWeight: 500,
    color: 'white'
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 7,
    marginLeft: 3,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: 'coral',
    paddingVertical: 10,
    width: '90%',
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    elevation: 5
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 500
  },
  TextInput: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
    width: 300,
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
    width: 300,
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
    fontSize: 15,
    color: 'grey'
  },
  btn: {
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9A9A9',
    fontSize: 15,
    borderRadius: 8,
    padding: 9,
    width: 135,
    color: 'white'
  },
  logobtn: {
    backgroundColor: "#e0e0e0",
    borderColor: "black",
    borderRadius: 8,
    width: 300,
    height: 45,
    marginBottom: 10,
    alignItems:'center',
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
      alignItems:'center',
      borderWidth:1,
      borderColor:'grey',
      paddingHorizontal: 15,
      justifyContent: 'center'
    }
});

export default EditProfileModalComp;