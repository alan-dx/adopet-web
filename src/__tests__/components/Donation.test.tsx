import { screen } from '@testing-library/react';
import { renderWithChackraProvider } from '../../utils/tests';

import { Donation } from '../../components/Donation';

const props = {
  src: 'https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e',
  name: 'Abrigo Proteger',
  progress: 20,
  description: 'Precisamos de doação para um cirurgia em',
};

describe('<Donation />', () => {
  it('should render', () => {
    renderWithChackraProvider(Donation, props);

    expect(screen.getByText(props.name)).toBeInTheDocument();
  });
});
