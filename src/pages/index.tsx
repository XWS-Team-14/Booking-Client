import BaseTemplate from '@/common/components/baseTemplate/BaseTemplate';
import AccommodationCard from '@/features/accommodation/components/AccommodationCard/AccommodationCard';
import Search from '@/features/search/components/Search';

export default function HomePage() {
  return (
    <BaseTemplate>
      <Search />
    </BaseTemplate>
  );
}
