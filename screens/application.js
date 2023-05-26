import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Images from '../images/index'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as OpenAnything from 'react-native-openanything'
import {db} from '../firebase/databaseConfig';
import { Entypo } from '@expo/vector-icons';
import Toast from "react-native-root-toast";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  
  push,
  set,
  ref,
  update,
} from 'firebase/database';
import axios from 'axios';

export default function Application({route, navigation}) {
  const pilot = route.params.pilot;
  console.log("pilot",pilot)
  
  const jobApplicant = route.params.answer;
  console.log("jobApplicant", jobApplicant)

  const acceptRequest = async() => {
    // Change the applicant job status to applied...
    var refs = ref(db, `applications/${jobApplicant.jobId}/${pilot.userId}`)
    var final =  {
      status: "accepted" // rejected, review, accepted.
    }
    update(refs, final);

    await AsyncStorage.getItem("userData", (error, result) => {
      var userJson = JSON.parse(result);
      var token = pilot.fcmToken;
      console.log(token);
        const temp = {
          notification: {
            body: "You have been selected by "+ userJson.companyName +" company for their job",
            title: "Congratulations! You got it.",
          },
          to: token,
        }
        var data = JSON.stringify(temp);
    
        var config = {
          method: "post",
          url: "https://fcm.googleapis.com/fcm/send",
          headers: {
            Authorization:
              "key=AAAAjoab_0Y:APA91bEsHKY-W-hT0iIH3NycyckJay3rdc8VAAUSYsDgrM3-5D-cHPlOWiNWXWkqAv8QEmfRS9QHc2_A9wC6X-p9na-wGQ4hNJrMyCJ3QYlmIsNaOcb8tC_pVP1Lc5XHWIlHqxFRKzos",
            "Content-Type": "application/json",
          },
          data: data,
        };
    
        var refNotification = push(ref(db, "notifications/"));
        var now = new Date();
        var notificationData = {id: refNotification.key, body: temp.notification.body, title: temp.notification.title, date:now, from:userJson.userId, type:pilot.userId};
        set(refNotification, notificationData);

        axios(config)
          .catch(function (error) {
            console.log(error);
          });
    })
    console.log("application accepted.")
    Toast.show('Application Accepted. You may now contact this candidate', {
      backgroundColor:'#a0a0a0',
      duration: Toast.durations.LONG,
      position: -100,
      shadow: true,
      borderRadius: 100, 
      animation: true,
      opacity:1,
      hideOnPress: false,
      delay: 1000,
  });

  }

  const rejectRequest = () => {
    // Change the applicant job status to applied...
    var refs = ref(db, `applications/${jobApplicant.jobId}/${pilot.userId}`)
    var final =  {
      status: "rejected" // rejected, review, accepted.
    }
    update(refs, final);
    console.log("application rejected.")

    Toast.show('Application Rejected.', {
      backgroundColor:'#a0a0a0',
      duration: Toast.durations.LONG,
      position: -100,
      shadow: true,
      borderRadius: 100, 
      animation: true,
      opacity:1,
      hideOnPress: false,
      delay: 1000,
  });
  }

  function changeDateFormat(dateString) {
    dateString = "" + dateString;
    var parts = dateString.split('/'); // Split the string by slashes
    var year = parts[0];
    var month = parts[1];
    var day = parts[2];

    // Concatenate the parts in the desired format
    var formattedDate = day + '/' + month + '/' + year;

    return formattedDate;
  }

  return (
    <ScrollView>
        <View style={styles.container}>
          <View style={styles.basic}>
            <View style={{width:'70%'}}>
            <TouchableOpacity onPress ={() => {navigation.navigate("View Profile", {userType:"pilot", userId:pilot.userId})}}>
              <Text style={styles.title}>{pilot.name} <Entypo name="link" size={18} color="#808080" /></Text>
            </TouchableOpacity>
              <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}><Ionicons name="location-outline" size={16} color="#808080" />{pilot.city}</Text>
              <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}>Experience:{' ' + pilot.experience}</Text>
              <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}><AntDesign name="calendar" size={16} color="#808080" />{' '+ changeDateFormat(pilot.dob)}</Text>
            </View>
            <TouchableOpacity onPress ={() => {navigation.navigate("View Profile", {userType:"pilot", userId:pilot.userId})}}>
              <Image source={{uri : pilot.profile}} style={styles.profilePic}/>
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal:15, paddingTop:25}}>
            <Text style={styles.title}>Why does he think he is fit for the job ?</Text>
            <Text style={{paddingTop:7, fontSize:15, color:'#505050', lineHeight: 21}}>
              {jobApplicant.answer}     
            </Text>
          </View>
          
          {/* <View style={{paddingTop:25, borderBottomWidth: 3, borderBottomColor:'#ffe5d3'}}></View> */}
          <View style={{paddingHorizontal:15, paddingTop:25}}>
            <Text style={{width:'100%', fontWeight:'bold', fontSize:19, color:'#505050', paddingBottom:8}}>Resume of {pilot.name}</Text>
            <TouchableOpacity onPress={() => OpenAnything.Pdf(jobApplicant.resume)} style={styles.download}>
            <Text style={{color:'white', fontSize:15, textAlign:'center'}}>Download</Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingTop:25, borderBottomWidth: 3, borderBottomColor:'#ffe5d3'}}></View>
          <View style={{paddingHorizontal:15, paddingTop:25, backgroundColor:'#F8F8F8'}}>
            <Text style={{width:'100%', fontWeight:'bold', fontSize:19, color:'#505050', paddingBottom:8}}>Interested to hire ?</Text>

            <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}><Ionicons name="ios-mail-open-outline" size={16} color="black" /> {' '+ pilot.email}</Text>
            <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}><Ionicons name="call-outline" size={16} color="black" /> {' ' +pilot.phone}</Text>
          </View>
          <View style={{paddingTop:25, borderBottomWidth: 3, borderBottomColor:'#ffe5d3', backgroundColor:'#F8F8F8'}}></View>
          
          <View style={styles.apply}>
            <TouchableOpacity onPress={() => rejectRequest()} style={{backgroundColor:'white', justifyContent:'center', margin:5, height:55, flex:1 ,borderRadius:10, width:'48%', borderWidth:2, borderColor:'coral', elevation:5}}>
              <Text style={{color:'coral', fontSize:20, textAlign:'center'}}>Reject</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => acceptRequest()} style={{backgroundColor:'coral', flex:1,height:55, justifyContent:'center', margin:5, borderRadius:10, width:'48%', elevation:5}}>
              <Text style={{color:'white', fontSize:20, textAlign:'center'}}>Accept</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  basic: {
    width:'100%',
    paddingVertical: 25,
    paddingLeft:17,
    borderBottomWidth:3,
    borderBottomColor:'#ffe5d3',
    flexDirection:'row',
    backgroundColor:'#F8F8F8'
  },
  title : {
    width:'100%',
    fontWeight:'bold',
    fontSize:19,
    color:'#505050'
  },
  profilePic: {
    width:80,
    height:80,
    borderRadius:70,
    borderWidth:1,
    borderColor:'#ffe5d3',
  },
  openings : {
    fontSize:15,
    color:'white',
    backgroundColor:'#BEBEBE',
    textAlign:'center', 
    paddingHorizontal:14,
    paddingVertical:5,
    borderRadius:15,
    width:50
  },
  apply: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection:'row'
  },
  download: {
    width:'35%',
    height:40,
    backgroundColor:'#d0d0d0',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,

  }
});
