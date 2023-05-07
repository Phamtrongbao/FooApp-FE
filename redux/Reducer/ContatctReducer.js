import {
  DELETE_CONTACT,
  GET_CONTACT,
  POST_CONTACT,
} from "../types/ContactTypes";

const StafeDefault = {
  Contact: [],
};

export const ContactReducer = (state = StafeDefault, action) => {
  switch (action.type) {
    case GET_CONTACT: {
      console.log("get", action.payload);
      return { ...state, Contact: [...action.payload] };
    }
    case POST_CONTACT: {
      return { ...state, Contact: [...state.Contact, action.payload] };
    }
    case DELETE_CONTACT: {
      return {
        ...state,
        Contact: [...state.Contact, action.payload.id, action.payload.contact],
      };
    }
    default:
      return { ...state };
  }
};
