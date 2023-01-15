// Types

export const USER_LOGIN = 'USER_LOGIN';
export const FETCH_COINS_REQUEST = 'FETCH_COINS_REQUEST';
export const FETCH_COINS_SUCCESS = 'FETCH_COINS_SUCCESS';
export const FETCH_COINS_FAILURE = 'FETCH_COINS_FAILURE';
export const USER_EXPENSES = 'USER_EXPENSES';
export const FETCH_EXCHANGE_REQUEST = 'FETCH_EXCHANGE_REQUEST';
export const FETCH_EXCHANGE_SUCCESS = 'FETCH_EXCHANGE_SUCCESS';
export const FETCH_EXCHANGE_FAILURE = 'FETCH_EXCHANGE_FAILURE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

// Actions

export const userLogin = (email, password) => ({
  type: USER_LOGIN,
  payload: {
    email,
    password,
  },
});

export const fetchCoinsRequest = () => ({
  type: FETCH_COINS_REQUEST,
});

export const fetchCoinsSuccess = (coins) => ({
  type: FETCH_COINS_SUCCESS,
  payload: {
    currencies: coins,
  },
});

export const fetchCoinsFailure = (errorMessage) => ({
  type: FETCH_COINS_FAILURE,
  payload: errorMessage,
});

const fetchCurrencies = async (endPoint) => {
  const coins = await fetch(endPoint);
  const data = await coins.json();
  delete data.USDT;
  const result = Object.keys(data);
  return result;
};

export const fetchCoinsThunk = () => async (dispatch) => {
  try {
    dispatch(fetchCoinsRequest());
    const coins = await fetchCurrencies('https://economia.awesomeapi.com.br/json/all');
    dispatch(fetchCoinsSuccess(coins));
  } catch (error) {
    dispatch(fetchCoinsFailure('Algo deu errado'));
  }
};

export const userExpenses = ({
  id,
  value,
  description,
  currency,
  method,
  tag,
  data,
}) => ({
  type: USER_EXPENSES,
  payload: {
    expenses: {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: {
        ...data,
      },
    },
  },
});

export const fetchExchanges = async (endPoint) => {
  const infos = await fetch(endPoint);
  const data = await infos.json();
  delete data.USDT;
  return data;
};

export const fetchExchangesRequest = () => ({
  type: FETCH_EXCHANGE_REQUEST,
});

export const fetchExchangesSuccess = (data) => ({
  type: FETCH_EXCHANGE_SUCCESS,
  payload: {
    currencyInfo: data,
  },
});

export const fetchExchangesFailure = (errorMessage) => ({
  type: FETCH_COINS_FAILURE,
  payload: {
    currencyErrorMessage: errorMessage,
  },
});

export const fetchExchangesThunk = () => async (dispatch) => {
  try {
    dispatch(fetchExchangesRequest());
    const currency = await fetchExchanges('https://economia.awesomeapi.com.br/json/all');
    dispatch(fetchExchangesSuccess(currency));
  } catch (error) {
    dispatch(fetchExchangesFailure('Algo deu errado na requisição do currency'));
  }
};

export const deleteExpenses = (expenses) => ({
  type: DELETE_EXPENSE,
  payload: expenses,
});
