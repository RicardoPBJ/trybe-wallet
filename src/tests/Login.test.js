import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('teste da página Login', () => {
  test('verifica se input, email e botão estão na tela', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByRole('textbox', {
      name: /senha:/i,
    });
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const buttonPlay = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
  });
  test('verifica se o botão "Entrar" fica desabilitado caso email e/ou senha não estejam preenchidos', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByRole('textbox', {
      name: /senha:/i,
    });
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const buttonPlay = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(inputName.value).toBe('');
    expect(inputName.id).toBe('password-input');
    expect(inputEmail.value).toBe('');
    expect(buttonPlay.disabled).toBe(true);

    userEvent.type(inputName, 'Tryber');

    expect(inputName.value).toBe('Tryber');
    expect(buttonPlay.disabled).toBe(true);

    userEvent.type(inputEmail, 'test@test.com');

    expect(inputEmail.value).toBe('test@test.com');
    expect(buttonPlay.disabled).toBe(false);
  });
});
