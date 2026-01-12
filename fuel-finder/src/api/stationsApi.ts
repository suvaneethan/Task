import { stations } from './mockData';

export const fetchStations = async () => {
    await new Promise(resolve => setTimeout(resolve, 800)); // simulate delay
    return stations;
};
