import react from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button,Image, TouchableOpacity } from 'react-native';
import Images from '../images';

export default function Signup({navigation}) {
  return (
        <View style={styles.container}>
            <Image style={{position:'absolute', bottom:0, width:"100%", resizeMode:'contain'}} source={Images.drone} />
            <View style={{position:'relative', top:110, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{paddingBottom:40}}><Text style={styles.heading}>Welcome to DronesWala</Text></View>
              <Text style={styles.ques}>You are ..?</Text>
              
              <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Pilot")}>
                <Text style={styles.btnText}>Drone Pilot</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Company")}>
                <Text style={styles.btnText}>Company</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Institute")}>
                <Text style={styles.btnText}>Training Instutution</Text>
              </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: '#ffe5d3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width:200,
    padding:15,
    borderRadius:16,
    margin:20,
    // backgroundColor:'#fda172' ,
    backgroundColor:'#ff7f50' ,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10
  },
  ques: {
    fontSize: 21,
    color:'#9c9c9c'

  },
  heading: {
    fontWeight:'bold',
    fontSize:27,
    color:'gray'
    
  },
  btnText : {
    color:'white',
    textAlign:'center',
    fontSize:17,
    fontWeight:'bold'
  }
});
