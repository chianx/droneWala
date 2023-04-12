import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Images from '../images/index';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import EditProfileModal from './editProfile';

export default function Account({isClicked, setIsClicked, navigation}) {
  
  const [user, setUser] = useState({
    firstName: 'John Doe',
    lastName: 'johndoe@example.com',
    headline: 'I love React Native!',
    summary: 'I love React Native!'
  });

  const handleSaveProfile =() => {
    setIsClicked(!isClicked);
  };

  const handleCancelEdit = () => {
    setIsClicked(!isClicked);
  };

  const pending = [{key:2, jobTitle:'Lorem Ipsum dolor ebel candle jameesrirf', company:'Garud Survey', salary: '10,000-15,000/month', type:'Full Time',Location:'Jaipur'},
  {key:3, jobTitle:'Job Title-2', company:'Garud Survey', salary: '10,000-15,000/month', type:'Full Time', Location:'Jaipur'}];

  const rejected = [{key:4, jobTitle:'Job Title-2', company:'Garud Survey', salary: '10,000-15,000/month', type:'Full Time', Location:'Jaipur'},
  {key:5, jobTitle:'Job Title-3', company:'DronePilots Network', salary: '30,000-35,000/month', type:'Part Time', Location:'Jaipur'},
  {key:6, jobTitle:'Drone Survey Job', company:'Fire Drone', type:'Full Time', salary:'20000/month', Location:'Jaipur'}];
  const completed = [{key:5, jobTitle:'Job Title-3', company:'DronePilots Network', salary: '30,000-35,000/month', type:'Part Time', Location:'Jaipur'},
  {key:6, jobTitle:'Drone Survey Job', company:'Fire Drone', type:'Full Time', salary:'20000/month', Location:'Jaipur'}];

  const [active, setActive] = useState('Pending');
  const [dataList, setDataList] = useState([...pending]);
  return (
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>

        <View style={styles.container}>
          <View style={styles.basic}>
            <View style={{paddingHorizontal: 20, flex:1, justifyContent:'center'}}> 
            <View style={{flexDirection:'row'}}>
              <Image source={Images.profile} style={styles.avatar}/>
                <View style={{flex:1, justifyContent:'center', paddingLeft: 15}}> 
                  
                  <Text style={{fontSize:20, color:'white'}}>Chintan Grover</Text>
                  <Text style={{color: 'white'}}><Ionicons name='location-outline' size={16} color= 'white'/> Jaipur, Rajasthan</Text>
                  <Text style={{color: 'white'}}><Ionicons name='ios-call-outline' size={16} color= 'white'/> +91 7340322282</Text>
                </View>
            </View>
            </View>
          </View>

          <View style={styles.experienceBox}>
            <View style={{flex:1, flexDirection:'row' ,justifyContent:'center'}}>
              <View style={styles.experience}>
                <Image source={Images.droneIcon} style={styles.icons}/>
                <Text style={{textAlign:'center', color:'grey', paddingBottom:0, fontSize:17}}>2</Text>
              </View>
              <View style={styles.experience}>
                <Image source={Images.experience} style={styles.icons}/>
                <Text style={{textAlign:'center', color:'grey', paddingBottom:3, fontSize:17}}>1-2 Years</Text>
              </View>
              <View style={styles.experience}>
                <Image source={Images.certified} style={styles.icons}/>
                <Text style={{textAlign:'center', color:'grey', paddingBottom:3, fontSize:17}}>Yes</Text>
              </View>
            </View>
          </View>

          <View style={styles.interests}>
            <Text style={{ fontSize: 17, color: '#303030', paddingBottom: 5, width:'100%', paddingLeft:10, paddingTop:10}}>Area of interests</Text>
            <View style={{flexDirection:'row', width:'100%', flex:1, flexWrap:'wrap'}}>
              <Text style={{ color: 'white', borderRadius:10, padding:10, backgroundColor:'#c0c0c0', margin:6}}>Cinematography</Text>
              <Text style={{color: 'white', borderRadius:10, padding:10, backgroundColor:'#c0c0c0', margin:6}}>Mining</Text>
              <Text style={{color: 'white', borderRadius:10, padding:10, backgroundColor:'#c0c0c0', margin:6}}>Mining</Text>
              <Text style={{color: 'white', borderRadius:10, padding:10, backgroundColor:'#c0c0c0', margin:6}}>Mining</Text>
              <Text style={{color: 'white', borderRadius:10, padding:10, backgroundColor:'#c0c0c0', margin:6}}>Agriculture</Text>
              <Text style={{color: 'white', borderRadius:10, padding:10, backgroundColor:'#c0c0c0', margin:6}}>Agriculture</Text>
            </View>
          </View>

          <View style={styles.drones}>
            <Text style={{ fontSize: 17, color: '#303030', paddingBottom: 5, width:'100%', paddingLeft:10, paddingTop:10}}>My Drones</Text>
            <View style={{flexDirection:'row', width:'100%', flex:1, flexWrap:'wrap'}}>
              <Text style={{ color: 'white', borderRadius:10, padding:10, backgroundColor:'#c0c0c0', margin:6}}>FarmEasy-10A</Text>
              <Text style={{color: 'white', borderRadius:10, padding:10, backgroundColor:'#c0c0c0', margin:6}}>Ultra Max Hover</Text>
              <Text style={{color: 'white', borderRadius:10, padding:10, backgroundColor:'#c0c0c0', margin:6}}>Fine Tube A50</Text>
              <Text style={{color: 'white', borderRadius:10, padding:10, backgroundColor:'#c0c0c0', margin:6}}>SurveyDast</Text>
            </View>
          </View>
          
          <View style={styles.status}>
            <View style={{flexDirection:'row'}}>
              <View style={[styles.tab, active==='Pending' && styles.btnActive]}>
                <TouchableOpacity onPress={() => (setActive('Pending') & setDataList(pending) )} ><Text style={[active==='Pending' && {color:'white'}]}>Pending</Text></TouchableOpacity>
              </View>
              <View style={[styles.tab, active==='Completed' && styles.btnActive]}>
                <TouchableOpacity onPress={() => setActive('Completed') & setDataList(completed)} ><Text style={[active==='Completed' && {color:'white'}]}>Completed</Text></TouchableOpacity>
              </View>
              <View style={[styles.tab, active==='Rejected' && styles.btnActive]}>
                <TouchableOpacity onPress={() => setActive('Rejected') & setDataList(rejected)}><Text style={[active==='Rejected' && {color:'white'}]}>Rejected</Text></TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.listing}>
            
              {dataList.map((item, index) => {
                return (
                  <View key={item.key} style={styles.jobContainer}>
                    <View style={{flexDirection:'row'}}>
                      <View style={{paddingRight:20}}>
                        <Image source={Images.profile} style={styles.profilePic}/>
                      </View>
                      <View style={{paddingRight:20, width:200}}>
                        <Text style={styles.title}>{item.jobTitle}</Text>
                        <Text style={{color:'#808080', paddingBottom:5}}>{item.company}</Text>
                        <Text style={{color:'#808080'}}><Ionicons name="location-outline" size={14} color="#808080" />{item.Location}</Text>
                        <Text style={{color:'#808080'}}><Ionicons name="ios-cash-outline" size={14} color="#808080" />{' ₹' + item.salary}</Text>
                        <Text style={{color:'#808080'}}><AntDesign name="calendar" size={14} color="#808080" />{' '+item.type}</Text>
                      </View>
                    </View> 
                  </View>
                )
              })}
            </View>
            
          </View>
          
        </View>

        <EditProfileModal
        visible={isClicked}
        onSave={handleSaveProfile}
        onClose={handleCancelEdit}
        user={user}
      />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    width:'100%'
  },
  basic : {
    flex:1,
    marginTop:10,
    borderRadius:20,
    backgroundColor:'#fda172',
    height: 140,
    width:'90%',
    elevation:10,
    justifyContent:'center'
  },
  avatar : {
    height:75,
    width: 75,
    borderRadius: 70
  },
  experienceBox: {
    marginTop:17,
    width:'90%',
    height: 130,
    backgroundColor: '#f0f0f0',
    borderRadius:20,
    elevation:10

  },
  experience: {
    textAlign: 'center',
    width:'33%',
    justifyContent:'center',
    
  },
  icons : {
    height: 50,
    width:50,
    alignSelf:'center'
  },
  interests: {
    marginTop:17,
    width: '90%',
    backgroundColor: '#ffe5d3',
    alignItems:'center',
    borderRadius:20,
    elevation:10,
    padding:10,
  },
  drones: {
    marginTop:17,
    width: '90%',
    backgroundColor: '#ffe5d3',
    alignItems:'center',
    borderRadius:20,
    elevation:10,
    padding:10
  },
  status: {
    width:'90%',
    flex:1,
    marginTop:17,
    alignItems:'center',
    paddingBottom:43
  },
  tab: {
    borderWidth:1,
    borderColor:'#ccc',
    alignItems:'center',
    justifyContent:'center',
    width:'33%',
    paddingVertical: 10
  },
  btnActive: {
    backgroundColor:'coral',
    
  },
  listing: {
    width:'99%',
    borderWidth:1,
    borderColor:'#ccc',
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10
  },
  profilePic: {
    width:70,
    height:70,
    borderRadius:70,
    borderWidth:1,
    borderColor:'#ffe5d3',
  },
  title : {
    fontWeight:'bold',
    fontSize:18,
    color:'#505050'
  },
  jobContainer: {
    width:'100%',
    paddingHorizontal:25,
    paddingVertical:15,
    borderTopWidth:3,
    borderTopColor:'#ffe5d3',
    backgroundColor:'#F8F8F8'
  }
});
