import { Alert } from "react-native";
import { DOMAIN } from "../../Util/config";
import { DeleteDiscount, PostDiscount, PutDiscount } from "../types/DiscountTypes";
import { GetDiscountAction } from "./GetBrandAction";

export const PostDisconutAction = (discount) => {
    return (dispatch) => {
      const PostData = async () => {
        try {
          await fetch(`${DOMAIN}/api/CreateDiscount`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(discount),
          });
        
          Alert.alert("thêm thành công");
        } catch (error) {
          console.log(error, "500");
          Alert.alert("thêm thất bại");
        }
      };
      PostData();
      dispatch(PostDiscount(discount))
      dispatch(GetDiscountAction())
    };
  };

  export const PutDisconutAction = (id,discount) => {
    return (dispatch) => {
      const PUtData = async () => {
        try {
          await fetch(`${DOMAIN}/api/UpdateDiscount/${id}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(discount),
          });
        
          Alert.alert("Cập Nhật thành công");
        } catch (error) {
          console.log(error, "500");
          Alert.alert("Cập Nhật thất bại");
        }
      };
      PUtData();
      dispatch(PutDiscount(id,discount))
      dispatch(GetDiscountAction())
    };
  };

  export const DeleteDisconutAction = (id,discount) => {
    return (dispatch) => {
      const DeleteData = async () => {
        try {
          await fetch(`${DOMAIN}/api/delete-Discount/${id}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(discount),
          });
        
          Alert.alert("Xóa thành công");
        } catch (error) {
          console.log(error, "500");
          Alert.alert("Xóa thất bại");
        }
      };
      DeleteData();
      dispatch(DeleteDiscount(id,discount))
      dispatch(GetDiscountAction())
    };
  };