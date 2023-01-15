import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testando a pagina <Wallet />', () => {
  test('a rota da pagina', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByRole('textbox', {
      name: /senha:/i,
    });
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const buttonPlay = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(inputName, 'Tryber');

    expect(inputName.value).toBe('Tryber');
    expect(buttonPlay.disabled).toBe(true);

    const email = 'tesst@test.com';

    userEvent.type(inputEmail, email);

    expect(inputEmail.value).toBe(email);
    expect(buttonPlay.disabled).toBe(false);

    userEvent.click(buttonPlay);

    const emailId = screen.getByTestId('email-field');

    expect(history.location.pathname).toBe('/carteira');
    expect(emailId).toBeInTheDocument();

    const totalId = screen.getByTestId('total-field');

    expect(totalId).toBeInTheDocument();

    const valueText = screen.getByRole('textbox', { name: /valor:/i });

    userEvent.type(valueText, '1');

    const descriptionText = screen.getByRole('textbox', { name: /descrição:/i });

    userEvent.type(descriptionText, 'legal');

    const addExpenses = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.click(addExpenses);

    expect(descriptionText).toBeInTheDocument();
    expect(addExpenses).toBeInTheDocument();
    expect(valueText).toBeInTheDocument();
    expect(valueText.value).toBe('1');
    expect(descriptionText.value).toBe('legal');

    const score = screen.getAllByText(/real/i);

    expect(score).toBeInTheDocument();
    expect(score.length).toBe(1);
  });
});
