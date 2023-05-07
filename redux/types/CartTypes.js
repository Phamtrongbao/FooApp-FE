export const CART = "CART"
export const REMOVE_CART = "REMOVE_CART"
export const Discount = "DISCOUNT"
export const REMOVE_Discount = "REMOVE_DISCOUNT"
export const CARTActions = (id)=>{
    return {
        type: CART,
        payload:id,
    }
}

export const RemoveCARTActions = (id)=>{
    return {
        type: REMOVE_CART,
        payload:id,
    }
}

export const DiscountActions = (id)=>{
    return {
        type: Discount,
        payload:id,
    }
}

export const RemoveDiscountActions = (id)=>{
    return {
        type: REMOVE_Discount,
        payload:id,
    }
}