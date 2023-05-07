import { GET_SUPPLIER, POST_SUPPLIER } from "../types/Supplier";

const StafeDefault = {
  Supplier: [],
};

export const SupplierReducer = (state = StafeDefault, action) => {
  switch (action.type) {
    case GET_SUPPLIER: {
        console.log("discount", action.payload);
        return { ...state, Supplier: [...action.payload] };
      }
      case POST_SUPPLIER: {
        console.log("Post_hoadon", action.payload);
        return { ...state,Supplier: [...state.Supplier, action.payload] };
      }
    default:
      return { ...state };
  }
};
