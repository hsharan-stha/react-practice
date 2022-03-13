import { combineReducers } from "redux";
import ActionNames from "./constant";

const initialstate = {
  data: [],
  isCreate: false,
  isUpdate: false,
  isDelete: false,
  error: undefined,
  loading: false,
};

const loginReducer = (state = false, action) => {
  switch (action.type) {
    case ActionNames.LOGIN:
      return (state = true);
    case ActionNames.LOGOUT:
      return (state = false);
    default:
      return state;
  }
};

const productReducer = (state = initialstate, action) => {
  switch (action.type) {
    case ActionNames.GETPRODUCTALLLIST:
      return {
        ...state,
        data: action.payload.datas,
      };
    case ActionNames.CREATEPRODUCTLIST:
      return {
        ...state,
        isCreate: true,
      };
    case ActionNames.UPDATEPRODUCT:
      return {
        ...state,
        data: [
          ...state.data.filter((el) => el.id !== action.payload.datas.id),
          action.payload.datas,
        ],
      };
    case ActionNames.DELETEPRODUCT:
      return { ...state, isDelete: true };
    default:
      return state;
  }
};

const defaultReducer = combineReducers({
  login: loginReducer,
  product: productReducer,
});

export default defaultReducer;
