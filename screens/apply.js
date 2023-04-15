import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';
import * as OpenAnything from 'react-native-openanything'
import {storage} from '../firebase/firebase'
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes } from 'firebase/storage';
import Images from '../images/index'

export default function Apply({route, navigation}) {
    const job = route.params.job;
    const [answer, setAnswer] = useState("");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("")
    const [url, setUrl] = useState(null);
    const [error, setError] = useState("");
    const [answerExists, setAnswerExists] = useState(false);
    const [fileExists, setFileExists] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const selectDoc = async() => {
        
        let result = await DocumentPicker.getDocumentAsync({ type: "application/pdf", copyToCacheDirectory: true});
        if (result.type === 'success') {
            console.log(result);
            setFile(result.uri);
            setFileName(result.name);
            setFileExists(true);
            if(answerExists) {
              setAllowSubmit(true);
              setError("");
            }
            // OpenAnything.Pdf(result.uri);
        }  
    }

    const handleSubmit = async() => {
      if(answer.trim().length < 50) {
        setError("Answer Length should be greater than 50");
      }
      else if(file === null) {
        setError("Upload your Resume before trying");
      }
      else {
        setIsLoading(true);
        const metadata = {
          contentType: 'application/pdf'
        };
        const storageRef  = ref(storage, 'resume/' + Date.now())
        const blobImage = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function() {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", file, true);
          xhr.send(null);
        })
        const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            console.log(error)
          }, 
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              if(downloadURL != null) {
                setUrl(downloadURL);
                setIsLoading(false);
              }
            });
          });
          
          navigation.navigate("Jobs")
      }
    }
  return (
          <View style={styles.container}>
          {isLoading? <Image source={Images.loading} style={{position:'absolute', top:100, flex:1, zIndex:2}} /> : <></>}
          <View style={[{width:'100%', flex:1, alignItems:'center', opacity: isLoading? 0.5 : 1, backgroundColor: isLoading? '#e0e0e0': '#fff'}]}>
          <View style={{width:'90%'}}>
            <Text style={styles.text}>Why do you think you are fit for this Job ?</Text>
            <TextInput
                placeholder='Your Answer goes here!'
                multiline
                numberOfLines={8}
                onChangeText={(text) => {
                  setAnswer(text)
                  if(text.trim().length >= 50) {
                    setAnswerExists(true);
                  }else {
                    setAnswerExists(false);
                  }
                  
                }}
                value={answer}  
                style={styles.textArea}
            />
            </View>
            <View style={{ width:'90%', marginTop:40}}>
              <Text style={styles.text}>Add your Resume</Text>

              {file === null ?
                <TouchableOpacity style={styles.btn} onPress={selectDoc}>
                  <Text style={{color:'coral', fontSize:16, fontWeight:500}}>Choose</Text>
                </TouchableOpacity>
                :
                <View style={styles.filename}>
                  <Text style={{color:'#404040', fontSize:17, height:49}}>{fileName}</Text>
                  <TouchableOpacity style={styles.cross} onPress={() => {
                    setFile(null);
                    setFileName("");
                    setFileExists(false);
                    setAnswerExists(false);
                  }}>
                    <AntDesign name="closecircleo" size={24} color="#404040" />
                  </TouchableOpacity>
                </View>
              }
              
            </View>
            <Text style={{marginTop:50, color:'red'}}>{error}</Text>
            <View style={{alignItems:'center', width:'100%', backgroundColor:'white',position:'absolute', bottom:0, borderTopWidth:1, borderTopColor:'grey', marginVertical:7}}>
              <TouchableOpacity style={[styles.submitButton, {opacity: (answerExists && fileExists)?1:0.5}]} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
          </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    alignItems: 'center',
    paddingTop:20
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
    width:'45%',
    height:40,
    backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    // marginTop:10,
    borderColor:'coral',
    borderWidth:2,
    elevation:5,
  },
  text: {
    color:'grey',
    fontWeight:500,
    fontSize:20,
    paddingLeft:7,
    marginBottom:10
  },
  filename: {
    borderRadius:17,
    borderWidth:1,
    borderColor:'grey',
    width:'100%',
    height:50,
    padding:12,
    backgroundColor:'#e0e0e0',
    flexDirection:'row'
  } ,
  cross : {
    position:'absolute',
    justifyContent:'center',
    right:15,
    top:0,
    borderLeftColor:'#404040',
    borderLeftWidth:1,
    height:48,
    paddingLeft:10
  },
  submitButton: {
    backgroundColor: 'coral',
    paddingVertical: 10,
    width:'90%',
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems:'center',
    elevation:5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight:500
  },
});
