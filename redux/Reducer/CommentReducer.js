import { POST_FEEDBACK_BRAND, POST_FEEDBACK_DISH } from "../types/CommentTypes";
import { GET_FEEDBACK_DISH } from "../types/GetBrandType";

const StafeDefault = {
  PostFeedBackDish: [],
  PostFeedBackBrand: [],
};

export const CommentReducer = (state = StafeDefault, action) => {
  switch (action.type) {
    case POST_FEEDBACK_DISH: {
      console.log("Post_FEEDBACK_DISH", action.payload);
      return { ...state, PostFeedBackDish: [...state.PostFeedBackDish,action.payload.id,action.payload.value] };
    }
    case POST_FEEDBACK_BRAND: {
      console.log("Post_FEEDBACK_Brand", action.payload);
      return { ...state, PostFeedBackBrand: [...state.PostFeedBackBrand,action.payload] };
    }
    default:
      return { ...state };
  }
};
