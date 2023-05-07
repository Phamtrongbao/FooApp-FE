import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

import { Image } from "react-native";
import { ScrollView } from "react-native";
import { GetInvoiceAction } from "../../redux/Action/PostInvoiceActions";

export default function InnvoiceUser({ navigation, route }) {
  const [data, setData] = useState([]);
  const [createDay,SetDay] = useState(new Date().toDateString())
  const db = useSelector((state) => state.PostInvoiceReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    let id = route.params.id;
    dispatch(GetInvoiceAction(id));
    setData(db.GetInvoice);
  }, []);

  return (
    <ImageBackground
      resizeMode="stretch"
      source={{
        uri: "https://tse1.explicit.bing.net/th?id=OIP.qh6rWpa_Syvgrll87gFBkwHaHX&pid=Api&P=0",
        width: "100%",
        height: "100%",
      }}
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
      <View style={{ position: "absolute", marginTop: 50 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            fontWeight: "bold",
            color: "#FFFF",
            marginLeft: 140,
          }}
        >
          Invoice
        </Text>
      </View>
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
      <ScrollView
        style={{
          position: "absolute",
          marginTop: 100,
          marginLeft: 10,
          width: "95%",
          height: 700,
        }}
      >
        <View>
          {db.GetInvoice.map((item, index) => {
            return (
            createDay===item.CreateDate? 
             <View
                key={index}
                style={{
                  fontSize: 18,
                  borderBottomWidth: 1,
                  borderRadius: 8,
                  lineHeight: 10,
                  marginTop: 15,
                  padding: 10,
                  borderBottomColor: "#FFFF",
                }}
              >
                <View style={{borderWidth:1,borderColor:"#FFFF",lineHeight:15,borderTopLeftRadius:5,borderTopRightRadius:5}}>
                <Text style={styles.Text}>
                  Email: <Text style={styles.Text1}>{item.Email} , </Text>
                </Text>
                {item.Cart.map((cart, e) => {
                    return  (
                      <View
                        key={e}
                        style={{ flexDirection: "row", paddingTop: 10 }}
                      >
                        <View style={{ paddingLeft:5 }}>
                          <Image
                            source={{ uri: cart.IMG }}
                            style={{ height: 70, width: 70,borderRadius:5 }}
                          />
                        </View>
                        <View style={{ flexDirection: "column" }}>
                          <Text style={styles.Text1}>{cart.Name}</Text>
                          <Text style={styles.Text1}>
                            Price: {cart.Price} vnđ
                          </Text>
                          <Text style={styles.Text1}>
                            Amount: {cart.Amount}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
              <Text style={styles.Text}>
                  Purchase Date:{" "}
                  <Text style={styles.Text1}>{item.CreateDate},</Text>{" "}
                </Text>
                </View>
    
            
             
              </View>:null
            );
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 15,
    color: "#FFFF",
    fontWeight: "bold",
    padding:10
  },
  Text1: {
    fontSize: 15,
    color: "#FFFF",
    fontWeight: "normal",
    paddingLeft: 10,
  },
});
