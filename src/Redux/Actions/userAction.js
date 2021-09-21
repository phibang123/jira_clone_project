import { USER_SIGNIN_SAGA_API } from "../Constants/constants";

export const signin_action = (values, props) => ({
    type: USER_SIGNIN_SAGA_API,
    userLogin: {
        email: values.email,
        password: values.password
    },history: props.history
})
