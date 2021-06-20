import { screen, fireEvent } from '@testing-library/react';
import { renderWithChackraProvider } from '../../utils/tests';

import { ModalNewPost } from '../../components/Modal/NewPost';

const props = {
  isOpen: true,
  onClose: jest.fn(),
};

describe('<ModalNewPost />', () => {
  it('should render', () => {
    renderWithChackraProvider(ModalNewPost, props);

    expect(screen.getByText('Novo post')).toBeInTheDocument();
  });

  it('should open the modal', () => {
    renderWithChackraProvider(ModalNewPost, { ...props, isOpen: false });

    expect(screen.queryByText('Novo post')).toBeNull();
  });

  it('should render', () => {
    renderWithChackraProvider(ModalNewPost, props);

    const closeButton = screen.getByRole('button', { name: 'Close' });

    fireEvent.click(closeButton);

    expect(props.onClose).toHaveBeenCalled();
  });
});
