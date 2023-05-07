import { GET_DISCOUNT } from "../types/DiscountTypes";
import {
  DELETE_BRAND,
  DELETE_MENU,
  GET_BLOG,
  GET_BRAND,
  GET_FEEDBACK_BRAND,
  GET_FEEDBACK_DISH,
  GET_MENU,
  POST_BRAND,
  POST_MENU,
  PUT_BRAND,
  PUT_MENU,
} from "../types/GetBrandType";

const StafeDefault = {
  Getbrand: [],
  GetMenu: [],
  FeedBackBrand: [],
  FeedBackDish: [],
  Blog: [],
  Discount: [],
};

export const GetBrandReducer = (state = StafeDefault, action) => {
  switch (action.type) {
    //brand get post put delete
    case GET_BRAND: {
      return { ...state, Getbrand: [...action.payload] };
    }
    case PUT_BRAND: {
      return { ...state };
    }
    case POST_BRAND: {
      return { ...state, Getbrand: [...state.Getbrand, action.payload] };
    }
    case DELETE_BRAND: {
      return {
        ...state,
        Getbrand: [...state.Getbrand, action.payload.id, action.payload.values],
      };
    }
    //end brand get post put delete

    //menu
    case GET_MENU: {
      return { ...state, GetMenu: [...action.payload] };
    }
    case POST_MENU: {
      return {
        ...state,
        GetMenu: [...state.GetMenu, action.payload.id, action.payload.values],
      };
    }
    case PUT_MENU: {
      console.log(action.payload, "put menu");
      return {
        ...state,
      };
    }
    case DELETE_MENU: {
      console.log(action.payload, "put menu");
      return {
        ...state,
      };
    }
    ///end menu

    //feedback
    case GET_FEEDBACK_BRAND: {
      console.log("get", action.payload);
      return { ...state, FeedBackBrand: [...action.payload] };
    }
    case GET_FEEDBACK_DISH: {
      console.log("get", action.payload);
      return { ...state, FeedBackDish: [...action.payload] };
    }
    case GET_BLOG: {
      console.log("get", action.payload);
      return { ...state, Blog: [...action.payload] };
    }
    case GET_DISCOUNT: {
      console.log("discount", action.payload);
      return { ...state, Discount: [...action.payload] };
    }

    default:
      return { ...state };
  }
};
