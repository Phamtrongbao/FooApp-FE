import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Carousel, business } from "../Shared/Sharedlist.js";
import { useDispatch, useSelector } from "react-redux";
import {
  GetBlogAction,
  GetBrandAction,
  GetDiscountAction,
} from "../redux/Action/GetBrandAction.js";
import { Icon } from "react-native-elements";
import { Alert } from "react-native";
import { GetAccountAction } from "../redux/Action/AccountAction.js";

export default function HomeComponent({ navigation, route }) {
  console.log({ route });
  const [data, setData] = useState([]);
  const [state, setState] = useState([]);
  const db = useSelector((state) => state.GetBrandReducer);
  const db1 = useSelector((state) => state.RegisterReducer);
  console.log(db1);
  const [search, setSearch] = useState(db.Getbrand);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    dispatch(GetBrandAction());
    setData(db.Getbrand);
    dispatch(GetBlogAction());
    setData(db.Blog);
    dispatch(GetDiscountAction());
    setData(db.Discount);
    dispatch(GetAccountAction());
    setState(db1.Register);
  }, []);

  //render ds quán
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
        <Text style={{ paddingTop: 3, width: "100%", maxWidth: "88%" }}>
          {item.Description}
        </Text>
        <Text style={{ paddingTop: 3, width: "100%", color: "#ff2323" }}>
          Status: {item.Status}
        </Text>
        <Text style={{ paddingTop: 3, width: "100%", color: "orange" }}>
          {item.Rating}⭐️
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (item.Status === "Close") {
              setDisabled(false);
              Alert.alert("Fail!", "Cửa Hàng Chưa mở cửa");
            } else {
              navigation.navigate("Details", {
                id: item.id,
                img: item.IMG,
                Name: item.Name,
                Status: item.Status,
                Address: item.Address,
                Email: route.params.Email,
              });
            }
          }}
          style={styles.thanhtoan1}
        >
          <Text style={styles.TextThanhtoan}>Đến Quán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const HeaderComponent = () => {
    return (
      <View>
        <Text
          style={{
            marginLeft: 25,
            flex: 1,
            fontSize: 20,
            color: "#1e8080",
            paddingTop: 30,
            fontWeight: "bold",
          }}
        >
          Quanh Đây Có Gì Ngon
        </Text>
      </View>
    );
  };
  //end

  //search
  const searchName = (input) => {
    let Data = db.Getbrand;
    let SearchData = Data.filter((item) => {
      return item.Name.toLowerCase().includes(input.toLowerCase());
    });
    setSearch(db.Getbrand);
    setSearch(SearchData);
    setShow(true);
    console.log(SearchData, "search");
  };

  //render address user
  const AddressAccount = () => {
    return db1.Register.map((item, index) => {
      return item.Email === route.params.Email ? (
        <View key={index}>
          <Text
            style={{
              fontSize: 15,
              color: "#FFFF",
              paddingLeft: 5,
              fontWeight: "bold",
              paddingTop: 20,
            }}
          >
            {item.Address}
          </Text>
        </View>
      ) : null;
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <SafeAreaView style={styles.header}>
          {/* địa chỉ và thông tin cá nhân */}
          <View style={styles.uperheader}>
            <View
              style={{
                // backgroundColor: "#FFFF",
                flexDirection: "row",
                paddingTop: 0,
                justifyContent: "space-evenly",
                paddingRight: 0,
              }}
            >
              {/*render địa chỉ  */}
              <View style={{ paddingLeft: 20 }}>
                <Text style={{ fontSize: 20, color: "#1e8080", paddingTop: 0 }}>
                  <Icon
                    name="map"
                    type="font-awesome"
                    size={20}
                    color={"#FFFF"}
                    style={{ paddingTop: 0 }}
                  />
                  {AddressAccount()}
                </Text>
              </View>

              {/* icon thông tin cá nhân */}
              {db1.Register.map((item, index) => {
                return route.params.Email === item.Email ? (
                  <TouchableOpacity
                    style={{
                      width: "40%",
                      height: 30,
                      marginTop: 10,
                      borderRadius: 50,
                      marginLeft: 140,
                    }}
                    onPress={() => {
                      navigation.navigate("UserDetails", {
                        id: item.id,
                        Email: item.Email,
                        IMG: item.IMG,
                        Name: item.Name,
                        Address: item.Address,
                        Password: item.Password,
                        PhoneNumber: item.PhoneNumber,
                      });
                    }}
                  >
                    <View key={index}>
                      <Image
                        source={{ uri: item.IMG }}
                        style={{ width: "26%", height: 40, borderRadius: 80 }}
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                );
              })}
            </View>
          </View>

          {/* search */}
          <View style={styles.search}>
            <TextInput
              style={styles.text}
              onChangeText={(input) => {
                searchName(input);
              }}
              placeholder="Nhập Tên Quán...."
            />
          </View>

          {/* render ds sp sau khi search */}
          <ScrollView
            style={{
              backgroundColor: "#AF0C6E",
              height: 90,
              width: "100%",
              marginTop: 10,
            }}
          >
            {show ? (
              search.map((e, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "grey",
                      paddingLeft: 50,
                    }}
                    onPress={() => {
                      navigation.navigate("Details", {
                        id: e.id,
                        img: e.IMG,
                        Name: e.Name,
                        Status: e.Status,
                        Address: e.Address,
                      });
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFFF",
                          fontSize: 15,
                          paddingTop: 8,
                          paddingBottom: 8,
                        }}
                      >
                        {e.Name}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setShow(false);
                        }}
                      >
                        <Text
                          style={{
                            paddingRight: 37,
                            paddingTop: 8,
                            color: "#FFFF",
                          }}
                        >
                          X
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              // thanh navbar
              <View style={styles.lowerheader}>
                <TouchableOpacity
                  onPress={() => {
                    let admin = db1.Register.find(
                      (item) =>
                        item.Type === "Admin" &&
                        item.Email === route.params.Email
                    );
                    if (admin) {
                      navigation.navigate("Supplier", {
                        Email: route.params.Email,
                      });
                    } else {
                      Alert.alert("Fail!", "Bạn không phải quản trị");
                    }
                  }}
                  style={styles.feature}
                >
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/9038/9038100.png",
                    }}
                    style={styles.featureIcon}
                  ></Image>
                  <Text style={styles.featureName}>Supplier</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    let admin = db1.Register.find(
                      (item) =>
                        item.Type === "Admin" &&
                        item.Email === route.params.Email
                    );
                    if (admin) {
                      navigation.navigate("Admin", {
                        Email: route.params.Email,
                      });
                    } else {
                      Alert.alert("Fail!", "Bạn không phải quản trị");
                    }
                  }}
                  style={styles.feature}
                >
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/4400/4400471.png",
                    }}
                    style={styles.featureIcon}
                  ></Image>
                  <Text style={styles.featureName}>Store Owner</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.feature}
                  onPress={() => {
                    navigation.navigate("InvoiceUser", {
                      Email: route.params.Email,
                      id: route.params.id,
                    });
                  }}
                >
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/4400/4400532.png",
                    }}
                    style={styles.featureIcon}
                  ></Image>
                  <Text style={styles.featureName}>Invoice</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("login");
                    dispatch(GetAccountAction());
                    dispatch(GetBrandAction());
                  }}
                  style={styles.feature}
                >
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/4033/4033019.png",
                    }}
                    style={styles.featureIcon}
                  ></Image>
                  <Text style={styles.featureName}>Log Out</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </View>

      {/* render carousel */}
      <SafeAreaView style={styles.Carousel}>
        <View style={styles.wrapimg}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrapimg}
          >
            {Carousel.map((e, index) => (
              <Image
                key={index}
                resizeMode="cover"
                style={styles.wrapimg}
                source={{ uri: e.img }}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Quán nổi bật */}
      <SafeAreaView style={styles.Carousel}>
        <View>
          <Text style={styles.Blog}>Quán Nổi Bật </Text>
        </View>
        <View style={styles.Brand}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={{ marginLeft: 2 }}
          >
            {db.Getbrand.slice(2, 10).map((e, index) => (
              <View key={index}>
                <View>
                  <Image
                    key={e}
                    resizeMode="stretch"
                    style={{
                      width: 240,
                      height: 150,
                      marginLeft: 20,
                      borderRadius: 5,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderColor: "grey",
                      alignItems: "center",
                    }}
                    source={{ uri: e.IMG }}
                  />
                </View>

                <Text style={styles.food}>{e.Name}</Text>
                <Text style={styles.Price}>Status: {e.Status}</Text>
                <TouchableOpacity
                  onPress={() => {
                    if (e.Status === "Close") {
                      setDisabled(false);
                      Alert.alert("Fail!", "cửa hàng chưa mở cửa");
                    } else {
                      navigation.navigate("Details", {
                        id: e.id,
                        img: e.IMG,
                        Name: e.Name,
                        Status: e.Status,
                        Address: e.Address,
                        Email: route.params.Email,
                      });
                    }
                  }}
                  style={styles.thanhtoan}
                >
                  <Text style={styles.TextThanhtoan}>Đến Quán</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
      {/* bìa quảng cáo */}
      <View style={styles.quangcao}>
        <Image
          source={{
            uri: "https://owa.bestprice.vn/images/articles/uploads/top-20-quan-an-co-view-dep-nhat-nhi-ha-noi-5f62d47c82300.jpg",
          }}
          style={{ width: "100%", height: 120, resizeMode: "cover" }}
        ></Image>
      </View>
      {/* quán đang khuyến mãi */}
      <SafeAreaView style={styles.Carousel}>
        <View>
          <Text style={styles.Blog}>Quán Đang Khuyến mãi </Text>
        </View>

        <View style={styles.Brand}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={{ marginLeft: 2 }}
          >
            {db.Getbrand.map((e, index) =>
              e.Type === "Đang khuyến mãi" ? (
                <View key={index}>
                  <Image
                    resizeMode="stretch"
                    style={{
                      width: 250,
                      height: 150,
                      marginLeft: 20,
                      borderRadius: 5,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderColor: "grey",
                    }}
                    source={{ uri: e.IMG }}
                  />
                  <View>
                    <Text style={styles.food}>{e.Name}</Text>
                  </View>
                  <View>
                    <Text style={styles.Price}>Status: {e.Status}</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        if (e.Status === "Close") {
                          setDisabled(false);
                          Alert.alert("Fail!", "Cửa hàng chưa mở cửa");
                        } else {
                          navigation.navigate("Details", {
                            id: e.id,
                            img: e.IMG,
                            Name: e.Name,
                            Status: e.Status,
                            Address: e.Address,
                            Email: route.params.Email,
                          });
                        }
                      }}
                      style={styles.thanhtoan}
                    >
                      <Text style={styles.TextThanhtoan}>Đến Quán</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
      {/* blog */}
      <SafeAreaView style={styles.Carousel}>
        <View>
          <Text style={styles.Blog}>Blog </Text>
        </View>
        <View style={styles.wrapblog}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={{ marginLeft: 2 }}
          >
            {db.Blog.map((e, index) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Blogs", {
                    id: e.id,
                    Name: e.Name,
                    IMG: e.IMG,
                    Des: e.Description,
                  });
                }}
                key={index}
              >
                <Image
                  key={e}
                  resizeMode="stretch"
                  style={{
                    width: 170,
                    height: 170,
                    marginLeft: 10,
                    borderRadius: 5,
                    marginBottom: 30,
                    resizeMode: "cover",
                  }}
                  source={{ uri: e.IMG }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
      {/* mã giảm giá */}
      <SafeAreaView style={styles.Carousel}>
        <View style={styles.wrapDiscount}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.Blog}>Flash Sale</Text>
            <Icon
              name="flash"
              type="font-awesome"
              size={25}
              color={"orange"}
              style={{ paddingTop: 22, paddingLeft: 5 }}
            />
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={{ marginLeft: 2 }}
          >
            {db.Discount.map((e, index) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("DiscountBrand", {
                    id: e.id,
                    Dis: e.Discount,
                    Brand: db.Getbrand,
                    Email: route.params.Email,
                  });
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
      {/* ưu đai thanh toán */}
      <SafeAreaView style={styles.Carousel}>
        <View>
          <Text style={styles.Blog}>Ưu Đãi Thanh Toán </Text>
        </View>
        <View style={styles.wrapmomo}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={{ marginLeft: 2 }}
          >
            {business.map((e, index) => (
              <View key={index}>
                <Image
                  key={e}
                  resizeMode="stretch"
                  style={{
                    width: 300,
                    height: 150,
                    marginLeft: 10,
                    borderRadius: 5,
                  }}
                  source={{ uri: e.img }}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
      {/* quán gần đây */}
      <SafeAreaView style={styles.Carousel}>
        <FlatList
          data={db.Getbrand}
          ListHeaderComponent={HeaderComponent}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  header: {
    // position:'absolute',
    width: "100%",
    backgroundColor: "#AF0C6E",
  },

  lowerheader: {
    height: 96,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
  },

  search: {
    alignItems: "center",
  },
  feature: {
    alignItems: "center",
  },
  featureIcon: {
    width: 32,
    height: 32,
  },
  featureName: {
    fontWeight: "bold",
    fontSize: "12",
    lineHeight: 14,
    color: "white",
    marginTop: 12,
  },
  text: {
    width: "95%",
    height: 30,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 5,
    // borderWidth: 1,
    paddingLeft: 30,
    color: "#FFFF",
    marginTop: 10,
  },
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
    height: 260,
    marginLeft: 15,
  },
  wrapblog: {
    width: 350,
    height: 180,
    marginLeft: 15,
  },
  wrapmomo: {
    width: 350,
    height: 170,
    marginLeft: 15,
  },
  wrapDiscount: {
    width: 350,
    height: 140,
    marginLeft: 15,
  },
  wrapimg: {
    width: 375,
    height: 200,
  },
  Brand: {
    width: 370,
    height: 260,
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
    color: "#1e8080",
    fontWeight: "bold",
  },
  food: {
    marginTop: 10,
    color: "orange",
    textAlign: "center",
    width: "90%",
    marginLeft: 20,
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
    marginLeft: 25,
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
    fontWeight: "bold",
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
  Discount: {
    flexDirection: "row",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
    margin: 10,
  },
});
