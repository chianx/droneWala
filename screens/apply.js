import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { db } from "../firebase/databaseConfig";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";
import { AntDesign } from "@expo/vector-icons";
import * as OpenAnything from "react-native-openanything";
import { storage } from "../firebase/firebase";
import axios from 'axios';
import * as fireBaseDatabase from 'firebase/database';
import {ref, getDownloadURL, uploadBytesResumable, uploadBytes } from "firebase/storage";
import Toast from "react-native-root-toast";
import {set, ref as dbRefs, push, runTransaction, get, child} from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Apply({ route, navigation }) {
  const job = route.params.job;
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState(null);
  const [error, setError] = useState("");
  const [answerExists, setAnswerExists] = useState(false);
  const [fileExists, setFileExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectDoc = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });
    if (result.type === "success") {
      console.log(result);
      setFile(result.uri);
      setFileName(result.name);
      setFileExists(true);
      if (answerExists) {
        // setAllowSubmit(true);
        setError("");
      }
      // OpenAnything.Pdf(result.uri);
    }
  };

  const sendNotifications = async (token) => {
    console.log(token);
    var data = JSON.stringify({
      data: {},
      notification: {
        body: "Someone applied to your job",
        title: "Check who",
      },
      to: token,
    });

    var config = {
      method: "post",
      url: "https://fcm.googleapis.com/fcm/send",
      headers: {
        Authorization:
          "key=AAAAjoab_0Y:APA91bEsHKY-W-hT0iIH3NycyckJay3rdc8VAAUSYsDgrM3-5D-cHPlOWiNWXWkqAv8QEmfRS9QHc2_A9wC6X-p9na-wGQ4hNJrMyCJ3QYlmIsNaOcb8tC_pVP1Lc5XHWIlHqxFRKzos",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
    if (answer.trim().length < 50) {
      setError("Answer Length should be greater than 50");
    } else if (file === null) {
      setError("Upload your Resume before trying");
    } else {
      // setIsLoading(true);
      const metadata = {
        contentType: "application/pdf",
      };
      const storageRef = ref(storage, "resume/" + Date.now());
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", file, true);
        xhr.send(null);
      });
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            setUrl(downloadURL);
            if (downloadURL != null) {
              // Add the answer to the firebase database.
              const userdata = await AsyncStorage.getItem("userData");
              var json = JSON.parse(userdata)
              console.log("userdata " + userdata)
              var refs = dbRefs(db, `applications/${job.jobId}/${json.userId}`)
              var final =  {
                id: refs.key,
                userId: json.userId,
                answer: answer,
                resume: downloadURL,
                jobId: job.jobId,
                status: "applied" // rejected, review.
              }
              set(refs, final);
              console.log("application summited.")
              
              // Link application to job post. 
              var jobRef = dbRefs(db, "jobs/" + job.jobId)
              runTransaction(jobRef, (job) => {
                if(job.applied) {
                  var arr = Array.from(job.applied);
                  arr.push(json.userId);
                  job = {...job, applied: arr}
                }else {
                  var arr = []
                  arr.push(json.userId);
                  job = {...job, applied: arr}
                }
                return job
              });

              var userRef = dbRefs(db, "users/" + json.userId)
              runTransaction(userRef, (user) => {
                if(user.applied) {
                  var arr = Array.from(user.applied);
                  arr.push(job.jobId);
                  user = {...user, applied: arr}
                }else {
                  var arr = []
                  arr.push(job.jobId);
                  user = {...user, applied: arr}
                }
                return user
              });
              
              setIsLoading(false);
            }
          });
        }
      );
      const starCountRef = fireBaseDatabase.ref(db, 'companyTokens/' + job.companyId);
      fireBaseDatabase.onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          console.log("fcmToken " + data)
          sendNotifications(data.fcmToken);
          Toast.show('Application Submitted.', {
            backgroundColor:'#a0a0a0',
            duration: Toast.durations.LONG,
            position: -100,
            shadow: true,
            borderRadius: 100, 
            animation: true,
            opacity:1,
            hideOnPress: false,
            delay: 1000,
        });

      })
      navigation.navigate("Jobs");
    }
  };
  return (
    <View style={styles.container}>
      {isLoading? <View>
            <View style={{backgroundColor:"#d3d3d3aa", position: "absolute", flex: 1, zIndex: 3, width:'100%', height:630, justifyContent:'center'}}>
                <ActivityIndicator size="large" color="coral" />
            </View>
        </View> : <></>}
      <View
        style={[
          {
            width: "100%",
            flex: 1,
            alignItems: "center",
            opacity: isLoading ? 0.5 : 1,
            backgroundColor: isLoading ? "#e0e0e0" : "#fff",
          },
        ]}
      >
        <View style={{ width: "90%" }}>
          <Text style={styles.text}>
            Why do you think you are fit for this Job ?
          </Text>
          <TextInput
            placeholder="Your Answer goes here!"
            multiline
            numberOfLines={8}
            onChangeText={(text) => {
              setAnswer(text);
              if (text.trim().length >= 50) {
                setAnswerExists(true);
              } else {
                setAnswerExists(false);
              }
            }}
            value={answer}
            style={styles.textArea}
          />
        </View>
        <View style={{ width: "90%", marginTop: 40 }}>
          <Text style={styles.text}>Add your Resume</Text>

          {file === null ? (
            <TouchableOpacity style={styles.btn} onPress={selectDoc}>
              <Text style={{ color: "coral", fontSize: 16, fontWeight: 500 }}>
                Choose
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.filename}>
              <Text style={{ color: "#404040", fontSize: 17, height: 49 }}>
                {fileName}
              </Text>
              <TouchableOpacity
                style={styles.cross}
                onPress={() => {
                  setFile(null);
                  setFileName("");
                  setFileExists(false);
                  setAnswerExists(false);
                }}
              >
                <AntDesign name="closecircleo" size={24} color="#404040" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Text style={{ marginTop: 50, color: "red" }}>{error}</Text>
        <View
          style={{
            alignItems: "center",
            width: "100%",
            backgroundColor: "white",
            position: "absolute",
            bottom: 0,
            borderTopWidth: 1,
            borderTopColor: "grey",
            marginVertical: 7,
          }}
        >
          <TouchableOpacity
            style={[
              styles.submitButton,
              { opacity: answerExists && fileExists ? 1 : 0.5 },
            ]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
    // justifyContent: 'center',
  },
  textArea: {
    borderWidth: 1.5,
    borderColor: "#b0b0b0",
    width: "100%",
    padding: 10,
    borderRadius: 12,
    display: "flex",
    color: "#696969",
    backgroundColor: "white",
    justifyContent: "flex-start",
    textAlignVertical: "top",
    fontSize: 15,
  },
  btn: {
    width: "45%",
    height: 40,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    // marginTop:10,
    borderColor: "coral",
    borderWidth: 2,
    elevation: 5,
  },
  text: {
    color: "grey",
    fontWeight: 500,
    fontSize: 20,
    paddingLeft: 7,
    marginBottom: 10,
  },
  filename: {
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "grey",
    width: "100%",
    height: 50,
    padding: 12,
    backgroundColor: "#e0e0e0",
    flexDirection: "row",
  },
  cross: {
    position: "absolute",
    justifyContent: "center",
    right: 15,
    top: 0,
    borderLeftColor: "#404040",
    borderLeftWidth: 1,
    height: 48,
    paddingLeft: 10,
  },
  submitButton: {
    backgroundColor: "coral",
    paddingVertical: 10,
    width: "90%",
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    elevation: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 500,
  },
});
