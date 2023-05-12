import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Images from '../images/index'
import {db} from '../firebase/databaseConfig'
import messaging from '@react-native-firebase/messaging';
import { ref,onValue,push,update,remove } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
export default function Notifications({navigation}) {

  const [isLoading, setIsLoading] = useState(false);
  const notifications = [
    {notificationId: 1, title:'This is notification 1', content:'This is sample notifiction from Firebase', image:Images.profile, data:{}, time:'3 hours ago'},
    {notificationId: 2, title:'Congratulations!', content:'This is another sample notifiction from Firebase', image:Images.drone2, data:{}, time:'5 hours ago'},
    {notificationId: 3, title:'Congratulations again!', content:'You have been shortlisted for the role of Drone Pilot by drone Pilots Network', image:Images.drone3, data:{}, time:'1 day ago'},
    {notificationId: 4, title:'This is notification 2', content:'This is just a test notification from server', image:Images.drone1, data:{}, time:'3 days ago'},
    
  ]
  useEffect(() => {
    messaging().getToken().then(token => {
      var topicName = "Freelance";
      var config = {
        method:'post',
        url: "https://iid.googleapis.com/iid/v1/" + token +  "/rel/topics/" + topicName,
        headers: {
          Authorization: 
              'key=AAAAjoab_0Y:APA91bEsHKY-W-hT0iIH3NycyckJay3rdc8VAAUSYsDgrM3-5D-cHPlOWiNWXWkqAv8QEmfRS9QHc2_A9wC6X-p9na-wGQ4hNJrMyCJ3QYlmIsNaOcb8tC_pVP1Lc5XHWIlHqxFRKzos',
              'Content-Type': 'application/json',
        },
      }
      console.log("token", token);
      if (token) {
        axios(config).then(function (response) {
          console.log(JSON.stringify(response));
        }).catch(function (error) {
            console.log(error);
        });
      }
    })
  }, [])

  return (
        
        <View style={styles.container}>
        
            <FlatList 
              data={notifications}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => {}}>
                <View key={item.notificationId} style={styles.jobContainer}>
                  <View style={{flexDirection:'row'}}>
                    {/* <View style={{paddingRight:20}}>
                      <Image source={item.image} style={styles.profilePic}/>
                    </View> */}
                    <View style={{paddingRight:10, width:'100%'}}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={{fontSize:14}}>{item.content}</Text>
                      <Text style={{textAlign:'right', fontSize:13, color:'grey'}}>{item.time}</Text>
                    </View>
                  </View>
                </View>
                </TouchableOpacity>
              )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  profilePic: {
    width:65,
    height:65,
    borderRadius:70,
    borderWidth:1,
    borderColor:'#ffe5d3',
  },
  title : {
    fontWeight:'bold',
    fontSize:18,
    color:'#505050'
  },
  jobContainer: {
    width:'100%',
    paddingHorizontal:25,
    paddingVertical:15,
    borderTopWidth:3,
    borderTopColor:'#ffe5d3',
    // backgroundColor:'#F8F8F8'
  }
});
