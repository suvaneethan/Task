import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StationState {
    stations: any[];
    loading: boolean;
}

const initialState: StationState = {
    stations: [],
    loading: false,
};

const stationsSlice = createSlice({
    name: 'stations',
    initialState,
    reducers: {
        setStations(state, action: PayloadAction<any[]>) {
            state.stations = action.payload;
        },
    },
});

export const { setStations } = stationsSlice.actions;
export default stationsSlice.reducer;
