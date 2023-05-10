import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Images from '../images/index'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import JobDetails from './jobDetails';
import {db} from '../firebase/databaseConfig'
import { ref,onValue,push,update,remove } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Jobs({navigation}) {

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState("pilot");
  useEffect (() => {
    // isLoading = true;
    const starCountRef = ref(db, 'jobs/');
    onValue(starCountRef, async(snapshot) => {
      const data = snapshot.val();
      const allJobs = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }))
      const userdata = await AsyncStorage.getItem("userData");
      const user = JSON.parse(userdata);
      setUserType(user.userType);
      if(user.userType === "company") {
        var tempJob = [];
        for(var element in allJobs) {
          if(allJobs[element].companyId != user.userId) {
              continue;
          }
          tempJob.push(allJobs[element])
      }
        setIsLoading(false);
        setJobs(tempJob);
      }else {
        setJobs(allJobs);
        setIsLoading(false);
      }
      
      
    });
  }, [])

  return (
        
        <View style={styles.container}>
        {isLoading? <View style={{backgroundColor: '#e0e0e0aa', flex:1, justifyContent:'center'}}><ActivityIndicator size="large" color="coral" /></View> : 
        <View>
        {jobs.length  === 0? <View><Text style={{textAlign:'center', color:'grey', fontWeight:400, fontSize:20}}>No Jobs Found!</Text></View>:
            <FlatList 
              data={jobs}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate('Job Details', {job: item})}>
                <View key={item.key} style={styles.jobContainer}>
                  <View style={{flexDirection:'row'}}>
                    <View style={{paddingRight:20}}>
                      <Image source={{uri: item.logo}} style={styles.profilePic}/>
                    </View>
                    <View style={{paddingRight:20, width:200}}>
                      <Text style={styles.title}>{item.jobTitle}</Text>
                      <Text style={{color:'#808080', paddingBottom:7}}>{item.companyName}</Text>
                      <Text style={{color:'#808080', paddingBottom:3}}><Ionicons name="location-outline" size={14} color="#808080" />{' '+ item.location}</Text>
                      <Text style={{color:'#808080', paddingBottom:3}}><Ionicons name="ios-cash-outline" size={14} color="#808080" />{' ₹' + item.salRange}</Text>
                      <Text style={{color:'#808080', paddingBottom:3}}><AntDesign name="calendar" size={14} color="#808080" />{' '+item.ftORpt}</Text>
                    </View>
                    <View style={{ justifyContent:'center', width:20}}>
                    <Text><MaterialIcons name="arrow-forward-ios" size={22} color="#C8C8C8" /></Text>
                    </View>
                  </View> 
                </View>
                </TouchableOpacity>
              )}
            />
        }
        </View>
        }
        {userType === "company"? 
          <TouchableOpacity style={{alignItems:'flex-end', position:'absolute', bottom:0, width:'100%', paddingRight:20}} onPress={() => navigation.navigate("Post a Job")}>
            <Ionicons name="add-circle-sharp" size={60} color="coral" />
          </TouchableOpacity> :
          <></>
        }
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
    backgroundColor:'#F8F8F8'
  }
});
