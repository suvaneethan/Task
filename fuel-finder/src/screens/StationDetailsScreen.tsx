import {
    View,
    Text,
    ScrollView,
    Button,
    Image,
    Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { stations } from '../api/mockData';

const screenWidth = Dimensions.get('window').width;

export default function StationDetailsScreen({ route, navigation }: any) {
    const station = stations.find(s => s.id === route.params?.id);

    if (!station) {
        return <Text style={{ padding: 16 }}>Station not found</Text>;
    }

    const priceDiff = station.price - station.yesterdayPrice;

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            {/* ================= HEADER ================= */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 16,
                }}
            >
                {/* LOGO */}
                <Image
                    source={{ uri: station.logo }}
                    style={{
                        width: 50,
                        height: 50,
                        marginRight: 12,
                        resizeMode: 'contain',
                    }}
                />

                {/* BASIC INFO */}
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        {station.name}
                    </Text>
                    <Text>{station.address}</Text>
                    <Text>Distance: {station.distance}</Text>
                    <Text>Rating: ⭐ {station.rating}</Text>
                    <Text>Open Today: {station.openingHours.Mon}</Text>
                </View>
            </View>

            {/* ================= PRICE INFO ================= */}
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontWeight: 'bold' }}>Current Price</Text>
                <Text style={{ fontSize: 18 }}>₹ {station.price}</Text>
                <Text style={{ color: priceDiff >= 0 ? 'red' : 'green' }}>
                    {priceDiff >= 0 ? '+' : ''}
                    {priceDiff.toFixed(2)} since yesterday
                </Text>
            </View>

            {/* ================= PRICE TREND CHART ================= */}
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
                7-Day Price Trend
            </Text>

            <LineChart
                data={{
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            data: [
                                station.yesterdayPrice - 1,
                                station.yesterdayPrice,
                                station.yesterdayPrice + 0.5,
                                station.yesterdayPrice + 1,
                                station.yesterdayPrice + 1.5,
                                station.yesterdayPrice,
                                station.price,
                            ],
                        },
                    ],
                }}
                width={screenWidth - 32}
                height={220}
                yAxisSuffix="₹"
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 0,
                    color: () => '#000',
                    labelColor: () => '#000',
                    propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: '#000',
                    },
                }}
                style={{
                    borderRadius: 12,
                    marginBottom: 16,
                }}
            />

            {/* ================= AMENITIES ================= */}
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
                Amenities
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {station.amenities.map((a: string) => (
                    <View
                        key={a}
                        style={{
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            margin: 4,
                            backgroundColor: '#eee',
                            borderRadius: 20,
                        }}
                    >
                        <Text>{a}</Text>
                    </View>
                ))}
            </View>

            {/* ================= WEEKLY HOURS ================= */}
            <Text
                style={{
                    marginTop: 16,
                    fontWeight: 'bold',
                    marginBottom: 6,
                }}
            >
                Weekly Opening Hours
            </Text>

            {Object.entries(station.openingHours).map(([day, time]) => (
                <Text key={day}>
                    {day}: {time}
                </Text>
            ))}

            {/* ================= ALERT BUTTON ================= */}
            <View style={{ marginTop: 24 }}>
                <Button
                    title="Set Price Alert"
                    onPress={() =>
                        navigation.navigate('Root', {
                            screen: 'Alerts',
                            params: {
                                stationId: station.id,
                                stationName: station.name,
                                currentPrice: station.price,
                            },
                        })
                    }
                />
            </View>
        </ScrollView>
    );
}
