import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from '../store/alertsSlice';

const ALERTS_KEY = 'ALERTS';

export const saveAlerts = async (alerts: Alert[]) => {
    await AsyncStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
};

export const loadAlerts = async (): Promise<Alert[]> => {
    const data = await AsyncStorage.getItem(ALERTS_KEY);
    return data ? JSON.parse(data) : [];
};
