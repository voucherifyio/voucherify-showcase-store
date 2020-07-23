import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i); // no chance these tests will pass... let's delete them if they aren't used?
  expect(linkElement).toBeInTheDocument();
});
