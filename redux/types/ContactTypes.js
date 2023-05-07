export const GET_CONTACT = "GET_CONTACT";
export const POST_CONTACT = "POST_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const GetContact = (contact) => {
  return {
    type: GET_CONTACT,
    payload: contact,
  };
};

export const PostContact = (contact) => {
  return {
    type: POST_CONTACT,
    payload: contact,
  };
};

export const DeleteContactTypes = (id, contact) => {
  return {
    type: DELETE_CONTACT,
    payload: { id, contact },
  };
};
