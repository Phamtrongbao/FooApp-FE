export const GET_SUPPLIER = "GET_SUPPLIER"
export const POST_SUPPLIER = "POST_SUPPLIER"
export const GetSupplier = (values) =>{
    return {
        type:GET_SUPPLIER,
        payload:values
    }
}

export const PostSupplier = (values)=>{
    return {
        type: POST_SUPPLIER,
        payload:values,
    }
}