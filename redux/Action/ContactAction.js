import { Alert } from "react-native";
import { DOMAIN } from "../../Util/config";
import {
  DeleteContactTypes,
  DeleteContatct,
  GetContact,
  PostContact,
} from "../types/ContactTypes";

export const GetContactAction = () => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch(`${DOMAIN}/api/get/Contact`);
        const Result = await response.json();
        dispatch(GetContact(Result));
        console.log(Result, "123");
      } catch (error) {
        console.log(error, "500");
      }
    };
    getData();
  };
};

export const PostContactAction = (discount) => {
  return (dispatch) => {
    const PostData = async () => {
      try {
        await fetch(`${DOMAIN}/api/create-Contact`, {
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
    dispatch(PostContact(discount));
    dispatch(GetContactAction());
  };
};

export const DeleteContactAction = (id, contact) => {
  return (dispatch) => {
    const DeleteData = async () => {
      try {
        await fetch(`${DOMAIN}/api/delete-Contact/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        });

        Alert.alert("Xoa thành công");
      } catch (error) {
        console.log(error, "500");
        Alert.alert("Xóa thất bại");
      }
    };
    DeleteData();
    dispatch(DeleteContactTypes(id, contact));
    dispatch(GetContactAction());
  };
};
