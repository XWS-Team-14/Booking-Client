import BaseTemplate from '@/common/components/baseTemplate/BaseTemplate';
import { useRouter } from 'next/router';

const SingleAccommodationPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <BaseTemplate></BaseTemplate>;
};

export default SingleAccommodationPage;
