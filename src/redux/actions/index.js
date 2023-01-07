// Types

export const USER_LOGIN = 'USER_LOGIN';
export const FETCH_COINS_REQUEST = 'FETCH_COINS_REQUEST';
export const FETCH_COINS_SUCCESS = 'FETCH_COINS_SUCCESS';
export const FETCH_COINS_FAILURE = 'FETCH_COINS_FAILURE';

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
  const data = coins.json();
  delete data.USDT;
  return [data];
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
