import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import BookingsScreen from '../screens/BookingsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import FindFuelScreen from '../screens/FindFuelScreen';
import AlertsScreen from '../screens/AlertsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Bookings':
                            iconName = focused ? 'calendar' : 'calendar-outline';
                            break;
                        case 'Analytics':
                            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                            break;
                        case 'Find Fuel':
                            iconName = focused ? 'car' : 'car-outline';
                            break;
                        case 'Alerts':
                            iconName = focused ? 'notifications' : 'notifications-outline';
                            break;
                        default:
                            iconName = 'ellipse';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Bookings" component={BookingsScreen} />
            <Tab.Screen name="Analytics" component={AnalyticsScreen} />
            <Tab.Screen name="Find Fuel" component={FindFuelScreen} />
            <Tab.Screen name="Alerts" component={AlertsScreen} />
        </Tab.Navigator>
    );
}
