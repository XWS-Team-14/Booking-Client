import BaseTemplate from '@/common/components/baseTemplate/BaseTemplate';
import Loading from '@/common/components/loading/Loading';
import SingleAccommodation from '@/features/accommodation/components/SingleAccommodation';
import { useRouter } from 'next/router';

const SingleAccommodationPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const accommodationId = typeof id === 'string' ? id : '';

  return id ? (
    <BaseTemplate>
      <SingleAccommodation id={accommodationId} />
    </BaseTemplate>
  ) : (
    <Loading />
  );
};

export default SingleAccommodationPage;
