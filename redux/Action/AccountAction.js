import { Alert } from "react-native";
import { DOMAIN } from "../../Util/config";
import { RgisterAdminTypes, RgisterTypes, SiginTypes,AccountTypes, PutAccount, DeleteAccount, PostAccount } from "../types/AccountTypes";

export const GetAccountAction = () => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch(`${DOMAIN}/api/get/Account`);
        const Result = await response.json();
        dispatch(AccountTypes(Result));
        console.log(Result, "123");
      } catch (error) {
        console.log(error, "500");
      }
    };
    getData();
  };
};

export const RegisterAction = (values) => {
  return (dispatch) => {
    const PostData = async () => {
      try {
        await fetch(`${DOMAIN}/api/dktaikhoan`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        Alert.alert("Đăng ký tài khoản thành công");
      } catch (error) {
        console.log(error, "500");
        Alert.alert("Đăng ký tài khoản  thất bại");
      }
    };
    PostData();
    dispatch(RgisterTypes(values));
  };
};

export const SigninAction = (values) => {
  return (dispatch) => {
    const PostData = async () => {
      try {
        await fetch(`${DOMAIN}/api/dangnhap`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        Alert.alert("Đăng nhập tài khoản thành công");
      } catch (error) {
        console.log(error, "500");
        Alert.alert("Đăng nhập tài khoản  thất bại");
      }
    };
    PostData();
    dispatch(SiginTypes(values));
  };
};

export const RegisterAdminAction = (values) => {
  return (dispatch) => {
    const PostData = async () => {
      try {
        await fetch(`${DOMAIN}/api/taikhoanAdmin`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        Alert.alert("Đăng ký tài khoản thành công");
      } catch (error) {
        console.log(error, "500");
        Alert.alert("Đăng ký tài khoản  thất bại");
      }
    };
    PostData();
    dispatch(RgisterAdminTypes(values));
  };
};


export const DeleteAccountAction = (id,Account) => {
  return (dispatch) => {
    const DeleteData = async () => {
      try {
        await fetch(`${DOMAIN}/api/deleteAccount/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Account),
        });
      
        Alert.alert("Xóa thành công");
      } catch (error) {
        console.log(error, "500");
        Alert.alert("Xóa  thất bại");
      }
    };
    DeleteData();
    dispatch(DeleteAccount(id,Account))
    dispatch(GetAccountAction())
  };
};

export const PutAcconutAction = (id,Account) => {
  return (dispatch) => {
    const PUtData = async () => {
      try {
        await fetch(`${DOMAIN}/api/Put/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Account),
        });
      
        Alert.alert("Cập Nhật thành công");
      } catch (error) {
        console.log(error, "500");
        Alert.alert("Cập Nhật thất bại");
      }
    };
    PUtData();
    dispatch(PutAccount(id,Account))
    dispatch(GetAccountAction())
  };
};

export const PostAccountAction = (Account) => {
  return (dispatch) => {
    const PostData = async () => {
      try {
        await fetch(`${DOMAIN}/api/taikhoanAdmin`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Account),
        });
      
        Alert.alert("thêm thành công");
      } catch (error) {
        console.log(error, "500");
        Alert.alert("thêm thất bại");
      }
    };
    PostData();
    dispatch(PostAccount(Account))
    dispatch(GetAccountAction())
  };
};