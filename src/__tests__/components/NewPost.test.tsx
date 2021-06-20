import { fireEvent, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AxiosMock from 'axios-mock-adapter';
import { renderWithChackraProvider } from '../../utils/tests';
import { api } from '../../services/apiClient';

import { NewPost } from '../../components/Form/NewPost';

const props = {
  closeModal: jest.fn(),
};

const apiMock = new AxiosMock(api);

describe('<NewPost />', () => {
  beforeAll(() => {
    const noOp = (): string => {
      return 'noOp';
    };
    Object.defineProperty(window.URL, 'createObjectURL', { value: noOp });
  });

  it('should render', async () => {
    renderWithChackraProvider(NewPost, props);

    expect(screen.getByText('Enviar')).toBeInTheDocument();
  });

  it('should be able to submit with all required fields filled', async () => {
    renderWithChackraProvider(NewPost, props);

    const file = new File(['image'], 'image.png', { type: 'image/png' });

    const addNewImageButton = screen.getByText('Adicionar');
    fireEvent.click(addNewImageButton);

    const fileInput = screen.getByTestId(
      'image-upload-input'
    ) as HTMLInputElement;

    const titleInput = screen.getByRole('textbox', {
      name: 'title',
    }) as HTMLInputElement;
    const animalTypeInput = screen.getByRole('textbox', {
      name: 'animalType',
    }) as HTMLInputElement;
    const animalBreedInput = screen.getByRole('textbox', {
      name: 'animalBreed',
    }) as HTMLInputElement;
    const ageInput = screen.getByTestId('age-input') as HTMLInputElement;
    const descriptionInput = screen.getByRole('textbox', {
      name: 'description',
    }) as HTMLInputElement;

    userEvent.upload(fileInput, file);

    fireEvent.change(titleInput, {
      target: {
        value: 'Title',
      },
    });
    fireEvent.change(animalTypeInput, {
      target: {
        value: 'Dog',
      },
    });
    fireEvent.change(animalBreedInput, {
      target: {
        value: 'Husky',
      },
    });
    fireEvent.change(descriptionInput, {
      target: {
        value: 'Lets pretend this is a really good description :D',
      },
    });
    fireEvent.change(ageInput, {
      target: {
        value: 5,
      },
    });

    expect(fileInput.files[0]).toStrictEqual(file);
    expect(titleInput).toHaveValue('Title');
    expect(animalTypeInput).toHaveValue('Dog');
    expect(animalBreedInput).toHaveValue('Husky');
    expect(descriptionInput).toHaveValue(
      'Lets pretend this is a really good description :D'
    );
    expect(ageInput).toHaveValue(5);

    const submitButton = screen.getByText('Enviar');

    fireEvent.submit(submitButton);

    apiMock.onPost('/donations').replyOnce(200);

    await waitFor(() => apiMock.onPost('/donations').replyOnce(200));

    expect(props.closeModal).toHaveBeenCalled();
  });
});
