import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Images from '../images/index';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import EditProfileModalComp from './editProfileComp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../firebase/databaseConfig'
import {  
  ref,
  onValue,
} from 'firebase/database';

export default function Account({isClicked, setIsClicked, navigation }) {

    const user = {name: "Chintan Grover ", category:["Drone Delivery", "Agriculture", "Aerospace", "Remote Sensing"], drones:["Fire-drone", "expo-proj", "tropogo", "agriden"], email:'chinxgorver@gmal.com', phone:"7340322282", isCertified:"true", experience:'1-2 Years', numDrones:1}
    
    return (
      <ScrollView>
        <View style={styles.container}>
            <View style={styles.basic}>
                <View style={{ paddingHorizontal: 20, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={Images.profile} style={styles.avatar} />
                        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 15 }}>

                            <Text style={{ fontSize: 20, color: 'white' }}>{user.name}</Text>
                            <Text style={{ color: 'white' }}><Ionicons name='location-outline' size={16} color='white' /> Jaipur, Rajasthan</Text>
                            <Text style={{ color: 'white' }}><Ionicons name='ios-call-outline' size={16} color='white' /> {user.email}</Text>
                            <Text style={{ color: 'white' }}><Ionicons name='ios-call-outline' size={16} color='white' /> dronewala.com</Text>
                        </View>
                    </View>
                </View>
            </View>

               <Text style={{ fontSize: 20, color: '#606060', paddingBottom: 5, width:'93%', paddingLeft:10, paddingTop:10, fontWeight:'bold'}}>Fields of Work</Text>
                <View style={{flexDirection:'row', width:'93%', flex:1, flexWrap:'wrap'}}>
                { user.category.map((item, index) => {
                    return (
                        <View key = {index}>
                        <Text style={{fontSize:14, color: 'white', borderRadius:10, padding:10, backgroundColor:'#c0c0c0', margin:6}}>{item}</Text>
                        </View>
                    )
                    }) 
                }
                </View>
                <Text style={{ fontSize: 20, color: '#606060', paddingBottom: 5, width:'93%', paddingLeft:10, paddingTop:10, fontWeight:'bold'}}>Drones</Text>
                <View style={{flexDirection:'row', width:'93%', flex:1, flexWrap:'wrap'}}>
                { user.drones.map((item, index) => {
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
                        <Text style={{fontWeight:400, fontSize:15, color:"#808080"}}>1-2 Years</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row', justifyContent:'flex-start', paddingBottom:10, marginVertical:10, borderBottomWidth:0.5, borderColor:'#e0e0e0'}}>
                    <Image source={Images.droneIcon} style={styles.icons}/>
                    <View style={{justifyContent:'center', paddingLeft:15}}>
                        <Text style={{fontWeight:'bold', fontSize:17, color:"#808080"}}>Number of Drones</Text>
                        <Text style={{fontWeight:400, fontSize:15, color:"#808080"}}>2</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row', justifyContent:'flex-start', paddingBottom:10, marginVertical:10, borderBottomWidth:0.5, borderColor:'#e0e0e0'}}>
                    <Image source={Images.certified} style={styles.icons}/>
                    <View style={{justifyContent:'center', paddingLeft:15}}>
                        <Text style={{fontWeight:'bold', fontSize:17, color:"#808080"}}>Certified</Text>
                        <Text style={{fontWeight:400, fontSize:15, color:"#808080"}}>Yes</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row', justifyContent:'flex-start', paddingBottom:10, marginVertical:10, borderBottomWidth:0.5, borderColor:'#e0e0e0'}}>
                    <Image source={Images.calender} style={styles.icons}/>
                    <View style={{justifyContent:'center', paddingLeft:15}}>
                        <Text style={{fontWeight:'bold', fontSize:17, color:"#808080"}}>D.O.B.</Text>
                        <Text style={{fontWeight:400, fontSize:15, color:"#808080"}}>07/06/2002</Text>
                    </View>
                </View>
                
                
            </View>

            <View style={styles.divider}>
                <View style={[styles.dividerView, {marginRight:20, marginLeft:20}]}></View>
                <Text style={styles.dividerText}>About us</Text>
                <View style={[styles.dividerView, {marginRight:20, marginLeft:20}]}></View>
            </View>
            <View style={{width:'90%', marginTop:10}}>
                <Text style={{color:'grey', fontSize:15}}>{user.about}</Text>
            </View>

        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%'
    },
    basic: {
        flex:1,
        // borderRadius: 20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        backgroundColor: '#fda172',
        paddingVertical:40,
        marginBottom:10,
        width: '100%',
        elevation: 10,
        justifyContent:'center'
    },
    avatar: {
        height: 75,
        width: 75,
        borderRadius: 70
    },
    experienceBox: {
        marginTop: 17,
        width: '40%',
        height: 130,
        marginHorizontal:15,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        elevation: 10,
        justifyContent:'center'
    },
    experience: {
        textAlign: 'center',
        width: '33%',
        justifyContent: 'center',

    },
    icons: {
        height: 50,
        width: 50,
        alignSelf: 'center'
    },
    interests: {
        marginTop: 17,
        width: '100%',
        backgroundColor: '#ffe5d3',
        // alignItems: 'center',
        borderRadius: 20,
        elevation: 7,
        padding: 10,
        marginRight: '3%',
        
    },
    drones: {
        marginTop:17,
        width: '90%',
        alignItems:'center',
        borderRadius:20,
        padding:10
    },
    status: {
        width: '90%',
        flex: 1,
        marginTop: 17,
        alignItems: 'center',
        paddingBottom: 43
    },
    tab: {
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        width: '33%',
        paddingVertical: 10
    },
    btnActive: {
        backgroundColor: 'coral',

    },
    listing: {
        width: '99%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
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
    },
    divider: {
        flexDirection:'row',
        width:'100%',
        marginTop: '7%',
        alignItems: 'center',
        justifyContent:'space-evenly'
    },
    dividerView: {
        height:2,
        backgroundColor:'#8e8e8e',
        width:'25%',
        opacity: 0.6
    },
    dividerText: {
        fontSize: 22,
        color:'#8e8e8e'
    },
});