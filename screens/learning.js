import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import Images from '../images/index'

export default function Learning({navigation}) {

  const course = [
    {id:1, courseTitle: "Drone Pilots course from basic to advance", mode:"Offline", timeDuration:"3 Months", thumbnail:Images.droneBanner, aboutCourse:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim eu turpis egestas pretium aenean pharetra magna. Quis auctor elit sed vulputate mi sit. Nullam ac tortor vitae purus. Facilisis sed odio morbi quis commodo odio. Tincidunt tortor aliquam nulla facilisi cras fermentum odio. Nulla pharetra diam sit amet nisl suscipit adipiscing. Nunc congue nisi vitae suscipit. At lectus urna duis convallis convallis tellus. Gravida rutrum quisque non tellus orci ac auctor augue mauris. Cras adipiscing enim eu turpis egestas pretium aenean pharetra. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in. Morbi quis commodo odio aenean sed.', institutionName:'Drone Pilots Networks', city:'Jaipur', state:'Rajasthan', prerequisutes:'Person should have keen interest in learinig how to fly drone.', fees:'15000', level:'Beginer'},
    {id:2, courseTitle: "Flying Agriculture Drones and Learning the control", mode:"Offline", timeDuration:"3 Months", thumbnail:Images.droneBanner, aboutCourse:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim eu turpis egestas pretium aenean pharetra magna. Quis auctor elit sed vulputate mi sit. Nullam ac tortor vitae purus. Facilisis sed odio morbi quis commodo odio. Tincidunt tortor aliquam nulla facilisi cras fermentum odio. Nulla pharetra diam sit amet nisl suscipit adipiscing. Nunc congue nisi vitae suscipit. At lectus urna duis convallis convallis tellus. Gravida rutrum quisque non tellus orci ac auctor augue mauris. Cras adipiscing enim eu turpis egestas pretium aenean pharetra. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in. Morbi quis commodo odio aenean sed.', institutionName:'Drone Pilots Networks', city:'Mumbai', state:'Maharashtra', prerequisutes:'Person should have keen interest in learinig how to fly drone.', fees:'21000', level:'Intermediate'},
    {id:3, courseTitle: "The Bootcamp for learnign Remote Sensing Drones", mode:"Offline", timeDuration:"3 Months", thumbnail:Images.droneBanner, aboutCourse:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim eu turpis egestas pretium aenean pharetra magna. Quis auctor elit sed vulputate mi sit. Nullam ac tortor vitae purus. Facilisis sed odio morbi quis commodo odio. Tincidunt tortor aliquam nulla facilisi cras fermentum odio. Nulla pharetra diam sit amet nisl suscipit adipiscing. Nunc congue nisi vitae suscipit. At lectus urna duis convallis convallis tellus. Gravida rutrum quisque non tellus orci ac auctor augue mauris. Cras adipiscing enim eu turpis egestas pretium aenean pharetra. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in. Morbi quis commodo odio aenean sed.', institutionName:'DarudSurvey', city:'Noida', state:'Uttar Pradesh', prerequisutes:'Person should have keen interest in learinig how to fly a drone. \n Should have a drone of his own', fees:'18000', level:'Advance'},
  ]

  const courses = [
    {
      id: 1,
      title: 'Introduction to Drone Flying',
      institution:'National Institute of Drone Flying',
      instructor: 'John Doe',
      price: 9999,
      duration: '30 Days',
      level: 'Beginner',
      image: Images.droneBanner,
      city:"Jaipur",
      state:'Rajasthan'
    },
    {
      id: 2,
      title: 'Advanced Drone Flying Techniques',
      institution:'National Institute of Drone Flying',
      instructor: 'Jane Smith',
      price: 14999,
      duration: '45 Days',
      level: 'Intermediate',
      image: Images.droneBanner,
      city:"Mumbai",
      state:'Maharashtra'
    },
    {
      id: 3,
      title: 'Drone Photography and Videography',
      institution:'National Institute of Drone Flying',
      instructor: 'David Brown',
      price: 19999,
      duration: '92 days',
      level: 'Advanced',
      image: Images.droneBanner,
      city:"Noida",
      state:'Uttar Pradesh'
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.courseContainer}>
    <View style={{flexDirection:'row', padding:12,}}>
      <Image source={item.image} style={styles.courseImage} />
      <View style={{marginLeft:10, flex:1}}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={{color:'#6a6a6a', fontWeight:'400', fontSize:16}}>{item.institution}</Text>
      </View>
    </View>
      
      <View style={{paddingLeft:12, flex:1}}>
        
        <Text style={styles.courseInstructor}>Instructor: {item.instructor}</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.courseDuration}>Duration: {item.duration}</Text>
          <Text style={styles.courseLevel}>Level: {item.level}</Text>
        </View>
        <Text style={[styles.courseDuration, {marginBottom: 8}]}>Location: {item.city + ", " + item.state}</Text>
        <Text style={styles.coursePrice}>Price: ₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContentContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  flatListContentContainer: {
    paddingBottom: 16,
  },
  courseContainer: {
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
    width: 140,
    height: 120,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop:5
  },
  courseInstructor: {
    fontSize: 16,
    color: '#666',
  },
  courseDuration: {
    fontSize: 16,
    paddingRight:20,
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
})