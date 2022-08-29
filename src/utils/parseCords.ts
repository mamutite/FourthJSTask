import Geocode from "react-geocode";

Geocode.setApiKey(
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    ? process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    : "asdf"
);

Geocode.setLocationType("ROOFTOP");

export function getLocationFromCoords(
  coords: google.maps.LatLng
): Promise<string> {
  return Geocode.fromLatLng(coords.lat() + "", coords.lng() + "").then(
    (response) => {
      const parsedLocation = getCityFromAddressComponents(response.results[0]);
      return parsedLocation;
    },
    (error) => {
      console.error(error);
      return "";
    }
  );
}

export function getCityFromAddressComponents(
  place: google.maps.places.PlaceResult
): string {
  let city, country;
  for (
    let i = 0;
    place.address_components && i < place.address_components.length;
    i++
  ) {
    const address = place.address_components;
    for (let j = 0; j < address[i].types.length; j++) {
      switch (address[i].types[j]) {
        case "locality":
          city = address[i].long_name;
          break;
        case "country":
          country = address[i].long_name;
          break;
      }
    }
  }

  return city + ", " + country;
}
