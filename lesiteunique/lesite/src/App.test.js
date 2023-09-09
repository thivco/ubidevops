import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/SITE GAMING BY THE GAMERS FOR THE GAMERS/i);
  expect(linkElement).toBeInTheDocument();
});
