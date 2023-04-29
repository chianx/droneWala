import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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
  const [application, setApplication] = useState();
  const [xyz, setXyz] = useState([]);
  
  useEffect (() => {
    // isLoading = true;
    const jobRef = ref(db, `jobs/${job.jobId}/applied`);
    onValue(jobRef, (snapshot) => {
      const data = snapshot.val();
      if(data == null) {
        console.log("null");
      }else {
        console.log("data " + data);
        for(var index in data) {
          console.log(`applications/${data[index]}`);
          const applicationRef = ref(db, `applications/${data[index]}`);
          onValue(applicationRef, (snap) => {
            const application = snap.val();
            console.log(application);
            setApplication(application);
            console.log(`users/${application.userId}`)
            const xRef = ref(db, `users/${application.userId}`);
                onValue(xRef, (snaps) => {
                  const x = snaps.val();
                  console.log(x);
                  setApplied([...applied, x]);
            })
          })
        }
      }
    });
  }, [])

  return (
        <View style={styles.container}>
            {applied.map((item, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate("Application", {pilot: item, answer:application})}>
                  <View key={item.key} style={styles.jobContainer}>
                    <View style={{flexDirection:'row'}}>
                      <View style={{paddingRight:20}}>
                        <Image source={Images.profile} style={styles.profilePic}/>
                      </View>
                      <View style={{paddingRight:20, width:200}}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={{color:'#808080'}}><Ionicons name="location-outline" size={14} color="#808080" />{' ' +item.city}</Text>
                        <Text style={{color:'#808080'}}>Experience:{' ' + item.experience}</Text>
                        <Text style={{color:'#808080'}}>DGCA Certified:{item.certified? ' YES' : ' NO'}</Text>
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
    backgroundColor: '#F8F8F8'
}
});
