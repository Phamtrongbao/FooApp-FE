import { Alert } from "react-native";
import { DOMAIN } from "../../Util/config";
import { GetSupplier, PostSupplier } from "../types/Supplier";

export const GetSupplierAction = () => {
    return (dispatch) => {
      const getData = async () => {
        try {
          const response = await fetch(`${DOMAIN}/api/get/Supplier`);
          const Result = await response.json();
          dispatch(GetSupplier(Result));
          console.log(Result, "123");
        } catch (error) {
          console.log(error, "500");
        }
      };
      getData();
    };
  };


  export const PostSupplierAction = (values) => {
    return (dispatch) => {
      const PostData = async () => {
        try {
          await fetch(`${DOMAIN}/api/add-Supplier`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
        
          Alert.alert("Success!","Xác Nhận Thanh Toán");
        } catch (error) {
          console.log(error, "500");
          Alert.alert("Fail!","Thanh Toán Thất Bại");
        }
      };
      PostData();
      dispatch(PostSupplier(values));
    };
  };
  