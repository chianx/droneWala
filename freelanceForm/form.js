import { View, Text, Button, TextInput, Modal, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import {db} from '../firebase/databaseConfig'
import {set, ref, push} from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StepOne from './stepOne';
import StepTwo from './steptwo.js';
import Toast from 'react-native-root-toast';
import axios from 'axios'

export default function FreelanceForm({route, navigation}) {
    const category = route.params.category;
    const [screen, setScreen] = useState(0)
    const FormTitle = [
        "Step 1",
        "Step 2"
    ]
    
// Screen 1 -- Options

// Aerial Screen/Agriculture Survey:
// Screen A -- 
// Title
// Area Size 
// Area location
// Work duration

// Screen B --
// Work details
// Bid criteria
// Maximum bid
// KML File input
// Checkbox (I agree to bid criteria)

// Cinematography: - [ Area Size, KML File input ]

// Drone delivery: - [ Area Size, KML File input ] + [ Payload (kg) ]

// Others: - [ Area Size, KML File input ]
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState(
        {
            // ShortDetails
            applicationID: "",
            category: category,
            title: "",
            areaSize: "",
            areaLoc: "",
            workDurationFrom: "",
            workDurationTo: "",
            timeFrame: "",
            payload: "",
            categoryIsSet: false,
            titleIsSet: false,
            areaSizeIsSet: false,
            areaLocIsSet: false,
            workDurationFromIsSet: false,
            workDurationToIsSet: false,
            timeFrameIsSet: false,
            payloadIsSet: false,
            

            // LongDetails
            workDetails: "",
            bidCriteria: "",
            maximumBid: "",
            KML_File: "",
            fileName: "",
            I_agree: "",
            workDetailsIsSet: false,
            bidCriteriaIsSet: false,
            fileNameIsSet: false,
            maximumBidIsSet: false,
            KML_FileIsSet: false,
            I_agreeIsSet: false,
        }
    )
    const ScreenDisplay = () => {
        if (screen === 0) {
            return <StepOne formData={formData} setFormData={setFormData}/>
        } else {
            return <StepTwo formData={formData} setFormData={setFormData}/>
        }
    }
    const createUserInFirebase = () => {
        if(screen === 1) {
            var errMsg = "";
            var validate = false;
            
            // validate name
            if(formData.category === "Aerial Survey" || formData.category === "Agricultural Survey") {
                if(!formData.workDetailsIsSet) {
                    errMsg = "Invalid Work Details";
                    formData.workDetailsIsSet = false;
                }else if(!formData.bidCriteriaIsSet) {
                    errMsg = "Invalid Bidding Criterion";
                    formData.bidCriteriaIsSet = false;
                }else if(!formData.maximumBidIsSet) {
                    errMsg = "Invalid Maximum Bid";
                    formData.maximumBidIsSet = false;
                }else if(!formData.KML_FileIsSet) {
                    errMsg = "Select File";
                    formData.KML_FileIsSet = false;
                }else if(!formData.I_agreeIsSet) {
                    errMsg = "Agree to the Terms";
                    formData.I_agreeIsSet = false;
                }else validate = true;
            }else {
                if(!formData.workDetailsIsSet) {
                    errMsg = "Invalid Work Details";
                    formData.workDetailsIsSet = false;
                }else if(!formData.bidCriteriaIsSet) {
                    errMsg = "Invalid Bidding Criterion";
                    formData.bidCriteriaIsSet = false;
                }else if(!formData.maximumBidIsSet) {
                    errMsg = "Invalid Maximum Bid";
                    formData.maximumBidIsSet = false;
                }else if(!formData.KML_FileIsSet) {
                    errMsg = "Select File";
                    formData.KML_FileIsSet = false;
                }else if(!formData.I_agreeIsSet) {
                    errMsg = "Agree to the Terms";
                    formData.I_agreeIsSet = false;
                }else validate = true;
            }
            
            if(validate) {
                setErrorMessage("");
                
                AsyncStorage.getItem("userData", (error, result) => {
                    console.log(result);
                    
                    var userJson = JSON.parse(result);
                    var refs = push(ref(db, "freelance/"));

                    var final =  {...formData, companyName:userJson.companyName, logo:userJson.logo, companyId:userJson.userId, aboutCompany:userJson.about, freelanceId:refs.key}; 
                    set(refs, final);
                    var topic = "Freelance";
                    var data = JSON.stringify({
                        notification : {
                            body: 'New Freelance Project has been posted by '+ userJson.companyName +' company',
                            title: 'New Freelance Post'
                        },
                        to: "/topics/" + topic
                    });
                    var config = {
                        method:'post',
                        url: 'https://fcm.googleapis.com/fcm/send',
                        headers: {
                            Authorization: 
                                'key=AAAAjoab_0Y:APA91bEsHKY-W-hT0iIH3NycyckJay3rdc8VAAUSYsDgrM3-5D-cHPlOWiNWXWkqAv8QEmfRS9QHc2_A9wC6X-p9na-wGQ4hNJrMyCJ3QYlmIsNaOcb8tC_pVP1Lc5XHWIlHqxFRKzos',
                                'Content-Type': 'application/json',
                        },
                        data : data
                    };
                
                    axios(config).then(function (response) {
                        console.log(JSON.stringify(response.data));
                        var refNotification = push(ref(db, "notification/"));
                        var now = new Date();
                        var notificationData = {id: refNotification.key, body: data.notification.body, title:data.notification.title, date:now, from:userJson.userId, type:"freelance",};
                        set(refNotification ,notificationData)
                    }).catch(function (error) {
                        console.log(error);
                    });
                })
                setFormData({});
                setScreen(0);
                
                
                Toast.show('Freelance Project Posted Successfully!', {
                    backgroundColor:'#fda172',
                    duration: Toast.durations.LONG,
                    position: -100,
                    shadow: true,
                    borderRadius: 100, 
                    animation: true,
                    opacity:1,
                    hideOnPress: false,
                    delay: 1000,
                });
                navigation.navigate("Home");
            }
            else {
                setErrorMessage(errMsg);
            }
        }
    } 
    const callNext = () => {
        console.log(formData);
        if(screen === 0) {
            var errMsg = "";
            var validate = false;
            
            // validate name
            if(formData.category === "Aerial Survey" || formData.category === "Agricultural Survey") {
                if(!formData.titleIsSet) {
                    errMsg = "Invalid Title";
                    formData.titleIsSet = false;
                }else if(!formData.areaSizeIsSet) {
                    errMsg = "Invalid Area Size";
                    formData.areaSizeIsSet = false;
                }else if(!formData.areaLocIsSet) {
                    errMsg = "Invalid Area Location";
                    formData.areaLocIsSet = false;
                }else if(!formData.workDurationFromIsSet) {
                    errMsg = "Invalid From Work Duration";
                    formData.workDurationFromIsSet = false;
                }else if(!formData.workDurationToIsSet) {
                    errMsg = "Invalid To Work Duration";
                    formData.workDurationToIsSet = false;
                }else validate = true;
            }else if(formData.category === "Cinematography" || formData.category === "Others") {
                if(!formData.titleIsSet) {
                    errMsg = "Invalid Title";
                    formData.titleIsSet = false;
                }else if(!formData.areaLocIsSet) {
                    errMsg = "Invalid Area Location";
                    formData.areaLocIsSet = false;
                }else if(!formData.workDurationFromIsSet) {
                    errMsg = "Invalid From Work Duration";
                    formData.workDurationFromIsSet = false;
                }else if(!formData.workDurationToIsSet) {
                    errMsg = "Invalid To Work Duration";
                    formData.workDurationToIsSet = false;
                }else validate = true;
            }else {
                if(!formData.titleIsSet) {
                    errMsg = "Invalid Title";
                    formData.titleIsSet = false;
                }else if(!formData.areaLocIsSet) {
                    errMsg = "Invalid Area Location";
                    formData.areaLocIsSet = false;
                }else if(!formData.workDurationFromIsSet) {
                    errMsg = "Invalid From Work Duration";
                    formData.workDurationFromIsSet = false;
                }else if(!formData.workDurationToIsSet) {
                    errMsg = "Invalid To Work Duration";
                    formData.workDurationToIsSet = false;
                }else if(!formData.payloadIsSet) {
                    errMsg = "Invalid Payload";
                    formData.payloadIsSet = false;
                }else validate = true;
            }

            
            if(validate) {
                setScreen((currScreen) => currScreen + 1);
                setErrorMessage("");
            }else {
                setErrorMessage(errMsg);
            }
        }                
    }
    return (
        // <Modal vi[sible={alwaysTrue} animationType="slide">
        <View style={{flex:1}}>
            <ScrollView>

            <View style={styles.wrapper}>
                <Text style={styles.title}>{FormTitle[screen]}</Text>
            </View>

            <View style={{width:'100%', alignItems:'center', marginBottom:100}}>
                {ScreenDisplay()}

                {errorMessage != "" ? <View style={{marginLeft:20, marginBottom: 20}}><Text style={{color:'red', borderRadius: 8, textAlign: 'center',width: 160, height: 30, }}>{errorMessage}</Text></View> : <></>}
            </View>
            </ScrollView>

            <View style={styles.apply}>
                <TouchableOpacity
                    // disabled={screen === 0}
                    style={[styles.prevButton]}
                    onPress={() => {
                        if(screen === 0) {
                            navigation.navigate("Post a Project");
                        }else {
                            setScreen((currScreen) => currScreen - 1)
                        }
                    }}
                >
                    <Text style={{color:'coral', fontSize:20, textAlign:'center'}}>Previous</Text>
                </TouchableOpacity>

                {screen === 1?
                <TouchableOpacity style={[styles.nextButton]} onPress={() => {createUserInFirebase()}}>
                    <Text style={{color:'white', fontSize:20, textAlign:'center'}}>Submit</Text>
                </TouchableOpacity>
                : <TouchableOpacity style={[styles.nextButton]} onPress={callNext}>
                    <Text style={{color:'white', fontSize:20, textAlign:'center'}}>Next</Text>
                </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop:50,
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        color: "coral",
        fontWeight: "bold",
        marginVertical: 30
        // fontFamily:
    },
    prevButton: {
        backgroundColor:'white',
        justifyContent:'center',
        margin:5,
        height:55,
        flex:1 ,
        borderRadius:10,
        width:'48%',
        borderWidth:2,
        borderColor:'coral',
        elevation:5
    },
    nextButton: {
        backgroundColor:'coral',
        flex:1,
        height:55,
        justifyContent:'center',
        margin:5,
        borderRadius:10,
        width:'48%',
        elevation:5
    },
    apply: {
        // paddingVertical: 15,
        alignItems:'center',
        width:'100%',
        height:85,
        borderTopWidth:1, borderTopColor:'grey',
        paddingHorizontal: 10,
        flexDirection:'row',
        position:'absolute',
        bottom:0,
        height:85,
        backgroundColor:'#f0f0f0'
    },
})