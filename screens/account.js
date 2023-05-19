import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native';
import Images from '../images/index';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import EditProfileModal from './editProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../firebase/databaseConfig'
import {  
  ref,
  onValue,
  get
} from 'firebase/database';

export default function Account({isClicked, setIsClicked, navigation}) {
  
  const [user, setUser] = useState({});
  const [drones, setDrones] = useState([]);
  const [category, setCategory] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [review, setReview] = useState([]);
  const [active, setActive] = useState('Pending');
  const [dataList, setDataList] = useState([...accepted]);
  const [refreshing, setRefreshing] = useState(false);

  const mount = async() => {
    const userdata = await AsyncStorage.getItem("userData");
    const val = JSON.parse(userdata)
    setUser(val);
    setDrones(val.droneSelect);
    setCategory(val.interests);
    // setCategory(val.category);
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1300);
  }, []);

  const fetchJobsApplied = async() => {
    const tempApplied = [];
    const tempRejected = [];
    const tempPending = [];
    // Fetch the user applied job with status...
    var userRef = ref(db, `users/${user.userId}/applied`);
    onValue(userRef, (userSnap) => {
      if(!userSnap.exists()) {
        // TODO: Hide the peding, complete status
        return;
      }
      const applied = userSnap.val();
      var appliedArr = Array.from(applied);
      for(var index in appliedArr) {
        var applicationRef = ref(db, `applications/${appliedArr[index]}/${user.userId}`);
        onValue(applicationRef, (snap) => {
          var application = snap.val();
          if(application.status == "accepted") {
              console.log("applied " + application.jobId.jobId)
              get(ref(db, `jobs/${application.jobId}`)).then((jobSnap) => {
                tempApplied.push(jobSnap.val());
              })
          }else if(application.status == "rejected") {
              console.log("rejected " + application.jobId)
              get(ref(db, `jobs/${application.jobId}`)).then((jobSnap) => {
                tempRejected.push(jobSnap.val());
              })
          }else {
              console.log("pending " + application.jobId)
              get(ref(db, `jobs/${application.jobId}`)).then((jobSnap) => {
                console.log("This is jobsnap")
                console.log(jobSnap.val());
                tempPending.push(jobSnap.val());
              })
          }
        })
      }

      console.log("applied ", tempApplied);
      console.log("rejected ", tempRejected);
      console.log("pending ", tempPending);
    })
    
    setAccepted(tempApplied);
    setRejected(tempRejected);
    setReview(tempPending);
  }

  useEffect(() => {
    mount();
    fetchJobsApplied()
  }, []);

  const handleSaveProfile =() => {
    setIsClicked(!isClicked);
  };

  const handleCancelEdit = () => {
    setIsClicked(!isClicked);
  };

  return (
        <ScrollView contentContainerStyle={{ flexGrow: 1}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

        <View style={styles.container}>
        <View style={styles.basic}>
                <View style={{ paddingHorizontal: 20, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{uri:user.profile}} style={styles.avatar} />
                        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 15 }}>
                            <Text style={{ fontSize: 21, color: 'white', fontWeight:500 }}>{user.name}</Text>
                            <Text style={{fontSize: 16, color: 'white', fontWeight:400 }}><Ionicons name='location-outline' size={16} color='white' /> {user.city + ", " + user.state}</Text>
                            <Text style={{ fontSize: 16, color: 'white', fontWeight:400 }}><Ionicons name='ios-mail-outline' size={16} color='white' /> {" " + user.email}</Text>
                        </View>
                    </View>
                </View>
            </View>

              {/* Category Listing */}
                <Text style={{ fontSize: 20, color: '#606060', paddingBottom: 5, width:'93%', paddingLeft:10, paddingTop:10, fontWeight:'bold'}}>Fields of Work</Text>
                <View style={{flexDirection:'row', width:'93%', flex:1, flexWrap:'wrap'}}>
                { category.map((item, index) => {
                    return (
                        <View key = {index}>
                        <Text style={{fontSize:14, color: 'white', borderRadius:10, padding:10, backgroundColor:'#c0c0c0', margin:6}}>{item}</Text>
                        </View>
                    )
                    }) 
                }
                </View>

                {/* Drones Listing */}
                <Text style={{ fontSize: 20, color: '#606060', paddingBottom: 5, width:'93%', paddingLeft:10, paddingTop:10, fontWeight:'bold'}}>Drones</Text>
                <View style={{flexDirection:'row', width:'93%', flex:1, flexWrap:'wrap'}}>
                  { drones.map((item, index) => {
                    return (
                        <View key = {index}>
                        <Text style={{fontSize:14 ,color: 'white', borderRadius:10, padding:10, backgroundColor:'#c0c0c0', margin:6}}>{item}</Text>
                        </View>
                    )
                  }) 
                  }
                </View>

        <View style={{borderWidth:0.7, borderColor:'#FCD299', width:'95%', marginVertical:20}}></View>

        <View style={{justifyContent:'flex-start', width:'80%'}}>

          <Text style={{ fontSize: 20, color: '#606060', paddingBottom: 5, width:'93%', paddingLeft:10, paddingBottom:20, fontWeight:'bold'}}>More Info</Text>

          <View style={{flexDirection:'row', justifyContent:'flex-start', paddingBottom:10, marginVertical:10, borderBottomWidth:0.5, borderColor:'#e0e0e0'}}>
              <Image source={Images.experience} style={styles.icons}/>
              <View style={{justifyContent:'center', paddingLeft:15}}>
                  <Text style={{fontWeight:'bold', fontSize:17, color:"#808080"}}>Experience</Text>
                  <Text style={{fontWeight:400, fontSize:15, color:"#808080"}}>{user.experience}</Text>
              </View>
          </View>

          <View style={{flexDirection:'row', justifyContent:'flex-start', paddingBottom:10, marginVertical:10, borderBottomWidth:0.5, borderColor:'#e0e0e0'}}>
              <Image source={Images.droneIcon} style={styles.icons}/>
              <View style={{justifyContent:'center', paddingLeft:15}}>
                  <Text style={{fontWeight:'bold', fontSize:17, color:"#808080"}}>Number of Drones</Text>
                  <Text style={{fontWeight:400, fontSize:15, color:"#808080"}}>{drones.length}</Text>
              </View>
          </View>

          <View style={{flexDirection:'row', justifyContent:'flex-start', paddingBottom:10, marginVertical:10, borderBottomWidth:0.5, borderColor:'#e0e0e0'}}>
              <Image source={Images.certified} style={styles.icons}/>
              <View style={{justifyContent:'center', paddingLeft:15}}>
                  <Text style={{fontWeight:'bold', fontSize:17, color:"#808080"}}>Certified</Text>
                  <Text style={{fontWeight:400, fontSize:15, color:"#808080"}}>{user.dcgaCert? "Yes": "No"}</Text>
              </View>
          </View>

          <View style={{flexDirection:'row', justifyContent:'flex-start', paddingBottom:10, marginVertical:10, borderBottomWidth:0.5, borderColor:'#e0e0e0'}}>
              <Image source={Images.calender} style={styles.icons}/>
              <View style={{justifyContent:'center', paddingLeft:15}}>
                  <Text style={{fontWeight:'bold', fontSize:17, color:"#808080"}}>D.O.B.</Text>
                  <Text style={{fontWeight:400, fontSize:15, color:"#808080"}}>{user.dob}</Text>
              </View>
          </View>

      </View>
          
          <View style={styles.status}>
            <View style={{flexDirection:'row'}}>
              <View style={[styles.tab, active==='Pending' && styles.btnActive]}>
                <TouchableOpacity onPress={() => (setActive('Pending') & setDataList(review) )} ><Text style={[active==='Pending' && {color:'white'}]}>Pending</Text></TouchableOpacity>
              </View>
              <View style={[styles.tab, active==='Completed' && styles.btnActive]}>
                <TouchableOpacity onPress={() => setActive('Completed') & setDataList(accepted)} ><Text style={[active==='Completed' && {color:'white'}]}>Completed</Text></TouchableOpacity>
              </View>
              <View style={[styles.tab, active==='Rejected' && styles.btnActive]}>
                <TouchableOpacity onPress={() => setActive('Rejected') & setDataList(rejected)}><Text style={[active==='Rejected' && {color:'white'}]}>Rejected</Text></TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.listing}>
            
              {dataList.map((item, index) => {
                return (
                  <View key={index} style={styles.jobContainer}>
                    <View style={{flexDirection:'row'}}>
                      <View style={{paddingRight:20}}>
                        <Image source={{uri: item.logo}} style={styles.profilePic}/>
                      </View>
                      <View style={{paddingRight:20, width:200}}>
                        <Text style={styles.title}>{item.jobTitle}</Text>
                        <Text style={{color:'#808080', paddingBottom:5}}>{item.companyName}</Text>
                        <Text style={{color:'#808080'}}><Ionicons name="location-outline" size={14} color="#808080" />{' ' + item.location}</Text>
                        <Text style={{color:'#808080'}}><Ionicons name="ios-cash-outline" size={14} color="#808080" />{' ₹' + item.salRange}</Text>
                        <Text style={{color:'#808080'}}><AntDesign name="calendar" size={14} color="#808080" />{' '+item.ftORpt}</Text>
                      </View>
                    </View> 
                  </View>
                )
              })}
            </View>
            
          </View>
          
        </View>

        <EditProfileModal
          visible={isClicked}
          onSave={handleSaveProfile}
          onClose={handleCancelEdit}
          setUserPrev={setUser}
          user={user}
      />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    width:'100%'
  },
  basic: {
    flex:1,
    backgroundColor: '#fda172',
    paddingVertical:40,
    marginBottom:10,
    width: '100%',
    elevation: 10,
    justifyContent:'center'
  },
  avatar : {
    height:75,
    width: 75,
    borderRadius: 70
  },
  experienceBox: {
    marginTop:17,
    width:'90%',
    height: 130,
    backgroundColor: '#f0f0f0',
    borderRadius:20,
    elevation:10

  },
  experience: {
    textAlign: 'center',
    width:'33%',
    justifyContent:'center',
    
  },
  icons : {
    height: 50,
    width:50,
    alignSelf:'center'
  },
  interests: {
    marginTop:17,
    width: '90%',
    backgroundColor: '#ffe5d3',
    alignItems:'center',
    borderRadius:20,
    elevation:10,
    padding:10,
  },
  drones: {
    marginTop:17,
    width: '90%',
    backgroundColor: '#ffe5d3',
    alignItems:'center',
    borderRadius:20,
    elevation:10,
    padding:10
  },
  status: {
    width:'90%',
    flex:1,
    marginTop:17,
    alignItems:'center',
    paddingBottom:43
  },
  tab: {
    borderWidth:1,
    borderColor:'#ccc',
    alignItems:'center',
    justifyContent:'center',
    width:'33%',
    paddingVertical: 10
  },
  btnActive: {
    backgroundColor:'coral',
    
  },
  listing: {
    width:'99%',
    borderWidth:1,
    borderColor:'#ccc',
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10
  },
  profilePic: {
    width:70,
    height:70,
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
    backgroundColor:'#F8F8F8'
  }
});
