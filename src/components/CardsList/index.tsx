import { Card } from '../Card';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';

type DonationPost = {
  id: string;
  title: string;
  description: string;
  animalType: string;
  animalBreed: string;
  createdAt: string;
  age: string;
  user: {
    name: string;
    avatarURL: string;
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
  const router = useRouter()

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
            avatar={donation.user.avatarURL}
            onClick={() => router.push(`/details/${donation.id}`)}
            isFeed
          />
        )
      })}
    </>
  )
}