import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

import { ScrollView } from "react-native";
import { GetInvoiceAction } from "../../redux/Action/PostInvoiceActions";
import { PostSupplierAction } from "../../redux/Action/SupplierAction";
import { TextInput } from "react-native";
import { Alert } from "react-native";

export default function SupplierDetails({ navigation, route }) {
  console.log("route supplier", route);
  const [data, setData] = useState([]);
  const [date, Setdate] = useState(new Date().toDateString());
  const db = useSelector((state) => state.PostInvoiceReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    let id = route.params.id;
    dispatch(GetInvoiceAction(id));
    setData(db.GetInvoice);
  }, []);
  const [time, setTime] = useState(new Date().toDateString());

  const [supplier, setSupplier] = useState({
    Name: route.params.Name,
    BrandID: route.params.id,
    Email: route.params.Email,
    Address: route.params.Address,
    Price: "",
    Status: "Đã Thanh Toán",
    ConfirmedBy: "Admin Supplier",
    CreateDay: time,
  });
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
      <View style={{ position: "absolute", marginTop: 120 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "#FFFF",
            marginLeft: 20,
          }}
        >
          Doanh Thu Tháng Này Của Quán
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

      <View
        style={{
          position: "absolute",
          marginTop: 200,
          marginLeft: 10,
          backgroundColor: "#000",
          width: "95%",
          height: 500,
          borderRadius: 5,
          opacity: 0.2,
          shadowColor: "#ffff",
          shadowRadius: 5,
          shadowOpacity: 0.9,
        }}
      ></View>
      <ScrollView
        style={{ position: "absolute", marginTop: 200, marginLeft: 20 }}
      >
        <Text
          style={{
            color: "#FFFF",
            fontWeight: "bold",
            fontSize: 15,
            paddingLeft: 10,
            paddingTop: 30,
          }}
        >
          Tên Cửa Hàng: {route.params.Name}
        </Text>
        <Text
          style={{
            color: "#FFFF",
            fontWeight: "bold",
            fontSize: 15,
            paddingLeft: 10,
            paddingTop: 30,
          }}
        >
          Doanh Thu: {tinhTongSL().toLocaleString()} vnđ{" "}
        </Text>
        <Text
          style={{
            color: "#FFFF",
            fontWeight: "bold",
            fontSize: 15,
            paddingLeft: 10,
            paddingTop: 30,
          }}
        >
          VAT: 20%{" "}
        </Text>
        <Text
          style={{
            color: "#FFFF",
            fontWeight: "bold",
            fontSize: 15,
            paddingLeft: 10,
            paddingTop: 30,
          }}
        >
          Số Tiền Phải Trả:{" "}
          {db.GetInvoice ? ((tinhTongSL() * 20) / 100).toLocaleString() : 0}
          vnđ{" "}
        </Text>

        <Text
          style={{
            color: "#FFFF",
            fontWeight: "bold",
            fontSize: 15,
            paddingLeft: 10,
            paddingTop: 30,
          }}
        >
          Tổng Tiền Thanh Toán:{" "}
          {db.GetInvoice ? ((tinhTongSL() * 20) / 100).toLocaleString() : 0}
          vnđ{" "}
        </Text>
        <Text
          style={{
            color: "#FFFF",
            fontWeight: "bold",
            fontSize: 15,
            paddingLeft: 10,
            paddingTop: 30,
          }}
        >
          Số Tiền Cần Xác Nhận:
        </Text>
        <TextInput
          value={supplier.Price}
          keyboardType="numeric"
          onChangeText={(value) => {
            setSupplier({ ...supplier, Price: value });
          }}
          style={{
            backgroundColor: "rgba(255,255,255,0.3)",
            width: "95%",
            height: 40,
            marginLeft: 10,
            paddingTop: 3,
            color: "#FFFF",
            paddingLeft: 10,
            marginTop: 15,
            borderRadius: 5,
          }}
        />

        <TouchableOpacity
          onPress={() => {
            if (supplier.Price === "") {
              Alert.alert("Fail!", "Vui lòng kiểm tra lại");
            } else if ((tinhTongSL() * 20) / 100 != supplier.Price) {
              Alert.alert("Fail!", "Giá tiền nhập vào không chính xác");
            } else {
              dispatch(PostSupplierAction(supplier));
            }
          }}
          style={{
            height: 40,
            width: "70%",
            backgroundColor: "red",
            borderRadius: 8,
            marginTop: 30,
            marginLeft: 50,
          }}
        >
          <Text
            style={{
              color: "#FFFF",
              fontWeight: "bold",
              fontSize: 15,
              textAlign: "center",
              paddingTop: 10,
            }}
          >
            Xác Nhận
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}
//
const styles = StyleSheet.create({
  Text: {
    fontSize: 15,
    color: "#FFFF",
    fontWeight: "bold",
  },
  Text1: {
    fontSize: 15,
    color: "#FFFF",
    fontWeight: "normal",
    paddingLeft: 10,
  },
});
