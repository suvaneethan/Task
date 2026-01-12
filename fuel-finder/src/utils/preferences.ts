import AsyncStorage from '@react-native-async-storage/async-storage';

const FUEL_KEY = 'LAST_FUEL';
const THEME_KEY = 'DARK_MODE';

export const saveFuelType = async (fuel: string) => {
    await AsyncStorage.setItem(FUEL_KEY, fuel);
};

export const loadFuelType = async () => {
    return AsyncStorage.getItem(FUEL_KEY);
};

export const saveTheme = async (isDark: boolean) => {
    await AsyncStorage.setItem(THEME_KEY, JSON.stringify(isDark));
};

export const loadTheme = async () => {
    const value = await AsyncStorage.getItem(THEME_KEY);
    return value ? JSON.parse(value) : false;
};
