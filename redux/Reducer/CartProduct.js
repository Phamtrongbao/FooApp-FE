import {
  CART,
  Discount,
  REMOVE_CART,
  REMOVE_Discount,
} from "../types/CartTypes";

const StafeDefault = {
  Cart: [],
  Discount: [],
};

export const CartReducer = (state = StafeDefault, action) => {
  switch (action.type) {
    case CART: {
      let dsupdate = [...state.Cart];

      let index = dsupdate.findIndex((item) => item.id === action.payload.id);
      if (index) {
        dsupdate.push(action.payload);
      }
      state.Cart = dsupdate;
      return { ...state };
    }

    case REMOVE_CART: {
      let dsupdate = [...state.Cart];
      let index = dsupdate.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        dsupdate.splice(index, 1);
      }
      state.Cart = dsupdate;
      return { ...state };
    }

    case Discount: {
      let dsupdate = [...state.Discount];

      let index = dsupdate.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        dsupdate.splice(index, 1);
      }else{
        dsupdate.push(action.payload);
      }
      state.Discount = dsupdate;
      return { ...state };
    }

    case REMOVE_Discount: {
      let dsupdate = [...state.Discount];
      let index = dsupdate.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        dsupdate.splice(index, 1);
      }
      state.Discount = dsupdate;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
