import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetMenuAction } from "../redux/Action/GetBrandAction.js";
import {
  CART,
  CARTActions,
  RemoveCARTActions,
  TangGiamSLActions,
} from "../redux/types/CartTypes.js";
import { Alert } from "react-native";
import { ImageBackground } from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

export default function DishdetailComponent({ route, navigation }) {
  console.log(route, "id details");
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState();
  const [count, setCount] = useState(1);
  //call api

  const db = useSelector((state) => state.GetBrandReducer);
  const { Cart } = useSelector((state) => state.CartReducer);

  // tăng giảm số lượng

  const tangGiamSL = (maSP, sl) => {
    let gioHangUpdate = [...Cart];
    let productFind = gioHangUpdate.find((product) => product.id === maSP);
    if (productFind) {
      productFind.Amount += sl;
      if (productFind.Amount < 1) {
        alert("Số lượng không đúng");
        productFind.Amount -= sl;
      }
    }

    setCount({
      Cart: gioHangUpdate,
    });
  };
  // tăng giảm số lượng

  //react hook
  const dispatch = useDispatch();
  useEffect(() => {
    let id = route.params.id;
    console.log(id, "id menu action");
    dispatch(GetMenuAction(id));
    setData(db.GetMenu);
  }, []);

  //flatlist
  const HeaderComponent = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            paddingTop: 30,
          }}
        >
          MENU QUÁN
        </Text>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.textStyle}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/4647/4647563.png",
              }}
              style={{ width: 30, height: 30 }}
            ></Image>
          </View>
        </Pressable>
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer} key={index}>
      <View style={styles.imgCourseContainer}>
        <Image source={{ uri: item.IMG }} style={styles.imgCourse} />
      </View>
      <View style={{ paddingLeft: 15 }}>
        <Text
          style={{
            width: "100%",
            color: "red",
            fontWeight: "bold",
            fontSize: 17,
            maxWidth: "90%",
          }}
        >
          {item.Name}
        </Text>
        <Text style={{ paddingTop: 5, width: "100%", maxWidth: "86%" }}>
          Mô Tả: {item.Description}
        </Text>
        <Text style={{ paddingTop: 5, width: "100%", color: "#ff2323" }}>
          Trạng Thái: {item.Status}
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: 200,
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{
              paddingTop: 5,
              width: "100%",
              color: "orange",
              paddingLeft: 35,
            }}
          >
            Đánh Giá: {item.Rate}⭐️
          </Text>

          {/* comment món */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Comment", {
                IDcomment: item.id,
                IDbrand: route.params.id,
                img: item.IMG,
                Email: route.params.Email,
                Name: item.Name,
              });
            }}
          >
            <Text style={{ color: "#3da9a9", paddingTop: 5, paddingLeft: 25 }}>
              Xem Đánh Giá
            </Text>
          </TouchableOpacity>
        </View>

        {item.Status == "Còn hàng" ? (
          <TouchableOpacity
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {
              dispatch(CARTActions(item, count));
              Alert.alert("Đã Chọn Món", "Đi Tới Giỏ Hàng");
            }}
          >
            <View style={styles.textStyle}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/4647/4647563.png",
                }}
                style={{ width: 30, height: 30 }}
              ></Image>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={true}></TouchableOpacity>
        )}
      </View>
      <View></View>
    </View>
  );
  //end faltlist

  //render cart
  const ShopCart = () => {
    return Cart.map((item, index) => {
      return (
        <View key={index}>
          <View style={styles.Shopcart}>
            {/* xóa sản phẩm */}
            <View style={styles.buttonhandle1}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(RemoveCARTActions(item.id));
                }}
                style={styles.handleRemove}
              >
                <Text style={styles.handletext}>X</Text>
              </TouchableOpacity>
            </View>
            {/* render món */}
            <View style={{ width: "15%", marginLeft: 20 }}>
              <Image
                style={{ height: 50, width: "100%", resizeMode: "cover" }}
                source={{ uri: item.IMG }}
              />
            </View>
            <Text style={styles.modalText}>{item.Name}</Text>
            <View
              style={{ flexDirection: "column", marginTop: 2, marginLeft: 30 }}
            >
              <Text style={styles.modalText1}>
                Giá:{(item.Price * item.Amount).toLocaleString()}đ
              </Text>
              {/* tăng giảm sl */}
              <View style={styles.buttonhandle}>
                <TouchableOpacity
                  onPress={() => {
                    tangGiamSL(item.id, -1);
                  }}
                  style={styles.handlechange}
                >
                  <Text style={styles.handletext}>-</Text>
                </TouchableOpacity>
                <Text style={{ paddingTop: 5, paddingLeft: 8 }}>
                  {item.Amount}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    tangGiamSL(item.id, 1);
                  }}
                  style={styles.handlechange}
                >
                  <Text style={styles.handletext}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    });
  };
  //End render cart

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={{ height: 250, width: "100%", resizeMode: "cover" }}
        source={{ uri: route.params.img }}
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

      {/* header */}
      <View style={styles.header}>
        <Text
          style={{
            color: "#19b480",
            textAlign: "center",
            fontSize: 13,
            paddingTop: 15,
          }}
        >
          ⭐️ĐỐI TÁC CỦA FOODAPP
        </Text>
        <Text style={styles.text}>{route.params.Name}</Text>
        <Text style={styles.text1}>{route.params.Address}</Text>
        <Text
          style={{
            paddingTop: 3,
            width: "100%",
            color: "#ff2323",
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Trạng Thái: {route.params.Status}
        </Text>
      </View>

      {/* xem cmt quán */}
      <View style={styles.comment}>
        <Text>🛒 30 Đã Bán</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FeedBackBrand", {
              id: route.params.id,
              img: route.params.img,
              Email: route.params.Email,
            });
          }}
        >
          <Text style={styles.btnComment}>Xem Đánh Giá</Text>
        </TouchableOpacity>
      </View>

      {/* Menu quán */}
      <SafeAreaView style={styles.Carousel}>
        <FlatList
          data={db.GetMenu}
          ListHeaderComponent={HeaderComponent}
          renderItem={renderItem}
        />
      </SafeAreaView>

      {/*modal */}
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
          style={{ height: "90%", marginTop: 30 }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{ borderBottomWidth: 0.5, borderBottomColor: "#e0d5d5" }}
              >
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>X</Text>
                </Pressable>
                <View>
                  <Text
                    style={{
                      fontSize: 20,

                      marginTop: -28,
                      textAlign: "center",
                    }}
                  >
                    Giỏ Hàng
                  </Text>
                </View>
              </View>
              {ShopCart()}
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);

                    navigation.navigate("Payment", {
                      Cart: Cart,
                      FeeShip: 25000,
                      Discount: route.params.Dis,
                      id: route.params.id,
                      Email: route.params.Email,
                    });
                  }}
                  style={{
                    height: 40,
                    width: "60%",
                    backgroundColor: "#3da9a9",
                    textAlign: "center",
                    padding: 8,
                    borderRadius: 8,
                    color: "#FFFF",
                    marginTop: 20,
                    marginLeft: "auto",
                  }}
                >
                  <Text style={{ color: "#FFFF", textAlign: "center" }}>
                    Trang Thanh Toán
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "90%",
    backgroundColor: "#FFFF",
    height: 180,
    marginLeft: 20,
    marginTop: -50,
    borderRadius: 10,
  },
  text: {
    color: "#f60000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 15,
  },
  text1: {
    color: "grey",
    textAlign: "center",
    fontSize: 13,
    paddingTop: 15,
  },
  Carousel: {
    marginTop: 20,
    backgroundColor: "#FFF",
    width: "100%",
  },
  itemContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 10,
    alignItems: "center",
    paddingLeft: 10,
    width: "93%",

    borderRadius: 5,
    borderBottomColor: "#e0d5d5",
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
    paddingTop: 10,
    color: "white",
    textAlign: "center",
  },
  payment: {
    backgroundColor: "#3da9a9",
    borderRadius: 5,
    width: 150,
    height: 45,
    marginLeft: 2,
    marginTop: 18,
    marginBottom: 15,
  },
  comment: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#FFF",
    height: 70,
    padding: 25,
    justifyContent: "space-around",
  },
  btnComment: {
    paddingLeft: 165,
    color: "#3ca3a3",
  },
  centeredView: {
    marginTop: 50,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: "80%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "100%",
    height: "90%",
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 5,
    elevation: 2,
    width: 40,
  },
  buttonOpen: {
    backgroundColor: "#3da9a9",
    marginBottom: 15,
    marginTop: 15,
  },
  buttonClose: {
    backgroundColor: "#c5c5c5",
    width: 30,
    height: 30,
    borderRadius: 20,
    marginLeft: -25,
    marginTop: -23,
  },
  textStyle: {
    color: "#FFFF",

    textAlign: "center",
    paddingTop: 0,
    paddingLeft: 0,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    paddingTop: 2,
    paddingLeft: 15,
    fontSize: 15,
    width: "40%",
  },

  modalText1: {
    marginBottom: 15,
    textAlign: "left",
    paddingTop: 5,

    fontSize: 15,

    color: "grey",
  },
  buttonhandle: {
    flexDirection: "row",
    marginTop: 0,
    marginLeft: 15,
    marginBottom: 10,
  },
  buttonhandle1: {
    marginTop: 10,
    marginLeft: -30,
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
  Shopcart: {
    justifyContent: "flex-start",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0d5d5",
    borderRadius: 5,
    marginTop: 20,
  },
});
