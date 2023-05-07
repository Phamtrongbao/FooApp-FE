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
  GetBrandAction,
} from "../../../redux/Action/GetBrandAction";
import { useState } from "react";
import { ScrollView } from "react-native";
import { ImageBackground } from "react-native";

export default function InvoiceAdmin({ navigation,route }) {
  const [data, setData] = useState([]);
  const db = useSelector((state) => state.GetBrandReducer);
  console.log({ db });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetBrandAction());
    setData(db.Getbrand);
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
      </ImageBackground>
      <View style={{ marginTop: 0, backgroundColor: "#FFFF" }}>
        <ScrollView style={{ height: 580 }}>
          {db.Getbrand.map((item, index) => {
            return (
           item.Email===route.params.Email ? 
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
                          navigation.navigate("InvoiceDetailsAdmin", {
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
              </View>:null
            );
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
