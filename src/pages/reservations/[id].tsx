import BaseTemplate from '@/common/components/baseTemplate/BaseTemplate';
import PendingReservations from '@/features/reservation/components/PendingReservations';
import { useRouter } from 'next/router';

export default function PendingReservationsPage() {
  const router = useRouter();
  const { id } = router.query;

  const accommodationId = typeof id === 'string' ? id : '';

  return (
    <BaseTemplate>
      <PendingReservations
        accommodationId={accommodationId}
      ></PendingReservations>
    </BaseTemplate>
  );
}
