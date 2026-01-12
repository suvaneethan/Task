import { View, Text, Button, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

interface AddAlertFormProps {
    onSubmit: (data: { price: number }) => void;
    defaultPrice?: number;
}

export default function AddAlertForm({
    onSubmit,
    defaultPrice,
}: AddAlertFormProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<{ price: string }>({
        defaultValues: {
            price: defaultPrice ? String(defaultPrice) : '',
        },
    });

    return (
        <View style={{ marginTop: 16 }}>
            {/* LABEL */}
            <Text style={{ marginBottom: 6, fontWeight: 'bold' }}>
                Target Price
            </Text>

            {/* INPUT */}
            <Controller
                control={control}
                name="price"
                rules={{
                    required: 'Target price is required',
                    validate: value =>
                        Number(value) > 0 || 'Enter a valid price',
                }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        keyboardType="numeric"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Enter target price"
                        style={{
                            borderWidth: 1,
                            borderColor: errors.price ? 'red' : '#ccc',
                            borderRadius: 6,
                            padding: 10,
                            marginBottom: 6,
                        }}
                    />
                )}
            />

            {/* ERROR MESSAGE */}
            {errors.price && (
                <Text style={{ color: 'red', marginBottom: 8 }}>
                    {errors.price.message}
                </Text>
            )}

            {/* SUBMIT */}
            <Button
                title="Save Alert"
                onPress={handleSubmit(data =>
                    onSubmit({ price: Number(data.price) })
                )}
            />
        </View>
    );
}
