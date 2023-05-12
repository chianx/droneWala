import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Images from '../images/index'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ref, onValue, orderByChild, get, query, limitToLast} from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../firebase/databaseConfig'

export default function ViewBids({route, navigation}) {
  const freelance = route.params.freelance
  const [isLoading, setIsLoading] = useState(false);
  const [users, setApplied] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const freelanceRef = query(
      ref(db, `bids/${freelance.freelanceId}`),
      orderByChild('amount'),
      limitToLast(3)
    );
    let applicants = [];
    get(freelanceRef).then((snap) => {
      const applications = snap.val()
      console.log("Applications: " + applications);

      for(var index in applications) {
        console.log(`users/${applications[index].userId}  ${applications[index].amount}`)
        const xRef = ref(db, `users/${applications[index].userId}`);
            onValue(xRef, (snaps) => {
              const x = snaps.val();
              console.log(x);
              applicants.push({answer: applications[index], user:x});
              console.log(applicants);
        })
      }
      setApplied(applicants);
    })
    // console.log(applicants);
    
    setIsLoading(false);
  }, [])

  return (
        
        <View style={styles.container}>
        
            <FlatList 
              data={users}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate('View Profile', {userId: item.user.userId})}>
                <View key={item.key} style={styles.jobContainer}>
                  <View style={{flexDirection:'row'}}>
                    <View style={{paddingRight:20}}>
                      <Image source={{uri: item.user.profile}} style={styles.profilePic}/>
                    </View>
                    <View style={{paddingRight:20, width:200}}>
                      <Text style={styles.title}>{item.user.name}</Text>
                      <Text style={{color:'#808080', paddingBottom:3}}><Ionicons name="location-outline" size={14} color="#808080" />{' '+ item.user.city + ", " + item.user.state}</Text>
                      <Text style={{color:'#808080', paddingBottom:3}}>Experience{' ' + item.user.experience}</Text>
                      <Text style={{color:'#808080', paddingBottom:6}}>Certified: {item.user.dgcaCert? "Yes" : "No"}</Text>
                    </View>
                  </View> 
                  <Text style={{fontSize:16, fontWeight:'bold', color:'grey'}}>Bid Placed: ₹ {item.answer.amount}</Text>
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
