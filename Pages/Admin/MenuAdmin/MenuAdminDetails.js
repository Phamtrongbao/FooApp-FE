import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Platform } from "react-native";
import { useEffect } from "react";
import { DeleteMenuAction, GetBrandAction, GetMenuAction, PostMenuAction } from "../../../redux/Action/GetBrandAction";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../../firebase.config";
import {
  getStorage,
  uploadString,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} from "firebase/storage";
import { Alert } from "react-native";

export default function MenuAdminDetails({ route, navigation }) {
  console.log({ route });
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    localUri: "",
  });
  const [state, setState] = useState({
    Description: "",
    Name: "",
    Status: "",
    Price: "",
    IMG: selectedImage.localUri,
    Type: "",
    Amount: 1,
    FeeShip: 25000,
    Rate: ""
  });

  const db = useSelector((state) => state.GetBrandReducer);
  // console.log({ db });
  const dispatch = useDispatch();
  useEffect(() => {
    let id = route.params.id;
    dispatch(GetMenuAction(id));
    setData(db.GetMenu);
  }, []);

  const openImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ base64: true });
    if (result.cancelled === true) return;
    let uri = result.uri;
    setSelectedImage({ localUri: uri });

    // console.log(uri);
    if (Platform.OS === "web") {
      let imgUri = result.uri;
      // console.log(result, "picker");
      //upload to firestorage
      const base64code = result.base64;
      // console.log("base64", base64code);
      await uploadBase64Code(base64code);
    } else {
      //ios
      let uri = result.uri;
      // console.log(uri);

      //convert to blob file
      const blobfile = await convertToBlob(uri);
      // console.log(blobfile);
      //upload file
      await uploadFileBlob(blobfile);
    }
  };

  const convertToBlob = async (uri) => {
    const convert = await new Promise((resolve, reject) => {
      let xmlRequest = new XMLHttpRequest();
      xmlRequest.onload = function () {
        resolve(xmlRequest.response);
      };
      xmlRequest.onerror = function () {
        console.log("error here");
      };
      xmlRequest.responseType = "blob";
      xmlRequest.open("GET", uri, true);
      xmlRequest.send(null);
    });
    return convert;
  };
  const uploadFileBlob = async (blobfile) => {
    let imgname = "img-ios-" + new Date().getTime();
    // console.log(imgname);
    let fullname = `images\\${imgname}.jpg`;
    // console.log(fullname);
    let storage = getStorage();
    let storageref = ref(storage, `images/${imgname}.jpg`);
    // console.log("storageref", storageref);

    let metadata = {
      contentType: "image/jpeg",
    };
    const uploadTask = uploadBytesResumable(storageref, blobfile, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // console.log("tai hinh tai day", downloadURL);
          setSelectedImage({ localUri: downloadURL });
          setState({ ...state, IMG: downloadURL });
        });
      }
    );
  };
  const uploadBase64Code = async (base64code) => {
    let imgName = "binbin-" + new Date().getTime();
    const storage = getStorage();
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageref = ref(storage, `img/${imgName}.jpg`);
    // console.log("uploading file", imgName);

    uploadString(storageref, base64code, "base64", metadata).then(
      (snapshot) => {
        // console.log("upload done bro");
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          // console.log("tai hinh tai day", downloadURL);
          setSelectedImage({ localUri: downloadURL });
          setState({ ...state, IMG: downloadURL });
        });
      }
    );
  };

  const modalForm = () => {
    return <Modal
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
            <Icon name="cancel" size={40} color={"#FFFF"} />
          </Pressable>

          <ScrollView
            style={{ backgroundColor: "#FFFF", marginTop: 20, height: 600 }}
          >
            <View style={{ alignItems: "center", marginTop: 0 }}>
              <Image
                style={{ width: "50%", height: 150, borderRadius: 100 }}
                source={{ uri: selectedImage.localUri }}
              ></Image>
              <TouchableOpacity onPress={openImage} style={{ marginTop: 15 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#79CDCD" }}>
                  Choose Image
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomLeftRadius: 1,
                borderBottomEndRadius: 1,
                borderBottomColor: "grey",
                borderRadius: 2,
                width: "90%",
                marginLeft: 20,
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 15, color: "#000", paddingTop: 8 }}>
                Name:
              </Text>
              <TextInput
                placeholder="Name"
                onChangeText={(value) => {
                  setState({ ...state, Name: value });
                }}
                value={state.Name}
                style={{
                  paddingLeft: 60,
                  fontSize: 15,
                  color: "#000",
                  width: 200,
                  height: 40,
                  borderRadius: 5,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomLeftRadius: 1,
                borderBottomEndRadius: 1,
                borderBottomColor: "grey",
                borderRadius: 2,
                width: "90%",
                marginLeft: 20,
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 15, color: "#000", paddingTop: 8 }}>
                Price:
              </Text>
              <TextInput
                onChangeText={(value) => {
                  setState({ ...state, Price: value });
                }}
                value={state.Price}
                style={{
                  paddingLeft: 40,
                  fontSize: 15,
                  color: "#000",
                  width: 200,
                  height: 40,
                  borderRadius: 5,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomLeftRadius: 1,
                borderBottomEndRadius: 1,
                borderBottomColor: "grey",
                borderRadius: 2,
                width: "90%",
                marginLeft: 20,
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 15, color: "#000", paddingTop: 8 }}>
                Description:
              </Text>
              <TextInput
                onChangeText={(value) => {
                  setState({ ...state, Description: value });
                }}
                value={state.Description}
                style={{
                  paddingLeft: 15,
                  fontSize: 15,
                  color: "#000",
                  width: 200,
                  height: 40,
                  borderRadius: 5,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomLeftRadius: 1,
                borderBottomEndRadius: 1,
                borderBottomColor: "grey",
                borderRadius: 2,
                width: "90%",
                marginLeft: 20,
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 15, color: "#000", paddingTop: 8 }}>
                Type:
              </Text>
              <TextInput
                onChangeText={(value) => {
                  setState({ ...state, Type: value });
                }}
                value={state.Type}
                style={{
                  paddingLeft: 35,
                  fontSize: 15,
                  color: "#000",
                  width: 200,
                  height: 40,
                  borderRadius: 5,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomLeftRadius: 1,
                borderBottomEndRadius: 1,
                borderBottomColor: "grey",
                borderRadius: 2,
                width: "90%",
                marginLeft: 20,
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 15, color: "#000", paddingTop: 8 }}>
                Rate:
              </Text>
              <TextInput
                onChangeText={(value) => {
                  setState({ ...state, Rate: value });
                }}
                value={state.Rate}
                style={{
                  paddingLeft: 60,
                  fontSize: 15,
                  color: "#000",
                  width: 200,
                  height: 40,
                  borderRadius: 5,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomLeftRadius: 1,
                borderBottomEndRadius: 1,
                borderBottomColor: "grey",
                borderRadius: 2,
                width: "90%",
                marginLeft: 20,
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 15, color: "#000", paddingTop: 8 }}>
                Status:
              </Text>
              <TextInput
                onChangeText={(value) => {
                  setState({ ...state, Status: value });
                }}
                value={state.Status}
                style={{
                  paddingLeft: 60,
                  fontSize: 15,
                  color: "#000",
                  width: 200,
                  height: 40,
                  borderRadius: 5,
                }}
              />
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              if (state.Description===""||state.Name===""||state.Status===""||state.Price===""||state.Type==="") {
                Alert.alert("Fail!","thông tin chưa được nhập vui lòng điền đầy đủ thông tin")
              }else{
                console.log(state, "post");
                dispatch(PostMenuAction(route.params.id,state))
                setModalVisible(!modalVisible);
              }
             
            }}
            style={{
              width: 150,
              height: 50,
              backgroundColor: "red",
              borderRadius: 5,
              marginLeft: 80,
            }}
          >
            <Text
              style={{
                color: "#FFFF",
                fontWeight: "bold",
                textAlign: "center",
                paddingTop: 15,
              }}
            >
              ADD DISH
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  }

  return (
    <ImageBackground
      source={{
        uri: "https://tse3.mm.bing.net/th?id=OIP.h0s6Tbuh-iO9Ao0zI5Pb5QHaH7&pid=Api&P=0",
      }}
      style={{ width: "100%", height: "55%" }}
      resizeMode="stretch"
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
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.brand}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "grey",
            textAlign: "center",
            paddingTop: 6,
          }}
        >
          ADD DISH
        </Text>
      </TouchableOpacity>

      <View>{modalForm()}</View>

      <View style={{ marginTop: 20, backgroundColor: "#FFFF" }}>
        <ScrollView style={{ height: 580 }}>
          {db.GetMenu.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  padding: 10,
                  borderBottomWidth: 1,
                }}
              >
                <View>
                  <Image
                    style={{ width: 130, height: 130, borderRadius: 5 }}
                    source={{ uri: item.IMG }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      paddingLeft: 10,
                      width: "100%",
                      fontWeight: "bold",
                      color: "red",
                      width: 230,
                      fontSize: 15,
                    }}
                  >
                    {item.Name}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      width: "100%",
                      color: "#1C1C1C",
                      width: 230,
                      fontSize: 12,
                      paddingTop: 10,
                    }}
                  >
                    Price: {item.Price}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      paddingTop: 10,
                      width: "100%",
                      color: "#1C1C1C",
                      width: 230,
                      fontSize: 12,
                    }}
                  >
                    Type: {item.Type}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      paddingTop: 10,
                      width: "100%",
                      color: "#1C1C1C",
                      width: 230,
                      fontSize: 12,
                    }}
                  >
                    Status: {item.Status}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        backgroundColor: "#086d6d",
                        borderColor: "#086d6d",
                        width: 120,
                        height: 35,
                        borderRadius: 4,
                        marginLeft: 13,
                        marginTop: 20,
                        paddingTop: 8,
                      }}
                    >
                      <Text
                        onPress={() => {
                          navigation.navigate("DishDetails", {
                            ID:route.params.id,
                            id: item.id,
                            Description: item.Description,
                            Name: item.Name,
                            Status: item.Status,
                            IMG: item.IMG,
                            Rate: item.Rate,
                            Price: item.Price,
                            Type: item.Type,
                          });
                        }}
                        style={{
                          color: "#FFFF",
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: 13,
                        }}
                      >
                        Get Detail
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        backgroundColor: "red",
                        borderColor: "red",
                        width: 80,
                        height: 35,
                        borderRadius: 4,
                        marginLeft: 13,
                        marginTop: 20,
                        paddingTop: 2,
                      }}
                      onPress={() => {
                        dispatch(DeleteMenuAction(route.params.id,item.id,item));
                        dispatch(GetBrandAction());
                      }}
                    >
                      <Icon name="cancel" size={30} color={"#FFFF"} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  brand: {
    width: "50%",
    height: 35,
    backgroundColor: "whitesmoke",
    borderRadius: 5,
    marginLeft: 20,
    marginTop: 123,
  },
  modalView: {
    marginTop: 180,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 630,
  },
  button: {
    borderRadius: 50,
    elevation: 2,
    width: 40,
    height: 40,
    marginTop: -15,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "grey",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
