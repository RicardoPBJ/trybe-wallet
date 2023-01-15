// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FETCH_EXCHANGE_FAILURE,
  FETCH_EXCHANGE_REQUEST,
  FETCH_EXCHANGE_SUCCESS,
  FETCH_COINS_FAILURE,
  FETCH_COINS_REQUEST,
  FETCH_COINS_SUCCESS,
  USER_EXPENSES,
  DELETE_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  errorMessage: null,
  expenses: [],
  currencyInfo: {},
  currencyErrorMessage: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_COINS_REQUEST || FETCH_EXCHANGE_REQUEST: {
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
  case FETCH_EXCHANGE_FAILURE: {
    return {
      ...state,
      currencyErrorMessage: action.payload.currencyErrorMessage,
    };
  }
  case FETCH_EXCHANGE_SUCCESS: {
    return {
      ...state,
      currencyInfo: action.payload.currencyInfo,
    };
  }
  case USER_EXPENSES: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expenses],
    };
  }
  case DELETE_EXPENSE: {
    return {
      ...state,
      expenses: action.payload,
    };
  }
  default: return state;
  }
};
export default walletReducer;
