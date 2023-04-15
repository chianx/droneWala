import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Images from '../images/index';

const CourseDetailsPage = () => {
    const course = {
        id: 1,
        title: 'Introduction to Drone Flying',
        institution:'National Institute of Drone Flying',
        instructor: 'John Doe',
        price: 9999,
        duration: '30 Days',
        description: 'Lorem Ipson dolor ator',
        level: 'Beginner',
        image: Images.droneBanner,
        city:"Jaipur",
        state:'Rajasthan',
        image: Images.droneBanner
      }
  return (
    <ScrollView style={styles.container}>
      <Image source={course.image} style={styles.courseImage} />
      <View style={styles.courseDetailsContainer}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseInstructor}>Instructor: {course.instructor}</Text>
        <Text style={styles.courseDuration}>Duration: {course.duration}</Text>
        <Text style={styles.courseLevel}>Level: {course.level}</Text>
        <Text style={styles.coursePrice}>Price: {course.price}</Text>
        <View style={styles.courseDescriptionContainer}>
          <Text style={styles.courseDescriptionTitle}>Description:</Text>
          <Text style={styles.courseDescription}>{course.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  courseImage: {
    width: '100%',
    height: 200,
  },
  courseDetailsContainer: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  courseInstructor: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  courseDuration: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  courseLevel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  coursePrice: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  courseDescriptionContainer: {
    marginBottom: 16,
  },
  courseDescriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 16,
    color: '#666',
  },
});

export default CourseDetailsPage;