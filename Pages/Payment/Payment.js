import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { PostInvoiceAction } from "../../redux/Action/PostInvoiceActions";
import { useEffect } from "react";
import { GetBrandAction, GetDiscountAction } from "../../redux/Action/GetBrandAction";
import {
  DiscountActions,
  RemoveDiscountActions,
} from "../../redux/types/CartTypes";
import { Alert } from "react-native";
import { GetAccountAction } from "../../redux/Action/AccountAction";
import * as NotifyCation from "expo-notifications";
import * as Device from "expo-device";

export default function Payment({ route, navigation }) {
  console.log(route, "payment");


  const {Postinvoice} = useSelector((state) => state.PostInvoiceReducer);
  console.log(Postinvoice, "post");
  const [data, setData] = useState([]);
  const [state,setState] = useState([])
  const db = useSelector((state) => state.GetBrandReducer);
  const db1 = useSelector((state) => state.RegisterReducer);
  const dispatch = useDispatch();
  const { Discount } = useSelector((state) => state.CartReducer);
  const [CreateDate,setCreateDate] = useState(new Date().toDateString())
  const [date, setDate] = useState(new Date().toDateString());

 
 
const [invoi,setInvoice] = useState({
  Cart:route.params.Cart.map(item=>item),
  Id:route.params.id,
  CreateDate:CreateDate,
  Email:route.params.Email
})
  useEffect(() => {
    dispatch(GetDiscountAction());
    setData(db.Discount);
    setData(db.GetBrand)
    dispatch(GetAccountAction());
    setState(db1.Register);
  }, []);

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
          title: "Đơn Hàng số "+ route.params.id,
          body: "Tổng Tiền " + TongTien().toLocaleString() +" vnđ "+ " Đã Được thanh toán",
          sound: true,
          vibrate: true,
        },
        trigger: null,
      });
    }
  };

  const handleReservation = () => {
    Alert.alert(
      "Thanh Toán",
      "Tổng Tiền: " + TongTien().toLocaleString() +"vnđ",
      [
        { text: "Cancel" },
        {
          text: "OK",
          onPress: () => {
            presentLocalNotification();
           ThanhtoanHandle()
          },
        },
      ],
      { cancelable: false }
    );
  };
  //btn thanh toán
  const ThanhtoanHandle = () => {
    console.log(invoi, "thanhtoans button");
    if (tinhTongSL()===0) {
      Alert.alert("Fail!","Bạn Chưa Có Sản Phẩm không thể thanh toán")
    }else{
      dispatch(PostInvoiceAction(route.params.id,invoi))
      navigation.navigate("Invoice",
      {
          Cart:route.params.Cart,
          Discount:Discount.map(item=>item.Discount),
          FeeShip:25000,
          Email:route.params.Email,
          id:route.params.id
      }
      )
    }
   
  };
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
  var Magiam = [Discount.map(item=>item.Discount),Number.reduce(getSum),];
  function getMagiam(total, num) {
    return num-total;
  }

  //render mã giảm giá
  const MaGiamGia = () => {
    return Discount.map((item,index) => {
        return (    
          <View style={{ flexDirection: "row",paddingTop:30,paddingLeft:10 }} key={index}>      
            <Text style={{ color: "#199a9a" }}>
              {item.Discount.toLocaleString()}đ
            </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(RemoveDiscountActions(item.id));
              }}
              style={{ paddingLeft: 8, color: "grey" }}
            >
              <Text>x</Text>
            </TouchableOpacity>
          </View>
        );
    });
  };


  //render lại tong tien khi áp dung mã giảm
  const TongTien = () => {
    return     Magiam.reduce(getMagiam,0).toLocaleString()
      
  };

  //render giỏ hàng khi khách hàng mua
  const renderCart = () => {
    return route.params.Cart.map((item, index) => {
      return (
        <View key={index}>
          <View style={styles.Shopcart}>
            {/* render món */}
            <View style={{ width: "15%", marginLeft: 10 ,marginTop:10}}>
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

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={{ height: 250, width: "100%", resizeMode: "cover" }}
        source={{
          uri: "https://cdn.pixabay.com/photo/2018/03/06/08/59/online-3202912__340.jpg",
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
        <Text style={{fontSize:15,fontWeight:'bold',color:'#3da9a9'}}>Địa Chỉ:{db1.Register.map((item,index)=>{
          return item.Email === route.params.Email?<Text key={index}>{item.Address}</Text>:null
        })} </Text>
      </View>
      <View style={styles.Carousel}>
        <Text style={{ fontSize: 20, padding: 10 ,fontWeight:'bold'}}>
          Đơn Hàng Của Bạn
        </Text>
        {renderCart()}
      </View>
      <View style={styles.Carousel}>
        <Text style={styles.Price}>
          Tạm Tính: {tinhTongSL().toLocaleString()}đ
        </Text>
        <Text style={styles.Price}>
          Tiền Ship: {route.params.FeeShip.toLocaleString()}đ
        </Text>
        <Text style={styles.Pricevoucher}>Mã Giảm Giá: {MaGiamGia()}</Text>
      </View>
      <SafeAreaView style={styles.Carousel}>
        <View>
          <Text style={styles.Blog}>Mã Giảm Giá Đang Đợi Bạn</Text>
        </View>
        <View style={styles.wrapDiscount}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={{ marginLeft: 2 }}
          >
            {db.Discount.map((e, index) => (
              //thêm mã giảm giá
              <TouchableOpacity
                onPress={() => {
                if (tinhTongSL()>50000) {
                  dispatch(DiscountActions(e));
                }else{
                  Alert.alert("Fail!","chỉ áp dụng với đơn hàng trên 50.000vnđ")
                }
                   
               
                }}
                style={styles.Discount}
                key={index}
              >
                <View>
                  <Image
                    key={e}
                    resizeMode="stretch"
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: 10,
                      borderRadius: 5,
                    }}
                    source={{ uri: e.IMG }}
                  />
                </View>
                <View>
                  <Text style={styles.food1}>{e.Name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
      <View style={styles.Carousel1}>
        <Text style={styles.Price1}>Tổng Tiền: {TongTien()} vnđ</Text>
        <TouchableOpacity
          style={{
            width: "40%",
            height: 40,
            marginLeft:10,
            marginTop: 20,
            marginBottom: 20,
            paddingTop: 9,
            backgroundColor: "#199a9a",
            borderRadius: 5,
          }}
          onPress={handleReservation}
        >
          <Text
            style={{
              color: "#FFFF",
              fontSize: 15,
          
              textAlign: "center",
            }}
          >
            Thanh Toán
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
    justifyContent:'center'
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
    textAlign: "left",
    paddingTop: 10,
    width:'30%',
    fontWeight:"bold",
    fontSize: 15,
  },
  modalText1: {
    marginBottom: 15, 
    fontSize: 15,
    color: "grey",
    marginRight:0,
  },
  modalText2: {
    marginBottom: 15,
    paddingTop:0,
    fontSize: 15,
    color: "grey",
    marginRight:15,
  },
  Price: {
    fontSize: 17,
    paddingTop:10,
    paddingLeft:10
  },
  Pricevoucher: {
    fontSize: 17,
    paddingLeft:10
  },
  Price1: {
    marginLeft:10,
    paddingTop:25,
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
    fontWeight:"bold"
  },
});
