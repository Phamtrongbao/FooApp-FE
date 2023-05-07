export const REGISTER = "REGISTER";
export const REGISTER_ADMIN = "REGISTER_ADMIN";
export const GET_ACCOUNT = "GET_ACCOUNT"
export const DELETE_ACCOUNT = "DELETE_ACCOUNT"
export const PUT_ACCOUNT = "PUT_ACCOUNT"
export const POST_ACCOUNT = "POST_ACCOUNT"
export const SIGIN = "SIGIN"
export const AccountTypes = (values) => {
  return {
    type: GET_ACCOUNT,
    payload: values,
  };
};
export const RgisterTypes = (values) => {
  return {
    type: REGISTER,
    payload: values,
  };
};
export const RgisterAdminTypes = (values) => {
  return {
    type: REGISTER_ADMIN,
    payload: values,
  };
};

export const SiginTypes = (values) => {
  return {
    type: SIGIN,
    payload: values,
  };
};
export const DeleteAccount = (id,Account)=>{
  return {
      type: DELETE_ACCOUNT,
      payload:{id,Account},
  }
}
export const PutAccount = (Account)=>{
  return {
      type: PUT_ACCOUNT,
      payload:Account,
  }
}


export const PostAccount = (Account)=>{
  return {
      type: POST_ACCOUNT,
      payload:Account,
  }
}