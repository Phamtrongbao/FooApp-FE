import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { GetBrandAction, GetMenuAction } from "../redux/Action/GetBrandAction";
import { CARTActions, RemoveCARTActions } from "../redux/types/CartTypes";
import * as NotifyCation from "expo-notifications";
import * as Device from "expo-device";
import { Alert } from "react-native";
import { useState } from "react";


export default function InvoiceComponent({ navigation, route }) {
  console.log(route, "invoice");
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date().toDateString());
  //hàm nhân số lượng với giá tiền
  const nhansoluong = (a, b) => {
    let nhan = a * b;
    return nhan;
  };

  //tính tổng tiền dựa trên số lượng sản phẩm đã đặt
  const tinhTongSL = () => {
    let total = route.params.Cart.reduce((sum, sp, index) => {
      return (sum += nhansoluong(sp.Amount, sp.Price));
    }, 0);

    return total;
  };

  //tổng tiền đã có ship
  var Number = [route.params.FeeShip, tinhTongSL()];
  function getSum(total, num) {
    return total + num;
  }

  // tổng tiền khi đã áp dụng mã giảm
  var Magiam = [route.params.Discount, Number.reduce(getSum)];
  function getMagiam(total, num) {
    return num - total;
  }

  const TongTien = () => {
    return route.params.Discount ? (
      <View>
        <Text style={{ marginLeft: 120, marginTop: -10 }}>
          {Magiam.reduce(getMagiam, 0).toLocaleString()}đ (
          <Text style={{ color: "red" }}>Đã áp Dụng mã giảm giá</Text>)
        </Text>
      </View>
    ) : (
      <View>
        <Text style={{ marginLeft: 120, marginTop: -10 }}>
          {Magiam.reduce(getSum, 0).toLocaleString()}đ
        </Text>
      </View>
    );
  };
  const renderCart = () => {
    return route.params.Cart.map((item, index) => {
      return (
        <View key={index}>
          <View style={styles.Shopcart}>
            {/* render món */}
            <View style={{ width: "15%", marginLeft: 10 }}>
              <Image
                style={{ height: 50, width: "100%", resizeMode: "cover" }}
                source={{ uri: item.IMG }}
              />
            </View>
            <Text style={styles.modalText}>{item.Name}</Text>
            <View
              style={{
                flexDirection: "column",
                marginTop: 10,
                marginRight: 15,
              }}
            >
              <Text style={styles.modalText2}>X{item.Amount}</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginTop: 10,
                marginRight: 20,
              }}
            >
              <Text style={styles.modalText1}>
                Giá:{nhansoluong(item.Amount, item.Price).toLocaleString()}đ
              </Text>
            </View>
          </View>
          <View></View>
        </View>
      );
    });
  };

  const presentLocalNotification = async () => {
    const { status } = await NotifyCation.requestPermissionsAsync();
    if (status === "granted") {
      NotifyCation.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
      NotifyCation.scheduleNotificationAsync({
        content: {
          title: "Đơn Hàng "+ route.params.id,
          body: "Đã Được Gửi Tới Cửa Hàng",
          sound: true,
          vibrate: true,
        },
        trigger: null,
      });
    }
  };

  const handleReservation = () => {
    Alert.alert(
      "Hoàn Tất Hóa Đơn",
      "Hóa Đơn Ngày: " + date,
      [
        { text: "Cancel" },
        {
          text: "OK",
          onPress: () => {
            presentLocalNotification();
            navigation.navigate("Home", {
              Email: route.params.Email,
              id: route.params.id,
            });
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <ScrollView>
      <ImageBackground
        style={{ height: 250, width: "100%", resizeMode: "cover" }}
        source={{
          uri: "https://tse2.mm.bing.net/th?id=OIP.6Itd4CLFe1ZWmcZgT6deXgHaD8&pid=Api&P=0",
        }}
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
      <View style={styles.Carousel}>
        <Text style={{ fontSize: 20, padding: 10, fontWeight: "bold" }}>
          Chi Tiết Hóa Đơn
        </Text>
        {renderCart()}
      </View>
      <View style={styles.Carousel}>
        <Text style={styles.Price}>
          Tiền Ship: {route.params.FeeShip.toLocaleString()}đ
        </Text>
        <Text style={styles.Price1}>Tổng Tiền: {TongTien()}</Text>
      </View>
      <View style={styles.Carousel1}>
        <TouchableOpacity
          style={{
            width: "45%",
            height: 40,
            marginLeft: 100,
            marginTop: 20,
            marginBottom: 20,
            paddingTop: 9,
            backgroundColor: "#199a9a",
            borderRadius: 5,
          }}
          onPress={async () => {
            //  await

            handleReservation();
          }}
        >
          <Text
            style={{
              color: "#FFFF",
              fontSize: 15,

              textAlign: "center",
            }}
          >
            Hoàn Tất
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Carousel: {
    marginTop: 20,
    backgroundColor: "#FFF",
    width: "100%",
  },
  Carousel1: {
    marginTop: 20,
    backgroundColor: "#FFF",
    width: "100%",
    flexDirection: "row",
  },
  itemContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 10,
    alignItems: "center",
    paddingLeft: 10,
    width: "93%",

    borderRadius: 5,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  imgCourseContainer: {
    borderRadius: 4,
  },
  imgCourse: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  Shopcart: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0d5d5",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonhandle: {
    flexDirection: "row",
    marginTop: 10,
  },
  handleRemove: {
    backgroundColor: "red",
    height: 28,
    width: 28,
    borderRadius: 5,
  },
  handlechange: {
    backgroundColor: "#3da9a9",
    height: 28,
    width: 28,
    borderRadius: 5,
    marginLeft: 5,
  },
  handletext: {
    paddingLeft: 8,
    color: "#FFFF",
    fontSize: 20,
  },
  modalText: {
    marginLeft: 10,
    marginBottom: 15,
    paddingTop: 8,

    fontSize: 15,
    width: "30%",
  },
  modalText1: {
    marginBottom: 15,
    paddingTop: 0,
    fontSize: 15,
    color: "grey",
    marginRight: 20,
  },
  modalText2: {
    marginBottom: 15,
    paddingTop: 0,
    fontSize: 15,
    color: "grey",
    marginRight: 15,
  },
  Price: {
    padding: 10,
    fontSize: 17,
  },
  Price1: {
    padding: 10,
    marginTop: 20,
    fontSize: 17,
  },
  food1: {
    marginTop: 10,
    color: "orange",
    width: "80%",
    marginLeft: 25,

    fontSize: 15,
  },
  Discount: {
    flexDirection: "row",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
    margin: 10,
  },
  wrapDiscount: {
    width: 350,
    height: 80,
    marginLeft: 15,
  },
  Blog: {
    fontSize: 20,
    paddingLeft: 28,
    marginTop: 15,
    marginBottom: 10,
  },
});
