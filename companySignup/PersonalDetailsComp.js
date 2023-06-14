import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import React, { useState } from "react";
import DatePicker from "react-native-modern-datepicker";

export default function PersonalDetails({ formData, setFormData }) {
  const handleButtonOpen = () => {
    setOpen(!open);
  };
  const [open, setOpen] = useState(false);
  const date1 = new Date();
  const year = date1.getFullYear();
  const month = date1.getMonth() + 1;
  const day = date1.getDate();
  const todaysDate = year + "-0" + month + "-" + day;

  const handleNameChange = (name) => {
    if (name.trim().length > 2) {
      setFormData({ ...formData, name: name, nameIsSet: true });
    } else {
      setFormData({ ...formData, name: name, nameIsSet: false });
    }
  };
  const handleEmailChange = (email) => {
    email = email.trim();
    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(validRegex)) {
      setFormData({ ...formData, email: email, emailIsSet: true });
    } else {
      setFormData({ ...formData, email: email, emailIsSet: false });
    }
  };
  return (
    <View>
      <View style={styles.inputView}>
        <TextInput
          style={[
            formData.nameIsSet ? styles.TextInput : styles.errorTextInput,
          ]}
          placeholderTextColor="grey"
          placeholder="Full Name *"
          value={formData.name}
          onChangeText={(name) => handleNameChange(name)}
        />
      </View>
      <View style={[styles.inputView]}>
        <TextInput
          style={[
            formData.emailIsSet ? styles.TextInput : styles.errorTextInput,
          ]}
          placeholderTextColor="grey"
          placeholder="Email *"
          value={formData.email}
          onChangeText={(email) => handleEmailChange(email)}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ paddingBottom: 10 }}>Founded In: *</Text>
          {open ? (
            <TouchableOpacity onPress={handleButtonOpen} style={{ padding: 0 }}>
              <TextInput
                editable={false}
                placeholderTextColor="grey"
                placeholder="Date of Founding *"
                value={formData.foundedin}
                style={{ width: 280, fontSize: 17, height: 55, color: "grey", backgroundColor: "white", borderWidth: 1, borderRadius: 8, textAlign: "center", justifyContent: "center", borderColor: formData.dateIsSet ? "grey" : "red", marginRight: 20, marginBottom: 15,}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setOpen(!open);
              }}
              style={{ padding: 0 }}
            >
              <TextInput
                editable={false}
                placeholderTextColor="grey"
                placeholder="Date of Founding *"
                value={formData.foundedin}
                style={{ width: 280, fontSize: 17, height: 55, color: "grey", backgroundColor: "white", borderWidth: 1, borderRadius: 8, textAlign: "center", justifyContent: "center", borderColor: formData.dateIsSet ? "grey" : "red", marginRight: 20, marginBottom: 15,}}
              />
            </TouchableOpacity>
          )}
        </View>
        <View>
          {open ? (
            <DatePicker
              onSelectedChange={(date) => {
                setFormData({ ...formData, foundedin: date, dateIsSet: true });
                setOpen(!open);
              }}
              mode="calendar"
              maximumDate={todaysDate}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "grey",
    width: 280,
    height: 55,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
    fontSize: 17,
    color: "grey",
  },
  errorTextInput: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "red",
    width: 280,
    height: 55,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
    fontSize: 17,
    color: "grey",
  },
  passwordContainer: {
    position: "absolute",
    right: 10,
  },
  btn: {
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#A9A9A9",
    fontSize: 15,
    borderRadius: 8,
    height: 55,
    padding: 15,
    width: 135,
    color: "white",
  },
});
