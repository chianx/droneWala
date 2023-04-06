import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';

export default function Apply({route, navigation}) {
    const job = route.params.job;
    const [answer, setAnswer] = useState("");
    const [file, setFile] = useState(null);

    const selectDoc = async() => {
        
        let result = await DocumentPicker.getDocumentAsync({});
        if (result.type === 'success') {
            console.log(result);
            setFile(result.uri);
        }
        let fileInfo = await FileSystem.getInfoAsync(result.uri);
        if (fileInfo.exists) {
            console.log(fileInfo);
            // let directory = await FileSystem.requestDirectoryPermissionsAsync(result.uri)
            // console.log(directory);
            let fileContent = await FileSystem.readAsStringAsync(result.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            // Display the document contents in a WebView
            return <WebView source={{ html: fileContent }} />;
        }   
    }
  return (
        <View style={styles.container}>
            <Text>Why do you think you are fit for this Job ?</Text>
            <TextInput
                placeholder='Your Answer goes here!'
                multiline
                numberOfLines={8}
                onChangeText={(text) => setAnswer(text)}
                value={answer}  
                style={styles.textArea}
              />
              <View style={{margin:50, width:'90%', alignItems:'center'}}>
              <Text>Upload Resume here</Text>
              <TouchableOpacity style={styles.btn} onPress={selectDoc}>
                <Text style={{color:'white', fontSize:18}}>Choose</Text>
            </TouchableOpacity>
            </View>
            {/* {file != null ? <WebView source={{uri:file}} /> : <></>} */}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop:70
    // justifyContent: 'center',
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
  btn: {
    width:'90%',
    height:40,
    backgroundColor:'coral',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    marginTop:10,
    elevation:5
  }
});
