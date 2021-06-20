import { useEffect } from 'react';
import { Card } from '../Card';
import { DonationPost } from '../../pages/feed'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

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
            name={user?.name}
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