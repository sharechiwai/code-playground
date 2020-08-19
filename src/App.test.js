import React from 'react';
import {render} from '@testing-library/react';

test('renders learn react link', () => {
  const {getByText} = render(
    <div>
      <h1>Home</h1>
    </div>,
  );
  const linkElement = getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
