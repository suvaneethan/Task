import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { saveAlerts, loadAlerts } from '../api/alertsApi';

export interface Alert {
    id: string;
    stationId: string;
    stationName: string;
    targetPrice: number;
    enabled: boolean;
}

/* 🔹 Async thunk to LOAD alerts */
export const loadAlertsThunk = createAsyncThunk(
    'alerts/load',
    async () => {
        const data = await loadAlerts();
        return data;
    }
);

/* 🔹 Async thunk to SAVE alerts */
export const saveAlertsThunk = createAsyncThunk(
    'alerts/save',
    async (alerts: Alert[]) => {
        await saveAlerts(alerts);
    }
);

const initialState: Alert[] = [];

const alertsSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        /* ADD */
        addAlert: (state, action: PayloadAction<Alert>) => {
            state.push(action.payload);
        },

        /* REMOVE */
        removeAlert: (state, action: PayloadAction<string>) => {
            return state.filter(alert => alert.id !== action.payload);
        },

        /* TOGGLE ENABLED */
        toggleAlert: (state, action: PayloadAction<string>) => {
            const alert = state.find(a => a.id === action.payload);
            if (alert) {
                alert.enabled = !alert.enabled;
            }
        },

        /* ✅ UPDATE (FIXES EDIT BUTTON) */
        updateAlert: (
            state,
            action: PayloadAction<{ id: string; targetPrice: number }>
        ) => {
            const alert = state.find(a => a.id === action.payload.id);
            if (alert) {
                alert.targetPrice = action.payload.targetPrice;
            }
        },
    },

    extraReducers: builder => {
        builder.addCase(loadAlertsThunk.fulfilled, (_, action) => {
            return action.payload;
        });
    },
});

export const {
    addAlert,
    removeAlert,
    toggleAlert,
    updateAlert, //  export this
} = alertsSlice.actions;

export default alertsSlice.reducer;
