// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FETCH_COINS_FAILURE,
  FETCH_COINS_REQUEST,
  FETCH_COINS_SUCCESS,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  errorMessage: null,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_COINS_REQUEST: {
    return {
      ...state,
    };
  }
  case FETCH_COINS_SUCCESS: {
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  }
  case FETCH_COINS_FAILURE: {
    return {
      ...state,
      currencies: action.payload.errorMessage,
    };
  }
  default: return state;
  }
};
export default walletReducer;
