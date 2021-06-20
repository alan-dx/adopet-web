import { fireEvent, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithChackraProvider } from '../../utils/tests';

import { NewPost } from '../../components/Form/NewPost';

const props = {
  closeModal: jest.fn(),
};

describe('<NewPost />', () => {
  beforeAll(() => {
    const noOp = (): string => {
      return 'noOp';
    };
    Object.defineProperty(window.URL, 'createObjectURL', { value: noOp });
  });

  it('should render', async () => {
    await act(async () => renderWithChackraProvider(NewPost, props));

    expect(screen.getByText('Enviar')).toBeInTheDocument();
  });

  it('should be able to submit with all required fields filled', async () => {
    await act(async () => renderWithChackraProvider(NewPost, props));

    const file = new File(['image'], 'image.png', { type: 'image/png' });

    const addNewImageButton = screen.getByText('Adicionar');
    fireEvent.click(addNewImageButton);

    const fileInput = screen.getByTestId(
      'image-upload-input'
    ) as HTMLInputElement;

    const nameInput = screen.getByRole('textbox', {
      name: 'nome',
    }) as HTMLInputElement;
    const descriptionInput = screen.getByRole('textbox', {
      name: 'description',
    }) as HTMLInputElement;
    const phoneInput = screen.getByTestId('phone-input') as HTMLInputElement;

    userEvent.upload(fileInput, file);

    fireEvent.change(nameInput, {
      target: {
        value: 'Abrigo mãe maria',
      },
    });
    fireEvent.change(descriptionInput, {
      target: {
        value: 'Lets pretend this is a really good description :D',
      },
    });
    fireEvent.change(phoneInput, {
      target: {
        value: 119912345678,
      },
    });

    expect(fileInput.files[0]).toStrictEqual(file);
    expect(nameInput).toHaveValue('Abrigo mãe maria');
    expect(descriptionInput).toHaveValue(
      'Lets pretend this is a really good description :D'
    );
    expect(phoneInput).toHaveValue(119912345678);

    const submitButton = screen.getByText('Enviar');

    fireEvent.submit(submitButton);
    await act(async () => fireEvent.submit(submitButton));

    expect(props.closeModal).toHaveBeenCalledTimes(1);
  });
});
