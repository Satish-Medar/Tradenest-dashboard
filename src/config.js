export const LANDING_URL =
  process.env.REACT_APP_LANDING_URL || "http://localhost:3000";

export const landingPath = (path) =>
  `${LANDING_URL}/#${path.startsWith("/") ? path : `/${path}`}`;
