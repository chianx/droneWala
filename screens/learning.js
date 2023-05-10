import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import Images from '../images/index'

export default function Learning({navigation}) {

  const courses = [
    {
      id: 1,
      title: 'Introduction to Drone Flying',
      institution:'National Institute of Drone Flying',
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ipsum eu metus congue consequat. Fusce auctor, diam id malesuada pharetra, velit nibh pulvinar odio, vitae faucibus massa dolor eu mi. Sed blandit volutpat risus, ac eleifend nisl pretium quis. Integer ut magna sed nisl vestibulum fringilla eget eu lectus. Sed pharetra, quam vel faucibus ullamcorper, nibh tellus bibendum velit, ut placerat lacus ipsum ac quam.',
      instructor: 'John Doe',
      price: 9999,
      duration: '30 Days',
      level: 'Beginner',
      image: Images.droneBanner,
      city:"Jaipur",
      state:'Rajasthan',
      language: 'English',
      phone : '7340322282'
    },
    {
      id: 2,
      title: 'Advanced Drone Flying Techniques',
      institution:'National Institute of Drone Flying',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ipsum eu metus congue consequat. Fusce auctor, diam id malesuada pharetra, velit nibh pulvinar odio, vitae faucibus massa dolor eu mi. Sed blandit volutpat risus, ac eleifend nisl pretium quis. Integer ut magna sed nisl vestibulum fringilla eget eu lectus. Sed pharetra, quam vel faucibus ullamcorper, nibh tellus bibendum velit, ut placerat lacus ipsum ac quam.',
      instructor: 'Jane Smith',
      price: 14999,
      duration: '45 Days',
      level: 'Intermediate',
      image: Images.droneBanner,
      city:"Mumbai",
      state:'Maharashtra',
      language: 'English, Hindi',
      phone: '8112267173'
    },
    {
      id: 3,
      title: 'Drone Photography and Videography',
      institution:'National Institute of Drone Flying',
      instructor: 'David Brown',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ipsum eu metus congue consequat. Fusce auctor, diam id malesuada pharetra, velit nibh pulvinar odio, vitae faucibus massa dolor eu mi. Sed blandit volutpat risus, ac eleifend nisl pretium quis. Integer ut magna sed nisl vestibulum fringilla eget eu lectus. Sed pharetra, quam vel faucibus ullamcorper, nibh tellus bibendum velit, ut placerat lacus ipsum ac quam.',
      price: 19999,
      duration: '92 days',
      level: 'Advanced',
      image: Images.droneBanner,
      city:"Noida",
      state:'Uttar Pradesh',
      language :'English',
      phone:'8385052405'
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.courseContainer} onPress={() => navigation.navigate("Course Details", {course: item})}>
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