import { View, Text, FlatList, Button, Switch } from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';

import SearchBar from '../components/common/SearchBar';
import StationCard from '../components/station/StationCard';
import { stations } from '../api/mockData';

//  Custom hooks
import { useDebounce } from '../hooks/useDebounce';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

//  AsyncStorage helpers
import { saveFuelType, loadFuelType } from '../utils/preferences';

//  Theme context
import { useTheme } from '../utils/useTheme';

export default function FindFuelScreen({ navigation }: any) {
    const { dark, toggleTheme } = useTheme();


    const [search, setSearch] = useState('');
    const [selectedFuel, setSelectedFuel] = useState('All');
    const [sortOrder, setSortOrder] = useState<'LOW' | 'HIGH'>('LOW');

    //  Loading, Error, Refresh
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fuelTypes = ['All', 'Petrol', 'Diesel', 'LPG'];

    //  Debounced search
    const debouncedSearch = useDebounce(search, 400);

    //  Mocked GPS
    const location = useCurrentLocation();

    //  Load persisted fuel preference
    useEffect(() => {
        loadFuelType().then(fuel => {
            if (fuel) setSelectedFuel(fuel);
        });
    }, []);

    //  Simulated API load
    const loadStations = useCallback(() => {
        setLoading(true);
        setError(false);

        setTimeout(() => {
            const shouldFail = false; // toggle for testing
            if (shouldFail) setError(true);

            setLoading(false);
            setRefreshing(false);
        }, 1000);
    }, []);

    //  Initial load
    useEffect(() => {
        loadStations();
    }, [loadStations]);

    //  Pull-to-refresh
    const onRefresh = () => {
        setRefreshing(true);
        loadStations();
    };

    //  Loading UI
    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: dark ? '#000' : '#fff',
                }}
            >
                <Text style={{ color: dark ? '#fff' : '#000' }}>
                    Loading stations...
                </Text>
            </View>
        );
    }

    //  Error UI
    if (error) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: dark ? '#000' : '#fff',
                }}
            >
                <Text
                    style={{
                        marginBottom: 10,
                        color: dark ? '#fff' : '#000',
                    }}
                >
                    Failed to load stations
                </Text>
                <Button title="Retry" onPress={loadStations} />
            </View>
        );
    }

    //  Filter & sort
    let filteredStations = stations.filter(s =>
        s.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    if (selectedFuel !== 'All') {
        filteredStations = filteredStations.filter(
            s => s.fuelType === selectedFuel
        );
    }

    filteredStations = filteredStations.sort((a, b) =>
        sortOrder === 'LOW' ? a.price - b.price : b.price - a.price
    );

    return (
        <View
            style={{
                flex: 1,
                padding: 12,
                backgroundColor: dark ? '#000' : '#fff',
            }}
        >
            {/* ================= HEADER ================= */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: dark ? '#fff' : '#000',
                    }}
                >
                    Find Fuel
                </Text>

                <Switch value={dark} onValueChange={toggleTheme} />
            </View>

            {/* ================= MAP VIEW ================= */}
            <MapView
                style={{ height: 220, borderRadius: 12 }}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {filteredStations.map(station => (
                    <Marker
                        key={station.id}
                        coordinate={{
                            latitude: station.latitude,
                            longitude: station.longitude,
                        }}
                        title={station.name}
                        description={`₹ ${station.price}`}
                        onPress={() =>
                            navigation.navigate('StationDetails', { id: station.id })
                        }
                    />
                ))}
            </MapView>

            {/* ================= SEARCH ================= */}
            <SearchBar value={search} onChange={setSearch} />

            {/* ================= FUEL FILTER ================= */}
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                {fuelTypes.map(type => (
                    <Text
                        key={type}
                        onPress={() => {
                            setSelectedFuel(type);
                            saveFuelType(type);
                        }}
                        style={{
                            marginRight: 10,
                            padding: 6,
                            borderRadius: 6,
                            backgroundColor:
                                selectedFuel === type
                                    ? dark
                                        ? '#fff'
                                        : '#000'
                                    : '#ddd',
                            color:
                                selectedFuel === type
                                    ? dark
                                        ? '#000'
                                        : '#fff'
                                    : '#000',
                        }}
                    >
                        {type}
                    </Text>
                ))}
            </View>

            {/* ================= SORT ================= */}
            {/* ================= SORT FILTER ================= */}
            <View
                style={{
                    flexDirection: 'row',
                    marginBottom: 12,
                    borderRadius: 8,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#ccc',
                }}
            >
                <Text
                    onPress={() => setSortOrder('LOW')}
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        paddingVertical: 8,
                        backgroundColor: sortOrder === 'LOW' ? '#000' : 'transparent',
                        color: sortOrder === 'LOW' ? '#fff' : '#000',
                        fontWeight: sortOrder === 'LOW' ? 'bold' : 'normal',
                    }}
                >
                    Price Low → High
                </Text>

                <Text
                    onPress={() => setSortOrder('HIGH')}
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        paddingVertical: 8,
                        backgroundColor: sortOrder === 'HIGH' ? '#000' : 'transparent',
                        color: sortOrder === 'HIGH' ? '#fff' : '#000',
                        fontWeight: sortOrder === 'HIGH' ? 'bold' : 'normal',
                    }}
                >
                    Price High → Low
                </Text>
            </View>

            {/* ================= STATION LIST ================= */}
            <FlatList
                data={filteredStations}
                keyExtractor={item => item.id}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({ item }) => (
                    <StationCard
                        station={item}
                        onPress={() =>
                            navigation.navigate('StationDetails', { id: item.id })
                        }
                    />
                )}
            />
        </View>
    );
}
