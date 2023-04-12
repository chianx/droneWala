import react from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button,Image, TouchableOpacity } from 'react-native';
import Images from '../images';

export default function Signup({navigation}) {
  return (
        <View style={styles.container}>
              {/* Logo */}
              <View style={{marginBottom:0, marginTop:60}}>
                <Text style={{fontSize:30, color:'grey', fontWeight:'bold'}}>Drone<Text style={{fontWeight:'bold', fontSize:30, color:'coral'}}>Walas</Text></Text>
              </View>

              <Image style={{width:'100%', height:240}} source={Images.droneBanner} />

              <Text style={styles.ques}>You are ..?</Text>
              
              <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Pilot")}>
                <View style={{width:'40%', height:'100%', position:'absolute',left:0}}>
                  <Image source={Images.profile} style={{width:"100%", height:"100%", borderTopLeftRadius:16, borderBottomLeftRadius:16}} />
                </View>
                <View style={{width:'60%', position:'absolute', right:0, justifyContent:'center'}}>
                  <Text style={styles.btnText}>Drone Pilot</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Company")}>
                <View style={{width:'40%', height: '100%', position:'absolute',left:0, backgroundColor:'white', borderTopLeftRadius:16, borderBottomLeftRadius:16}}>
                  <Image source={Images.companyCoral} style={{width:80, height:'100%', alignSelf:'center'}} />
                </View>
                <View style={{width:'60%', position:'absolute', right:0, justifyContent:'center'}}>
                  <Text style={styles.btnText}>Company</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Institute")}>
                <View style={{width:'40%', height: '100%', position:'absolute',left:0, backgroundColor:'white', borderTopLeftRadius:16, borderBottomLeftRadius:16}}>
                  <Image source={Images.institute} style={{width:80, height:'100%', alignSelf:'center'}} />
                </View>
                <View style={{width:'60%', position:'absolute', right:0, justifyContent:'center'}}>
                  <Text style={styles.btnText}>Training Institute</Text>
                </View>
              </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    width:'90%',
    justifyContent:'center',
    height:80,
    borderRadius:16,
    margin: 10,
    // backgroundColor:'#fda172' ,
    backgroundColor:'coral' ,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
    flexDirection:'row',
    borderWidth:2,
    borderColor:'coral'
  },
  ques: {
    fontSize: 25,
    color:'grey',
    fontWeight:600,
    marginBottom:'8%'

  },
  heading: {
    fontWeight:'bold',
    fontSize:27,
    color:'gray'
    
  },
  btnText : {
    color:'white',
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold',
    paddingVertical:22
  }
});
