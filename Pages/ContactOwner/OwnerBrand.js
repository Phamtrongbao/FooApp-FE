import { StyleSheet, Text, View, ScrollView, TextInput ,TouchableOpacity} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Icon } from "react-native-elements";
import { PostBrandAction } from "../../redux/Action/GetBrandAction";
export default function OwnerBrand({ navigation }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    Address: "",
    Description: "",
    Name: "",
    Status: "",
    CreateBy: "",
    UpdateBy: "",
  });
  return (
    <View>
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
            Description:
          </Text>
          <TextInput
            onChangeText={(value) => {
              setState({ ...state, Description: value });
            }}
            value={state.Description}
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
            CreateBy:
          </Text>
          <TextInput
            onChangeText={(value) => {
              setState({ ...state, CreateBy: value });
            }}
            value={state.CreateBy}
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
            UpdateBy:
          </Text>
          <TextInput
            onChangeText={(value) => {
              setState({ ...state, UpdateBy: value });
            }}
            value={state.UpdateBy}
            style={{
              paddingLeft: 30,
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
          dispatch(PostBrandAction(state));
            navigation.goBack()
          //  dispatch(GetBrandAction())
          // if (state.Address===""||state.CreateBy===""||state.Description===""||state.Name===""||state.Status===""||state.UpdateBy==="") {
          //   Alert.alert('FAIL!',"Thông tin điền vào còn thiếu vui lòng điền đầy đủ thông tin")
          // }else{

          // }
        }}
        style={{
          width: 150,
          height: 50,
          backgroundColor: "red",
          borderRadius: 5,
          marginLeft: 80,
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
}

const styles = StyleSheet.create({});
