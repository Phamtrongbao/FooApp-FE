import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native";
import { Alert } from "react-native";

const HEIGHT = Dimensions.get("window").height;
export default function DiscountBrand({ route, navigation }) {
  console.log({ route });

  const RenderBrand = () => {
    return route.params.Brand.map((item, index) => {
      console.log(item, "branđiso");
      return item.Type === "Đang khuyến mãi" ? (
        <View style={styles.itemContainer} key={index}>
          <View style={styles.imgCourseContainer}>
            <Image source={{ uri: item.IMG }} style={styles.imgCourse} />
          </View>
          <View style={{ paddingLeft: 15 }}>
            <Text
              style={{
                width: "100%",
                color: "red",
                fontWeight:'bold',
                fontSize: 17,
                maxWidth: "95%",
              }}
            >
              Quán: {item.Name}
            </Text>
            <Text style={{ paddingTop: 3, width: "100%", maxWidth: "90%" }}>
              Mô Tả: {item.Description}
            </Text>
            <Text style={{ paddingTop: 3, width: "100%", color: "#ff2323" }}>
              Trạng Thái: {item.Status}
            </Text>
            <Text style={{ paddingTop: 3, width: "100%", color: "orange" }}>
              Đánh Giá: {item.Rating}⭐️
            </Text>
            <TouchableOpacity
              onPress={() => {
                if(item.Status ==="Close"){
                  Alert.alert("Fail!","Quán Chưa mở cửa")
                }else{
                  navigation.navigate("Details", {
                    id: item.id,
                    img: item.IMG,
                    Name: item.Name,
                    Status: item.Status,
                    Address: item.Address,
                    Dis: route.params.Dis,
                  });
                }
            
              }}
              style={styles.thanhtoan1}
            >
              <Text style={styles.TextThanhtoan}>Đến Quán</Text>
            </TouchableOpacity>
          </View>
          <View></View>
        </View>
      ) : (
        null
      );
    });
  };

  return (
    <ScrollView>
      <ImageBackground
        style={{ height: 250, width: "100%", resizeMode: "cover" }}
        source={{
          uri: "https://tse3.mm.bing.net/th?id=OIP.gYaHEu5aZY4P2dsWyYoflQHaDW&pid=Api&P=0",
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
            marginTop: 50,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" type="font-awesome" size={25} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>
      {RenderBrand()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Carousel: {
    marginTop: 20,
    backgroundColor: "#FFF",
    width: "100%",
  },
  img: {
    width: "90%",
    height: 200,
  },
  wrap: {
    width: 350,
    height: HEIGHT * 0.25,
    marginLeft: 15,
  },
  wrapDiscount: {
    width: 350,
    height: 80,
    marginLeft: 15,
  },
  wrapimg: {
    width: 450,
    height: 200,
  },
  Brand: {
    width: 350,
    height: HEIGHT * 0.4,
  },
  list: {
    flexDirection: "row",
    flex: 4,
  },
  quangcao: {
    marginTop: 20,
  },
  Blog: {
    fontSize: 20,
    paddingLeft: 28,
    marginTop: 15,
    marginBottom: 10,

  },
  food: {
    marginTop: 10,
    color: "orange",
    textAlign: "center",
    width: "90%",
    marginLeft: 25,
  },
  food1: {
    marginTop: 10,
    color: "orange",
    width: "80%",
    marginLeft: 25,

    fontSize: 15,
  },
  Price: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  thanhtoan: {
    backgroundColor: "red",
    borderRadius: 5,
    width: "90%",
    height: 30,
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 15,
  },
  thanhtoan1: {
    backgroundColor: "red",
    borderRadius: 5,
    width: 150,
    height: 30,
    marginLeft: 2,
    marginTop: 10,
    marginBottom: 15,
  },
  TextThanhtoan: {
    marginTop: 5,
    color: "white",
    textAlign: "center",
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
  imgCourse: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 5,
  },
  imgCourseContainer: {
    borderRadius: 4,
  },
});
