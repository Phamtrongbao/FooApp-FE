import { combineReducers, createStore, applyMiddleware } from "redux";

// import { combineReducers, createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { GetBrandReducer } from "../Reducer/GetBrandReducer.js";
import { CommentReducer } from "../Reducer/CommentReducer.js";
import { CartReducer } from "../Reducer/CartProduct.js";
import { PostInvoiceReducer } from "../Reducer/PostInvoice.js";
import { RegisterReducer } from "../Reducer/RegisterReducer.js";
import { DiscountReducer } from "../Reducer/DiscountReducer.js"; 
import { ContactReducer } from "../Reducer/ContatctReducer.js";
import { SupplierReducer } from "../Reducer/SupplierReduce.js";
const RootReducer = combineReducers({
  GetBrandReducer,
  CommentReducer,
  CartReducer,
  PostInvoiceReducer,
    RegisterReducer,
    DiscountReducer,
    ContactReducer,
    SupplierReducer

});

export const store = createStore(RootReducer, applyMiddleware(thunk));
