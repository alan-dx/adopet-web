import { screen } from '@testing-library/react';
import { renderWithChackraProvider } from '../../utils/tests';
import { FiPlus } from 'react-icons/fi';

import { UserTypeButton } from '../../components/UserTypeButton';

const props = {
  children: 'Adicionar',
};

describe('<UserTypeButton />', () => {
  it('should render', () => {
    renderWithChackraProvider(UserTypeButton, props);

    expect(screen.getByText(props.children)).toBeInTheDocument();
  });

  it('should render with an icon', () => {
    renderWithChackraProvider(UserTypeButton, { ...props, icon: FiPlus });

    expect(screen.getByTestId('button-with-icon')).toBeInTheDocument();
  });
});
