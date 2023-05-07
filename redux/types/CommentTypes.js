export const POST_FEEDBACK_DISH = "POST_FEEDBACK_DISH";
export const POST_FEEDBACK_BRAND = "POST_FEEDBACK_BRAND";
export const PostFeedBackDish = (id,dish) => {
  return {
    type: POST_FEEDBACK_DISH,
    payload:{id, dish},
  };
};

export const PostFeedBackBrand = (id, code, value) => {
  return {
    type: POST_FEEDBACK_BRAND,
    payload: { id, code, value },
  };
};
