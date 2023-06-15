export interface SearchParams {
  start_date: string | undefined;
  end_date: string | undefined;
  city: string | undefined;
  country: string | undefined;
  address: string | undefined;
  guests: number | undefined;
  price_min: number | undefined;
  price_max: number | undefined;
  amenities: string[] | undefined;
  must_be_featured_host: boolean | undefined;
}
