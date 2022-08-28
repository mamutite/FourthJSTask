import Geocode from "react-geocode";

Geocode.setApiKey(
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    ? process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    : "asdf"
);

Geocode.setLocationType("ROOFTOP");

export function getCoords(city: string): Promise<google.maps.LatLng> {
  return Geocode.fromAddress(city).then(
    (response: any) => {
      const { lat, lng } = response.results[0].geometry.location;
      return new google.maps.LatLng(lat, lng);
    },
    (error: any) => {
      console.error(error);
      return new google.maps.LatLng(42.6808921, 23.254566);
    }
  );
}

export function getLocationFromCoords(coords: google.maps.LatLng): Promise<string> {
  return Geocode.fromLatLng(coords.lat() + "", coords.lng() + "").then(
    (response) => {
      const address: string = response.results[0].formatted_address;
      const parsedLocation = address.split(", ").slice(-2).join(", ");
      return parsedLocation;
    },
    (error) => {
      console.error(error);
      return "";
    }
  );
}
