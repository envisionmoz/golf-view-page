"use client"

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Location = () => {
    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: -25.93590,
        lng: 32.61548
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyDGh5ehBpq4q-i5isPVJzUFSEjJSsHGB6M" >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
                
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};

export default Location;
