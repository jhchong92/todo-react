import React from 'react';
import { render } from '@testing-library/react';
import App from '../app/App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('creates App', () => {
  const { getByText } = render(<App />);
  const signUp = getByText(/sign up/i);
  expect(signUp).toBeInTheDocument();
})
