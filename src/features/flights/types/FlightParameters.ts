export interface FlightParameters {
  start: string;
  end: string;
  city: string;
  country: string;
  count: string;
}

export interface FlightParametersExpanded {
  start_date: string;
  end_date: string;
  start_country: string;
  end_country: string;
  start_city: string;
  end_city: string;
  count: string;
}
