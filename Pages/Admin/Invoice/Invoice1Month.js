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
import { GetInvoiceAction } from "../../../redux/Action/PostInvoiceActions";
import { Image } from "react-native";
import { ScrollView } from "react-native";

export default function Invoice1Month({ navigation, route }) {
  const [data, setData] = useState([]);
  const db = useSelector((state) => state.PostInvoiceReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    let id = route.params.id;
    dispatch(GetInvoiceAction(id));
    setData(db.GetInvoice);
  }, []);
   //tính doanh thu của quán trong ngày
   const nhansoluong = (a, b) => {
    let nhan = a * b;
    return nhan;
  };

  const tinhTongSL = () => {
    let invoice = db.GetInvoice.reduce((item,e,index) => { 
    return item += e.Cart.reduce((sum,sp,index)=>{
        return (sum += nhansoluong(sp.Amount, sp.Price));
      },0)
    },0);
    return invoice;
  };

 
  const TinhTongTien1 = (id) => {
    let price = db.GetInvoice.map((e,index) => { 
      return  e.Cart.reduce((sum,sp,index)=>{
          return ( sum += nhansoluong(sp.Price,sp.Amount));  
        },0)
      });
      return price;
  };
  const renderTotal1Day = () => {
    return tinhTongSL() ;
  };

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
            marginLeft: 100,
          }}
        >
          Invoice Month
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
          height: 400,
        }}
      >
        <View>
          {db.GetInvoice.map((item, index) => {
            return (
              <View>
                <View
                  key={index}
                  style={{
                    fontSize: 18,
                    borderBottomWidth: 1,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    lineHeight: 10,
                    marginTop: 15,
                    padding: 10,
                    borderBottomColor: "#FFFF",
                    borderWidth: 1,
                    borderColor: "#FFFF",
                  }}
                >
                  <Text style={styles.Text}>
                    Email: <Text style={styles.Text1}>{item.Email} </Text>
                  </Text>
                  {item.Cart.map((cart, e) => {
                    return  (
                      <View
                        key={e}
                        style={{ flexDirection: "row", paddingTop: 10 }}
                      >
                        <View style={{ paddingTop: 10 }}>
                          <Image
                            source={{ uri: cart.IMG }}
                            style={{ height: 70, width: 70 }}
                          />
                        </View>
                        <View style={{ flexDirection: "column" }}>
                          <Text style={styles.Text1}>{cart.Name}</Text>
                          <Text style={styles.Text1}>
                            Price: {cart.Price.toLocaleString()} vnđ
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
                    <Text style={styles.Text1}>{item.CreateDate}</Text>{" "}
                  </Text>
                </View>
              </View>
            ) ;
          })}
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          marginTop: 550,
          marginLeft: 20,
          backgroundColor: "#000",
          width: "90%",
          height: 120,
          borderRadius: 5,
          opacity: 0.2,
          shadowColor: "#ffff",
          shadowRadius: 5,
          shadowOpacity: 0.9,
        }}
      ></View>
      <View style={{ position: "absolute", marginTop: 550, marginLeft: 20 }}>
        <Text
          style={{
            color: "#FFFF",
            fontWeight: "bold",
            fontSize: 15,
            paddingLeft: 10,
            paddingTop: 30,
          }}
        >
          Doanh Thu tháng: {renderTotal1Day().toLocaleString()} vnđ{" "}
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 15,
    color: "#FFFF",
    fontWeight: "bold",
    paddingTop: 10,
  },
  Text1: {
    fontSize: 15,
    color: "#FFFF",
    fontWeight: "normal",
    paddingLeft: 10,
    paddingTop: 5,
  },
  Text2: {
    fontSize: 15,
    color: "#FFFF",
    fontWeight: "normal",
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
