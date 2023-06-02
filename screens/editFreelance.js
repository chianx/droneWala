import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import DatePicker from 'react-native-modern-datepicker';
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from "expo-document-picker";
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { configureProps } from 'react-native-reanimated/lib/reanimated2/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase/databaseConfig'
import Checkbox from 'expo-checkbox';
import {storage} from '../firebase/firebase'
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes } from 'firebase/storage';

import Toast from 'react-native-root-toast';

const EditFreelanceModal = ({ visible, onClose, freelance }) => {
    const [freelanceFinal, setFreelanceFinal] = useState(freelance);

    const date1 = new Date();
    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const day = date1.getDate();
    const todaysDate = year + '-0' + month + '-' + day;
    const handleButtonOpen = () => {
        setOpen(!open);
        if (date.trim() != '') setJobFinal({ ...jobFinal, date: date, dateIsSet: false });
        // else setJobFinal({ ...jobFinal, date: date, dateIsSet: true });
    }
    
    const [date, setDate] = useState('');
    const [open, setOpen] = useState(false)

    

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  if (hasGalleryPermission === false) {
    return <Text>No access to gallery</Text>
  }

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
              setFreelanceFinal({...freelanceFinal, KML_File: downloadURL, fileName: result.name, KML_FileIsSet: true, fileNameIsSet: true})
              setIsLoading(false);
            }
          });
        }
      );
      // OpenAnything.Pdf(result.uri);
    }
  };


    const handleSave = () => {
        console.log(freelanceFinal)
        // console.log(jobFinal.jobTitleIsSet
        //     ,jobFinal.salRangeFromIsSet, jobFinal.salRangeToIsSet, jobFinal.ftORptIsSet, jobFinal.numOpenIsSet, 
        //     jobFinal.dateIsSet, jobFinal.locationIsSet, jobFinal.aboutJobIsSet, jobFinal.whoApplyIsSet)
        // if(jobFinal.jobTitleIsSet && jobFinal.salRangeFromIsSet && jobFinal.salRangeToIsSet && jobFinal.ftORptIsSet && jobFinal.numOpenIsSet && jobFinal.dateIsSet && jobFinal.locationIsSet && jobFinal.aboutJobIsSet && jobFinal.whoApplyIsSet) {
        //     update(ref(db, `jobs/${jobFinal.jobId}`), job).then(() => {
        //         // Add loading icon.
        //         Toast.show('Job Updated!!', {
        //           backgroundColor:'#fda172',
        //           duration: Toast.durations.LONG,
        //           position: -100,
        //           shadow: true,
        //           borderRadius: 50, 
        //           animation: true,
        //           opacity: 100,
        //           hideOnPress: false
        //         });
        //       }).catch((error) => {
        //         // Correct this.
        //         setErrorMessage(error.toString);
        //         Toast.show('No Internet. Unable to update!!', {
        //           backgroundColor:'#fda172',
        //           duration: Toast.durations.LONG,
        //           position: -100,
        //           shadow: true,
        //           borderRadius: 50, 
        //           animation: true,
        //           hideOnPress: false
        //         });
        //       })
        //       onClose();
        //       console.log("Save!" + "\n");
        //     console.log(jobFinal);
        // }
    };
    const handleTitle = (title) => {
        if (title.trim().length >= 4) {
            setFreelanceFinal({ ...freelanceFinal, title: title, titleIsSet: true });
        } else {
            setFreelanceFinal({ ...freelanceFinal, title: title, titleIsSet: false });
        }
    }
    const handleAreaSize = (areaSize) => {
        if (parseInt(areaSize.trim()) > 0) {
            setFreelanceFinal({ ...freelanceFinal, areaSize: areaSize, areaSizeIsSet: true });
        } else {
            setFreelanceFinal({ ...freelanceFinal, areaSize: areaSize, areaSizeIsSet: false });
        }
    }
    const handleAreaLocation = (areaLoc) => {
        if (areaLoc.trim().length >= 4) {
            setFreelanceFinal({ ...freelanceFinal, areaLoc: areaLoc, areaLocIsSet: true });
        } else {
            setFreelanceFinal({ ...freelanceFinal, areaLoc: areaLoc, areaLocIsSet: false });
        }
    }
    const handleWorkDurationFrom = (workDuration) => {
        if(parseInt(workDuration.trim()) > 0 && parseInt(workDuration.trim()) < freelanceFinal.workDurationToIsSet ? freelanceFinal.workDurationTo : 9007199254740991) {
            setFreelanceFinal({ ...freelanceFinal, workDurationFrom: workDuration.trim(), workDurationFromIsSet: true });
        }else {
            setFreelanceFinal({ ...freelanceFinal, workDurationFrom: workDuration.trim(), workDurationFromIsSet: false });
        }
    }
    const handleWorkDurationTo = (workDuration) => {
        if(parseInt(workDuration.trim()) > 0 && parseInt(workDuration.trim()) > freelanceFinal.workDurationFrom) {
            setFreelanceFinal({ ...freelanceFinal, workDurationTo: workDuration.trim(), workDurationToIsSet: true });
        }else {
            setFreelanceFinal({ ...freelanceFinal, workDurationTo: workDuration.trim(), workDurationToIsSet: false });
        }
    }
    const handlePayload = (payload) => {
        setFreelanceFinal({ ...freelanceFinal, payload: payload, payloadIsSet: true });
    }
    const handleWorkDetails = (workDetails) => {
        if(freelanceFinal.workDetails.trim().length >= 50) {
          setFreelanceFinal({ ...freelanceFinal, workDetails:workDetails, workDetailsIsSet: true });
        }else if (freelanceFinal.workDetails.trim().length < 50) {
            setFreelanceFinal({ ...freelanceFinal, workDetails:workDetails, workDetailsIsSet: false });
        }
      }
      const handleBidCriteria = (bidCriteria) => {
        if(freelanceFinal.bidCriteria.trim().length >= 50) {
          setFreelanceFinal({ ...freelanceFinal, bidCriteria:bidCriteria, bidCriteriaIsSet: true });
        }else if (freelanceFinal.bidCriteria.trim().length < 50){
            setFreelanceFinal({ ...freelanceFinal, bidCriteria:bidCriteria, bidCriteriaIsSet: false });
        }
      }
    
      const handleMaxBid = (maximumBid) => {
        if(parseInt(maximumBid.trim()) > 0) {
          setFreelanceFinal({ ...freelanceFinal, maximumBid:maximumBid.trim(), maximumBidIsSet: true });
        }else {
          setFreelanceFinal({ ...freelanceFinal, maximumBid:maximumBid.trim(), maximumBidIsSet: false });
        }
    }
    return (
        <Modal visible={visible} animationType="slide">
            <View style={{ alignItems:'center', padding:15, backgroundColor:'coral', elevation:15}}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <AntDesign name="close" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.heading}>Edit Freelance</Text>
            </View>
            <ScrollView>
                <View style={styles.modalContainer}>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Project Title</Text>
                        <TextInput
                            style={[styles.TextInput]}
                            placeholderTextColor="grey"
                            placeholder={freelanceFinal.title}
                            value={freelanceFinal.title}
                            onChangeText={(title) => handleTitle(title)}
                        />
                        

                        {freelanceFinal.category === "Aerial Survey" || freelanceFinal.category === "Agricultural Survey" ?
                            <View>
                            <Text style={styles.label}>Area Size</Text>
                            <View style={[styles.inputView]}>
                                <TextInput
                                    style={[styles.TextInput]}
                                    placeholderTextColor="grey"
                                    placeholder={freelanceFinal.areaSize}
                                    keyboardType='numeric'
                                    value={freelanceFinal.areaSize}
                                    onChangeText={(areaSize) => handleAreaSize(areaSize)}
                                />
                            </View>
                            </View>
                            :
                            null
                        }

                        <Text style={styles.label}>Area Location</Text>
                        <TextInput
                            style={[styles.TextInput]}
                            placeholderTextColor="grey"
                            placeholder={freelanceFinal.areaLoc}
                            value={freelanceFinal.areaLoc}
                            onChangeText={(areaLoc) => handleAreaLocation(areaLoc)}
                        />
            
                        <Text style={styles.label}>Enter Work Duration (in days)</Text>
                        <View style={{flexDirection:'row'}}>
                            <TextInput
                                // style={[freelanceFinal.workDurationFromIsSet ? styles.TextInput : styles.errorTextInput, { width: 180}]}
                                style={{ backgroundColor: "white", borderRadius: 8, borderWidth: 1, marginRight: 35, borderColor: 'grey', width: 132, height: 45, marginBottom: 20, alignItems: "flex-start", justifyContent: "center", padding: 10, fontSize: 17, color: 'grey' }}
                                placeholderTextColor="grey"
                                placeholder={freelanceFinal.workDurationFrom}
                                keyboardType='numeric'
                                value={freelanceFinal.workDurationFrom}
                                onChangeText={(workDuration) => handleWorkDurationFrom(workDuration)}
                            />
                            <TextInput
                                // style={[freelanceFinal.workDurationToIsSet ? styles.TextInput : styles.errorTextInput, { width: 180}]}
                                style={{ backgroundColor: "white", borderRadius: 8, borderWidth: 1, borderColor: 'grey', width: 132, height: 45, marginBottom: 20, alignItems: "flex-start", justifyContent: "center", padding: 10, fontSize: 17, color: 'grey' }}
                                placeholderTextColor="grey"
                                placeholder={freelanceFinal.workDurationTo}
                                keyboardType='numeric'
                                value={freelanceFinal.workDurationTo}
                                onChangeText={(workDuration) => handleWorkDurationTo(workDuration)}
                            />
                        </View>


                        <Text style={styles.label}>Date of Closing</Text>
                        <View style={{ flexDirection: 'column' }}>                            
                            {open ? <TouchableOpacity onPress={handleButtonOpen} style={{ padding: 0 }}><TextInput
                                editable={false}
                                placeholderTextColor="grey"
                                placeholder={freelanceFinal.date}
                                value={freelanceFinal.date}
                                style={{ width: 300, fontSize: 17, height: 45, color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', borderColor: 'grey', marginRight: 20, marginBottom: 15 }}
                            /></TouchableOpacity> :
                                <TouchableOpacity onPress={() => { setOpen(!open) }} style={{ padding: 0 }}>
                                <TextInput
                                    editable={false}
                                    placeholderTextColor="grey"
                                    placeholder='Select Date'
                                    value={freelanceFinal.date}
                                    style={{ width: 300, fontSize: 17, height: 45, color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', borderColor: 'grey', marginRight: 20, marginBottom: 15 }}
                                />
                                </TouchableOpacity>
                            }
                        </View>
                        <View>
                            {open ? <DatePicker
                                onSelectedChange={(date) => {
                                    console.log(date);
                                    setFreelanceFinal({ ...freelanceFinal, date: date, dateIsSet: true });
                                    setOpen(!open);
                                }}
                                mode="calendar"
                                minimumDate={todaysDate}
                                style={{width: 300, height: 300}}
                            /> : <></>}
                        </View>

                        {freelanceFinal.category === "Drone Delivery" ?
                            <View>
                                <Text style={styles.label}>Payload</Text>
                                <TextInput
                                    style={[styles.TextInput]}
                                    placeholderTextColor="grey"
                                    placeholder={freelanceFinal.payload}
                                    keyboardType='numeric'
                                    value={freelanceFinal.payload}
                                    onChangeText={(payload) => handlePayload(payload)}
                                />
                            </View>
                        : null}

                        <Text style={styles.label}>Work Details</Text>
                        <TextInput
                            style={[styles.textArea]}
                            placeholderTextColor="grey"
                            placeholder={freelanceFinal.workDetails}
                            multiline
                            numberOfLines={4}
                            maxLength={100}
                            value={freelanceFinal.workDetails}
                            onChangeText={(workDetails) => handleWorkDetails(workDetails)}
                        />

                        <Text style={styles.label}>Bid Criteria</Text>
                        <TextInput
                            style={[styles.textArea]}
                            placeholderTextColor="grey"
                            placeholder={freelanceFinal.bidCriteria}
                            multiline
                            numberOfLines={4}
                            maxLength={100}
                            value={freelanceFinal.bidCriteria}
                            onChangeText={(bidCriteria) => handleBidCriteria(bidCriteria)}
                        />

                        <Text style={styles.label}>Maximum Bid</Text>
                        <TextInput
                            style={[styles.TextInput]}
                            placeholderTextColor="grey"
                            placeholder={freelanceFinal.maximumBid}
                            keyboardType='numeric'
                            value={freelanceFinal.maximumBid}
                            onChangeText={(maximumBid) => handleMaxBid(maximumBid)}
                        />


                        <Text style={styles.label}>KML File</Text>
                            <View style={{ width: '100%', marginBottom:20}}>
                            {freelanceFinal.KML_File === "" ? (
                                <TouchableOpacity style={styles.btnChoose} onPress={selectDoc}>
                                <Text style={{ color: "coral", fontSize: 16, fontWeight: 500 }}>
                                    Choose
                                </Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={[styles.filename]}>
                                <Text style={{ color: "#404040", fontSize: 17, height: 49 }}>
                                    {freelanceFinal.fileName}
                                </Text>
                                <TouchableOpacity
                                    style={[styles.cross]}
                                    onPress={() => {
                                    setFile(null);
                                    setFreelanceFinal({...freelanceFinal, KML_File: "", fileName: "", KML_FileIsSet: false, fileNameIsSet: false})
                                    setFileExists(false);
                                    setAnswerExists(false);
                                    }}
                                >
                                    <AntDesign name="closecircleo" size={24} color="#404040" />
                                </TouchableOpacity>
                            </View>
                            )}
                        </View>
                        
            
                    </View>
                </View>
            </ScrollView>

            <View style={{alignItems:'center', width:'100%', backgroundColor:'white',position:'absolute', bottom:0, borderTopWidth:1, borderTopColor:'grey', marginVertical:7}}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
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
        fontSize: 16,
        width: 300
      },
    modalContainer: {
      // backgroundColor: '#fff',
      padding: 20,
      width: '100%',
      alignItems: 'center',
      marginBottom:60
    },
    heading: {
      fontSize: 22,
      fontWeight: 500,
      color:'white'
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
      marginLeft:3,
      marginTop: 5,
    },
    saveButton: {
      backgroundColor: 'coral',
      paddingVertical: 10,
      width:'90%',
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
      alignItems:'center',
      elevation:5
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight:500
    },
    TextInput: {
      backgroundColor: "white",
      borderRadius: 8,
      borderWidth:1,
      borderColor:'grey',
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
    btn : {
      textAlign:'center',
      justifyContent:'center',
      backgroundColor:'#A9A9A9',
      fontSize:15,
      borderRadius:8,
      padding:9,
      width:135,
      color:'white'
  },
  filename: {
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "grey",
    width: "100%",
    height: 45,
    paddingHorizontal: 12,
    paddingVertical: 10,
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
    height: 45,
    paddingLeft: 10,
  },
}); 

export default EditFreelanceModal;