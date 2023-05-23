import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ref, onValue, orderByChild, get, query, limitToLast} from 'firebase/database';
import {db} from '../firebase/databaseConfig'

export default function ViewBids({route, navigation}) {
  const freelance = route.params.freelance
  const [isLoading, setIsLoading] = useState(false);
  const [users, setApplied] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
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
      setRefreshing(false);
    })
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const freelanceRef = query(
      ref(db, `bids/${freelance.freelanceId}`),
      orderByChild('amount')
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
              applicants.push({answer: applications[index], user:x});
        })
      }
      const temp = applicants.sort(function(a, b) {return b.answer.amount -a.answer.amount}).slice(0,3)
      setApplied(temp);
      setIsLoading(false);
    })
    // console.log(applicants);
    
    
  }, [])

  return (
        
        <View style={styles.container}>
          {isLoading? <View style={{backgroundColor: '#e0e0e0aa', flex:1, justifyContent:'center'}}><ActivityIndicator size="large" color="coral" /></View> 
        :
        users.length == 0 ? 
        <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
        <View style={{alignSelf: 'center', marginVertical: 'auto'}}>
        <Text style={{fontSize: 20, alignContent: 'center', color: 'coral', fontWeight: 'bold', textShadowColor: 'grey', textShadowOffset: { width: -1.5, height: 1 }, textShadowRadius: 1,}}>No Bids Placed Yet</Text>
        </View>
        </View>
        : 
            <FlatList 
              refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh} 
              />}
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
    // backgroundColor:'#F8F8F8'
  }
});
