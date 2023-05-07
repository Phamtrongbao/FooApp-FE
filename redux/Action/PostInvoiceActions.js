import { Alert } from "react-native";
import { DOMAIN } from "../../Util/config";
import { CARTActions } from "../types/CartTypes";
import { GetBrand, GetMeNu } from "../types/GetBrandType";
import { GetInvoice, PostInvoice } from "../types/InvoiceTypes";
import { GetBrandAction, GetMenuAction } from "./GetBrandAction";

export const PostInvoiceAction = (id, values) => {
  return (dispatch) => {
    const PostData = async () => {
      try {
        await fetch(`${DOMAIN}/api/Invoice/InvoiceBrand/${id}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      
        Alert.alert("Đặt Hàng thành công");
      } catch (error) {
        console.log(error, "500");
        Alert.alert("Đặt hàng thất bại");
      }
    };
    PostData();
    dispatch(PostInvoice(values));
    dispatch(GetMenuAction(id));
    dispatch(GetBrandAction())
  };
};

export const GetInvoiceAction = (id) => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch(`${DOMAIN}/api/get/Brand/${id}/Invoice`);
        const Result = await response.json();
        dispatch(GetInvoice(Result));
        console.log(Result, "123");
      } catch (error) {
        console.log(error, "500");
      }
    };
    getData();
  };
};
