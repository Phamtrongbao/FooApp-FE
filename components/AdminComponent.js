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
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  GetDiscountAction,
  GetFeedBackBrandAction,
} from "../redux/Action/GetBrandAction";
import { useEffect } from "react";
import { ScrollView } from "react-native";

export default function AdminComponent({ navigation, route }) {
  console.log(route, "admin componet");

  return (
    //
    <ImageBackground
      style={{ height: "100%", width: "100%" }}
      resizeMode="stretch"
      source={{
        uri: "https://tse1.mm.bing.net/th?id=OIP.KZAQZntbylx0DhUYodZQIgHaNK&pid=Api&P=0",
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
      <Image
        style={{
          width: "95%",
          height: 180,
          marginLeft: 10,
          borderRadius: 10,
          marginTop: 15,
          opacity: 0.8,
        }}
        resizeMode="stretch"
        source={{
          uri: "https://tse2.mm.bing.net/th?id=OIP._rZRpruV-IZzEh5sOxJOfAHaEK&pid=Api&P=0",
        }}
      ></Image>
      <View style={styles.admin1}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AdminStore", { Email: route.params.Email });
          }}
          style={styles.brand}
        >
          <Icon name="home" type="font-awesome" size={25} color="#528B8B" />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#528B8B",
            }}
          >
            Store Manager
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.brand}
          onPress={() => {
            navigation.navigate("AdminDiscount");
          }}
        >
          <Icon name="tag" type="font-awesome" size={25} color="#528B8B" />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#528B8B",
            }}
          >
            Manage Discount
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.admin1, styles.admin2]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("InvoiceAdmin", { Email: route.params.Email });
          }}
          style={styles.brand}
        >
          <Icon name="file" type="font-awesome" size={25} color="#528B8B" />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#528B8B",
            }}
          >
            Invoice Manager
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AdminContact", { Email: route.params.Email });
          }}
          style={styles.brand}
        >
          <Icon
            name="user-secret"
            type="font-awesome"
            size={25}
            color="#528B8B"
          />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#528B8B",
            }}
          >
            Contatct Manager
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.admin2, styles.admin4]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AccountAdmin", { Email: route.params.Email });
          }}
          style={styles.brand}
        >
          <Icon name="list" type="font-awesome" size={25} color="#528B8B" />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#528B8B",
            }}
          >
            Dish Manage
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("IvoiceSupplier", {
              Email: route.params.Email,
            });
          }}
          style={styles.brand}
        >
          <Icon name="file" type="font-awesome" size={25} color="#528B8B" />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#528B8B",
            }}
          >
            Invoice Supplier
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  style1: {
    paddingLeft: 18,
    fontSize: 20,
  },
  style2: {
    paddingLeft: 70,
    fontSize: 20,
  },
  style3: {
    paddingLeft: 50,
    fontSize: 20,
  },
  admin1: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
  },
  admin2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  admin4: {
    marginLeft: 0,
  },
  brand: {
    backgroundColor: "#F5F5F5",
    width: "45%",
    height: 120,
    borderRadius: 10,
    opacity: 0.9,
    shadowColor: "white",
    shadowOpacity: "black",
    shadowRadius: 5,
    paddingTop: 35,
  },
  Discount: {},
});
