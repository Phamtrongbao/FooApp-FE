export const POST_INVOICE = "POST_INVOICE"
export const GET_INVOICE = "GET_INVOICE"
export const PostInvoice = (values)=>{
    return {
        type: POST_INVOICE,
        payload:values,
    }
}

export const GetInvoice = (values)=>{
    return {
        type: GET_INVOICE,
        payload:values,
    }
}