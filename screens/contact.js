import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../firebase/databaseConfig'
import { ref, set, push} from 'firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';

export default function Contact({navigation}) {
  const [suggestions, setSuggestions] = useState("")

  const submitSuggestions = async () => {
    const userdata = await AsyncStorage.getItem("userData");
    const val = JSON.parse(userdata)

    const data = {
        uid: val.userId,
        name: val.name,
        email: val.email,
        suggestion: suggestions
    }

    const suggestionRefs = push(ref(db, `suggestions/`));
    set(suggestionRefs, data);

    Toast.show('Thanks for your valuable feedback!!', {
        backgroundColor:'#fda172',
        duration: Toast.durations.LONG,
        position: -100,
        shadow: true,
        borderRadius: 100, 
        animation: true,
        opacity:100,
        hideOnPress: false
    });

    navigation.navigate("Home")
  }

  return (
        <View style={styles.container}>
            <View style={{ alignItems:'center', padding:15, backgroundColor:'coral', elevation:15}}>
              <TouchableOpacity style={styles.closeButton} onPress={() => {navigation.navigate("HomeTabsInDrawer")}}>
                <AntDesign name="close" size={28} color="white" />
              </TouchableOpacity>
              <Text style={styles.heading}>Contact Us</Text>
            </View>

            <View style={{width:'100%', marginTop:50, marginBottom:50, alignItems:'center'}}>
            <Text style={{width:'95%', textAlign:'left', fontSize:20, color:'#696969', fontWeight:'bold', marginBottom:10, marginLeft:5}}>Got any Suugestions for us ?</Text>

            <View style={styles.suggestion}>
              <TextInput
                placeholder='Your suggestion'
                multiline
                numberOfLines={8}
                onChangeText={(text) => setSuggestions(text)}
                value={suggestions}  
                style={styles.textArea}
              />
              <TouchableOpacity style={styles.submitBtn} onPress={()=> submitSuggestions()}><Text style={{color:'white', fontSize:17}}>Submit</Text></TouchableOpacity>
            </View>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent:'center'
  },
  heading: {
    fontSize: 22,
    fontWeight: 500,
    color:'white'
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestion: {
    width:'95%',
    alignItems:'center'
  },
  submitBtn: {
    width:'100%',
    alignItems:'center',
    backgroundColor:'coral',
    height:35,
    justifyContent:'center',
    borderRadius:5,
    marginTop:10,
    elevation:5
  },
  textArea: {
    borderWidth:1.5,
    borderColor:'#b0b0b0',
    width:'100%',
    padding:10,
    borderRadius:12,
    display:'flex',
    color:'#696969',
    backgroundColor:'white',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    fontSize:15
  },
});
