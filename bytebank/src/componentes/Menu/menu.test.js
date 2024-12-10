import { screen, render } from '@testing-library/react';
import Menu from './index';

test('encotrar o linkInicial', () => {
  render(<Menu />);
  const linkInitial = screen.getByText('Inicial');
  expect(linkInitial).toBeInTheDocument();
});

test('Deve encotras os links do menu', () => {
  render(<Menu />);
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(4);
});

test('Nao deve ecotrar o link entrato', () => {
  render(<Menu />);
  const linkExtrato = screen.queryByText('Extrato');
  expect(linkExtrato).not.toBeInTheDocument();
});

test('Deve renderizar uma lista de links com a classe link', () => {
  render(<Menu />);
  const links = screen.getAllByRole('link');
  links.forEach((link) => expect(link).toHaveClass('link'));
  expect(links).toMatchSnapshot();
});
