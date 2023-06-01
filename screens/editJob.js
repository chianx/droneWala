import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import DatePicker from 'react-native-modern-datepicker';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { configureProps } from 'react-native-reanimated/lib/reanimated2/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase/databaseConfig'
import { ref, update} from 'firebase/database'
import Toast from 'react-native-root-toast';

const EditJobModal = ({ visible, onClose, job }) => {
    const [jobFinal, setJobFinal] = useState(job);

    const date1 = new Date();
    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const day = date1.getDate();
    const todaysDate = year + '-0' + month + '-' + day;
    const handleButtonOpen = () => {
        setOpen(!open);
        if (date.trim() != '') setJobFinal({ ...jobFinal, date: date, dateIsSet: false });
        // else setJobFinal({ ...jobFinal, date: date, dateIsSet: true });
    }
    
    const [date, setDate] = useState('');
    const [open, setOpen] = useState(false)

    const FTPT = [
        { key: '1', value: 'Full Time' },
        { key: '2', value: 'Part Time' },
        { key: '3', value: 'Internship' }
    ]
    const [selectedFTPT, setselectedFTPT] = useState("");




    const handleSave = () => {
        // console.log(jobFinal.jobTitleIsSet
        //     ,jobFinal.salRangeFromIsSet, jobFinal.salRangeToIsSet, jobFinal.ftORptIsSet, jobFinal.numOpenIsSet, 
        //     jobFinal.dateIsSet, jobFinal.locationIsSet, jobFinal.aboutJobIsSet, jobFinal.whoApplyIsSet)
        // if(jobFinal.jobTitleIsSet && jobFinal.salRangeFromIsSet && jobFinal.salRangeToIsSet && jobFinal.ftORptIsSet && jobFinal.numOpenIsSet && jobFinal.dateIsSet && jobFinal.locationIsSet && jobFinal.aboutJobIsSet && jobFinal.whoApplyIsSet) {
        //     update(ref(db, `jobs/${jobFinal.jobId}`), job).then(() => {
        //         // Add loading icon.
        //         Toast.show('Job Updated!!', {
        //           backgroundColor:'#fda172',
        //           duration: Toast.durations.LONG,
        //           position: -100,
        //           shadow: true,
        //           borderRadius: 50, 
        //           animation: true,
        //           opacity: 100,
        //           hideOnPress: false
        //         });
        //       }).catch((error) => {
        //         // Correct this.
        //         setErrorMessage(error.toString);
        //         Toast.show('No Internet. Unable to update!!', {
        //           backgroundColor:'#fda172',
        //           duration: Toast.durations.LONG,
        //           position: -100,
        //           shadow: true,
        //           borderRadius: 50, 
        //           animation: true,
        //           hideOnPress: false
        //         });
        //       })
        //       onClose();
        //       console.log("Save!" + "\n");
        //     console.log(jobFinal);
        // }
    };

    const handlejobTitle = (jobTitle) => {
        if(jobTitle.trim().length >= 5) {
            setJobFinal({ ...jobFinal, jobTitle:jobTitle, jobTitleIsSet: true });
        }else {
            setJobFinal({ ...jobFinal, jobTitle:jobTitle, jobTitleIsSet: false });
        }
    }
    const handlesalRangeFrom = (salRangeFrom) => {
       
        if(parseInt(salRangeFrom.trim()) > 0) {
            setJobFinal({ ...jobFinal, salRangeFrom:salRangeFrom.trim(), salRangeFromIsSet: true });
        }else {
            setJobFinal({ ...jobFinal, salRangeFrom:salRangeFrom.trim(), salRangeFromIsSet: false });
        }
    }
    const handlesalRangeTo = (salRangeTo) => {
        if(parseInt(salRangeTo.trim()) > 0 && parseInt(salRangeTo) > parseInt(jobFinal.salRangeFrom)) {
            setJobFinal({ ...jobFinal, salRangeTo:salRangeTo.trim(), salRangeToIsSet: true });
        }else {
            setJobFinal({ ...jobFinal, salRangeTo:salRangeTo.trim(), salRangeToIsSet: false });
        }
    }
    const handlenumOpen = (numOpen) => {
        if(parseInt(numOpen.trim()) > 0) {
            setJobFinal({ ...jobFinal, numOpen:numOpen.trim(), numOpenIsSet: true });
        }else {
            setJobFinal({ ...jobFinal, numOpen:numOpen.trim(), numOpenIsSet: false });
        }
    }
    const handleJobLoaction = (location) => {
        if(location.trim().length >= 4) {
            setJobFinal({ ...jobFinal, location:location, locationIsSet: true });
        }else {
            setJobFinal({ ...jobFinal, location:location, locationIsSet: false });
        }
    }
    const handleaboutJob = (aboutJob) => {
        if(aboutJob && aboutJob.length >= 100) {
          setJobFinal({ ...jobFinal, aboutJob:aboutJob, aboutJobIsSet: true });
        }else {
            setJobFinal({ ...jobFinal, aboutJob:aboutJob, aboutJobIsSet: false });
        }
      }
      const handlewhoApply = (whoApply) => {
        if(whoApply && whoApply.length >= 100) {
          setJobFinal({ ...jobFinal, whoApply:whoApply, whoApplyIsSet: true });
      }else {
          setJobFinal({ ...jobFinal, whoApply:whoApply, whoApplyIsSet: false });
      }
      }
    return (
        <Modal visible={visible} animationType="slide">
            <View style={{ alignItems:'center', padding:15, backgroundColor:'coral', elevation:15}}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <AntDesign name="close" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.heading}>Edit Job</Text>
            </View>
            <ScrollView>
                <View style={styles.modalContainer}>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.TextInput}
                            placeholderTextColor="grey"
                            placeholder={jobFinal.jobTitle}
                            value={jobFinal.jobTitle}
                            onChangeText={(jobTitle) => handlejobTitle(jobTitle)}
                        />

                        <Text style={styles.label}>Job Location</Text>
                        <TextInput
                            style={styles.TextInput}
                            placeholderTextColor="grey"
                            placeholder={jobFinal.location}
                            value={jobFinal.location}
                            onChangeText={(jobLocation) => handleJobLoaction(jobLocation)}
                        />
            
                        <Text style={styles.label}>Salary Range (From and To)</Text>
                        <View style={{flexDirection:'row'}}>
                            <TextInput
                                style={{backgroundColor: "white", borderRadius: 8, borderWidth: 1, marginRight: 40, borderColor: 'grey', width: 130, height: 45, marginBottom: 20, alignItems: "flex-start", justifyContent: "center", padding: 10, fontSize: 17, color: 'grey'}}
                                placeholderTextColor="grey"
                                placeholder={jobFinal.salRangeFrom}
                                keyboardType='numeric'
                                value={jobFinal.salRangeFrom}
                                onChangeText={(salRangeFrom) => handlesalRangeFrom(salRangeFrom)}
                            />
                            <TextInput
                                style={{backgroundColor: "white", borderRadius: 8, borderWidth: 1, borderColor: 'grey', width: 130, height: 45, marginBottom: 20, alignItems: "flex-start", justifyContent: "center", padding: 10, fontSize: 17, color: 'grey'}}
                                placeholderTextColor="grey"
                                placeholder={jobFinal.salRangeTo}
                                keyboardType='numeric'
                                value={jobFinal.salRangeTo}
                                onChangeText={(salRangeTo) => handlesalRangeTo(salRangeTo)}
                            />
                        </View>

                        <Text style={styles.label}>Job Type</Text>
                        <SelectList
                            placeholder={jobFinal.ftORpt}
                            setSelected={(val) => {
                                setselectedFTPT(val)
                            }}
                            boxStyles={{ backgroundColor: "white", width:  300, height: 45, marginBottom: 20}}
                            data={FTPT}
                            save="value"
                            value={jobFinal.ftORpt}
                            search={false}
                            onSelect={() => {
                                console.log(selectedFTPT);
                                setJobFinal({ ...jobFinal, ftORpt: selectedFTPT, ftORptIsSet: true });
                            }}
                            label="Job Type"
                        />

                        <Text style={styles.label}>Number of Openings</Text>
                        <TextInput
                            style={styles.TextInput}
                            placeholderTextColor="grey"
                            placeholder={jobFinal.numOpen}
                            keyboardType='numeric'
                            value={jobFinal.numOpen}
                            onChangeText={(numOpen) => handlenumOpen(numOpen)}
                        />

                        <Text style={styles.label}>Last Date to Apply</Text>
                        <View style={{ flexDirection: 'column' }}>                            
                            {open ? <TouchableOpacity onPress={handleButtonOpen} style={{ padding: 0 }}><TextInput
                                editable={false}
                                placeholderTextColor="grey"
                                placeholder={jobFinal.date}
                                value={jobFinal.date}
                                style={{ width: 300, fontSize: 17, height: 45, color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', borderColor: 'grey', marginRight: 20, marginBottom: 15 }}
                            /></TouchableOpacity> :
                                <TouchableOpacity onPress={() => { setOpen(!open) }} style={{ padding: 0 }}>
                                <TextInput
                                    editable={false}
                                    placeholderTextColor="grey"
                                    placeholder='Select Date'
                                    value={jobFinal.date}
                                    style={{ width: 300, fontSize: 17, height: 45, color: 'grey', backgroundColor: 'white', borderWidth: 1, borderRadius: 8, textAlign: 'center', justifyContent: 'center', borderColor: 'grey', marginRight: 20, marginBottom: 15 }}
                                />
                                </TouchableOpacity>
                            }
                        </View>
                        <View>
                            {open ? <DatePicker
                                onSelectedChange={(date) => {
                                    console.log(date);
                                    setJobFinal({ ...jobFinal, date: date, dateIsSet: true });
                                    setOpen(!open);
                                }}
                                mode="calendar"
                                minimumDate={todaysDate}
                                style={{width: 300, height: 300}}
                            /> : <></>}
                        </View>


                        <Text style={styles.label}>Job Description</Text>
                        <TextInput
                            style={styles.textArea}
                            placeholderTextColor="grey"
                            placeholder={jobFinal.aboutJob}
                            multiline
                            numberOfLines={8}
                            maxLength={1000}
                            value={jobFinal.aboutJob}
                            onChangeText={(aboutJob) => handleaboutJob(aboutJob)}
                        />

                        <Text style={styles.label}>Eligibility Criteria</Text>
                        <TextInput
                            style={styles.textArea}
                            placeholderTextColor="grey"
                            placeholder={jobFinal.whoApply}
                            multiline={true}
                            maxLength={1000}
                            numberOfLines={8}
                            value={jobFinal.whoApply}
                            onChangeText={(whoApply) => handlewhoApply(whoApply)}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={{alignItems:'center', width:'100%', backgroundColor:'white',position:'absolute', bottom:0, borderTopWidth:1, borderTopColor:'grey', marginVertical:7}}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
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
        fontSize: 16,
        width: 300
      },
    modalContainer: {
      // backgroundColor: '#fff',
      padding: 20,
      width: '100%',
      alignItems: 'center',
      marginBottom:60
    },
    heading: {
      fontSize: 22,
      fontWeight: 500,
      color:'white'
    },
    closeButton: {
      position: 'absolute',
      top: 15,
      left: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    formContainer: {
      width: '100%',
    },
    label: {
      fontSize: 17,
      fontWeight: 'bold',
      marginBottom: 7,
      marginLeft:3,
      marginTop: 5,
    },
    saveButton: {
      backgroundColor: 'coral',
      paddingVertical: 10,
      width:'90%',
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
      alignItems:'center',
      elevation:5
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight:500
    },
    TextInput: {
      backgroundColor: "white",
      borderRadius: 8,
      borderWidth:1,
      borderColor:'grey',
      width: 300,
      height: 45,
      marginBottom: 20,
      alignItems: "flex-start",
      justifyContent: "center",
      padding: 10,
      fontSize: 15,
      color: 'grey'
    },
    errorTextInput: {
      backgroundColor: "white",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'red',
      width: 300,
      height: 45,
      marginBottom: 20,
      alignItems: "flex-start",
      justifyContent: "center",
      padding: 10,
      fontSize: 15,
      color: 'grey'
  },
    btn : {
      textAlign:'center',
      justifyContent:'center',
      backgroundColor:'#A9A9A9',
      fontSize:15,
      borderRadius:8,
      padding:9,
      width:135,
      color:'white'
  }
}); 

export default EditJobModal;