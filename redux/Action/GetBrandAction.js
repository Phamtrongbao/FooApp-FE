import { GetDiscount } from "../types/DiscountTypes";
import {
  DeleteBrand,
  DeleteMenu,
  GetBlog,
  GetBrand,
  GetFeedBackBrand,
  GetFeedBackDish,
  GetMeNu,
  PostBrand,
  PostMenu,
  PutBrand,
  PutMenu,
} from "../types/GetBrandType";
import { DOMAIN } from "../../Util/config";
import { Alert } from "react-native";

//brand get post put delete
export const GetBrandAction = () => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch(`${DOMAIN}/api/get/Brand`);
        const Result = await response.json();
        dispatch(GetBrand(Result));
        console.log(Result, "123");
      } catch (error) {
        console.log(error, "500");
      }
    };
    getData();
  };
};

export const PutBrandAction = (id, values) => {
  return (dispatch) => {
    const PutData = async () => {
      try {
        await fetch(`${DOMAIN}/api/Update-Brand/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        Alert.alert("SUCCESS", "Cập nhật thành công");
      } catch (error) {
        console.log(error, "500");
        Alert.alert("FAIL!", "Cập nhật thất bại");
      }
    };
    PutData();
    dispatch(PutBrand(id, values));
    dispatch(GetBrandAction());
  };
};

export const PostBrandAction = (values) => {
  return (dispatch) => {
    const PostData = async () => {
      try {
        await fetch(`${DOMAIN}/api/post/Brand`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        Alert.alert("SUCCESS", "Thêm thành công");
      } catch (error) {
        console.log(error, "500");
        Alert.alert("FAIL!", "Thêm thất bại");
      }
    };
    PostData();
    dispatch(PostBrand(values));
    dispatch(GetBrandAction());
  };
};
export const DeleteBrandAction = (id, values) => {
  return (dispatch) => {
    const DeleteData = async () => {
      try {
        await fetch(`${DOMAIN}/api/delete-Brand/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        Alert.alert("SUCCESS", "Xóa Cửa Hàng thành công");
      } catch (error) {
        console.log(error, "500");
        Alert.alert("FAIL!", "Xóa cửa hàng thất bại");
      }
    };
    DeleteData();
    dispatch(DeleteBrand(id, values));
    dispatch(GetBrandAction());
  };
};
//end brand get post put delete

//menu get post put delete

///menu
export const GetMenuAction = (id) => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch(`${DOMAIN}/api/get/Brand/${id}/Menu`);
        const Result = await response.json();
        dispatch(GetMeNu(Result));
        console.log(Result, "123");
      } catch (error) {
        console.log(error, "500");
      }
    };
    getData();
  };
};

export const PostMenuAction = (id, values) => {
  return (dispatch) => {
    const PostData = async () => {
      try {
        await fetch(`${DOMAIN}/api/post/Brand/${id}/Menu`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        Alert.alert("thêm thành công");
      } catch (error) {
        console.log(error, "500");
        Alert.alert("thêm thất bại");
      }
    };
    PostData();
    dispatch(PostMenu(id, values));
    dispatch(GetMenuAction(id));
  };
};

export const PutMenuAction = (id, code, values) => {
  return (dispatch) => {
    const PUtData = async () => {
      try {
        await fetch(`${DOMAIN}/api/putt/Brand/${id}/Menu/${code}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        Alert.alert("Cập Nhật thành công");
      } catch (error) {
        console.log(error, "500");
        Alert.alert("Cập Nhật thất bại");
      }
    };
    PUtData();
    dispatch(PutMenu(id, code, values));
    dispatch(GetBrandAction());
    dispatch(GetMenuAction(id));
  };
};
export const DeleteMenuAction = (id, code, values) => {
  return (dispatch) => {
    const PUtData = async () => {
      try {
        await fetch(`${DOMAIN}/api/Delete/Brand/${id}/Menu/${code}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        Alert.alert("Xóa thành công");
      } catch (error) {
        console.log(error, "500");
        Alert.alert("Xóa thất bại");
      }
    };
    PUtData();
    dispatch(DeleteMenu(id, code, values));
    dispatch(GetBrandAction());
    dispatch(GetMenuAction(id));
  };
};
////feedback
export const GetFeedBackBrandAction = (id) => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/get/Feedback-Brand/${id}/FeedbackBrand`
        );
        const Result = await response.json();
        dispatch(GetFeedBackBrand(Result));
        console.log(Result, "feedback");
      } catch (error) {
        console.log(error, "500");
      }
    };
    getData();
  };
};

export const GetFeedBackDishAction = (id) => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/get/Brand/${id}/FeedbackDish`
        );
        const Result = await response.json();
        dispatch(GetFeedBackDish(Result));
        console.log(Result, "feedback");
      } catch (error) {
        console.log(error, "500");
      }
    };
    getData();
  };
};

export const GetBlogAction = () => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch(`${DOMAIN}/api/get/Blog`);
        const Result = await response.json();
        dispatch(GetBlog(Result));
        console.log(Result, "blog");
      } catch (error) {
        console.log(error, "500");
      }
    };
    getData();
  };
};

export const GetDiscountAction = () => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch(`${DOMAIN}/api/get/Discount`);
        const discount = await response.json();
        dispatch(GetDiscount(discount));
        console.log(discount, "discount");
      } catch (error) {
        console.log(error, "500");
      }
    };
    getData();
  };
};
