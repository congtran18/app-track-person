import {
  SET_NGUOIVAO,
} from "../actions/nguoivao";
import Nguoivao from "../../models/nguoivao";

const initialState = {
  availableNguoivao: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NGUOIVAO:
      return {
        availableNguoivao: action.nguoivao,
      };
    // case CREATE_NGUOIVAO:
    //   const newNguoivao = new Nguoivao(
    //     action.nguoivaoData.id,
    //     action.nguoivaoData.date,
    //     action.nguoivaoData.image,
    //     action.nguoivaoData.realname,
    //   );
    //   return {
    //     ...state,
    //     availableNguoivao: state.availableNguoivao.concat(newNguoivao),
    //   };
    // case DELETE_PRODUCT:
    //   return {
    //     ...state,
    //     userProducts: state.userProducts.filter(
    //       (product) => product.id !== action.pid
    //     ),
    //     availableProducts: state.availableProducts.filter(
    //       (product) => product.id !== action.pid
    //     ),
    //   };
  }
  return state;
};
