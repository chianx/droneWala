import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Images from '../images';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../firebase/databaseConfig'
import {  
  ref,
  onValue,
  query,
  orderByChild,
  limitToLast,
  limitToFirst,
  push,
  set
} from 'firebase/database';

export default function Home({navigation}) {
  const [sugestions, setSugestions] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState({});

  const mount = async() => {
    const userdata = await AsyncStorage.getItem("userData");
    const val = JSON.parse(userdata)
    setUser(val);
    setUserType(val.userType)
  }
  
  const { width } = Dimensions.get('window');
  const cardWidth = width - 32; 
  const cardListWidth = cardWidth * 2; 

  const handleOnScroll = (event) => {
    const slideSize = 230;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndex(Math.round(index));
  };

  const [getJobs, setJobs] = useState([]);

  useEffect (() => {
    const starCountRef = query(ref(db, 'jobs/'), orderByChild('numOpen'), limitToFirst(4));
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const job = Object.keys(data).map(key => ({
        key: key,
        ...data[key]
      }))
      console.log(job);
      setJobs(job);
      mount();
    });
    
  }, [])


  // const jobs = [{key:1, jobTitle:'Job Title-2 Drone Service ', profileImage: Images.profile, company:'Garud Survey', salary: '10,000-15,000/month', type:'Full Time', Location:'Jaipur', companyIcon:Images.droneIcon},
  // {key:2, jobTitle:'Job Title-2', profileImage: Images.profile, company:'Garud Survey', salary: '10,000-15,000/month', type:'Full Time', Location:'Jaipur', companyIcon:Images.droneIcon},
  // {key:3, jobTitle:'Job Title-3', profileImage: Images.profile, company:'DronePilots Network', salary: '30,000-35,000/month', type:'Part Time', Location:'Jaipur', companyIcon:Images.droneIcon},
  // {key:4, jobTitle:'Drone Survey Job', profileImage: Images.profile, company:'Fire Drone', type:'Full Time', salary:'20000/month', Location:'Jaipur', companyIcon:Images.droneIcon}];
  
  const Card = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('JobDetails', {job: item})}>
    <View style={styles.card} key={item.key}>
      <View style={{flexDirection:'row'}}>
        <Image source={{uri: item.logo}} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.jobTitle}</Text>
          <Text style={styles.cardDescription}>{item.companyName}</Text>
        </View>
      </View>
      <View style={{marginLeft:5, marginTop:10}}>
        <Text style={{color:'#808080'}}><Ionicons name="location-outline" size={14} color="#808080" />{item.Location}</Text>
        <Text style={{color:'#808080'}}><Ionicons name="ios-cash-outline" size={14} color="#808080" />{' ₹' + item.salRange}</Text>
        <Text style={{color:'#808080'}}><AntDesign name="calendar" size={14} color="#808080" />{' '+item.date}</Text>
      </View>   
    </View>
    </TouchableOpacity>
  );

  const renderDot = (_, index) => (
    <View key={_.key}
      style={[
        styles.dot,
        { backgroundColor: index === activeIndex ? 'coral' : '#d3d3d3' },
      ]}
    />
  );

  const handleSubmission =() => {
    console.log("here in sugestion")
    var refs = push(ref(db, "suggestions/" + user.name));
    var final =  {name:user.name, city:user.city, state:user.state, email:user.email, feedback:sugestions }
    setSugestions("");
    set(refs, final);
  }

  return (
        <ScrollView>
        <View style={styles.container}>

          {/* Logo */}
          <View style={{marginVertical:14}}>
            <Text style={{fontSize:26, color:'grey', fontWeight:'bold'}}>Drone<Text style={{fontWeight:'bold', fontSize:26, color:'coral'}}>Walas</Text></Text>
          </View>

          {/* Icons */}
          <View style={{flexDirection:'row', width:'90%', justifyContent:'space-between'}}>
            <View>
              <TouchableOpacity onPress={() => {navigation.navigate("Jobs")}}>
              <Image style={styles.icons} source={Images.searchJobs}/>
              <Text style={{textAlign:'center', marginVertical:7, color:'#696969'}}>Search Jobs</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => {userType==="company"? navigation.navigate("Create Post") : navigation.navigate("Learnings") }}>
              <Image style={styles.icons} source={Images.learnDrone}/>
              <Text style={{textAlign:'center', marginVertical:7, color:'#696969'}}>
                {userType==="company"? "Post a Job" : "Start Learning"}
              </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => {navigation.navigate("My Account")}}>
              <Image style={styles.icons} source={Images.myDrones}/>
              <Text style={{textAlign:'center', marginVertical:7, color:'#696969'}}>My Drones</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Trending Jobs */}
          <View style={{width:'90%', marginVertical:25}}>
            <Text style={{width:'100%', textAlign:'left', fontSize:20, color:'#696969', fontWeight:'bold', marginBottom:10, marginLeft:5}}>Trending Job Opportunities</Text>
            <FlatList
              data={getJobs}
              renderItem={({ item }) => <Card item={item} />}
              keyExtractor={(item) => item.key}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={247}
              onScroll={handleOnScroll}
              contentContainerStyle={styles.carouselContainer}
            />
            <View style={styles.dotContainer}>
              {getJobs.map((_, index) => renderDot(_, index))}
            </View>
          </View>

          {/* Courses */}
          {/* <View style={{width:'90%', marginVertical:25}}>
            <Text style={{width:'100%', textAlign:'left', fontSize:20, color:'#696969', fontWeight:'bold', marginBottom:10, marginLeft:5}}>Upvoted Courses</Text>
          </View> */}

          {/* Suggestion Area */}
          <View style={{width:'90%', marginTop:10, marginBottom:50}}>
            <Text style={{width:'100%', textAlign:'left', fontSize:20, color:'#696969', fontWeight:'bold', marginBottom:10, marginLeft:5}}>Got any Suugestions for us ?</Text>

            <View style={styles.suggestion}>
              <TextInput
                placeholder='Your suggestion'
                multiline
                numberOfLines={8}
                onChangeText={(text) => setSugestions(text)}
                value={sugestions}  
                style={styles.textArea}
              />
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmission}><Text style={{color:'white', fontSize:17}}>Submit</Text></TouchableOpacity>
            </View>
          </View>


        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent: 'center',
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
  suggestion: {
    width:'100%',
    // alignItems:'center'
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
  icons : {
    height:100,
    width: 100,
    borderRadius:20,
  },
  carouselContainer: {
    paddingRight: 16,
    paddingBottom: 16,
  },
  card: {
    width: 230,
    height: 200,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
    padding:15
  },
  cardImage: {
    width: 80,
    height: 80,
    // resizeMode: 'cover',
  },
  cardContent: {
    padding: 8,
    width:150
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555555',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent:'center'
    // position: 'absolute',
    // bottom: 0,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
});