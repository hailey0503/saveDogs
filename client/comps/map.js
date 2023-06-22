import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { withPublic} from '../src/app/routes';

function Map({auth}) {
 
  const { currentUser } = auth
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
	<GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
	<Marker position={center} />
  </GoogleMap>
  );
};

export default withPublic(Map);


