import { GET_INVOICE, POST_INVOICE } from "../types/InvoiceTypes";

const StafeDefault = {
  Postinvoice: [],
  GetInvoice: [],
};

export const PostInvoiceReducer = (state = StafeDefault, action) => {
  switch (action.type) {
    case POST_INVOICE: {
      console.log("Post_hoadon", action.payload);
      return { ...state, Postinvoice: [...state.Postinvoice, action.payload] };
    }
    case GET_INVOICE: {
      console.log("GET_hoadon", action.payload);
      return { ...state, GetInvoice: [...action.payload] };
    }

    default:
      return { ...state };
  }
};
