import { render, screen } from '@testing-library/react';
import Cabecalho from './index';

test('Deve buscar o nome usuário no cabecalho', () => {
  render(<Cabecalho />);
  const nomeUsuario = screen.getByText('Eduardo Panzo');

  expect(nomeUsuario).toBeInTheDocument();
});
