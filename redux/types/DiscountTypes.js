export const GET_DISCOUNT = "GET_DISCOUNT"
export const POST_DISCOUNT = "POST_DISCOUNT"
export const PUT_DISCOUNT = "PUT_DISCOUNT"
export const DELETE_DISCOUNT = "DELETE_DISCOUNT"
export const GetDiscount = (discount)=>{
    return {
        type: GET_DISCOUNT,
        payload:discount,
    }
}
export const PostDiscount = (discount)=>{
    return {
        type: POST_DISCOUNT,
        payload:discount,
    }
}
export const PutDiscount = (discount)=>{
    return {
        type: PUT_DISCOUNT,
        payload:discount,
    }
}
export const DeleteDiscount = (id,discount)=>{
    return {
        type: DELETE_DISCOUNT,
        payload:{id,discount},
    }
}