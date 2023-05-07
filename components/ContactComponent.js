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


export default function ContactComponent({ navigation }) {
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
        <Icon name="home" type="font-awesome" size={25} color="#fff" />
      </TouchableOpacity>
      <View style={styles.admin1}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("StoreAdd");
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
            shop registration
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
            ADD Discount
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.admin1, styles.admin2]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("InvoiceAdmin");
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
            Invoice
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ContactOwner");
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
            Contact
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
    marginTop: 10,
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
