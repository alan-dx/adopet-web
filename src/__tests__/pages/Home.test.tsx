import { screen } from '@testing-library/react';
import { renderWithChackraProvider } from '../../utils/tests';

import Home from '../../pages';

describe('Home page', () => {
  it('should render correctly', () => {
    renderWithChackraProvider(Home);

    expect(screen.getByText('Seja bem-vindo,')).toBeInTheDocument();
  });
});
