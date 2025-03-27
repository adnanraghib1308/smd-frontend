import ReactGA from "react-ga4";

// Replace with your GA4 Measurement ID
const GA_TRACKING_ID = "G-FGKHGHRHV6";

export const initGA = () => {
  ReactGA.initialize(GA_TRACKING_ID);
};

export const logPageView = (url) => {
  ReactGA.send({ hitType: "pageview", page: url });
};

export const logEvent = (category, action, label) => {
  ReactGA.event({ category, action, label });
};
