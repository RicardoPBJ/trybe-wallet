import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => this.isEnableButton());
  };

  handleDispatch = () => {
    const { email, password } = this.state;
    const { dispatch } = this.props;
    dispatch(userLogin(email, password));
  };

  verifyEmail = (email) => {
    const regeEx = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return regeEx.test(email);
  };

  verifyPassword = (password) => {
    const number = 6;
    const verify = password.length >= number;
    return verify;
  };

  isEnableButton = () => {
    const { email, password } = this.state;
    const emailVerification = this.verifyEmail(email);
    const passwordVerification = this.verifyPassword(password);
    if (emailVerification && passwordVerification) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  buttonAction = () => {
    const { history } = this.props;
    this.handleDispatch();
    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email-input">
            Email:
            <input
              name="email"
              id="email-input"
              data-testid="email-input"
              placeholder="alguem@alguem.com.br"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              name="password"
              id="password-input"
              placeholder="Digite sua senha com 6 caractéres ou mais "
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            value="name"
            data-testid="login-submit-button"
            onClick={ this.buttonAction }
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
});

Login.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
  dispatch: Proptypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
