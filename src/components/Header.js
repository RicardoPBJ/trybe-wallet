import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    const number = 0;
    return (
      <div>
        <p data-testid="email-field">{ `Email: ${email}` }</p>
        <p data-testid="total-field">{`Despesa total: R$${number}`}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: Proptypes.string.isRequired,
};
export default connect(mapStateToProps)(Header);
