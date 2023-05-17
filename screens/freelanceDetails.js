import React, { useEffect, useState } from 'react';
import { Modal, TextInput, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as OpenAnything from 'react-native-openanything'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../firebase/databaseConfig'
import { ref, onValue, push, update, remove, runTransaction, set } from 'firebase/database';
import Toast from 'react-native-root-toast';
import axios from 'axios';

export default function FreelanceDetails({ route, navigation, formData }) {
  const freelance = route.params.freelance;
  const [userType, setUserType] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bid, setBid] = useState('');
  const [canApply, setCanApply] = useState(true);
  
  const sendNotification = async (userJson, token) => {
    console.log(token);
    var notificationJson = {
      data: {"data" : "this is data"},
      notification: {
        body: "Someone placed a bid on your freelance Project.",
        title: "A bid is placed!",
      },
      to: token,
    };
    var data = JSON.stringify(notificationJson);

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
    var notificationData = {id: refNotification.key, body: notificationJson.notification.body, title: notificationJson.notification.title, date: now, from: userJson.userId, type:freelance.companyId};
    set(refNotification, notificationData)

    axios(config)
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePlaceBid = () => {
    if(canApply) {
      setIsModalVisible(!isModalVisible);
    }else {
      Toast.show('You have already placed bid for this Project.', {
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
    
  };

  const submitBid = async() => {
    if(bid <= freelance.maximumBid) {
        console.log(bid)
        const userdata = await AsyncStorage.getItem("userData");
        const user = JSON.parse(userdata);

        var bidRef = ref(db, `bids/${freelance.id}/${user.userId}`)
        var bidJson = {
          id: bidRef.key,
          amount: bid,
          userId: user.userId,
        }
        set(bidRef, bidJson);
        setIsModalVisible(!isModalVisible);
        var freelanceRef = ref(db, "freelance/" + freelance.freelanceId)
        runTransaction(freelanceRef, (freelance) => {
          if(freelance.applied) {
            var arr = Array.from(freelance.applied);
            arr.push(user.userId);
            freelance = {...freelance, applied: arr}
          }else {
            var arr = []
            arr.push(user.userId);
            freelance = {...freelance, applied: arr}
          }
          return freelance
        });
        Toast.show('Bid Placed Succesfully!', {
          // backgroundColor:'#fda172',
          duration: Toast.durations.LONG,
          position: -130,
          shadow: true,
          animation: true,
          opacity:1,
          hideOnPress: false,
          delay: 1000,
        });
        setCanApply(false);
        const starCountRef = ref(db, 'users/' + freelance.companyId + "/fcmToken");
        onValue(starCountRef, (snapshot) => {
          const token = snapshot.val();
          console.log("fcmToken " + token)
          sendNotification(user, token);
        })
    }else {
      Toast.show('Your bid should be less than ₹ ' + freelance.maximumBid + "" , {
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

  const handleBid = (bid) => {
    setBid(bid);
  };

  const mount = async () => {
    const userdata = await AsyncStorage.getItem("userData");
    const json = JSON.parse(userdata);
    setUserType(json.userType);
    var userId = json.userId;
    if(freelance.applied) {
      for(var index in freelance.applied) {
        if(freelance.applied[index] === userId) {
          setCanApply(false);
          break;
        }
      }
    }
  }
  useEffect(() => {
    mount()
  }, [])
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.basic}>
          <View style={{ width: '70%' }}>
            <Text style={styles.title}>{freelance.title}</Text>
            <TouchableOpacity onPress={() => {navigation.navigate("View Profile", {userType:"company", userId:freelance.companyId})}}>
              <Text style={{color:'#808080', paddingBottom:15, fontWeight:'bold', fontSize:17}}>{freelance.companyName} <Entypo name="link" size={18} color="#808080" /></Text>
            </TouchableOpacity>
            <Text style={{ color: '#808080', fontSize: 16, paddingBottom: 5 }}><Ionicons name="location-outline" size={16} color="#808080" />{freelance.areaLoc}</Text>
            <Text style={{ color: '#808080', fontSize: 16, paddingBottom: 5 }}>Category:{' ' + freelance.category}</Text>
            <Text style={{ color: '#808080', fontSize: 16, paddingBottom: 5 }}><AntDesign name="calendar" size={16} color="#808080" />{' ' + freelance.closingDate}</Text>
          </View>
          <Image source={{uri: freelance.logo}} style={styles.profilePic} />
        </View>
        <View style={{ paddingHorizontal: 15, paddingTop: 25 }}>
          <Text style={styles.title}>Work Description</Text>
          <Text style={{ paddingTop: 7, fontSize: 15, color: '#505050', lineHeight: 21 }}>
            {freelance.description}
          </Text>
          <Text style={{ marginTop: 15, width: '100%', fontWeight: 600, fontSize: 18, color: '#505050' }}>Bid Criteria</Text>
          <Text style={{ paddingTop: 7, fontSize: 15, color: '#505050', lineHeight: 21 }}>
            {freelance.bidCriteria}
          </Text>
        </View>

        {/* <View style={{paddingTop:25, borderBottomWidth: 3, borderBottomColor:'#ffe5d3'}}></View> */}
        <View style={{ paddingHorizontal: 15, paddingTop: 25 }}>
          <Text style={{ width: '100%', fontWeight: 'bold', fontSize: 19, color: '#505050', paddingBottom: 8 }}>Files for the project</Text>
          <TouchableOpacity onPress={() => OpenAnything.Pdf(freelance.KML_File)} style={styles.download}>
            <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>Download</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 25, borderBottomWidth: 3, borderBottomColor: '#ffe5d3' }}></View>
        <View style={{ paddingHorizontal: 15, paddingTop: 25, backgroundColor: '#F8F8F8' }}>
          <Text style={{ width: '100%', fontWeight: 'bold', fontSize: 19, color: '#505050', paddingBottom: 8 }}>Other Details</Text>

          <Text style={{ color: '#808080', fontSize: 16, paddingBottom: 5 }}>Maximum Bid: {' ₹ ' + freelance.maximumBid}</Text>
          <Text style={{ color: '#808080', fontSize: 16, paddingBottom: 5 }}>Work Duration: {' ' + freelance.workDurationFrom + "-" + freelance.workDurationTo + " Weeks"}</Text>
          <Text style={{ color: '#808080', fontSize: 16, paddingBottom: 5 }}>Area Size: {' ' + freelance.areaSize}</Text>
        </View>
        <View style={{ paddingTop: 25, borderBottomWidth: 3, borderBottomColor: '#ffe5d3', backgroundColor: '#F8F8F8' }}></View>

        <View style={styles.apply}>
          {(userType == 'pilot') ? 
            // bidIsSet ? 
            // <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Bid Placed Successfully</Text>
            // : 
            <TouchableOpacity
            style={{ backgroundColor: 'coral', flex: 1, height: 45, justifyContent: 'center', margin: 5, borderRadius: 10, width: '100%', elevation: 5, opacity: canApply? 1:0.6 }}
            onPress={handlePlaceBid}
            >
              <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Place a bid</Text>
            </TouchableOpacity>
          
          :
          <TouchableOpacity onPress={() => navigation.navigate("View Bids", {freelance: freelance})}
          style={{ backgroundColor: 'coral', flex: 1, height: 45, justifyContent: 'center', margin: 5, borderRadius: 10, width: '100%', elevation: 5 }}>
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>View Bids</Text>
          </TouchableOpacity>
          }
          
        </View>
      <Modal 
        animationType="slide"
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(!isModalVisible)} >
          <View style={{ backgroundColor: '#f0f0f0', borderColor:'coral', position:'absolute', bottom:'7%', width: '100%', borderTopLeftRadius:20, borderTopRightRadius:20, borderWidth: 1, padding: 20}}>

          <View style={{flexDirection: "row", marginBottom: 20,}}>
          <TouchableOpacity style={[styles.modalBackground, styles.button, {left: 0,}]} onPress={() => {toggleModal(); setBid("");}}>
              <Text><AntDesign name="closecircleo" size={24} color="#404040" /></Text>
            </TouchableOpacity>
          </View>
        

          <Text style={{color: "coral", marginBottom: 20, fontSize: 18}}>Enter your Bid for the Project: </Text>
              <TextInput
                style={{width:'100%', backgroundColor:'white', borderRadius:10, borderWidth:1, fontSize:17,borderColor:'grey',marginBottom:13, height:45, padding:10}}
                placeholder="Enter bid"
                value={bid}
                keyboardType='numeric'
                onChangeText={handleBid}
              />
            <TouchableOpacity style={{width:'100%', backgroundColor:'coral', height:40, borderRadius:10, textAlign:'center', justifyContent:'center'}} onPress={() => {submitBid()}}>
              <Text style={{color:'white', fontSize:20, textAlign:'center'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        
      </Modal>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 'auto',
    marginBottom: 'auto',
    height: '50%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  TextInput: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
    width: 300,
    height: 55,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
    fontSize: 17,
    color: 'grey'
},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  basic: {
    width: '100%',
    paddingVertical: 25,
    paddingLeft: 17,
    borderBottomWidth: 3,
    borderBottomColor: '#ffe5d3',
    flexDirection: 'row',
    backgroundColor: '#F8F8F8'
  },
  title: {
    width: '100%',
    fontWeight: 600,
    fontSize: 18,
    color: '#505050'
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#ffe5d3',
  },
  openings: {
    fontSize: 15,
    color: 'white',
    backgroundColor: '#BEBEBE',
    textAlign: 'center',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 15,
    width: 50
  },
  apply: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row'
  },
  download: {
    width: '35%',
    height: 40,
    backgroundColor: '#d0d0d0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,

  }
});