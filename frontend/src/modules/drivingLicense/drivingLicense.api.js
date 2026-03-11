import axios from "axios";

export const getDrivingLicense = async () => await axios.get('/api/driving-license');
export const addDrivingLicense = async (data) => await axios.post('/api/driving-license', data);