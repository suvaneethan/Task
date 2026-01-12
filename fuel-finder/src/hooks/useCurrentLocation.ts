import { useEffect, useState } from 'react';

export function useCurrentLocation() {
    const [location, setLocation] = useState({
        latitude: 13.0827,
        longitude: 80.2707,
    });

    useEffect(() => {
        // mocked GPS
        setTimeout(() => {
            setLocation({
                latitude: 13.0827,
                longitude: 80.2707,
            });
        }, 500);
    }, []);

    return location;
}
