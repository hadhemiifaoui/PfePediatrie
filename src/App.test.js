/*import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react'; 
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react'; 

test('renders specific Pediatrie App h1 header', () => {
  act(() => {
    render(<App />);
  });
  const headerElement = screen.getByRole('heading', { level: 1, name: /Pediatrie App/i }); // Looks for the h1 element
  expect(headerElement).toBeInTheDocument();
});
