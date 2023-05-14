import BaseTemplate from '@/common/components/baseTemplate/BaseTemplate';
import Accommodation from '@/features/accommodation/components/accommodation';

export default function HomePage() {
  return (
    <>
      <BaseTemplate>
        <Accommodation />
      </BaseTemplate>
    </>
  );
}
