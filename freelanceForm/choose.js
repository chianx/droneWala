import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import Images from '../images/index';
import { ScrollView } from 'react-native-gesture-handler';

export default function ChooseCategory({navigation}) {
 
// Agricultural Survey
// Cinematography
// Drone Delivery
// Others
  return (
    <ScrollView>
        <View style={styles.container}>
            <View style={{paddingTop:30}}>
              <Text style={styles.ques}>Choose the category of project</Text>
            </View>

              <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Freelance Form", {category:"Aerial Survey"})}>
                <View style={{width:'40%', height:'100%', position:'absolute',left:0}}>
                  <Image source={Images.profile} style={{width:"100%", height:"100%", borderTopLeftRadius:16, borderBottomLeftRadius:16}} />
                </View>
                <View style={{width:'60%', position:'absolute', right:0, justifyContent:'center'}}>
                  <Text style={styles.btnText}>Aerial Survey</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Freelance Form", {category:"Agricultural Survey"})}>
                <View style={{width:'40%', height: '100%', position:'absolute',left:0, backgroundColor:'white', borderTopLeftRadius:16, borderBottomLeftRadius:16}}>
                  <Image source={Images.companyCoral} style={{width:80, height:'100%', alignSelf:'center'}} />
                </View>
                <View style={{width:'60%', position:'absolute', right:0, justifyContent:'center'}}>
                  <Text style={styles.btnText}>Agricultural Survey</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Freelance Form", {category:"Cinematography"})}>
                <View style={{width:'40%', height: '100%', position:'absolute',left:0, backgroundColor:'white', borderTopLeftRadius:16, borderBottomLeftRadius:16}}>
                  <Image source={Images.institute} style={{width:80, height:'100%', alignSelf:'center'}} />
                </View>
                <View style={{width:'60%', position:'absolute', right:0, justifyContent:'center'}}>
                  <Text style={styles.btnText}>Cinematography</Text>
                </View>
              </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Freelance Form", {category:"Drone Delivery"})}>
                <View style={{width:'40%', height: '100%', position:'absolute',left:0, backgroundColor:'white', borderTopLeftRadius:16, borderBottomLeftRadius:16}}>
                  <Image source={Images.institute} style={{width:80, height:'100%', alignSelf:'center'}} />
                </View>
                <View style={{width:'60%', position:'absolute', right:0, justifyContent:'center'}}>
                  <Text style={styles.btnText}>Drone Delivery</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Freelance Form", {category:"Others"})}>
                <View style={{width:'40%', height: '100%', position:'absolute',left:0, backgroundColor:'white', borderTopLeftRadius:16, borderBottomLeftRadius:16}}>
                  <Image source={Images.institute} style={{width:80, height:'100%', alignSelf:'center'}} />
                </View>
                <View style={{width:'60%', position:'absolute', right:0, justifyContent:'center'}}>
                  <Text style={styles.btnText}>Others</Text>
                </View>
              </TouchableOpacity>
        </View>
        </ScrollView>
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
    fontSize: 23,
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