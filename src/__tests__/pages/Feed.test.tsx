import { screen } from '@testing-library/react';
import { renderWithChackraProvider } from '../../utils/tests';

import Feed from '../../pages/feed';

describe('Feed page', () => {
  it('should render correctly', () => {
    renderWithChackraProvider(Feed);

    expect(screen.getByText('AdoPet')).toBeInTheDocument();
  });
});
