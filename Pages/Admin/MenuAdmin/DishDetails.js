import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { ScrollView } from "react-native";
import { useState } from "react";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../../firebase.config";
import {
  getStorage,
  uploadString,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} from "firebase/storage";
import { useEffect } from "react";
import { GetMenuAction, PutMenuAction } from "../../../redux/Action/GetBrandAction.js";

export default function DishDetails({ navigation, route }) {
  console.log("route dish",route)
  const [data, setData] = useState([]);
  const db = useSelector((state) => state.GetBrandReducer);

  //ảnh ban đầu
  const [selectedImage, setSelectedImage] = useState({
    localUri: route.params.IMG,
  });

  const [state, setState] = useState({
    id: route.params.id,
    Name: route.params.Name,
    Price: route.params.Price,
    IMG: selectedImage.localUri,
    Status: route.params.Status,
    Description: route.params.Description,
    Type: route.params.Type,
    Rate:route.params.Rate
  });
  const dispatch = useDispatch();

  //upload ảnh
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

  useEffect(() => {
    setData(db.Getbrand);
  }, []);
  return (
    <View>
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

      <View style={{ alignItems: "center", marginTop: 50 }}>
        <Image
          style={{ width: "55%", height: 200, borderRadius: 100 }}
          source={{ uri: selectedImage.localUri }}
        ></Image>
        <TouchableOpacity onPress={openImage} style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#79CDCD" }}>
            Choose Image
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ backgroundColor: "#FFFF", marginTop: 20, height: 300 }}
      >
     
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
            url:
          </Text>
          <TextInput
            placeholder="Name"
            value={selectedImage.localUri}
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
              console.log(state, "address");
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
              console.log(state, "address");
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
              console.log(state, "address");
              setState({ ...state, Type: value });
            }}
            value={state.Type}
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
              console.log(state, "address");
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
          console.log(state, "btn cập nhật");
          dispatch(PutMenuAction(route.params.ID, route.params.id, state));
          navigation.navigate("MenuAdminDetails");
          dispatch(GetMenuAction(route.params.ID))
        }}
        style={{
          height: 50,
          width: "50%",
          backgroundColor: "#528B8B",
          marginTop: 20,
          alignItems: "center",
          paddingTop: 15,
          borderRadius: 5,
          marginLeft: 100,
        }}
      >
        <Text
          style={{ color: "#FFFF", fontWeight: "bold", textAlign: "center" }}
        >
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  brand: {
    width: "50%",
    height: 25,
    backgroundColor: "whitesmoke",
    borderRadius: 5,
    marginLeft: 20,
    marginTop: 123,
  },
});
