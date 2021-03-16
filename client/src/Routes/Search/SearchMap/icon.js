import L from "leaflet";

const markerIcon = L.Icon.extend({
  options: {
    iconAnchor: null,
    popupAnchor: [-2, -16],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [40, 40],
  },
});

export { markerIcon };
