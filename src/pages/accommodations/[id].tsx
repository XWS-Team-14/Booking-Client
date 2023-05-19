import BaseTemplate from '@/common/components/baseTemplate/BaseTemplate';
import Loading from '@/common/components/loading/Loading';
import Accommodation from '@/features/accommodation/components/Accommodation';
import { useRouter } from 'next/router';

const SingleAccommodationPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const accommodationId = typeof id === 'string' ? id : '';

  return id ? (
    <BaseTemplate>
      <Accommodation id={accommodationId} />
    </BaseTemplate>
  ) : (
    <Loading />
  );
};

export default SingleAccommodationPage;
