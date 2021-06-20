import { screen, fireEvent } from '@testing-library/react';
import { renderWithChackraProvider } from '../../utils/tests';
import { FiPlus } from 'react-icons/fi';

import { Input } from '../../components/Input';

const props = {
  name: 'description',
};

describe('<Input />', () => {
  it('should render', () => {
    renderWithChackraProvider(Input, props);

    expect(
      screen.getByRole('textbox', { name: props.name })
    ).toBeInTheDocument();
  });

  it('should render with an icon', () => {
    renderWithChackraProvider(Input, { ...props, icon: FiPlus });

    expect(screen.getByTestId('input-with-icon')).toBeInTheDocument();
  });

  it('should have an show button if type === password', () => {
    renderWithChackraProvider(Input, { ...props, type: 'password' });

    expect(screen.getByTestId('show-password-button')).toBeInTheDocument();
  });

  it('should have a hide button if user clicks to show the password', () => {
    renderWithChackraProvider(Input, { ...props, type: 'password' });

    const showPasswordButton = screen.getByTestId('show-password-button');

    fireEvent.click(showPasswordButton);

    expect(screen.getByTestId('hide-password-icon')).toBeInTheDocument();
  });

  it('should show error message', () => {
    renderWithChackraProvider(Input, {
      ...props,
      error: { message: 'Required field' },
    });

    expect(screen.getByText('Required field')).toBeInTheDocument();
  });
});
