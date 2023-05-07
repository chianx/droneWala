import React, { useEffect, useState } from 'react';
import { Modal, TextInput, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Images from '../images/index'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as OpenAnything from 'react-native-openanything'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FreelanceDetails({ route, navigation, formData }) {
  const freelance = route.params.freelance;
  const [userType, setUserType] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bid, setBid] = useState('');
  const [bidIsSet, setBidIsSet] = useState(false)

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const submitBid = () => {
    console.log(bid)
    if(parseInt(bid) || +bid) {
      // check if less than maximum bid
      // if(bid <= +formData.maximumBid){
        console.log("accepted "+bid)
        toggleModal()
        setBidIsSet(true)
      // }
    }
  }

  const handleBid = (bid) => {
    setBid(bid);
  };


  const mount = async () => {
    const type = await AsyncStorage.getItem("userType");
    const jsonType = JSON.parse(type);
    setUserType(jsonType);
  }
  useEffect(() => {
    mount()
  }, [])
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.basic}>
          <View style={{ width: '70%' }}>
            <Text style={styles.title}>{freelance.title}</Text>
            <Text style={{ marginVertical: 4, fontSize: 16 }}>{freelance.companyName}</Text>
            <Text style={{ color: '#808080', fontSize: 16, paddingBottom: 5 }}><Ionicons name="location-outline" size={16} color="#808080" />{freelance.location}</Text>
            <Text style={{ color: '#808080', fontSize: 16, paddingBottom: 5 }}>Category:{' ' + freelance.category}</Text>
            <Text style={{ color: '#808080', fontSize: 16, paddingBottom: 5 }}><AntDesign name="calendar" size={16} color="#808080" />{' ' + freelance.closingDate}</Text>
          </View>
          <Image source={freelance.logo} style={styles.profilePic} />
        </View>
        <View style={{ paddingHorizontal: 15, paddingTop: 25 }}>
          <Text style={styles.title}>Work Description</Text>
          <Text style={{ paddingTop: 7, fontSize: 15, color: '#505050', lineHeight: 21 }}>
            {freelance.description}
          </Text>
          <Text style={{ marginTop: 15, width: '100%', fontWeight: 600, fontSize: 18, color: '#505050' }}>Bid Criteria</Text>
          <Text style={{ paddingTop: 7, fontSize: 15, color: '#505050', lineHeight: 21 }}>
            {freelance.bidCriteria}
          </Text>
        </View>

        {/* <View style={{paddingTop:25, borderBottomWidth: 3, borderBottomColor:'#ffe5d3'}}></View> */}
        <View style={{ paddingHorizontal: 15, paddingTop: 25 }}>
          <Text style={{ width: '100%', fontWeight: 'bold', fontSize: 19, color: '#505050', paddingBottom: 8 }}>Files for the project</Text>
          <TouchableOpacity onPress={() => OpenAnything.Pdf(freelance.document)} style={styles.download}>
            <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>Download</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 25, borderBottomWidth: 3, borderBottomColor: '#ffe5d3' }}></View>
        <View style={{ paddingHorizontal: 15, paddingTop: 25, backgroundColor: '#F8F8F8' }}>
          <Text style={{ width: '100%', fontWeight: 'bold', fontSize: 19, color: '#505050', paddingBottom: 8 }}>Other Details</Text>

          <Text style={{ color: '#808080', fontSize: 16, paddingBottom: 5 }}>Maximum Bid: {' ₹' + freelance.maxBid}</Text>
          <Text style={{ color: '#808080', fontSize: 16, paddingBottom: 5 }}>Work Duration: {' ' + freelance.workDuration}</Text>
          <Text style={{ color: '#808080', fontSize: 16, paddingBottom: 5 }}>Area Size: {' ' + freelance.areaSize}</Text>
        </View>
        <View style={{ paddingTop: 25, borderBottomWidth: 3, borderBottomColor: '#ffe5d3', backgroundColor: '#F8F8F8' }}></View>

        <View style={styles.apply}>
          {(userType == 'pilot') ? 
            // bidIsSet ? 
            // <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Bid Placed Successfully</Text>
            // : 
            <TouchableOpacity
            style={{ backgroundColor: 'coral', flex: 1, height: 45, justifyContent: 'center', margin: 5, borderRadius: 10, width: '100%', elevation: 5 }}
            onPress={toggleModal}
            >
              <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Place a bid</Text>
            </TouchableOpacity>
          
          :
          <TouchableOpacity
          style={{ backgroundColor: 'coral', flex: 1, height: 45, justifyContent: 'center', margin: 5, borderRadius: 10, width: '100%', elevation: 5 }}>
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>View Bids</Text>
          </TouchableOpacity>
          }
          
        </View>
      <Modal 
        animationType="slide"
        visible={isModalVisible}
        transparent={true}
        onRequestClose={toggleModal} >
          <View style={{ backgroundColor: '#f0f0f0', borderColor:'coral', position:'absolute', bottom:'7%', width: '100%', borderTopLeftRadius:20, borderTopRightRadius:20, borderWidth: 1, padding: 20}}>

          <View style={{flexDirection: "row", marginBottom: 20,}}>
          <TouchableOpacity style={[styles.modalBackground, styles.button, {left: 0,}]} onPress={() => {toggleModal(); setBid("");}}>
              <Text><AntDesign name="closecircleo" size={24} color="#404040" /></Text>
            </TouchableOpacity>
          </View>
        

          <Text style={{color: "coral", marginBottom: 20, fontSize: 18}}>Enter your Bid for the Project: </Text>
              <TextInput
                style={{width:'100%', backgroundColor:'white', borderRadius:10, borderWidth:1, fontSize:17,borderColor:'grey',marginBottom:13, height:45, padding:10}}
                placeholder="Enter bid"
                value={bid}
                keyboardType='numeric'
                onChangeText={handleBid}
              />
            <TouchableOpacity style={{width:'100%', backgroundColor:'coral', height:40, borderRadius:10, textAlign:'center', justifyContent:'center'}} onPress={() => {submitBid()}}>
              <Text style={{color:'white', fontSize:20, textAlign:'center'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        
      </Modal>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 'auto',
    marginBottom: 'auto',
    height: '50%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  TextInput: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
    width: 300,
    height: 55,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
    fontSize: 17,
    color: 'grey'
},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  basic: {
    width: '100%',
    paddingVertical: 25,
    paddingLeft: 17,
    borderBottomWidth: 3,
    borderBottomColor: '#ffe5d3',
    flexDirection: 'row',
    backgroundColor: '#F8F8F8'
  },
  title: {
    width: '100%',
    fontWeight: 600,
    fontSize: 18,
    color: '#505050'
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#ffe5d3',
  },
  openings: {
    fontSize: 15,
    color: 'white',
    backgroundColor: '#BEBEBE',
    textAlign: 'center',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 15,
    width: 50
  },
  apply: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row'
  },
  download: {
    width: '35%',
    height: 40,
    backgroundColor: '#d0d0d0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,

  }
});