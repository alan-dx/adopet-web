import { screen } from '@testing-library/react';
import { renderWithChackraProvider } from '../../utils/tests';

import { Card } from '../../components/Card';

const props = {
  avatar:
    'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d',
  name: 'Abrigo test',
  postedIn: '30',
  image:
    'https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores tempora at ad quisquam mollitia tenetur illum quod iste, sit vero.',
  isFeed: true,
};

describe('<Card />', () => {
  it('should render', () => {
    renderWithChackraProvider(Card, props);

    expect(screen.getByText(props.name)).toBeInTheDocument();
  });

  it('should long description if is isFeed is false', () => {
    renderWithChackraProvider(Card, { ...props, isFeed: false });

    expect(screen.getByText(props.description)).toBeInTheDocument();
  });
});
