import ActionNames from "./constant";
import axios from "axios";

const Header = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"), //the token is a variable which holds the token
  },
};

export const loginAction = () => {
  return {
    type: ActionNames.LOGIN,
  };
};

export const logoutAction = () => {
  return {
    type: ActionNames.LOGOUT,
  };
};

export const getAllProductAction = () => {
  return async (dispatch) => {
    const response = await axios.get(
      "https://ecom-react-task.herokuapp.com/product",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"), //the token is a variable which holds the token
        },
      }
    );
    if (response) {
      dispatch({
        type: ActionNames.GETPRODUCTALLLIST,
        payload: { datas: response["data"]["data"] },
      });
    }
  };
};

export const createProductAction = (formValue) => {
  return async (dispatch) => {
    const response = await axios.post(
      "https://ecom-react-task.herokuapp.com/product",
      formValue,
      Header
    );
    if (response) {
      dispatch({
        type: ActionNames.CREATEPRODUCTLIST,
        payload: { status: response["data"]["success"] },
      });
    }
  };
};

export const updateProductAction = (formValue) => {
  return async (dispatch) => {
    const response = await axios.put(
      `https://ecom-react-task.herokuapp.com/product/${formValue["id"]}`,
      formValue,
      Header
    );
    if (response) {
      dispatch({
        type: ActionNames.UPDATEPRODUCT,
        payload: { datas: formValue },
      });
    }
  };
};

export const deleteProductAction = (id) => {
  return async (dispatch) => {
    const response = await axios.delete(
      `https://ecom-react-task.herokuapp.com/product/${id}`,
      Header
    );
    if (response) {
      dispatch({
        type: ActionNames.DELETEPRODUCT,
        payload: { status: response["data"]["status"] },
      });
    }
  };
};
