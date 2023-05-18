import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Images from '../images/index'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import {db} from '../firebase/databaseConfig'
import { ref, onValue, get } from 'firebase/database';

export default function Notifications({navigation}) {

  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const getUserNotifications = async () => {
    setIsLoading(true);
    const userdata = await AsyncStorage.getItem("userData");
    const user = JSON.parse(userdata);

    const notificationIDRefs = ref(db, `users/${user.userId}/notification`)
    onValue(notificationIDRefs, async(snapshot) => {

      if(snapshot.val() == null) {
        console.log("user doesn't have notification.")
        return;
      }
      
      const notificationIds = Object.values(snapshot.val());
      console.log(notificationIds);

      var tempNotificaitons = [];
      for(const index in notificationIds) {
        const id = notificationIds[index];
        console.log(`Fetching notification for: ${id} path: notifications/${id}`);

        const notificationRef = ref(db, `notifications/${id}`)
        await get(notificationRef).then((snap) => {
          if(!snap.exists()) {
            console.log(`No notification found for id: ${id}`);
          }
          const notification = snap.val();
          tempNotificaitons.push(notification);
        })
      }

      setNotifications(tempNotificaitons);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    // messaging().getToken().then(token => {
    //   var topicName = "Freelance";
    //   var config = {
    //     method:'post',
    //     url: "https://iid.googleapis.com/iid/v1/" + token +  "/rel/topics/" + topicName,
    //     headers: {
    //       Authorization: 
    //           'key=AAAAjoab_0Y:APA91bEsHKY-W-hT0iIH3NycyckJay3rdc8VAAUSYsDgrM3-5D-cHPlOWiNWXWkqAv8QEmfRS9QHc2_A9wC6X-p9na-wGQ4hNJrMyCJ3QYlmIsNaOcb8tC_pVP1Lc5XHWIlHqxFRKzos',
    //           'Content-Type': 'application/json',
    //     },
    //   }
    //   console.log("token", token);
    //   if (token) {
    //     axios(config).then(function (response) {
    //       console.log(JSON.stringify(response));
    //     }).catch(function (error) {
    //         console.log(error);
    //     });
    //   }
    // })
    getUserNotifications()
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
                      <Text style={{fontSize:14}}>{item.body}</Text>
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
