export const GET_BRAND = "GET_BRAND";
export const PUT_BRAND = "PUT_BRAND";
export const POST_BRAND = "POST_BRAND";
export const DELETE_BRAND = "DELETE_BRAND";
export const GET_MENU = "GET_MENU";
export const POST_MENU = "POST_MENU";
export const PUT_MENU = "PUT_MENU";
export const DELETE_MENU = "DELETE_MENU";
export const GET_FEEDBACK_BRAND = "GET_FEEDBACK_BRAND";
export const GET_FEEDBACK_DISH = "GET_FEEDBACK_DISH";
export const GET_BLOG = "GET_BLOG";

//rand get post put delete
export const GetBrand = (brand) => {
  return {
    type: GET_BRAND,
    payload: brand,
  };
};
export const PutBrand = (brand) => {
  return {
    type: PUT_BRAND,
    payload: brand,
  };
};
export const PostBrand = (values) => {
  return {
    type: POST_BRAND,
    payload: values,
  };
};
export const DeleteBrand = (id, values) => {
  return {
    type: DELETE_BRAND,
    payload: { id, values },
  };
};
//end brand get post put delete

//call menu
export const GetMeNu = (id) => {
  return {
    type: GET_MENU,
    payload: id,
  };
};
export const PostMenu = (id, values) => {
  return {
    type: POST_MENU,
    payload: { id, values },
  };
};

export const PutMenu = (id, code, values) => {
  return {
    type: PUT_MENU,
    payload: { id, code, values },
  };
};

export const DeleteMenu = (id, code, values) => {
  return {
    type: DELETE_MENU,
    payload: { id, code, values },
  };
};

export const GetFeedBackBrand = (id) => {
  return {
    type: GET_FEEDBACK_BRAND,
    payload: id,
  };
};

export const GetFeedBackDish = (value) => {
  return {
    type: GET_FEEDBACK_DISH,
    payload: value,
  };
};

export const GetBlog = (blog) => {
  return {
    type: GET_BLOG,
    payload: blog,
  };
};
