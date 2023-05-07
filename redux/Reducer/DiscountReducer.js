import { DELETE_DISCOUNT, POST_DISCOUNT, PUT_DISCOUNT } from "../types/DiscountTypes";

const StafeDefault = {
  Discount: [],
};

export const DiscountReducer = (state = StafeDefault, action) => {
  switch (action.type) {
    case POST_DISCOUNT: {
      return { ...state, Discount: [...state.Discount, action.payload] };
    }
    case PUT_DISCOUNT: {
        return { ...state, Discount: [...state.Discount, action.payload] };
      }
      case DELETE_DISCOUNT: {
        return { ...state, Discount: [...state.Discount, action.payload.id,action.payload.discount] };
      }
    default:
      return { ...state };
  }
};
