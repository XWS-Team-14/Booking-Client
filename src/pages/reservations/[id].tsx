import BaseTemplate from '@/common/components/baseTemplate/BaseTemplate';
import { useRouter } from 'next/router';

const PendingReservationsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const accommodationId = typeof id === 'string' ? id : '';

  return <BaseTemplate></BaseTemplate>;
};
