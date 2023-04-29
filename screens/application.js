import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Images from '../images/index'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as OpenAnything from 'react-native-openanything'

export default function Application({route, navigation}) {
    const pilot = route.params.pilot;
    const answer = route.params.answer;
  return (
    <ScrollView>
        <View style={styles.container}>
          <View style={styles.basic}>
            <View style={{width:'70%'}}>
              <Text style={styles.title}>{pilot.name}</Text>
              <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}><Ionicons name="location-outline" size={16} color="#808080" />{pilot.city}</Text>
              <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}>Experience:{' ' + pilot.experience}</Text>
              <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}><AntDesign name="calendar" size={16} color="#808080" />{' '+ pilot.dob}</Text>
            </View>
            <Image source={Images.profile} style={styles.profilePic}/>
          </View>
          <View style={{paddingHorizontal:15, paddingTop:25}}>
            <Text style={styles.title}>Why does he think he is fit for the job ?</Text>
            <Text style={{paddingTop:7, fontSize:15, color:'#505050', lineHeight: 21}}>
              {answer.answer}     
            </Text>
          </View>
          
          {/* <View style={{paddingTop:25, borderBottomWidth: 3, borderBottomColor:'#ffe5d3'}}></View> */}
          <View style={{paddingHorizontal:15, paddingTop:25}}>
            <Text style={{width:'100%', fontWeight:'bold', fontSize:19, color:'#505050', paddingBottom:8}}>Resume of {pilot.name}</Text>
            <TouchableOpacity onPress={() => OpenAnything.Pdf(answer.resume)} style={styles.download}>
            <Text style={{color:'white', fontSize:15, textAlign:'center'}}>Download</Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingTop:25, borderBottomWidth: 3, borderBottomColor:'#ffe5d3'}}></View>
          <View style={{paddingHorizontal:15, paddingTop:25, backgroundColor:'#F8F8F8'}}>
            <Text style={{width:'100%', fontWeight:'bold', fontSize:19, color:'#505050', paddingBottom:8}}>Interested to hire ?</Text>

            <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}><Ionicons name="ios-mail-open-outline" size={16} color="black" /> {' '+ pilot.email}</Text>
            <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}><Ionicons name="call-outline" size={16} color="black" /> {' ' +pilot.phone}</Text>
          </View>
          <View style={{paddingTop:25, borderBottomWidth: 3, borderBottomColor:'#ffe5d3', backgroundColor:'#F8F8F8'}}></View>
          
          <View style={styles.apply}>
            <TouchableOpacity style={{backgroundColor:'white', justifyContent:'center', margin:5, height:55, flex:1 ,borderRadius:10, width:'48%', borderWidth:2, borderColor:'coral', elevation:5}}>
              <Text style={{color:'coral', fontSize:20, textAlign:'center'}}>Reject</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:'coral', flex:1,height:55, justifyContent:'center', margin:5, borderRadius:10, width:'48%', elevation:5}}>
              <Text style={{color:'white', fontSize:20, textAlign:'center'}}>Accept</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  basic: {
    width:'100%',
    paddingVertical: 25,
    paddingLeft:17,
    borderBottomWidth:3,
    borderBottomColor:'#ffe5d3',
    flexDirection:'row',
    backgroundColor:'#F8F8F8'
  },
  title : {
    width:'100%',
    fontWeight:'bold',
    fontSize:19,
    color:'#505050'
  },
  profilePic: {
    width:60,
    height:60,
    borderRadius:70,
    borderWidth:1,
    borderColor:'#ffe5d3',
  },
  openings : {
    fontSize:15,
    color:'white',
    backgroundColor:'#BEBEBE',
    textAlign:'center', 
    paddingHorizontal:14,
    paddingVertical:5,
    borderRadius:15,
    width:50
  },
  apply: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection:'row'
  },
  download: {
    width:'35%',
    height:40,
    backgroundColor:'#d0d0d0',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,

  }
});
