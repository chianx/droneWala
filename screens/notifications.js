import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import Images from '../images/index'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import {db} from '../firebase/databaseConfig'
import { ref, onValue, get, child } from 'firebase/database';

export default function Notifications({navigation}) {

  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    await getUserNotifications();
    setRefreshing(false);
  }, []);

  const getUserNotifications = async () => {
    setIsLoading(true);
    const userdata = await AsyncStorage.getItem("userData");
    const user = JSON.parse(userdata);

    const notificationIDRefs = ref(db, `users/${user.userId}/notification`)
    onValue(notificationIDRefs, async(snapshot) => {

      if(snapshot.val() == null) {
        console.log("user doesn't have notification.");
        setIsLoading(false);
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

      setNotifications(tempNotificaitons.reverse());
      setIsLoading(false);
    })
  }

  

  useEffect(() => {
    getUserNotifications()
  }, [])

  return (
        
        <View style={styles.container}>

        {isLoading? <View style={{backgroundColor: '#e0e0e0', position:'absolute', flex:1, height:'100%', width:'100%', justifyContent:'center'}}><ActivityIndicator size="large" color="coral" /></View> :<></>}
        {!isLoading && notifications.length === 0? <View style={{backgroundColor:'#f0f0f0', justifyContent:'center', height:'100%'}}><Text style={{fontSize:20, fontWeight:400, textAlign:'center'}}>No Notifications available at the moment.</Text></View> :<></>}
            <FlatList 
              data={notifications}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
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
