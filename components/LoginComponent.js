import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAccountAction, SigninAction } from "../redux/Action/AccountAction";
import { Alert } from "react-native";
import { useEffect } from "react";

export default function LoginComponent({ navigation, route }) {
  const [state, setState] = useState([]);
  const [showpass, setShowPass] = useState(true);
  const [sigin, setSigin] = useState({
    Email: "",
    Password: "",
  });
  const dispatch = useDispatch();
  const db = useSelector((state) => state.RegisterReducer);
  useEffect(() => {
    dispatch(GetAccountAction())
    setState(db.Register);
  }, []);


  return (
    <ImageBackground
      style={{ height: "100%", width: "100%" }}
      source={{
        uri: "https://i.pinimg.com/originals/c2/df/53/c2df53fc3d89e878c6a66ada7208b1f2.jpg",
      }}
      resizeMode={"stretch"}
    >
      <View style={styles.Login} resizeMode={"contain"}>
        <View style={styles.form}>
          {/* header */}
          <View style={{ marginBottom: 50 }}>
            <Text
              style={{
                color: "#FFFF",
                fontWeight: "bold",
                fontSize: 40,
                color: "#33FF99",
                textAlign: "center",
              }}
            >
              FOOD APP
            </Text>
            <Text
              style={{
                color: "#FFFF",
                fontWeight: "bold",
                fontSize: 20,
                color: "#FFFF",
                textAlign: "center",
              }}
            >
              Please Login
            </Text>
          </View>

          <View style={{ paddingLeft: 30, marginBottom: 30, marginLeft: 5 }}>
            {/* email */}
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderEndWidth: 2,
                borderBottomColor: "#FFFF",
                borderRadius: 5,
                width: "92%",
              }}
            >
              <Icon
                name="envelope"
                type="font-awesome"
                size={20}
                color={"#FFFF"}
                style={{ paddingTop: 8, paddingLeft: 15 }}
              />
              <TextInput
                placeholder="Email"
                onChangeText={(value) => {
                  console.log(sigin, "text");
                  setSigin({ ...sigin, Email: value });
                }}
                value={sigin.Email}
                style={styles.input1}
              />
            </View>
          </View>
          {/* pass */}
          <View
            style={{
              marginBottom: 30,
              flexDirection: "row",
              justifyContent: "space-around",
              borderBottomWidth: 1,
              borderEndWidth: 2,
              borderBottomColor: "#FFFF",
              borderRadius: 5,
              width: "83%",
              marginLeft: 40,
            }}
          >
            <View>
              <Icon
                name="lock"
                type="font-awesome"
                size={25}
                color={"#FFFF"}
                style={{ paddingTop: 6 }}
              />
            </View>
            {/* pass word */}
            <View>
              {showpass ? (
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => {
                    setShowPass(false);
                  }}
                >
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={(value) => {
                      setSigin({ ...sigin, Password: value });
                      console.log(sigin, "text");
                    }}
                    value={sigin.Password}
                  />
                  <Icon
                    name="eye-slash"
                    type="font-awesome"
                    size={25}
                    color={"#FFFF"}
                    style={{ paddingTop: 6, paddingRight: 15 }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => {
                    setShowPass(true);
                  }}
                >
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={false}
                    style={styles.input}
                    onChangeText={(value) => {
                      console.log(sigin, "passs");
                      setSigin({ ...sigin, Password: value });
                    }}
                    value={sigin.Password}
                  />
                  <Icon
                    name="eye"
                    type="font-awesome"
                    size={25}
                    color={"#FFFF"}
                    style={{ paddingTop: 6, paddingRight: 15 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* chuyển trang register */}
          <View>
            <Text style={{ color: "#FFFF", fontSize: 12, textAlign: "center" }}>
              If you do not have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
              style={{
                color: "#FFFF",
                fontSize: 12,
                textAlign: "center",
                borderBottomWidth: 1,
                borderBottomColor: "green",
                width: "30%",
                marginLeft: 140,
              }}
            >
              <Text
                style={{
                  color: "#FFFF",
                  fontSize: 12,
                  textAlign: "center",
                  fontWeight: "bold",
                  paddingTop: 10,
                }}
              >
                {" "}
                click Register
              </Text>
            </TouchableOpacity>
          </View>
          {/* btn đăng nhập */}
          <TouchableOpacity
            style={styles.btnlogin}
            onPress={async () => {
              let Email = db.Register.find((item) => item.Email === sigin.Email)
              let Admin = db.Register.find((item) => item.Type === sigin.Email && item.Type === "Admin")
              let Password = db.Register.find((item) => item.Password === sigin.Password)
              if (sigin.Email === "" || sigin.Password === "") {
                Alert.alert("Fail!", "Email or password cannot be left blank");
              }
              else if (Email && Password) {
                dispatch(SigninAction(sigin));
                navigation.navigate("Home", { Email: sigin.Email, Type: Admin });
              } else if (!Email || !Password) {
                Alert.alert("Fail!", "Email or password is incorrect")
              }
            }}
          >
            <Text
              style={{
                color: "orange",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  Login: {
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,
    shadowOpacity: 0.8,
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    // marginTop:190,
    // marginLeft:20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "black",
  },
  input1: {
    width: 200,
    height: 40,
    borderRadius: 5,
    color: "white",
    paddingLeft: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderRadius: 5,
    color: "white",
    paddingLeft: 0,
    paddingRight: 30,
  },
  form: {
    backgroundColor: "black",
    width: "100%",
    height: 500,
    justifyContent: "center",
  },
  btnlogin: {
    marginLeft: 100,
    width: "50%",
    height: 50,
    backgroundColor: "#33FF99",
    marginTop: 30,
    paddingTop: 15,
    borderRadius: 5,
  },
});
