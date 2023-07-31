export function getCityAndState(address: string): string {
  const parts = address.split(", ");

  // The city, state and zip code are in the last part of the split string
  const cityStateZip = parts[parts.length - 1];

  // Split again by space to remove the zip code and separate city from state
  const cityStateZipParts = cityStateZip.split(" ");

  // Exclude the last part (zip code)
  const cityStateParts = cityStateZipParts.slice(
    0,
    cityStateZipParts.length - 1
  );

  // Determine the index where city name ends
  let cityNameEndIndex = cityStateParts.length - 2; // -2 because we excluded the zip code already and arrays are 0-indexed

  // Join the city name parts
  const city = cityStateParts.slice(0, cityNameEndIndex + 1).join(" ");

  // Get the state part
  const state = cityStateParts[cityNameEndIndex + 1];

  // Combine city and state with "/"
  const cityState = city + " / " + state;

  return cityState;
}
