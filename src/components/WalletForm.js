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
              currencies.map(({ code }) => (<option
                key={ code }
                value={ code }
              >
                {code}
              </option>))
            }
          </select>
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: Proptypes.arrayOf(Proptypes.string).isRequired,
  dispatch: Proptypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
