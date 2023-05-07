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
  DeleteContactAction,
  GetContactAction,
  PostContactAction,
} from "../../../redux/Action/ContactAction";

export default function AdminContact({ navigation ,route}) {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [state, setState] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Address: "",
    Status: "",
  });

  const db = useSelector((state) => state.ContactReducer);
  console.log({ db });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetContactAction());
    setData(db.Contact);
  }, []);
 
  return (
    <View>
      <ImageBackground
        source={{
          uri: "https://tse1.mm.bing.net/th?id=OIP.v-hOlAUOtCvycYQPsXgAQAHaK9&pid=Api&P=0",
        }}
        style={{ width: "100%", height:"100%" }}
        resizeMode="stretch"
      >
         <View style={{ backgroundColor: "#000",opacity:.7,shadowColor:"#000",width:'100%',height:'100%',shadowOpacity:.6,shadowColor:'#FFFF',shadowRadius:8}}></View>
      <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderRadius: 20,
            backgroundColor: "grey",
            opacity: 0.5,
            marginLeft: 10,
            marginTop: 50,
            position:'absolute'
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" type="font-awesome" size={25} color="#fff" />
        </TouchableOpacity>   
        <View style={{position:'absolute',alignItems:'center',marginTop:200,marginLeft:120}}>
            <Text style={{color:"#FFFF",textAlign:'center',fontSize:25,fontWeight:'bold'}}>Contact</Text>
          </View> 
        <View style={{position:'absolute' ,backgroundColor:'#FFFF',marginTop:300,width:'100%',height:260,opacity:.8,borderRadius:8,shadowOpacity:.8,shadowColor:'#FFFF',shadowRadius:8}}></View> 
        <ScrollView style={{ height: 260,marginTop:300,position:'absolute' ,backgroundColor:'#222222'}}>
          {db.Contact.map((item, index) => {
            return (
            route.params.Email === item.Email ?   
            <View
                key={index}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor:'#FFFF'
                }}
              >
                <View  >
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
                      width:"100%",
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
                    Phone: {item.Phone}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      paddingTop: 10,
                      width: "100%",
                      color: "#FFF",
                      width:"100%",
                      fontSize: 15,
                    }}
                  >
                    Status: {item.Status}
                  </Text>
                </View>
              </View>:null
            );
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
