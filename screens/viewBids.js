import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Images from '../images/index'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {db} from '../firebase/databaseConfig'
import { ref,onValue,push,update,remove } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewBids({navigation}) {

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const users = [
    {userId:1,profile:Images.profile, pilotName:"Chintan Grover", bid:70000, certified:false, location:'Jaipur', experience:'1-2 Years'},
    {userId:1,profile:Images.profile, pilotName:"Bilal Sheikh", bid:80000, certified:true, location:'Delhi', experience:'1-2 Years'},
    {userId:1,profile:Images.profile, pilotName:"Prateek Singh", bid:81000, certified:true, location:'Mumbai', experience:'2-3 Years'}
  ]

  return (
        
        <View style={styles.container}>
          {isLoading? <View style={{backgroundColor: '#e0e0e0aa', flex:1, justifyContent:'center'}}><ActivityIndicator size="large" color="coral" /></View> 
        :
        users.length === 0 ? 
        <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
        <View style={{alignSelf: 'center', marginVertical: 'auto'}}>
        <Text style={{fontSize: 20, alignContent: 'center', color: 'coral', fontWeight: 'bold', textShadowColor: 'grey', textShadowOffset: { width: -1.5, height: 1 }, textShadowRadius: 1,}}>No Bids Placed Yet</Text>
        </View>
        </View>
        : 
            <FlatList 
              data={users}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate('View Profile', {user: item})}>
                <View key={item.key} style={styles.jobContainer}>
                  <View style={{flexDirection:'row'}}>
                    <View style={{paddingRight:20}}>
                      <Image source={item.profile} style={styles.profilePic}/>
                    </View>
                    <View style={{paddingRight:20, width:200}}>
                      <Text style={styles.title}>{item.pilotName}</Text>
                      <Text style={{color:'#808080', paddingBottom:3}}><Ionicons name="location-outline" size={14} color="#808080" />{' '+ item.location}</Text>
                      <Text style={{color:'#808080', paddingBottom:3}}>Experience{' ₹' + item.experience}</Text>
                      <Text style={{color:'#808080', paddingBottom:6}}>Certified: {' '+item.certified}</Text>
                    </View>
                  </View> 
                  <Text style={{fontSize:16, fontWeight:'bold', color:'grey'}}>Bid Placed: ₹ {item.bid}</Text>
                </View>
                </TouchableOpacity>
              )}
            />
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
