export interface PlaceResultI {
  address_components: AddressComponentI[];
  formatted_address: string;
}

export interface AddressComponentI {
  long_name: string;
  short_name: string;
  types: string[];
}