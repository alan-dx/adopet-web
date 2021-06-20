import { screen, fireEvent } from '@testing-library/react';
import { renderWithChackraProvider } from '../../utils/tests';

import { Header } from '../../components/Header';

const props = {
  title: 'Header Title',
};

describe('<Header />', () => {
  it('should render', () => {
    renderWithChackraProvider(Header, props);

    expect(screen.getByText(props.title)).toBeInTheDocument();
  });

  it('should open the ModalNewPost when the user clicks on new post button', () => {
    renderWithChackraProvider(Header, { ...props, isFeed: true });

    const newPostButton = screen.getByTestId('new-post-button');

    fireEvent.click(newPostButton);

    expect(screen.getByText('Novo post')).toBeInTheDocument();
  });
});
