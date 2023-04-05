import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Contact({navigation}) {
  const [suggestions, setSuggestions] = useState("")
  return (
        <View style={styles.container}>
            <View style={{ alignItems:'center', padding:15, backgroundColor:'coral', elevation:15}}>
              <TouchableOpacity style={styles.closeButton} onPress={() => {navigation.navigate("Home")}}>
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
              <TouchableOpacity style={styles.submitBtn} onPress={()=> console.log(suggestions)}><Text style={{color:'white', fontSize:17}}>Submit</Text></TouchableOpacity>
            </View>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    paddingTop:35,
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
