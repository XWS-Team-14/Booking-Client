import Location from "./location";
export default interface AccommodationDto{
    id: string,
    userId: string,
    name: string,
    location: Location,
    features: Array<string>,
    imageUrls: Array<string>,
    minGuests: number,
    maxGuests:number
}