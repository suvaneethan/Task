import { TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ value, onChange }: any) {
    return (
        <TextInput
            placeholder="Search station..."
            value={value}
            onChangeText={onChange}
            style={styles.input}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
});
