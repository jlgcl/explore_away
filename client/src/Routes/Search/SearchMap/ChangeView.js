// Component to change LeafLet map center view upon change of coordinate

import { useMap } from "react-leaflet";

export const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};
