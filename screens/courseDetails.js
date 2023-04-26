import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

export default function CourseDetails({route, navigation}) {
  const course = route.params.course;

      const sendWhatsApp = (phone) => {
        let msg = "type something";
        let phoneWithCountryCode = "91" + phone;
      
        let mobile =
          Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
        if (mobile) {
          if (msg) {
            let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
            Linking.openURL(url)
              .then(data => {
                console.log("WhatsApp Opened");
              })
              .catch(() => {
                alert("Make sure WhatsApp installed on your device");
              });
          } else {
            alert("Please insert message to send");
          }
        } else {
          alert("Please insert mobile no");
        }
      };
    
      return (
        <ScrollView>
        <View style={styles.container}>

          <Image style={styles.thumbnail} source={course.image} />
          
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{course.title}</Text>
            <Text style={{color:'#606060', marginBottom: 5, fontSize:18, fontWeight:500}}>{course.institution}</Text>
            <Text style={styles.level}>{course.level}</Text>
          </View>
            <View style={{backgroundColor:'#f0f0f0', width:'100%', padding:'5%'}}>
            <Text style={{color:'#606060', fontSize:16, marginBottom:3}}>Instructor: {course.instructor}</Text>
            <Text style={{color:'#606060', fontSize:16, marginBottom:3}}><AntDesign name="calendar" size={16} color="#606060" /> {course.duration}</Text>
            <Text style={{color:'#606060', fontSize:16, marginBottom:3}}><Ionicons name="location-outline" size={16} color="#606060" /> {course.city + ", " + course.state}</Text>
            <Text style={{color:'#606060', fontSize:16, marginBottom:3}}><MaterialIcons name="language" size={16} color="#606060" /> {course.language}</Text>
            <Text style={styles.price}>{`$${course.price}`}</Text>
            </View>
            <View style={{ width:'90%', marginTop:17, marginBottom:60}} >
            <Text style={{color:'#3a3a3a', fontSize:20, fontWeight:500}}>About this course</Text>
            <Text style={styles.about}>{course.description}</Text>

            </View>
            
            <View style={{width:'90%', alignItems:'center', alignSelf:'center', position:'absolute', bottom:0, marginVertical:15}}>
              <TouchableOpacity style={styles.applyButton} onPress={() => sendWhatsApp(course.phone)}>
                <Text style={styles.applyButtonText}><Ionicons name="ios-logo-whatsapp" size={20} color="white" /> Enquire Now</Text>
              </TouchableOpacity>
            </View>


          </View>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems:'center',
      },
      thumbnail: {
        width: '95%',
        height: 220,
        resizeMode: 'cover',
        marginVertical:20,
        borderRadius:10
      },
      contentContainer: {
        width:'90%',
        paddingBottom:8,
        // paddingHorizontal: 16,
        // paddingVertical: 24,
        // backgroundColor: '#fff',
        // borderTopLeftRadius: 24,
        // borderTopRightRadius: 24,
        // marginTop: -24,
        // elevation: 4,
      },
      title: {
        color:'#505050',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 3,
      },
      instructor: {
        fontSize: 18,
      },
      price: {
        color:'#606060',
        fontSize: 18,
        fontWeight: 'bold',
      },
      about: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
      },
      applyButton: {
        backgroundColor: 'coral',
        paddingVertical: 13,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%'
      },
      applyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      level : {
        fontSize:15,
        color:'white',
        backgroundColor:'#BEBEBE',
        textAlign:'center', 
        paddingHorizontal:12,
        paddingVertical: 6,
        borderRadius:15,
        width:120,
        marginBottom: 15,
      },
    });
    