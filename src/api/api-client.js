import axios from 'axios';

// import { getToken } from '../utils/token-helper';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const IMAGE_UPLOAD_URL = import.meta.env.VITE_IMAGE_UPLOAD_URL;

export const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const imageUploadClient = axios.create({
	baseURL: IMAGE_UPLOAD_URL,
	headers: {
		'Content-Type': 'multipart/form-data',
	},
});

// apiClient.interceptors.request.use(
// 	(config) => {
// 		const token = getToken();
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		error.response?.data?.message || 'Something went wrong with the request';
// 		return Promise.reject(error);
// 	}
// );
