import { View, Text, Image, TextInput, StyleSheet, Pressable, ScrollView  } from 'react-native'
import React, { useState, useRef } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { MultipleSelectList } from 'react-native-dropdown-select-list'


export default function PilotDetails({ formData, setFormData }) {
  const [shouldShow, setshouldShow] = useState(false)
  const [selectedDrone, setSelectedDrone] = React.useState(formData.droneSelect);
  const [selectedExperience, setSelectedExperience] = React.useState(formData.experience);
  const [selectedInterest, setSelectedInterest] = useState(formData.interests);

  const [t, setT] = useState(false);
  const [te, setTe] = useState(false);
  const [tee, setTee] = useState(false);

  const drone = [
    { key: '1', value: 'Tropogo' },
    { key: '2', value: 'Slider' },
    { key: '3', value: 'Agri' },
    { key: '4', value: 'Delivery' },
    { key: '5', value: 'Survey Mapping' },
  ]

  const experience = [
    { key: '1', value: '0-1 Years'},
    { key: '2', value: '1-2 Years'},
    { key: '3', value: '2-3 Years'},
    { key: '4', value: '3-5 Years'},
    { key: '5', value: '5+ Years'},
  ]

  const interests = [
    { key: '1', value: 'Agriculture' },
    { key: '2', value: 'Delivery' },
    { key: '3', value: 'Survey Mapping' },
    { key: '4', value: 'Events' },
  ]

  const handleCERTNumberChange = (certNum) => {
    if(certNum.trim().length == 13) {
      setFormData({ ...formData, certNum:certNum, dcgaCertIsSet: true });
    } else {
      setFormData({ ...formData, certNum:certNum, dcgaCertIsSet: false });
    }
  }
  return (
   
    <View style={styles.container}>
      <View style={shouldShow ? styles.inputViewPP : styles.inputView}>
        {
          shouldShow ?
            (
              <View style={[styles.button_inp]}>
                <Pressable
                  style={styles.pressable}
                  onPress={() => {
                    setshouldShow((prev) => !prev)
                    setFormData({ ...formData, dcgaCert:false, certNum: "" });
                    handleCERTNumberChange("")
                  }}>
                  <Text style={[styles.button]}>Don't have DCGA Certification?</Text>
                </Pressable>
                <TextInput
                  style={[formData.dcgaCertIsSet ? styles.TextInput : styles.errorTextInput]}
                  placeholderTextColor="black"
                  placeholder='Certification Number *'
                  maxLength={13}
                  // keyboardType='alphanumeric'
                  value={formData.certNum}
                  onChangeText={(certNum) => handleCERTNumberChange(certNum)}
                >
                </TextInput>
              </View>
            ) :
            (
              <View style={[styles.button_inp]}>
                <Pressable
                style={styles.pressable}
                  onPress={() => {
                    setshouldShow((prev) => !prev)
                    // setFormData({ ...formData, dcgaCert:true });
                  }}>
                  <Text style={styles.button}>Have DCGA Certification?</Text>
                </Pressable>
              </View>
            )
        }
      </View>
      <View style={{ marginBottom: 20 }} >
        <MultipleSelectList
          style={[formData.selectedDroneIsSet ? null : {borderColor: "red"}]}
          placeholder='Select Drones *'
          setSelected={(val) => {
            setSelectedDrone(val)
            setT(true)
          }}
          search={false}
          data={drone}
          save="value"
          value={formData.droneSelect}
          boxStyles={[formData.selectedDroneIsSet ? null : { borderColor: "red" }, { backgroundColor: "white", width: 280, height: 55, alignItems: 'center' }]}
          onSelect={() => {
            setFormData({ ...formData, droneSelect:selectedDrone, selectedDroneIsSet: t });
          }}
          label="Drones"
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <SelectList
          placeholder='Experience *'
          search={false}
          setSelected={(val) => {
            setSelectedExperience(val);
            setTe(true)
          }}
          data={experience}
          save="value"
          value={formData.experience}
          boxStyles={[formData.experienceIsSet ? null : { borderColor: "red" }, { backgroundColor: "white", width: 280, height: 55, alignItems: 'center'}]}
          onSelect={() => {
            setFormData({ ...formData, experience: selectedExperience, experienceIsSet: te });            
          }}
          label="Experience"
        />
      </View>
      <View style={{marginBottom: 20 }}>
        <MultipleSelectList
          setSelected={(val) => {
            setSelectedInterest(val)
            setTee(true)
          }}
          data={interests}
          placeholder='Select Interests *'
          search={false}
          save="value"
          boxStyles={[formData.interestsIsSet ? null : {borderColor : "red"}, {backgroundColor: "white", width: 280, height: 55, alignItems: 'center'}]}
          label="Interest"
          onSelect={() => {
            setFormData({ ...formData, interests:selectedInterest, interestsIsSet: tee});
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  TextInput: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth:1,
    borderColor:'grey',
    width: 280,
    height: 55,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 20,
    fontSize: 15,
    color: 'black'
  },
  errorTextInput: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'red',
    width: 280,
    height: 55,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 20,
    fontSize: 15,
    color: 'grey'
},
  passwordContainer: {
    position: 'absolute',
    right: 15,
    top:13
  },
  button_inp: {
    // padding: 10,
    flexDirection: "column"
  },
  pressable: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    width: 280,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  containerT: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 100,
    alignSelf: 'center',
  },
  dropdownSelector: {
    width: 90,
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8e8e8e',
    alignSelf: 'center',
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
})
