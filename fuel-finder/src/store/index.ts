import { configureStore } from '@reduxjs/toolkit';
import stationsReducer from './stationsSlice';
import alertsReducer from './alertsSlice';

export const store = configureStore({
    reducer: {
        stations: stationsReducer,
        alerts: alertsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
