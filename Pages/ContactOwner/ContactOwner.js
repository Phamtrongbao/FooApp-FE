import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useState } from "react";
import { ScrollView } from "react-native";
import { Alert } from "react-native";
import { ImageBackground } from "react-native";
import {
  GetContactAction,
  PostContactAction,
} from "../../redux/Action/ContactAction";

export default function ContactOwner({ navigation }) {
  const [state, setState] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Address: "",
    Status: "",
  });

  const dispatch = useDispatch();
  const RenderForm = () => {
    return (
      <View>
        <ScrollView
          style={{ backgroundColor: "#FFFF", marginTop: 20, height: 300 }}
        >
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomLeftRadius: 1,
              borderBottomEndRadius: 1,
              borderBottomColor: "grey",
              borderRadius: 2,
              width: "90%",
              marginLeft: 20,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 15, color: "#000", paddingTop: 8 }}>
              Name:
            </Text>
            <TextInput
              placeholder="Name"
              onChangeText={(value) => {
                setState({ ...state, Name: value });
              }}
              value={state.Name}
              style={{
                paddingLeft: 60,
                fontSize: 15,
                color: "#000",
                width: 200,
                height: 40,
                borderRadius: 5,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomLeftRadius: 1,
              borderBottomEndRadius: 1,
              borderBottomColor: "grey",
              borderRadius: 2,
              width: "90%",
              marginLeft: 20,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 15, color: "#000", paddingTop: 8 }}>
              Address:
            </Text>
            <TextInput
              onChangeText={(value) => {
                setState({ ...state, Address: value });
              }}
              value={state.Address}
              style={{
                paddingLeft: 40,
                fontSize: 15,
                color: "#000",
                width: 200,
                height: 40,
                borderRadius: 5,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomLeftRadius: 1,
              borderBottomEndRadius: 1,
              borderBottomColor: "grey",
              borderRadius: 2,
              width: "90%",
              marginLeft: 20,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 15, color: "#000", paddingTop: 8 }}>
              Email:
            </Text>
            <TextInput
              onChangeText={(value) => {
                setState({ ...state, Email: value });
              }}
              value={state.Email}
              style={{
                paddingLeft: 15,
                fontSize: 15,
                color: "#000",
                width: 200,
                height: 40,
                borderRadius: 5,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomLeftRadius: 1,
              borderBottomEndRadius: 1,
              borderBottomColor: "grey",
              borderRadius: 2,
              width: "90%",
              marginLeft: 20,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 15, color: "#000", paddingTop: 8 }}>
              BrandId:
            </Text>
            <TextInput
              onChangeText={(value) => {
                setState({ ...state, BrandID: value });
              }}
              value={state.BrandID}
              style={{
                paddingLeft: 35,
                fontSize: 15,
                color: "#000",
                width: 200,
                height: 40,
                borderRadius: 5,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomLeftRadius: 1,
              borderBottomEndRadius: 1,
              borderBottomColor: "grey",
              borderRadius: 2,
              width: "90%",
              marginLeft: 20,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 15, color: "#000", paddingTop: 8 }}>
              Status:
            </Text>
            <TextInput
              onChangeText={(value) => {
                setState({ ...state, Status: value });
              }}
              value={state.Status}
              style={{
                paddingLeft: 60,
                fontSize: 15,
                color: "#000",
                width: 200,
                height: 40,
                borderRadius: 5,
              }}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            console.log(state, "post");
            dispatch(PostContactAction(state));
            navigation.goBack();
            dispatch(GetContactAction());
            // if (
            //   state.Address === "" ||
            //   state.Email == "" ||
            //   state.Phone === "" ||
            //   state.Name === "" ||
            //   state.Status === ""||
            //   state.BrandID===""
            // ) {
            //   Alert.alert(
            //     "FAIL!",
            //     "Thông tin điền vào còn thiếu vui lòng điền đầy đủ thông tin"
            //   );
            // } else {

            // }
          }}
          style={{
            width: 150,
            height: 50,
            backgroundColor: "red",
            borderRadius: 5,
            marginTop: 15,
            marginLeft: 120,
          }}
        >
          <Text
            style={{
              color: "#FFFF",
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 15,
            }}
          >
            Add New
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <ImageBackground
        source={{
          uri: "https://tse3.explicit.bing.net/th?id=OIP.RAidx_Km8WvduDnjATezAgHaEK&pid=Api&P=0",
        }}
        style={{ width: "100%", height: 250 }}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderRadius: 20,
            backgroundColor: "grey",
            opacity: 0.5,
            marginLeft: 10,
            marginTop: 40,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="home" type="font-awesome" size={25} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>
      {RenderForm()}
    </View>
  );
}

const styles = StyleSheet.create({
  brand: {
    width: "50%",
    height: 25,
    backgroundColor: "whitesmoke",
    borderRadius: 5,
    marginLeft: 20,
    marginTop: 123,
  },
  style1: {
    fontSize: 18,
    fontWeight: "bold",
  },
  style2: {
    fontSize: 18,
    fontWeight: "bold",
  },
  style3: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalView: {
    marginTop: 180,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 630,
  },
  button: {
    borderRadius: 50,
    elevation: 2,
    width: 40,
    height: 40,
    marginTop: -15,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "grey",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
