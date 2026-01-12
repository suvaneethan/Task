import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { loadAlertsThunk, saveAlertsThunk } from './src/store/alertsSlice';
import { useAppDispatch, useAppSelector } from './src/store/hooks';
import { ThemeProvider } from './src/utils/ThemeContext';

function AppWrapper() {
    const dispatch = useAppDispatch();
    const alerts = useAppSelector(state => state.alerts);

    useEffect(() => {
        dispatch(loadAlertsThunk());
    }, [dispatch]);

    useEffect(() => {
        dispatch(saveAlertsThunk(alerts));
    }, [alerts, dispatch]);

    return <RootNavigator />;
}

export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <NavigationContainer>
                    <AppWrapper />
                </NavigationContainer>
            </ThemeProvider>
        </Provider>
    );
}
