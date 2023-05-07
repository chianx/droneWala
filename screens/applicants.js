import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Images from '../images/index'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import {db} from '../firebase/databaseConfig'
import {  
  ref,
  onValue,
} from 'firebase/database';

export default function Applicants({route, navigation}) {
  const job = route.params.job
  const [applied, setApplied] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect (() => {
    setIsLoading(true);
    const jobRef = ref(db, `applications/${job.jobId}`);
    onValue(jobRef, (snapshot) => {
      const data = snapshot.val();
      if(data == null) {
        console.log("null");
      }else {
        console.log(data); 
        let applicants = [];
        const applicationRef = ref(db, `applications/${job.jobId}`);
        onValue(applicationRef, (snap) => {
          const applications = snap.val();
          // setApplication(application);
          for(var index in applications) {
            console.log(`users/${applications[index].userId}`)
            const xRef = ref(db, `users/${applications[index].userId}`);
                onValue(xRef, (snaps) => {
                  const x = snaps.val();
                  console.log(x);
                  applicants.push({answer: applications[index], user:x});
            })
          }
        })
        setApplied(applicants);
        setIsLoading(false);
      }
    });
  }, [])
  if(isLoading) {
    return (
      <View style={{backgroundColor: '#e0e0e0aa', height:300, justifyContent:'center'}}><ActivityIndicator size="large" color="coral" /></View>
    )
  }else return (
        <View style={styles.container}>
            {applied.map((item, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate("Application", {pilot: item.user, answer:item.answer})}>
                  <View key={item.key} style={styles.jobContainer}>
                    <View style={{flexDirection:'row'}}>
                      <View style={{paddingRight:20}}>
                        <Image source={{uri: item.user.profile}} style={styles.profilePic}/>
                      </View>
                      <View style={{paddingRight:20, width:200}}>
                        <Text style={styles.title}>{item.user.name}</Text>
                        <Text style={{color:'#808080'}}><Ionicons name="location-outline" size={14} color="#808080" />{' ' +item.user.city}</Text>
                        <Text style={{color:'#808080'}}>Experience:{' ' + item.user.experience}</Text>
                        <Text style={{color:'#808080'}}>DGCA Certified:{item.user.certified? ' YES' : ' NO'}</Text>
                      </View>
                    </View> 
                  </View>
                  </TouchableOpacity>
                )
              })}
            {/* <Image source={Images.loading}  style={styles.gif} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  gif: {
    height:300,
    width:'100%'
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: '#ffe5d3',
},
title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#505050'
},
jobContainer: {
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderTopWidth: 3,
    borderTopColor: '#ffe5d3',
    backgroundColor:'#F8F8F8'
}
});