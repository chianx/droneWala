import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import validator from 'validator'
import {storage} from '../firebase/firebase'
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes } from 'firebase/storage';
import {set, ref as dbRefs, push, runTransaction, get, child} from 'firebase/database';
import Checkbox from 'expo-checkbox';
import * as DocumentPicker from "expo-document-picker";
import { AntDesign } from "@expo/vector-icons";

export default function StepTwo({ formData, setFormData }) {
  const [isChecked, setChecked] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  if (hasGalleryPermission === false) {
    return <Text>No access to gallery</Text>
  }

  // file upload
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState(null);
  const [error, setError] = useState("");
  const [answerExists, setAnswerExists] = useState(false);
  const [fileExists, setFileExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectDoc = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    if (result.type === "success") {
        let file = result.uri;
      console.log(result);
      setFile(result.uri);
      setFileName(result.name);
      setFileExists(true);
      
      const metadata = {
        // contentType: "application/pdf",
      };
      const storageRef = ref(storage, "kmlFile/" + Date.now());
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", file, true); /// needs file
        xhr.send(null);
      });
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            setUrl(downloadURL);
            if (downloadURL != null) {
              // Add the answer to the firebase database.
              setFormData({...formData, KML_File: downloadURL, fileName: result.name, KML_FileIsSet: true, fileNameIsSet: true})
              setIsLoading(false);
            }
          });
        }
      );
      // OpenAnything.Pdf(result.uri);
    }
  };
  const handleSubmit = async () => {
    
      // setIsLoading(true);
      
      
    
  };
    // Verifications
  const handleWorkDetails = (workDetails) => {
    if(formData.workDetails.trim().length >= 50) {
      setFormData({ ...formData, workDetails:workDetails, workDetailsIsSet: true });
    }else if (formData.workDetails.trim().length < 50) {
        setFormData({ ...formData, workDetails:workDetails, workDetailsIsSet: false });
    }
  }
  const handleBidCriteria = (bidCriteria) => {
    if(formData.bidCriteria.trim().length >= 50) {
      setFormData({ ...formData, bidCriteria:bidCriteria, bidCriteriaIsSet: true });
    }else if (formData.bidCriteria.trim().length < 50){
        setFormData({ ...formData, bidCriteria:bidCriteria, bidCriteriaIsSet: false });
    }
  }

  const handleMaxBid = (maximumBid) => {
    if(parseInt(maximumBid.trim()) > 0) {
      setFormData({ ...formData, maximumBid:maximumBid.trim(), maximumBidIsSet: true });
    }else {
      setFormData({ ...formData, maximumBid:maximumBid.trim(), maximumBidIsSet: false });
    }
}

  return (
    <View>
      <Text style={{ paddingBottom: 7, fontSize:17, color:'grey', fontWeight:500}}>Enter Work Details</Text>
      <View style={styles.inputView}>
        <TextInput
          style={[formData.workDetailsIsSet ? styles.textArea : styles.errortextArea]}
          placeholderTextColor="grey"
          placeholder='Work Details *'
          multiline
          numberOfLines={4}
          maxLength={100}
          value={formData.workDetails}
          onChangeText={(workDetails) => handleWorkDetails(workDetails)}
        />
      </View>

      <Text style={{ paddingBottom: 7, fontSize:17, color:'grey', fontWeight:500}}>Enter Bid Criteria</Text>
      <View style={styles.inputView}>
        <TextInput
          style={[formData.bidCriteriaIsSet ? styles.textArea : styles.errortextArea]}
          placeholderTextColor="grey"
          placeholder='Bid Criteria *'
          multiline
          numberOfLines={4}
          maxLength={100}
          value={formData.bidCriteria}
          onChangeText={(bidCriteria) => handleBidCriteria(bidCriteria)}
        />
      </View>

        <Text style={{ paddingBottom: 7, fontSize:17, color:'grey', fontWeight:500 }}>Maximum Bid</Text>
        <View style={{ width: '100%', marginBottom:20, alignItems:'center'}}>
            <TextInput
                style={[formData.maximumBidIsSet ? styles.TextInput : styles.errorTextInput]}
                placeholderTextColor="grey"
                placeholder='Maximum Bid *'
                keyboardType='numeric'
                value={formData.maximumBid}
                onChangeText={(maximumBid) => handleMaxBid(maximumBid)}
            />
        </View>

        <Text style={{ paddingBottom: 7, fontSize:17, color:'grey', fontWeight:500 }}>KML File</Text>
        <View style={{ width: '100%', marginBottom:20, alignItems:'center'}}>
        {formData.KML_File === "" ? (
            <TouchableOpacity style={styles.btnChoose} onPress={selectDoc}>
              <Text style={{ color: "coral", fontSize: 16, fontWeight: 500 }}>
                Choose
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.filename]}>
              <Text style={{ color: "#404040", fontSize: 17, height: 49 }}>
                {formData.fileName}
              </Text>
              <TouchableOpacity
                style={[styles.cross]}
                onPress={() => {
                  setFile(null);
                  setFormData({...formData, KML_File: "", fileName: "", KML_FileIsSet: false, fileNameIsSet: false})
                  setFileExists(false);
                  setAnswerExists(false);
                }}
              >
                <AntDesign name="closecircleo" size={24} color="#404040" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        <Text style={{ paddingBottom: 7, fontSize:17, color:'grey', fontWeight:500 }}>I agree to the terms and Conditions</Text>
        <View style={{ width: '100%', marginBottom:20, alignItems:'center'}}>
            <Checkbox style={styles.checkbox} 
                value={formData.I_agreeIsSet} 
                onValueChange={() => {
                    setFormData({ ...formData, I_agree: "set", I_agreeIsSet: !formData["I_agreeIsSet"]})
                }
            } />
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
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 10,
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
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 10,
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
      },
  inputView: {
    backgroundColor: "#ffc0cb",
    borderRadius: 15,
    width: 300,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  textArea: {
    borderWidth: 1.5,
    borderColor: '#b0b0b0',
    width: '100%',
    padding: 10,
    borderRadius: 12,
    display: 'flex',
    color: '#696969',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    fontSize: 16
  },
  errortextArea: {
    borderWidth: 1.5,
    borderColor: 'red',
    width: '100%',
    padding: 10,
    borderRadius: 12,
    display: 'flex',
    color: '#696969',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    fontSize: 16
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
    // justifyContent: 'center',
  },
  textArea: {
    borderWidth: 1.5,
    borderColor: "#b0b0b0",
    width: "100%",
    padding: 10,
    borderRadius: 12,
    display: "flex",
    color: "#696969",
    backgroundColor: "white",
    justifyContent: "flex-start",
    textAlignVertical: "top",
    fontSize: 15,
  },
  btnChoose: {
    width: "45%",
    height: 40,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    // marginTop:10,
    paddingHorizontal: 10,
    borderColor: "coral",
    borderWidth: 2,
    elevation: 5,
  },
  text: {
    color: "grey",
    fontWeight: 500,
    fontSize: 20,
    paddingLeft: 7,
    marginBottom: 10,
  },
  filename: {
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "grey",
    width: "100%",
    height: 50,
    padding: 12,
    width: 300,
    paddingHorizontal: 20,
    backgroundColor: "#e0e0e0",
    flexDirection: "row",
  },
  cross: {
    position: "absolute",
    justifyContent: "center",
    right: 15,
    top: 0,
    borderLeftColor: "#404040",
    borderLeftWidth: 1,
    height: 48,
    paddingLeft: 10,
  },
  submitButton: {
    backgroundColor: "coral",
    paddingVertical: 10,
    width: "90%",
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    elevation: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 500,
  },
})