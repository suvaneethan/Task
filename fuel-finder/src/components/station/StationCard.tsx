import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function StationCard({ station, onPress }: any) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <Text style={styles.name}>{station.name}</Text>
            <Text>{station.address}</Text>
            <Text>{station.distance}</Text>
            <Text>₹ {station.price}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 12,
        marginVertical: 6,
        borderWidth: 1,
        borderRadius: 10,
    },
    name: {
        fontWeight: 'bold',
    },
});
