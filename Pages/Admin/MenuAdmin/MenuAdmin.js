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
import {
  DeleteBrandAction,
  DeleteMenuAction,
  GetBrandAction,
  PostBrandAction,
} from "../../../redux/Action/GetBrandAction";
import { useState } from "react";
import { ScrollView } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
import { Alert } from "react-native";
import { ImageBackground } from "react-native";
import { GetAccountAction } from "../../../redux/Action/AccountAction";
export default function MenuAdmin({ navigation, route }) {
  console.log(route, "admin store");
  const [data, setData] = useState([]);
  const [account, setAccount] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [state, setState] = useState({
    Address: "",
    Description: "",
    Name: "",
    Status: "open",
    CreateBy: "",
    UpdateBy: "",
  });

  const db = useSelector((state) => state.GetBrandReducer);
  const Account = useSelector((state) => state.RegisterReducer);
  console.log({ db });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetBrandAction());
    setData(db.Getbrand);
    dispatch(GetAccountAction());
    setAccount(Account.Register);
  }, []);

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
          <Icon name="arrow-left" type="font-awesome" size={25} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.brand}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "grey",
              textAlign: "center",
              paddingTop: 4,
            }}
          >
            Register Brand
          </Text>
        </TouchableOpacity>
      </ImageBackground>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Icon name="cancel" size={40} color={"#FFFF"} />
            </Pressable>
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
                  CreateDate:
                </Text>
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
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomLeftRadius: 1,
                  borderBottomEndRadius: 1,
                  borderBottomColor: "grey",
                  borderRadius: 2,
                  width: "90%",
                  marginLeft: 20,
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={{ fontSize: 15, color: "#000", paddingTop: 8 }}>
                  UpdateDate:
                </Text>
                {/* <DateTimePicker
                  value={date}
                  mode={"date"}
                  textColor={"#FFFF"}
                  style={{
                    fontSize: 5,
                    width: "40%",
                    height: 40,
                    borderRadius: 5,
                    marginLeft: 0,
                    paddingTop: 0,
                  }}
                  onChange={(value) => {
                    setDate(date), console.log(date);
                  }}
                /> */}
              </View>
            </ScrollView>
            <TouchableOpacity
              onPress={() => {
                console.log(state, "post");

                setModalVisible(!modalVisible);
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
        </View>
      </Modal>
      <View style={{ marginTop: 0, backgroundColor: "#FFFF" }}>
        <ScrollView style={{ height: 580 }}>
          {db.Getbrand.map((item, index) => {
            return route.params.Email === item.Email ? (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  padding: 10,
                  borderBottomWidth: 1,
                }}
              >
                <View>
                  <Image
                    style={{ width: 130, height: 130, borderRadius: 5 }}
                    source={{ uri: item.IMG }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      paddingLeft: 10,
                      width: "100%",
                      fontWeight: "bold",
                      color: "red",
                      width: 230,
                      fontSize: 15,
                    }}
                  >
                    {item.Name}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      width: "100%",
                      color: "#1C1C1C",
                      width: 230,
                      fontSize: 12,
                      paddingTop: 10,
                    }}
                  >
                    CreateBy: {item.CreateBy}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      paddingTop: 10,
                      width: "100%",
                      color: "#1C1C1C",
                      width: 230,
                      fontSize: 12,
                    }}
                  >
                    CreateDate: {item.CreateDate}
                  </Text>

                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        backgroundColor: "#086d6d",
                        borderColor: "#086d6d",
                        width: 120,
                        height: 35,
                        borderRadius: 4,
                        marginLeft: 13,
                        marginTop: 20,
                        paddingTop: 8,
                      }}
                    >
                      <Text
                        onPress={() => {
                          navigation.navigate("MenuAdminDetails", {
                            id: item.id,
                            Address: item.Address,
                            Description: item.Description,
                            Name: item.Name,
                            Status: item.Status,
                            UpdateDate: item.UpdateDate,
                            CreateBy: item.CreateBy,
                            CreateDate: item.CreateDate,
                            UpdateBy: item.UpdateBy,
                            IMG: item.IMG,
                            Email: item.Email,
                          });
                        }}
                        style={{
                          color: "#FFFF",
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: 13,
                        }}
                      >
                        Get Detail
                      </Text>
                    </TouchableOpacity>
                   
                  </View>
                </View>
              </View>
            ) : null;
          })}
        </ScrollView>
      </View>
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
