import { Card } from '../Card';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

type DonationPost = {
  id: string;
  title: string;
  description: string;
  animalType: string;
  animalBreed: string;
  createdAt: string;
  age: string;
  user: {
    name: string
  };
  images: {
    id: string;
    imageURL: string
  }[];
  wasAdopted: boolean
}

interface CardListProps {
  data: DonationPost[]
}

export function CardsList({data}: CardListProps) {

  const { user } = useContext(AuthContext)

  return (
    <>
      {data?.map(donation => {
        return (
          <Card
            key={donation.id}
            name={donation.user.name}
            image={donation.images[0].imageURL}
            postedIn="30"
            description={donation.description}
            avatar={user?.avatarURL}
            isFeed
          />
        )
      })}
    </>
  )
}