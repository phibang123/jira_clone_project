import { USER_SIGNIN_SAGA_API, USER_SIGNUP_SAGA_API } from "../Constants/constants";

import { useDispatch } from "react-redux";

export const signin_action = (values) => ({
    type: USER_SIGNIN_SAGA_API,
    userLogin: {
        email: values.email,
        password: values.password
    }
})


export const signup_action = (values) => ({
    
    type: USER_SIGNUP_SAGA_API,
    userSignup: {
        email: values.email,
        password: values.password,
        name: values.name,
        phoneNumber: values.phoneNumber
    }, 
    
})
