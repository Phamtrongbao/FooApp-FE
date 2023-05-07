import { DOMAIN } from "../../Util/config";
import { PostFeedBackBrand, PostFeedBackDish } from "../types/CommentTypes";
import {
  GetFeedBackBrandAction,
  GetFeedBackDishAction,
  GetMenuAction,
} from "./GetBrandAction";
import { Alert } from "react-native";
export const PostFeedBackDishAction = (id, dish) => {
  return (dispatch) => {
    const PostData = async () => {
      try {
        await fetch(`${DOMAIN}/api/post/Brand/${id}/FeedbackDish`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dish),
        });
        Alert.alert("Success!","bình luận đã được gửi")
      } catch (error) {
        Alert.alert("Fail!","bình luận thất bại")
        console.log(error, "500");
      }
    };
    PostData();
    dispatch(PostFeedBackDish(id, dish));
    dispatch(GetFeedBackDishAction(id));
  };
};

export const PostFeedBackBrandAction = (id, value) => {
  return (dispatch) => {
    const PostData = async () => {
      try {
        await fetch(`${DOMAIN}/api/add-FeedbackBrand/FeedBackBrand/${id}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });
        Alert.alert("Success!", "Đã Gửi Bình luận");
      } catch (error) {
        Alert.alert("FAIL!", " Gửi Bình luận Thất Bại");
        console.log(error, "500");
      }
    };
    PostData();
    dispatch(PostFeedBackBrand(value));
    dispatch(GetFeedBackBrandAction(id));
  };
};
