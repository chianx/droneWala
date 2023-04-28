import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Images from '../images/index'
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function Applicants({navigation}) {
    const applied = [{key:1, userId:'101', userDetails: {name:'Sauske Uchiha', experience:'0-1 Years', certified: 'true', city:'Hidden Leaf', phone:'+91 1234567890', email:'uchiha@gmail.com'}, answer:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis viverra nibh cras pulvinar mattis nunc.Elementum sagittis vitae et leo. Auctor urna nunc id cursus metus aliquam eleifend mi. Sodales ut eu sem integer vitae justo eget magna. Tempus quam pellentesque nec nam aliquam sem et. Et leo duis ut diam quam. Fermentum et sollicitudin ac orci phasellus egestas tellus.', resumeLink:'https://firebasestorage.googleapis.com/v0/b/droneswala-bce4b.appspot.com/o/resume%2F1680821874993?alt=media&token=8ffb6dc5-9b16-4b9d-881d-9291052a0bad'},
     {key:2, userId:'102', userDetails: {name:'Chintan Grover', experience:'2-3 Years', city:'Jaipur', certified: 'false', phone:'+91 7340322282', email:'chinxgrover@gmail.com'}, answer:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis viverra nibh cras pulvinar mattis nunc.Elementum sagittis vitae et leo. Auctor urna nunc id cursus metus aliquam eleifend mi. Sodales ut eu sem integer vitae justo eget magna. Tempus quam pellentesque nec nam aliquam sem et. Et leo duis ut diam quam. Fermentum et sollicitudin ac orci phasellus egestas tellus.', resumeLink: 'https://firebasestorage.googleapis.com/v0/b/droneswala-bce4b.appspot.com/o/resume%2F1680821874993?alt=media&token=8ffb6dc5-9b16-4b9d-881d-9291052a0bad'}, 
     {key:3, userId:'103', userDetails: {name:'Nauto Uzumaki', experience:'3-4 Years', city:'Fire', certified: 'true', phone:'+91 8111222671', email:'naruto.namikaze@gmail.com'}, answer:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis viverra nibh cras pulvinar mattis nunc.Elementum sagittis vitae et leo. Auctor urna nunc id cursus metus aliquam eleifend mi. Sodales ut eu sem integer vitae justo eget magna. Tempus quam pellentesque nec nam aliquam sem et. Et leo duis ut diam quam. Fermentum et sollicitudin ac orci phasellus egestas tellus.', resumeLink: 'https://firebasestorage.googleapis.com/v0/b/droneswala-bce4b.appspot.com/o/resume%2F1680821874993?alt=media&token=8ffb6dc5-9b16-4b9d-881d-9291052a0bad'}
    ]
  return (
        <View style={styles.container}>
            {applied.map((item, index) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate("Application", {pilot: item})}>
                  <View key={item.key} style={styles.jobContainer}>
                    <View style={{flexDirection:'row'}}>
                      <View style={{paddingRight:20}}>
                        <Image source={Images.profile} style={styles.profilePic}/>
                      </View>
                      <View style={{paddingRight:20, width:200}}>
                        <Text style={styles.title}>{item.userDetails.name}</Text>
                        <Text style={{color:'#808080'}}><Ionicons name="location-outline" size={14} color="#808080" />{' ' +item.userDetails.city}</Text>
                        <Text style={{color:'#808080'}}>Experience:{' ' + item.userDetails.experience}</Text>
                        <Text style={{color:'#808080'}}>DGCA Certified:{item.userDetails.certified? ' YES' : ' NO'}</Text>
                      </View>
                    </View> 
                  </View>
                  </TouchableOpacity>
                )
              })}
            {/* <Image source={Images.loading}  style={styles.gif} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  gif: {
    height:300,
    width:'100%'
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: '#ffe5d3',
},
title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#505050'
},
jobContainer: {
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderTopWidth: 3,
    borderTopColor: '#ffe5d3',
    backgroundColor: '#F8F8F8'
}
});
