import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Images from '../images/index'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';

export default function JobDetails({route}) {
    const job = route.params.job;
  return (
    <ScrollView>
        <View style={styles.container}>
          <View style={styles.basic}>
            <View style={{width:'70%'}}>
              <Text style={styles.title}>{job.jobTitle}</Text>
              <Text style={{color:'#808080', paddingBottom:15, fontWeight:'bold', fontSize:17}}>{job.company}</Text>
              <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}><Ionicons name="location-outline" size={16} color="#808080" />{job.Location}</Text>
              <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}><Ionicons name="ios-cash-outline" size={16} color="#808080" />{' ₹' + job.salary}</Text>
              <Text style={{color:'#808080', fontSize:16, paddingBottom:5}}><AntDesign name="calendar" size={16} color="#808080" />{' '+job.type}</Text>
            </View>
            <Image source={Images.profile} style={styles.profilePic}/>
          </View>
          <View style={{paddingHorizontal:15, paddingTop:25}}>
            <Text style={styles.title}>{'About ' + job.company}</Text>
            <Text style={{paddingTop:7, fontSize:15, color:'#505050', lineHeight: 21}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Quis viverra nibh cras pulvinar mattis nunc.
              Elementum sagittis vitae et leo. Auctor urna nunc id cursus metus aliquam eleifend mi.
              Sodales ut eu sem integer vitae justo eget magna. Tempus quam pellentesque nec nam aliquam sem et. 
              Et leo duis ut diam quam. Fermentum et sollicitudin ac orci phasellus egestas tellus.     
            </Text>
          </View>
          <View style={{paddingHorizontal:15, paddingTop:25}}>
            <Text style={styles.title}>About the Job</Text>
            <Text style={{paddingTop:7, fontSize:15, color:'#505050', lineHeight: 21}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Quis viverra nibh cras pulvinar mattis nunc.
              Elementum sagittis vitae et leo. Auctor urna nunc id cursus metus aliquam eleifend mi.
              Sodales ut eu sem integer vitae justo eget magna. Tempus quam pellentesque nec nam aliquam sem et. 
              Et leo duis ut diam quam. Fermentum et sollicitudin ac orci phasellus egestas tellus.     
            </Text>
          </View>
          <View style={{paddingHorizontal:15, paddingTop:25}}>
            <Text style={styles.title}>Who can apply</Text>
            <Text style={{paddingTop:7, fontSize:15, color:'#505050', lineHeight: 21}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Quis viverra nibh cras pulvinar mattis nunc.
              Elementum sagittis vitae et leo. Auctor urna nunc id cursus metus aliquam eleifend mi.
              Sodales ut eu sem integer vitae justo eget magna. Tempus quam pellentesque nec nam aliquam sem et. 
              Et leo duis ut diam quam. Fermentum et sollicitudin ac orci phasellus egestas tellus.     
            </Text>
          </View>
          <View style={{paddingTop:25, borderBottomWidth: 3, borderBottomColor:'#ffe5d3'}}></View>
          <View style={{paddingHorizontal:15, paddingTop:25}}>
            <Text style={{width:'100%', fontWeight:'bold', fontSize:19, color:'#505050', paddingBottom:8}}>Number of Openings</Text>
            <Text style={styles.openings}>
              8    
            </Text>
          </View>
          <View style={styles.apply}>
          <TouchableOpacity style={{backgroundColor:'coral', paddingVertical:9, borderRadius:10}}><Text style={{color:'white', fontSize:17, textAlign:'center'}}>Apply Now</Text></TouchableOpacity>
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
  }
});
