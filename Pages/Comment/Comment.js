import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetFeedBackDishAction } from "../../redux/Action/GetBrandAction";
import { ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import { PostFeedBackDishAction } from "../../redux/Action/CommentActions";
import { State } from "react-native-gesture-handler";

export default function Comment({ navigation, route }) {
  console.log(route, "comment");
  //call api
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const db = useSelector((state) => state.GetBrandReducer);
  console.log(db.Getbrand.id, "brand id");
  const db1 = useSelector((state) => state.CommentReducer);
  const [date, setDate] = useState(new Date().toDateString());
  const [state, setState] = useState({
    id: route.params.IDbrand,
    Name: route.params.Name,
    Comment: "",
    IMG: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcCXNh9OsJ5FQZPljU_-rLiND2_9XogYnyxQ&usqp=CAU",
    Rating: "",
    CreateBy: "",
    CreateDate: date,
    Email: route.params.Email,
  });
  //react hook
  const dispatch = useDispatch();
  useEffect(() => {
    let Id = route.params.IDbrand;
    dispatch(GetFeedBackDishAction(Id));
    setData(db.FeedBackDish);
    setData(db.Getbrand);
  }, []);

  const SaveComment = () => {
    console.log(state, "id comment");
    dispatch(PostFeedBackDishAction(route.params.IDbrand, state));
  };
  const HeaderComponent = () => {
    return (
      <View>
        <Text
          style={{
            textAlign: "center",
            flex: 1,
            fontSize: 30,

            paddingTop: 30,
          }}
        >
          Danh Sách Bình Luận
        </Text>
      </View>
    );
  };

  //danh sách cmt
  const renderItem = ({ item, index }) =>
    route.params.Name === item.Name && item.CreateDate === date ? (
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
              maxWidth: "70%",
            }}
          >
            {item.Email}
          </Text>
          <Text style={{ paddingTop: 3, width: "100%", maxWidth: "70%" }}>
            Comment: {item.Comment}
          </Text>
          <Text style={{ paddingTop: 3, width: "100%", color: "#ff2323" }}>
            CreateDate: {item.CreateDate}
          </Text>
          <Text style={{ paddingTop: 3, width: "100%", color: "orange" }}>
            Rating: {item.Rating}⭐️
          </Text>
        </View>
        <View></View>
      </View>
    ) : (
      <View></View>
    );
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={{
          height: 250,
          width: "100%",
          resizeMode: "cover",
          paddingTop: 20,
        }}
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
            marginTop: 20,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" type="font-awesome" size={25} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>
      <SafeAreaView style={styles.Carousel}>
        <FlatList
          data={db.FeedBackDish}
          ListHeaderComponent={HeaderComponent}
          renderItem={renderItem}
        />
      </SafeAreaView>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>X</Text>
              </Pressable>
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => {
                    setState({ ...state, Comment: value });
                  }}
                  value={state.Comment}
                  placeholder="Comment"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => {
                    setState({ ...state, Rating: value });
                  }}
                  placeholder="Rating"
                  value={state.Rating}
                />
              </View>

              <TouchableOpacity
                style={{
                  width: "50%",
                  height: 40,
                  backgroundColor: "red",
                  marginLeft: 76,
                  marginTop: 20,
                  borderRadius: 8,
                }}
                onPress={SaveComment}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#FFFF",
                    fontSize: 15,
                    paddingTop: 10,
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Viết Bình luận</Text>
        </Pressable>
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
  itemContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 10,
    alignItems: "center",
    paddingLeft: 10,
    width: "93%",

    borderRadius: 5,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  imgCourseContainer: {
    borderRadius: 40,
    width: 40,
    height: 40,
    backgroundColor: "brown",
    marginTop: -58,
  },
  imgCourse: {
    borderRadius: 40,
    width: 40,
    height: 40,
    backgroundColor: "brown",
  },
  thanhtoan1: {
    backgroundColor: "red",
    borderRadius: 5,
    width: 150,
    height: 30,
    marginLeft: 130,
    marginTop: 10,
    marginBottom: 15,
  },
  TextThanhtoan: {
    marginTop: 5,
    color: "white",
    textAlign: "center",
  },
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
    fontFamily: " ui-serif",
    color: "#f60000",
    textAlign: "center",
    fontSize: 30,
    paddingTop: 15,
  },
  text1: {
    fontFamily: " ui-serif",

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
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },

  comment: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#FFF",
    height: 70,
    padding: 25,
  },
  btnComment: {
    paddingLeft: 165,
    color: "#3ca3a3",
    fontFamily: "ui-serif",
  },
  centeredView: {
    marginTop: 200,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: "80%",
  },
  modalView: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "100%",
    height: "50%",
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
    width: 100,
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
    marginLeft: 5,
    marginTop: 10,
  },
  textStyle: {
    color: "#FFFF",

    textAlign: "center",
    paddingTop: 0,
    paddingLeft: 0,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
    paddingTop: 15,

    fontSize: 15,
    fontFamily: "ui-serif",
  },

  modalText1: {
    marginBottom: 15,
    textAlign: "left",
    paddingTop: 5,

    fontSize: 15,
    fontFamily: "ui-serif",
    color: "grey",
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
