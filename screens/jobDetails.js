import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';

export default function JobDetails({route, navigation}) {
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState({});
  const job = route.params.job;
  const [canApply, setCanAplly] = useState(true);

  const mount = async () => {
    const userdata = await AsyncStorage.getItem("userData");
    const val = JSON.parse(userdata)
    setUser(val);
    setUserType(val.userType);
    var userId = val.userId;
    if(job.applied) {
      for(var index in job.applied) {
        if(job.applied[index] === userId) {
          setCanAplly(false);
          break;
        }
      }
    }
  }
  useEffect(() => {
    mount();

  }, [])

  const handleApply = () => {
    if(canApply) {
      navigation.navigate("Apply", {job:job});
    }else {
      console.log("Here");
      Toast.show('You have already applied to this Job.', {
        // backgroundColor:'#fda172',
        duration: Toast.durations.LONG,
        position: -130,
        shadow: true,
        animation: true,
        opacity:1,
        hideOnPress: false,
        delay: 500,
    });
    }
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
              <Text style={styles.title}>{job.jobTitle}</Text>
              <TouchableOpacity onPress={() => {navigation.navigate("View Profile", {userType:"company", userId:job.companyId})}}>
              <Text style={{color:'#808080', paddingBottom:15, fontWeight:'bold', fontSize:17}}>{job.companyName} <Entypo name="link" size={18} color="#808080" /></Text>
            </TouchableOpacity>
              <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}><Ionicons name="location-outline" size={16} color="#808080" />{' ' + user.city + ", " + user.state}</Text>
              <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}><Ionicons name="ios-cash-outline" size={16} color="#808080" />{' ₹' + job.salRange}</Text>
              <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}><AntDesign name="calendar" size={16} color="#808080" />{' '+job.ftORpt}</Text>
              <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}>Apply by:{' '+ changeDateFormat(job.date)}</Text>
            </View>
            <TouchableOpacity onPress={() => {navigation.navigate("View Profile", {userType:"company", userId:job.companyId})}}>
            <Image source={{uri: job.logo}} style={styles.profilePic}/>
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal:15, paddingTop:25}}>
            <Text style={styles.title}>{'About ' + job.companyName}</Text>
            <Text style={{paddingTop:7, fontSize:15, color:'#505050', lineHeight: 21}}>
              {job.aboutCompany}     
            </Text>
          </View>
          <View style={{paddingHorizontal:15, paddingTop:25}}>
            <Text style={styles.title}>About the Job</Text>
            <Text style={{paddingTop:7, fontSize:15, color:'#505050', lineHeight: 21}}>
              {job.aboutJob}     
            </Text>
          </View>
          <View style={{paddingHorizontal:15, paddingTop:25}}>
            <Text style={styles.title}>Who can apply</Text>
            <Text style={{paddingTop:7, fontSize:15, color:'#505050', lineHeight: 21}}>
              {job.whoApply}     
            </Text>
          </View>
          <View style={{paddingTop:25, borderBottomWidth: 3, borderBottomColor:'#ffe5d3'}}></View>
          <View style={{paddingHorizontal:15, paddingTop:25}}>
            <Text style={{width:'100%', fontWeight:'bold', fontSize:19, color:'#505050', paddingBottom:8}}>Number of Openings</Text>
            <Text style={styles.openings}>
              {job.numOpen}   
            </Text>
          </View>
          <View style={styles.apply}>
          {userType === "pilot"? <TouchableOpacity onPress={() => handleApply()} style={{backgroundColor:'coral', paddingVertical:9, borderRadius:10, opacity: canApply? 1 : 0.6}}>
            <Text style={{color:'white', fontSize:17, textAlign:'center'}}>Apply Now</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => navigation.navigate("Applicants", {job:job})} style={{backgroundColor:'coral', paddingVertical:9, borderRadius:10,}}>
            <Text style={{color:'white', fontSize:17, textAlign:'center'}}>Check Applicants</Text>
          </TouchableOpacity>
          }
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
  }
});
