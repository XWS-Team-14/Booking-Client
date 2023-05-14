import { RcFile, UploadFile } from "antd/es/upload"

export default interface AccommodationFormDto {
  name: string,
  country: string,
  city: string,
  address: string,
  features: string[],
  files: UploadFile[]
  min_guests: string,
  max_guests: string,
  automatic_accept: string
}
