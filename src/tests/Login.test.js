import Login from '../pages/Login';

describe('Ao renderizar a pagina Login', () => {
  test('Se é exibido um botão com o name Entrar', () => {
    renderWithRouterAndRedux(<Login />);
  });
});
