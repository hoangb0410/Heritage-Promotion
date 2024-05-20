import axios from "axios";
import { clearError, loginFailed, loginStart, loginSuccess } from "./authSlice";

export const loginUser = async(user, dispatch, navigate) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    dispatch(clearError());
    dispatch(loginStart());
    try {
        const response = await axios.post(`${apiUrl}/v1/auth/login`, user);
        dispatch(loginSuccess(response.data));
        // console.log(response);
        if (response.data.isAdmin === true) {
            navigate('/admin');
        } else navigate('/');
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('fullname', response.data.fullname);
        localStorage.setItem('isAdmin', response.data.isAdmin);
        localStorage.setItem('id', response.data._id);
    } catch (error) {
        dispatch(loginFailed());
    }
}