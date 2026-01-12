import { View, Text, Button, FlatList, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    addAlert,
    removeAlert,
    toggleAlert,
    updateAlert,
} from '../store/alertsSlice';
import { stations } from '../api/mockData';

export default function AlertsScreen({ route }: any) {
    const alerts = useSelector((state: any) => state.alerts);
    const dispatch = useDispatch();

    // 🔹 Station data from navigation (when coming from details screen)
    const stationId = route?.params?.stationId;
    const stationName = route?.params?.stationName;
    const currentPrice = route?.params?.currentPrice;

    // 🔹 Create new alert
    const createAlert = () => {
        if (!stationId || !stationName) return;

        dispatch(
            addAlert({
                id: Date.now().toString(),
                stationId,
                stationName,
                targetPrice: currentPrice,
                enabled: true,
            })
        );
    };

    return (
        <View style={{ padding: 16, flex: 1 }}>
            {/* ================= ADD ALERT ================= */}
            {stationId ? (
                <Button
                    title={`Add Alert for ${stationName}`}
                    onPress={createAlert}
                />
            ) : (
                <Text style={{ marginBottom: 12 }}>
                    Select a station to add a price alert
                </Text>
            )}

            {/* ================= ALERT LIST ================= */}
            <FlatList
                data={alerts}
                keyExtractor={item => item.id}
                contentContainerStyle={{ marginTop: 16 }}
                ListEmptyComponent={
                    <Text style={{ marginTop: 20 }}>
                        No alerts created yet
                    </Text>
                }
                renderItem={({ item }) => {
                    // 🔹 Find related station (mocked join)
                    const station = stations.find(
                        s => s.id === item.stationId
                    );

                    const isOpen =
                        station?.openingHours?.Mon !== 'Closed';

                    return (
                        <View
                            style={{
                                marginVertical: 10,
                                padding: 12,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#ddd',
                            }}
                        >
                            {/* Station Info */}
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                {item.stationName}
                            </Text>

                            <Text>
                                Current Price: ₹{station?.price}
                            </Text>

                            <Text>
                                Status: {isOpen ? 'Open' : 'Closed'}
                            </Text>

                            <Text>
                                Distance: {station?.distance}
                            </Text>

                            <Text>
                                Alert Price: ₹{item.targetPrice}
                            </Text>

                            {/* ENABLE / DISABLE */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginVertical: 8,
                                }}
                            >
                                <Text>
                                    Notifications: {item.enabled ? 'On' : 'Off'}
                                </Text>

                                <Switch
                                    value={item.enabled}
                                    onValueChange={(value: boolean) => {
                                        dispatch(toggleAlert(item.id));
                                    }}
                                />
                            </View>

                            {/* ✅ EDIT ALERT (FIXED) */}
                            <Button
                                title="Edit Alert (+₹1)"
                                onPress={() =>
                                    dispatch(
                                        updateAlert({
                                            id: item.id,
                                            targetPrice: item.targetPrice + 1,
                                        })
                                    )
                                }
                            />

                            {/* DELETE */}
                            <View style={{ marginTop: 6 }}>
                                <Button
                                    title="Delete Alert"
                                    color="red"
                                    onPress={() =>
                                        dispatch(removeAlert(item.id))
                                    }
                                />
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
}
