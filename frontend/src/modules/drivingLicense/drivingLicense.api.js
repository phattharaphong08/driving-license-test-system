import axios from "axios";

export const getDrivingLicense = async () => await axios.get('http://localhost:5008/api/driving-license');
export const addDrivingLicense = async (data) => await axios.post('http://localhost:5008/api/driving-license', data);

export const getDrivingLicenseById = async (id) => await axios.get(`http://localhost:5008/api/driving-license/${id}`);
export const editDrivingLicense = async (id, data) => await axios.put(`http://localhost:5008/api/driving-license/${id}`, data);

export const deleteDriving = async (id) => await axios.delete(`http://localhost:5008/api/driving-license/${id}`);