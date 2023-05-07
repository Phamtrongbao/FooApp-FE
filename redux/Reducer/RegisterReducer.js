import {
  DELETE_ACCOUNT,
  GET_ACCOUNT,
  POST_ACCOUNT,
  PUT_ACCOUNT,
  REGISTER,
  REGISTER_ADMIN,
  SIGIN,
} from "../types/AccountTypes";
const user = {};
const Regis = [];
const StafeDefault = {
  Register: Regis,
  userlogin: user,
};

export const RegisterReducer = (state = StafeDefault, action) => {
  switch (action.type) {
    case GET_ACCOUNT: {
      console.log("get", action.payload);
      return { ...state, Register: [...action.payload] };
    }

    case REGISTER: {
      console.log("register", action.payload);
      return { ...state, Register: [...state.Register, action.payload] };
    }
    case REGISTER_ADMIN: {
      console.log("register", action.payload);
      return { ...state, Register: [...state.Register, action.payload] };
    }
    case SIGIN: {
      return { ...state};
    }
    case DELETE_ACCOUNT: {
      return {
        ...state,
        Register: [
          ...state.Register,
          action.payload.id,
          action.payload.Account,
        ],
      };
    }

    case PUT_ACCOUNT: {
      return { ...state, Register: [...state.Register, action.payload] };
    }
    case POST_ACCOUNT: {
      return { ...state, Register: [...state.Register, action.payload] };
    }
    default:
      return { ...state };
  }
};
