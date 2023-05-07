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
import { ImageBackground } from "react-native";
import { GetSupplierAction } from "../../../redux/Action/SupplierAction";

export default function InvoiceSupplier({ navigation, route }) {
  const [data, setData] = useState([]);

  const db = useSelector((state) => state.SupplierReducer);
  console.log({ db });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetSupplierAction());
    setData(db.Supplier);
  }, []);

  return (
    <View>
      <ImageBackground
        source={{
          uri: "https://tse1.mm.bing.net/th?id=OIP.v-hOlAUOtCvycYQPsXgAQAHaK9&pid=Api&P=0",
        }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="stretch"
      >
        <View
          style={{
            backgroundColor: "#000",
            opacity: 0.7,
            shadowColor: "#000",
            width: "100%",
            height: "100%",
            shadowOpacity: 0.6,
            shadowColor: "#FFFF",
            shadowRadius: 8,
          }}
        ></View>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderRadius: 20,
            backgroundColor: "grey",
            opacity: 0.5,
            marginLeft: 10,
            marginTop: 50,
            position: "absolute",
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" type="font-awesome" size={25} color="#fff" />
        </TouchableOpacity>
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            marginTop: 150,
            marginLeft: 20,
          }}
        >
          <Text
            style={{
              color: "#FFFF",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Invoice Payment To Supplier
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            backgroundColor: "#FFFF",
            marginTop: 250,
            width: "100%",
            height: 430,
            opacity: 0.8,
            borderRadius: 8,
            shadowOpacity: 0.8,
            shadowColor: "#FFFF",
            shadowRadius: 8,
          }}
        ></View>
        <ScrollView
          style={{
            height: 430,
            marginTop: 250,
            position: "absolute",
            backgroundColor: "#222222",
          }}
        >
          {db.Supplier.map((item, index) => {
            return route.params.Email === item.Email ? (
              <View
                key={index}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#FFFF",
                }}
              >
                <View>
                  <View style={{ borderWidth: 1, borderColor: "#FFFF" }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        width: "100%",
                        fontWeight: "bold",
                        color: "red",
                        width: 230,
                        fontSize: 15,
                        paddingTop: 20,
                      }}
                    >
                      Name: {item.Name}
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 10,
                        paddingTop: 10,
                        width: "100%",
                        color: "#FFF",
                        width: 230,
                        fontSize: 15,
                      }}
                    >
                      BrandID: {item.BrandID}
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 10,
                        width: "100%",
                        color: "#FFF",
                        width: 230,
                        fontSize: 15,
                        paddingTop: 10,
                      }}
                    >
                      Email: {item.Email}
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 10,
                        paddingTop: 10,
                        width: "100%",
                        color: "#FFF",
                        width: "100%",
                        fontSize: 15,
                      }}
                    >
                      Address: {item.Address}
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 10,
                        paddingTop: 10,
                        width: "100%",
                        color: "#FFF",
                        width: "100%",
                        fontSize: 15,
                      }}
                    >
                      CreateDay: {item.CreateDay}
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 10,
                        paddingTop: 10,
                        width: "100%",
                        color: "#FFF",
                        width: "100%",
                        fontSize: 15,
                        paddingBottom: 25,
                      }}
                    >
                      ConfirmedBy: {item.ConfirmedBy}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "#FFFF",
                      paddingTop: 10,
                      paddingBottom: 20,
                      marginBottom: 20,
                    }}
                  >
                    <Text
                      style={{
                        paddingLeft: 10,
                        paddingTop: 10,
                        width: "100%",
                        color: "#FFF",
                        width: "100%",
                        fontSize: 15,
                      }}
                    >
                      Status: {item.Status}
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 10,
                        paddingTop: 10,
                        width: "100%",
                        color: "#FFF",
                        width: "100%",
                        fontSize: 15,
                      }}
                    >
                      VAT: 20%
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 10,
                        paddingTop: 10,
                        width: "100%",
                        color: "#FFF",
                        width: "100%",
                        fontSize: 15,
                      }}
                    >
                      Total payment: {(item.Price).toLocaleString()}vnđ
                    </Text>
                  </View>
                </View>
              </View>
            ) : null;
          })}
        </ScrollView>
      </ImageBackground>
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
