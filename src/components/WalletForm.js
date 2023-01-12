import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { fetchCoinsThunk, fetchExchangesThunk, userExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoinsThunk());
  }

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  handleStates = (data) => {
    const { dispatch, expenses } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    dispatch(userExpenses({
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      data,
    }));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  buttonClick = async () => {
    const { dispatch } = this.props;
    await dispatch(fetchExchangesThunk());
    const { currencyInfo } = this.props;
    this.handleStates(currencyInfo);
  };

  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
    } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              value={ value }
              name="value"
              id="value"
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              value={ description }
              name="description"
              id="description"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
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
              onChange={ this.handleChange }
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
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.buttonClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  currencyInfo: state.wallet.currencyInfo,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: Proptypes.arrayOf(Proptypes.string).isRequired,
  currencyInfo: Proptypes.objectOf(Proptypes.objectOf(Proptypes.string)).isRequired,
  expenses: Proptypes.arrayOf(Proptypes.shape()).isRequired,
  dispatch: Proptypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
