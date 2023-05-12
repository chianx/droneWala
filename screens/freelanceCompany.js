import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Images from '../images/index'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {db} from '../firebase/databaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref,onValue,push,update,remove } from 'firebase/database';

export default function FreelanceCompanies({navigation}) {

    const [freelance, setFreelance] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userType, setUserType] = useState("");
  
    const mount = async() => {
      const type = await AsyncStorage.getItem("userType");
      const jsonType = JSON.parse(type);
      setUserType(jsonType);
    }

    const fetchData = async() => {
      const starCountRef = ref(db, 'freelance/');
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
          setFreelance(tempJob);
        }else {
          setFreelance(allJobs);
        }
        setIsLoading(false);
      });
    }

    useEffect(() => {
      mount();
      fetchData();
    }, [])

    // useEffect (() => {
    //     // isLoading = true;
    //     const starCountRef = ref(db, 'jobs/');
    //     onValue(starCountRef, (snapshot) => {
    //     const data = snapshot.val();
    //     const job = Object.keys(data).map(key => ({
    //         id: key,
    //         ...data[key]
    //     }))
    //     var tempFree = [];
    //     for(var element in allJobs) {
    //         if(allJobs[element].companyName != user.name) {
    //             continue;
    //         }
    //         if(allJobs[element].ftORpt != "Freelance") {
    //             tempJob.push(allJobs[element])
    //         }else {
    //             tempFree.push(allJobs[element]);
    //         }
    //     }
    //     setDataList(tempJob);
    //     setJobs(job);
    //     setIsLoading(false);
    //     });
    // }, [])
    
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.courseContainer} onPress={() => navigation.navigate("Freelance Details", {freelance: item})}>
        <View style={{flexDirection:'row', padding:12,}}>
          <Image source={{uri: item.logo}} style={{height:80, width:80}} />
          <View style={{marginLeft:10, flex:1}}>
            <Text style={{fontWeight:600, fontSize:16}}>{item.title}</Text>
            <Text style={{color:'#444', fontWeight:'400', fontSize:16}}>{item.companyName}</Text>
          </View>
        </View>
          
          <View style={{paddingLeft:12, flex:1}}>
            
            <Text style={{fontSize: 15, color:'#666',}}>Category: {item.category}</Text>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontSize: 15, color:'#666', width:'50%'}}>Duration: {item.workDuration}</Text>
                <Text style={{fontSize: 15, color:'#666', width:'50%'}}><AntDesign name="calendar" size={14} color="#808080" /> {item.closingDate}</Text>
            </View>
            <Text style={{fontSize: 15, color:'#666',}}><Ionicons name="location-outline" size={14} color="#808080" />{item.location}</Text>
            <Text style={styles.price}>Max Bid: ₹{item.maxBid}</Text>
          </View>
        </TouchableOpacity>
    );


    return (
        
        <View style={styles.container}>
        {isLoading? <View style={{backgroundColor: '#e0e0e0aa', flex:1, justifyContent:'center'}}><ActivityIndicator size="large" color="coral" /></View> 
        :
        freelance.length === 0 ? 
        <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
        <View style={{alignSelf: 'center', marginVertical: 'auto'}}>
        <Text style={{fontSize: 20, alignContent: 'center', color: 'coral', fontWeight: 'bold', textShadowColor: 'grey', textShadowOffset: { width: -1.5, height: 1 }, textShadowRadius: 1,}}>No Projects Posted Yet</Text>
        </View>
        </View>
        : 
        <View style={{flex:1}}> 
            <FlatList
                data={freelance}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.flatListContentContainer}
            />
            {userType === "company"? 
              <TouchableOpacity style={{alignItems:'flex-end', position:'absolute', bottom:0, width:'100%'}} onPress={() => navigation.navigate("Post a Project")}>
                  <Ionicons name="add-circle-sharp" size={60} color="coral" />
              </TouchableOpacity> : <></>
            }
        </View>
        }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
      },
      pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      flatListContentContainer: {
        paddingBottom: 16,
      },
      courseContainer: {
        backgroundColor: '#fff',
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 9,
        shadowColor: 'coral',
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      courseImage: {
        width: 140,
        height: 120,
      },
      courseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        marginTop:5
      },
      courseInstructor: {
        fontSize: 16,
        color: '#666',
      },
      price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop:7
      },
});
