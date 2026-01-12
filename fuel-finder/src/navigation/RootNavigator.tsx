import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import StationDetailsScreen from '../screens/StationDetailsScreen';
import NotFoundScreen from './NotFoundScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={BottomTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="StationDetails"
                component={StationDetailsScreen}
            />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
            />
        </Stack.Navigator>
    );
}
