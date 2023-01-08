import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { fetchCoinsThunk } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoinsThunk());
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currencies">
            Moeda:
            <select
              id="currencies"
              name="currencies"
              data-testid="currency-input"
            >
              {
                currencies.map((current) => (
                  <option
                    key={ current }
                    value={ current }
                  >
                    {current}
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            <select
              data-testid="method-input"
              name="method"
              id="method"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              data-testid="tag-input"
              name="tag"
              id="tag"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: Proptypes.arrayOf(Proptypes.objectOf(Proptypes.string)).isRequired,
  dispatch: Proptypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
