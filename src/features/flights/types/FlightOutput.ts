export interface FlightOutput {
  id: string;
  route: Route;
  date_of_departure: string;
  collective_price: any;
}

interface Route {
  start_point: Place;
  end_point: Place;
}

interface Place {
  country: string;
  airport_city: string;
  airport_name: string;
}
