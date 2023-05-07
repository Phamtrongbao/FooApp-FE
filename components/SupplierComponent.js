import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useState } from "react";
import { ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import { GetBrandAction } from "../redux/Action/GetBrandAction";

export default function SupplierComponent({ navigation, route }) {
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
          uri: "https://wallpapers.com/images/hd/black-theme-mobile-qx1c914wplrf35l1.webp",
        }}
        style={{ width: "100%", height: "100%" }}
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
        <View style={{ marginTop: 50 }}>
          <Text
            style={{
              color: "#FFFF",
              fontWeight: "bold",
              fontSize: 50,
              textAlign: "center",
            }}
          >
            Supplier
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
      
          <ScrollView style={{ height: 500 }}>
            {db.Getbrand.map((item, index) => {
              return (
                //  item.Email===route.params.Email ?
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#FFFF",
                    marginTop: 10,
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
                        color: "#FFFF",
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
                        color: "#FFFF",
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
                        color: "#FFFF",
                        width: 230,
                        fontSize: 12,
                      }}
                    >
                      CreateDate: {item.CreateDate}
                    </Text>

                    <View style={{ flexDirection: "row" }}>
                      {/* details */}
                      <TouchableOpacity
                       onPress={() => {
                        navigation.navigate("SupplierDetails", {
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
                          borderWidth: 1,
                          backgroundColor: "#086d6d",
                          borderColor: "#086d6d",
                          width: 90,
                          height: 35,
                          borderRadius: 4,
                          marginLeft: 13,
                          marginTop: 20,
                          paddingTop: 8,
                        }}
                      >
                        <Text
                         
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
                      {/* contatct */}
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("ContactSupplier",{id:item.id});
                        }}
                        style={{ backgroundColor: "red",  width:85,
                        height: 35,
                        borderRadius: 4,
                        marginLeft: 13,
                        marginTop: 20,}}
                      >
                        <Text  style={{
                        
                          textAlign:'center',
                          borderColor: "#086d6d",
                          fontWeight:'bold',
                          color:'#FFFF',
                          paddingTop: 8,
                        }}>Contact</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({});
