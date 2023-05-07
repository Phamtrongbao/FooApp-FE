import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  GetAccountAction,
  RegisterAction,
} from "../redux/Action/AccountAction";
import { set } from "date-fns";
import { useEffect } from "react";

export default function RegisterComponent({ navigation }) {
  const db = useSelector((state) => state.RegisterReducer);
  // console.log(db.Register, "dk");
  const [state, setState] = useState([]);
  const [regis, setRegis] = useState({
    Name: "",
    Address: "",
    Password: "",
    PhoneNumber: "",
    Email: "",
    Gender: "",
    IMG: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7nFdX1g_CVR4WyP5LgKOGytP0J8PE53_RQ&usqp=CAU",
  });

  const [isvalid, setIsvalid] = useState(true);
  const [namevalid, setNamevalid] = useState(true);
  const [passvalid, setPassvalid] = useState(true);
  const [addressvalid, setAddressvalid] = useState(true);
  const [phonevalid, setPhonevalid] = useState(true);
  const [gendervalid, setGendervalid] = useState(true);
  const [submit, setSubmit] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAccountAction());
    setState(db.Register);
  }, []);

  //btn register
  const RegisterHandle = async () => {
    let Email = db.Register.find((item) => item.Email === regis.Email);
    let Pass = db.Register.find((item) => item.Password === regis.Password);
    console.log(regis, "dk btn");
    if (
      regis.Address === "" ||
      regis.Email === "" ||
      regis.Name === "" ||
      regis.Password === "" ||
      regis.Gender === "" ||
      regis.PhoneNumber === ""
    ) {
      return Alert.alert("Fail!", "Invalid login information");
    } else if (Email) {
      Alert.alert("Fail!", "Email already exists");
    } else if (Pass) {
      Alert.alert("Fail!", "Password already exists");
    } else {
      dispatch(RegisterAction(regis));
      await navigation.navigate("login");
    }
  };

  //check validate
  const verifyName = (name) => {
    let regax = new RegExp(
      /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/
    );
    if (regax.test(name)) {
      return true;
    } else {
      return false;
    }
  };
  const verifyEmail = (Email) => {
    let regax = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (regax.test(Email)) {
      return true;
    } else {
      return false;
    }
  };
  const verifyPass = (pass) => {
    let regax = new RegExp(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/
    );
    if (regax.test(pass)) {
      return true;
    } else {
      return false;
    }
  };
  const verifyAddress = (address) => {
    let regax = new RegExp(
      /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/
    );

    if (regax.test(address)) {
      return true;
    } else {
      return false;
    }
  };
  const verifyPhone = (phone) => {
    let regax = new RegExp(/^[0-9]+$/);
    if (regax.test(phone)) {
      return true;
    } else {
      return false;
    }
  };
  const verifyGender = (gender) => {
    let regax = new RegExp(
      /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/
    );
    if (regax.test(gender)) {
      return true;
    } else {
      return false;
    }
  };

  //end validate
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
          <View style={{ marginBottom: 30, marginTop: 20 }}>
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
                fontSize: 15,
                color: "#FFFF",
                textAlign: "center",
              }}
            >
              REGISTER
            </Text>
          </View>
          <ScrollView>
            <View style={{ paddingLeft: 40, marginBottom: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderEndWidth: 2,
                  borderBottomColor: "#FFFF",
                  borderRadius: 5,
                  width: "90%",
                }}
              >
                <Icon
                  name="id-card"
                  type="font-awesome"
                  size={20}
                  color={"#FFFF"}
                  style={{ paddingTop: 8 }}
                />
                <TextInput
                  onChangeText={(value) => {
                    console.log(regis, "text regis");
                    setRegis({ ...regis, Name: value });
                    const isValid = verifyName(value);
                    isValid ? setNamevalid(true) : setNamevalid(false);
                  }}
                  value={regis.Name}
                  placeholder="Name"
                  style={styles.input}
                />
              </View>
              <Text style={{ padding: 10, color: "red", fontSize: 15 }}>
                {namevalid ? "" : "Name is valid"}
              </Text>
            </View>
            <View style={{ paddingLeft: 40, marginBottom: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderEndWidth: 2,
                  borderBottomColor: "#FFFF",
                  borderRadius: 5,
                  width: "90%",
                }}
              >
                <Icon
                  name="envelope"
                  type="font-awesome"
                  size={20}
                  color={"#FFFF"}
                  style={{ paddingTop: 8 }}
                />
                <TextInput
                  onChangeText={(value) => {
                    console.log(regis, "text regis");
                    setRegis({ ...regis, Email: value });
                    const isValid = verifyEmail(value);
                    isValid ? setIsvalid(true) : setIsvalid(false);
                  }}
                  value={regis.Email}
                  placeholder="Email"
                  style={styles.input}
                />
              </View>
              <Text style={{ padding: 10, color: "red", fontSize: 15 }}>
                {isvalid ? "" : "Email is not the correct format"}
              </Text>
            </View>
            <View style={{ paddingLeft: 40, marginBottom: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderEndWidth: 2,
                  borderBottomColor: "#FFFF",
                  borderRadius: 5,
                  width: "90%",
                }}
              >
                <Icon
                  name="lock"
                  type="font-awesome"
                  size={25}
                  color={"#FFFF"}
                  style={{ paddingTop: 6 }}
                />
                <TextInput
                  onChangeText={(value) => {
                    console.log(regis, "text regis");
                    setRegis({ ...regis, Password: value });
                    const isValid = verifyPass(value);
                    isValid ? setPassvalid(true) : setPassvalid(false);
                  }}
                  value={regis.Password}
                  placeholder="Password"
                  style={styles.input}
                />
              </View>
              <Text style={{ padding: 10, color: "red", fontSize: 15 }}>
                {passvalid
                  ? ""
                  : "Pass must have 1 capital printed with 1 special characters at least 6 characters and not exceed 12 characters"}
              </Text>
            </View>
            <View style={{ paddingLeft: 40, marginBottom: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderEndWidth: 2,
                  borderBottomColor: "#FFFF",
                  borderRadius: 5,
                  width: "90%",
                }}
              >
                <Icon
                  name="address-book"
                  type="font-awesome"
                  size={25}
                  color={"#FFFF"}
                  style={{ paddingTop: 6 }}
                />
                <TextInput
                  onChangeText={(value) => {
                    console.log(regis, "text regis");
                    setRegis({ ...regis, Address: value });
                    const isValid = verifyAddress(value);
                    isValid ? setAddressvalid(true) : setAddressvalid(false);
                  }}
                  value={regis.Address}
                  placeholder="Address"
                  style={styles.input}
                />
              </View>
              <Text style={{ padding: 10, color: "red", fontSize: 15 }}>
                {addressvalid ? "" : "Address is valid"}
              </Text>
            </View>
            <View style={{ paddingLeft: 40, marginBottom: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderEndWidth: 2,
                  borderBottomColor: "#FFFF",
                  borderRadius: 5,
                  width: "90%",
                }}
              >
                <Icon
                  name="phone"
                  type="font-awesome"
                  size={25}
                  color={"#FFFF"}
                  style={{ paddingTop: 6 }}
                />
                <TextInput
                  onChangeText={(value) => {
                    console.log(regis, "text regis");
                    setRegis({ ...regis, PhoneNumber: value });
                    const isValid = verifyPhone(value);
                    isValid ? setPhonevalid(true) : setPhonevalid(false);
                  }}
                  value={regis.PhoneNumber}
                  keyboardType="numeric"
                  placeholder="PhoneNumber"
                  style={styles.input}
                />
              </View>
              <Text style={{ padding: 10, color: "red", fontSize: 15 }}>
                {phonevalid ? "" : "Phonenumber is valid"}
              </Text>
            </View>
            <View style={{ paddingLeft: 40, marginBottom: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderEndWidth: 2,
                  borderBottomColor: "#FFFF",
                  borderRadius: 5,
                  width: "90%",
                }}
              >
                <Icon
                  name="venus-mars"
                  type="font-awesome"
                  size={25}
                  color={"#FFFF"}
                  style={{ paddingTop: 6 }}
                />
                <TextInput
                  onChangeText={(value) => {
                    console.log(regis, "text regis");
                    setRegis({ ...regis, Gender: value });
                    const isValid = verifyGender(value);
                    isValid ? setGendervalid(true) : setGendervalid(false);
                  }}
                  value={regis.Gender}
                  placeholder="Gender"
                  style={styles.input}
                />
              </View>
              <Text style={{ padding: 10, color: "red", fontSize: 15 }}>
                {gendervalid ? "" : "Gender is valid"}
              </Text>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.btnlogin} onPress={RegisterHandle}>
            <Text
              style={{
                color: "orange",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              REGISTER
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
  input: {
    width: 200,
    height: 40,
    borderRadius: 5,
    color: "white",
    paddingLeft: 15,
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
  btnlogin1: {
    marginLeft: 100,
    width: "50%",
    height: 50,
    backgroundColor: "#fff",
    marginTop: 30,
    paddingTop: 15,
    borderRadius: 5,
  },
});
