import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAILURE,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_DETAILS_RESET,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USERS_LIST_FAILURE,
  USERS_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
} from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";

import { toast } from "react-toastify";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      process.env.REACT_APP_API + "/users/login",
      {
        email,
        password,
      },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));

    toast.success("You've logged in successfully!");
  } catch (error) {
    const finalMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: finalMessage,
    });

    toast.error(finalMessage, { autoClose: false });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      process.env.REACT_APP_API + "/users",
      {
        username,
        email,
        password,
      },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));

    toast.success("You've signed up successfully!");
  } catch (error) {
    const finalMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: finalMessage,
    });
    toast.error(finalMessage, { autoClose: false });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USERS_LIST_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: CART_CLEAR_ITEMS });
  // document.location.href = "/login";
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      process.env.REACT_APP_API + `/users/${id}`,
      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const finalMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (finalMessage === "Your token has epxired") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload: finalMessage,
    });
    toast.error(finalMessage, { autoClose: false });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      process.env.REACT_APP_API + `/users/profile`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));

    toast.success("Your profile's successfully been updated!");
  } catch (error) {
    const finalMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (finalMessage === "Your token has epxired") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAILURE,
      payload: finalMessage,
    });
    toast.error(finalMessage, { autoClose: false });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      process.env.REACT_APP_API + `/users`,
      config
    );

    dispatch({
      type: USERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const finalMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (finalMessage === "Your token has epxired") {
      dispatch(logout());
    }
    dispatch({
      type: USERS_LIST_FAILURE,
      payload: finalMessage,
    });
    toast.error(finalMessage, { autoClose: false });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(process.env.REACT_APP_API + `/users/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });

    toast.success("User removed");
  } catch (error) {
    const finalMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (finalMessage === "Your token has epxired") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DELETE_FAILURE,
      payload: finalMessage,
    });
    toast.error(finalMessage, { autoClose: false });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      process.env.REACT_APP_API + `/users/${user._id}`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

    toast.success("User updated");
  } catch (error) {
    const finalMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (finalMessage === "Your token has epxired") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_FAILURE,
      payload: finalMessage,
    });
    toast.error(finalMessage, { autoClose: false });
  }
};
