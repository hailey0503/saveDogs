import { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { withProtected} from '../src/app/routes';

function Map({auth, location}) {
 
  const { currentUser } = auth
  const center = useMemo(() => ({ lat: location[0], lng: location[1] }), []);

  return (
	<GoogleMap 
      zoom={8} 
      center={center} 
      mapContainerClassName="map-container"
  >
	<Marker position={center} />
  </GoogleMap>
  );
};

export default withProtected(Map);


