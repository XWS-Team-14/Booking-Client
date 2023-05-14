import BaseTemplate from '@/common/components/baseTemplate/BaseTemplate';
import GuestReservations from '@/features/reservation/components/GuestReservations'
const GuestReservationsPage = () => {
    return (
      <>
        <BaseTemplate>
          <GuestReservations />
        </BaseTemplate>
      </>
    );
  };
  
  export default GuestReservationsPage;