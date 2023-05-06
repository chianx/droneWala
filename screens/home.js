import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, FlatList, Dimensions, Linking } from 'react-native';
import Images from '../images/index';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase/databaseConfig'
import { ref, onValue, query, orderByChild, limitToLast, limitToFirst, push, set } from 'firebase/database';
import axios from 'axios';

export default function Home({ navigation }) {
  const [sugestions, setSugestions] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndexCourse, setActiveIndexCourse] = useState(0);
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState({});

  const mount = async () => {
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
  const handleOnScrollCourse = (event) => {
    const slideSize = 250;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndexCourse(Math.round(index));
  };

  const [getJobs, setJobs] = useState([]);
  const [articles, setArticles] = useState([]);
  const [getCourses, setCourses] = useState([]);

  useEffect(() => {
    const starCountRefJobs = query(ref(db, 'jobs/'), orderByChild('numOpen'), limitToFirst(4));
    onValue(starCountRefJobs, async(snapshot) => {
      const data = snapshot.val();
      const job = Object.keys(data).map(key => ({
        key: key,
        ...data[key]
      }))
      setJobs(job);
      mount();
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?q=drone&apiKey=97a1084b34ba46468b6f46954dc06382'
      );
      var temp = response.data.articles;
      for(let index in temp) {
        if(temp[index].urlToImage === null) {
          temp.splice(index, 1);
        }
        let title = temp[index].title;
        if(title.length >= 47) {
          title = title.substring(0, 47);
          title = title + "...";
          temp[index].title = title;
        }
        let content = temp[index].description;
        if(content) {
          content = content.substring(0, 70);
          content = content + "  ...";
          temp[index].description = content;
        }
        
      }
      setArticles(temp);
      
    });

    // onValue(starCountRefCourses, (snapshot) => {
    //   const data = snapshot.val();
    //   const courses = Object.keys(data).map(key => ({
    //     key: key,
    //     ...data[key]
    //   }))
    //   setCourses(courses);
    //   mount();
    // });    

  }, [])


  const courses = [
    {
      key: 1,
      title: 'Introduction to Drone Flying',
      institution: 'National Institute of Drone Flying',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ipsum eu metus congue consequat. Fusce auctor, diam id malesuada pharetra, velit nibh pulvinar odio, vitae faucibus massa dolor eu mi. Sed blandit volutpat risus, ac eleifend nisl pretium quis. Integer ut magna sed nisl vestibulum fringilla eget eu lectus. Sed pharetra, quam vel faucibus ullamcorper, nibh tellus bibendum velit, ut placerat lacus ipsum ac quam.',
      instructor: 'John Doe',
      price: 9999,
      duration: '30 Days',
      level: 'Beginner',
      image: Images.droneBanner,
      city: "Jaipur",
      state: 'Rajasthan',
      language: 'English',
      phone: '7340322282'
    },
    {
      key: 2,
      title: 'Advanced Drone Flying Techniques',
      institution: 'National Institute of Drone Flying',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ipsum eu metus congue consequat. Fusce auctor, diam id malesuada pharetra, velit nibh pulvinar odio, vitae faucibus massa dolor eu mi. Sed blandit volutpat risus, ac eleifend nisl pretium quis. Integer ut magna sed nisl vestibulum fringilla eget eu lectus. Sed pharetra, quam vel faucibus ullamcorper, nibh tellus bibendum velit, ut placerat lacus ipsum ac quam.',
      instructor: 'Jane Smith',
      price: 14999,
      duration: '45 Days',
      level: 'Intermediate',
      image: Images.droneBanner,
      city: "Mumbai",
      state: 'Maharashtra',
      language: 'English, Hindi',
      phone: '8112267173'
    },
    {
      key: 3,
      title: 'Drone Photography and Videography',
      institution: 'National Institute of Drone Flying',
      instructor: 'David Brown',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ipsum eu metus congue consequat. Fusce auctor, diam id malesuada pharetra, velit nibh pulvinar odio, vitae faucibus massa dolor eu mi. Sed blandit volutpat risus, ac eleifend nisl pretium quis. Integer ut magna sed nisl vestibulum fringilla eget eu lectus. Sed pharetra, quam vel faucibus ullamcorper, nibh tellus bibendum velit, ut placerat lacus ipsum ac quam.',
      price: 19999,
      duration: '92 days',
      level: 'Advanced',
      image: Images.droneBanner,
      city: "Noida",
      state: 'Uttar Pradesh',
      language: 'English',
      phone: '8385052405'
    },
  ];

  const Card = ({ item }) => (
    <TouchableOpacity key={item.key} onPress={() => navigation.navigate('Job Details', { job: item })}>
      <View style={styles.card}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: item.logo }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.jobTitle}</Text>
            <Text style={styles.cardDescription}>{item.companyName}</Text>
          </View>
        </View>
        <View style={{ marginLeft: 5, marginTop: 20 }}>
          <Text style={{ color: '#808080' }}><Ionicons name="location-outline" size={14} color="#808080" />{item.Location}</Text>
          <Text style={{ color: '#808080' }}><Ionicons name="ios-cash-outline" size={14} color="#808080" />{' ₹' + item.salRange}</Text>
          <Text style={{ color: '#808080' }}><AntDesign name="calendar" size={14} color="#808080" />{' ' + item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const CardCourse = ({ item }) => (
    <TouchableOpacity key={item.key} onPress={() => navigation.navigate("Course Details", { course: item })}>
      <View style={{ width: 250, backgroundColor: '#F8F8F8', borderRadius: 8, overflow: 'hidden', marginRight: 16, padding: 15}}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={item.image} style={styles.courseImage} />
          <View style={styles.cardContent}>
            <Text style={{fontSize:18, fontWeight:'bold'}}>{item.title}</Text>
          </View>
        </View>
        <Text style={{fontSize:15, fontWeight:500, color:'#505050'}}>{item.institution}</Text>
        <View style={{ marginLeft: 5, marginTop: 10, flex: 1 }}>
        <Text style={styles.courseLevel}>Level: {item.level}</Text>
        <Text style={styles.courseDuration}><AntDesign name="calendar" size={14} color="#808080" /> {item.duration}</Text>
        <Text style={[styles.courseDuration, { marginBottom: 8 }]}><Ionicons name="location-outline" size={14} color="#808080" /> {item.city + ", " + item.state}</Text>
        <Text style={styles.coursePrice}>Price: ₹{item.price}</Text>
      </View>
      </View>
    </TouchableOpacity>
  );

  const renderDot = (_, index) => (
    <View key={index+1}
      style={[
        styles.dot,
        { backgroundColor: index === activeIndex ? 'coral' : '#d3d3d3' },
      ]}
    />
  );

  const CardNews = ( item, index) => (
    <TouchableOpacity key={index+1} style={{marginBottom:10,}} onPress={() => {Linking.openURL(item.url)}}>
      <View style={{borderRadius: 15, flexDirection:'row', width:'100%',paddingBottom:15, borderColor:'#a0a0a0', borderWidth:2, padding:10}}>
        <View style={{width:'35%', justifyContent:'center', height:110}}>
          <Image style={{height:110, width:100, paddingRight:10, borderRadius:15}} source={{uri: item.urlToImage}}/>
        </View>
        <View style={{width:'65%', height:110, paddingLeft:5}}>
          <Text style={{fontSize:14.5, fontWeight:'bold', color:'#606060'}}>{item.title}</Text>
          <Text style={{}}>{item.description}<Text style={{color:'coral'}}>See more</Text></Text>
          
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDotCourse = (_, index) => (
    <View key={index+1}
      style={[
        styles.dot,
        { backgroundColor: index === activeIndexCourse ? 'coral' : '#d3d3d3' },
      ]}
    />
  );

  return (
    <ScrollView>
      <View style={styles.container}>

        {/* Icons */}
        {userType === "pilot"?
        <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginTop:20 }}>
          <View>
            <TouchableOpacity onPress={() => {navigation.navigate("Jobs")}}>
              <Image style={styles.icons} source={Images.searchJobs} />
              <Text style={{ textAlign: 'center', marginVertical: 7, color: '#696969' }}>Search Jobs</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => { navigation.navigate("Learnings") }}>
              <Image style={styles.icons} source={Images.learnDrone} />
              <Text style={{ textAlign: 'center', marginVertical: 7, color: '#696969' }}>Start Learning</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => {navigation.navigate("FreelanecStack")}}>
              <Image style={styles.icons} source={Images.myDrones} />
              <Text style={{ textAlign: 'center', marginVertical: 7, color: '#696969' }}>Freelance Work</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        :
        <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginTop:20 }}>
          <View>
            <TouchableOpacity onPress={() => {navigation.navigate("My Jobs", {screen : 'Post a Job'})}}>
              <Image style={styles.icons} source={Images.searchJobs} />
              <Text style={{ textAlign: 'center', marginVertical: 7, color: '#696969' }}>Post a Job</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => {navigation.navigate("My Projects", {screen : "Post a Project"})}}>
              <Image style={styles.icons} source={Images.learnDrone} />
              <Text style={{ textAlign: 'center', marginVertical: 7, color: '#696969' }}>Post a Project</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => {navigation.navigate("My Account")}}>
              <Image style={styles.icons} source={Images.myDrones} />
              <Text style={{ textAlign: 'center', marginVertical: 7, color: '#696969' }}>My Account</Text>
            </TouchableOpacity>
          </View>
        </View>
        }
        {/* Trending Jobs */}
        <View style={{ width: '90%', marginVertical: 25 }}>
          <Text style={{ width: '100%', textAlign: 'left', fontSize: 20, color: '#696969', fontWeight: 'bold', marginBottom: 10, marginLeft: 5 }}>Trending Job Opportunities</Text>
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
        {userType === "pilot"?
        <View style={{ width: '90%', marginVertical: 0 }}>
          <Text style={{ width: '100%', textAlign: 'left', fontSize: 20, color: '#696969', fontWeight: 'bold', marginBottom: 10, marginLeft: 5 }}>Trending Courses</Text>
          <FlatList
            // data={getCourses}
            data={courses}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => <CardCourse item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={257}
            onScroll={handleOnScrollCourse}
            contentContainerStyle={styles.carouselContainer}
          />
          <View style={styles.dotContainer}>
            {courses.map((_, index) => renderDotCourse(_, index))}
          </View>
        </View> : <></>
        }

        {/* Suggestion Area */}
        {/* <View style={{ width: '90%', marginTop: 10, marginBottom: 50 }}>
          <Text style={{ width: '100%', textAlign: 'left', fontSize: 20, color: '#696969', fontWeight: 'bold', marginBottom: 10, marginLeft: 5 }}>Got any Suugestions for us ?</Text>

          <View style={styles.suggestion}>
            <TextInput
              placeholder='Your suggestion'
              multiline
              numberOfLines={8}
              onChangeText={(text) => setSugestions(text)}
              value={sugestions}
              style={styles.textArea}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmission}><Text style={{ color: 'white', fontSize: 17 }}>Submit</Text></TouchableOpacity>
          </View>
        </View> */}

        <View style={{ width: '90%', marginTop: 10, marginBottom: 50 }}>
          <Text style={{ width: '100%', textAlign: 'left', fontSize: 20, color: '#696969', fontWeight: 'bold', marginBottom: 10, marginLeft: 5 }}>News</Text>
          {articles.map((item, index) => CardNews(item, index))}

        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    borderWidth: 1.5,
    borderColor: '#b0b0b0',
    width: '100%',
    padding: 10,
    borderRadius: 12,
    display: 'flex',
    color: '#696969',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    fontSize: 15
  },
  suggestion: {
    width: '100%',
    // alignItems:'center'
  },
  submitBtn: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'coral',
    height: 35,
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
    elevation: 5
  },
  icons: {
    height: 100,
    width: 100,
    borderRadius: 20,
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
    padding: 15
  },
  cardImage: {
    width: 80,
    height: 80,
    // resizeMode: 'cover',
  },
  cardContent: {
    paddingHorizontal: 15,
    paddingVertical:5,
    width: 140
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555555',
    paddingBottom:5,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
    // position: 'absolute',
    // bottom: 0,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  courseContainer: {
    padding:7,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 9,
    shadowColor: 'coral',
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  courseImage: {
    width: 80,
    height: 80,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 5
  },
  courseInstructor: {
    fontSize: 16,
    color: '#666',
  },
  courseDuration: {
    fontSize: 16,
    paddingRight: 20,
    color: '#666',
  },
  courseLevel: {
    fontSize: 16,
    color: '#666',
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});