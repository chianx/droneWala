import { View, Text, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Precise from './Precise';
import Description from './Description';
import {db} from '../firebase/databaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set, ref, onValue, push, update, remove} from 'firebase/database';
import axios from 'axios';
import Toast from 'react-native-root-toast';

export default function JobForm({navigation}) {
    const [loading, setLoading] = useState(false);
    const [screen, setScreen] = useState(0)
    const FormTitle = [
        "Precise Details",
        "Descriptions"
    ]
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState(
        {
            // ShortDetails
            jobId: "",
            jobTitle: "",
            salRangeFrom: "",
            salRangeTo: "",
            ftORpt: "",
            numOpen: "",
            date: "",
            jobTitleIsSet: false,
            salRangeFromIsSet: false,
            salRangeToIsSet: false,
            ftORptIsSet: false,
            numOpenIsSet: false,
            dateIsSet: false,
            location:"",
            locationIsSet:false,
            logo: "",
            applied: [],
            
            // LongDetails
            aboutJob: "",
            whoApply: "",
            aboutJobIsSet: false,
            whoApplyIsSet: false,
        }
    )

    const ScreenDisplay = () => {
        if (screen === 0) {
            return <Precise formData={formData} setFormData={setFormData}/>
        } else {
            return <Description formData={formData} setFormData={setFormData}/>
        }
    }
    const createUserInFirebase = async() => {
        if(screen === 1) {
            var errMsg = "";
            var validate = false;
            
            // validate name
            if (!formData.aboutJobIsSet) {
                errMsg = "Invalid About"
                formData.aboutJobIsSet = false
            }else if(!formData.whoApplyIsSet)  {
                errMsg = "Invalid Who can Apply"
                formData.whoApplyIsSet = false
            }else validate = true;
            
            if(validate && formData.aboutJobIsSet && formData.whoApplyIsSet) {
                setLoading(true);
                // navigation.navigate("Login")
                setErrorMessage("");
                
                await AsyncStorage.getItem("userData", (error, result) => {
                    console.log(result);
                    
                    var userJson = JSON.parse(result);
                    var refs = push(ref(db, "jobs/"));
                    const salRange = formData.salRangeFrom+' - '+formData.salRangeTo ;

                    var final =  {companyId: userJson.userId, aboutCompany: userJson.about, logo: userJson.logo, companyName: userJson.companyName, jobId: refs.key, jobTitle: formData.jobTitle, location:formData.location ,salRange: salRange,ftORpt: formData.ftORpt,numOpen: formData.numOpen,date: formData.date,aboutJob: formData.aboutJob,whoApply: formData.whoApply, }
                    set(refs, final).then(async() => {
                        console.log("Job Form Posted Successfully!");
                    });
                    var topic = "Jobs";
                    const notificatioData = {
                        notification : {
                            body: 'New job has been posted by '+ userJson.companyName +' company',
                            title: 'New Job Post'
                        },
                        to: "/topics/" + topic
                    }
                    var data = JSON.stringify(notificatioData);
            
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
            
                    var refNotification = push(ref(db, "notifications/"));
                    var now = new Date();
                    var notificationData = {id: refNotification.key, body: notificatioData.notification.body, title: notificatioData.notification.title, date:now, from:userJson.userId, type:"jobs",};
                    set(refNotification ,notificationData)

                    axios(config).catch(function (error) {
                        console.log(error);
                    });
                    setFormData({});
                    setScreen(0);
                    Toast.show('Job Posted Successfully!', {
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
                    setLoading(false);
                    navigation.navigate("Home");
                });
            }else {
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
            if(!formData.jobTitleIsSet)  {
                errMsg = "Invalid Job Title"
                formData.jobTitleIsSet = false
            }else if(!formData.salRangeFromIsSet && !formData.salRangeToIsSet) {
                errMsg = "Check Salary Range, [From < To] "
                formData.salRangeFromIsSet = false
                formData.salRangeToIsSet = false
            }else if (!formData.ftORptIsSet) {
                errMsg = "Set Job Type FT/PT"
                formData.ftORptIsSet = false
            }else if (!formData.numOpenIsSet) {
                errMsg = "Set Number of Openings"
                formData.numOpenIsSet = false
            }else if (!formData.dateIsSet) {
                errMsg = "Invalid Date of Form Close"
                formData.dateIsSet = false
            }else validate = true;
            
            if(validate && formData.jobTitleIsSet && formData.salRangeFromIsSet && formData.salRangeToIsSet && formData.ftORptIsSet && formData.numOpenIsSet && formData.dateIsSet) {
                setScreen((currScreen) => currScreen + 1);
                setErrorMessage("");
            }else {
                setErrorMessage(errMsg);
            }
        }                
    }
    if(loading) {
        return 
        
    }else 
    return (
        <View style={{flex:1, opacity: loading ? 0.5 : 1, zIndex: loading ?0:1, backgroundColor: 'white'}}>
        {loading? <View>
            <View style={{backgroundColor:"#d3d3d3aa", position: "absolute", flex: 1, zIndex: 2, width:'100%', height:630, justifyContent:'center'}}>
                <ActivityIndicator size="large" color="coral" />
            </View>
        </View> : <></>}
            <View style={[styles.wrapper]}>
                <Text style={styles.title}>{FormTitle[screen]}</Text>
            </View>

            <ScrollView>
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
                            navigation.navigate("Home");
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