// Coordinates for the World chapter. Pins are the same places and
// latitudes as tools/build-world-map.py; country points are conventional
// centroids, only used to place a marker on the globe.

export type GeoPoint = { name: string; lat: number; lng: number };

export const pins: GeoPoint[] = [
  { name: "Lake Tekapo", lat: -44.0157, lng: 170.5056 },
  { name: "Merzouga", lat: 31.0871, lng: -3.9902 },
  { name: "Kilauea", lat: 19.4231, lng: -155.2841 },
  { name: "Munich", lat: 48.1349, lng: 11.5489 },
  { name: "Luxembourg City", lat: 49.6116, lng: 6.1319 },
  { name: "Stockholm", lat: 59.3293, lng: 18.0686 },
  { name: "Sydney", lat: -33.9002, lng: 151.2706 },
  { name: "Cleveland", lat: 41.4993, lng: -81.6944 },
  { name: "Cincinnati", lat: 39.1031, lng: -84.512 },
  { name: "Matosinhos", lat: 41.1752, lng: -8.6924 },
];

// The 15 visited countries in src/data/profile.ts, one point each.
export const visitedCountries: GeoPoint[] = [
  { name: "Australia", lat: -25.27, lng: 133.78 },
  { name: "Belgium", lat: 50.85, lng: 4.35 },
  { name: "Canada", lat: 56.13, lng: -106.35 },
  { name: "Croatia", lat: 45.1, lng: 15.2 },
  { name: "France", lat: 46.6, lng: 2.2 },
  { name: "Germany", lat: 51.17, lng: 10.45 },
  { name: "Italy", lat: 41.87, lng: 12.57 },
  { name: "Luxembourg", lat: 49.61, lng: 6.13 },
  { name: "Mexico", lat: 23.63, lng: -102.55 },
  { name: "Morocco", lat: 31.79, lng: -7.09 },
  { name: "Netherlands", lat: 52.13, lng: 5.29 },
  { name: "New Zealand", lat: -40.9, lng: 174.89 },
  { name: "Portugal", lat: 39.4, lng: -8.22 },
  { name: "Sweden", lat: 60.13, lng: 18.64 },
  { name: "Switzerland", lat: 46.82, lng: 8.23 },
];

export const home: GeoPoint = { name: "Cleveland", lat: 41.4993, lng: -81.6944 };
