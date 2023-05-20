import BaseTemplate from '@/common/components/baseTemplate/BaseTemplate';
import { useRouter } from 'next/router';

const SingleAccommodationPage = () => {
  const router = useRouter();
  console.log(router)
  return <BaseTemplate></BaseTemplate>;
};

export default SingleAccommodationPage;
