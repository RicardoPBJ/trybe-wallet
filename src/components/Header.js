import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

class Header extends Component {
  calculateTotal = (expenses) => {
    const total = expenses.reduce((actualValue, newValue) => actualValue
        + (+newValue.value * newValue.exchangeRates[newValue.currency].ask), 0)
      .toFixed(2);
    console.log(total);
    return total;
  };

  render() {
    const { email, expenses } = this.props;
    let total = '0.00';
    if (expenses.length > 0) {
      total = this.calculateTotal(expenses);
    }
    return (
      <div>
        <p data-testid="email-field">{ `Email: ${email}` }</p>
        <p
          data-testid="total-field"
        >
          {total}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: Proptypes.string.isRequired,
  expenses: Proptypes.arrayOf(Proptypes.shape()).isRequired,
};
export default connect(mapStateToProps)(Header);
