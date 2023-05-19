import Loading from '@/common/components/loading/Loading';
import { Accommodation } from '@/common/types/Accommodation';
import { useEffect, useState } from 'react';
import { getById } from '../services/accommodation.service';
interface SingleAccommodationProps {
  id: string;
}

const SingleAccommodation = ({ id }: SingleAccommodationProps) => {
  const [accommodation, setAccommodation] = useState<Accommodation>();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getById(id)
      .then((response) => setAccommodation(response.data))
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

  return loading ? <Loading /> : <>{accommodation?.name}</>;
};

export default SingleAccommodation;
