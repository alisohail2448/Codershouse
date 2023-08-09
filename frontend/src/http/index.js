import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

export const sendOtp = (data) => api.post('/api/send-otp', data);


export const verifyOtp = (data) => api.post('/api/verify-otp', data);

export const sendOtpByEmail = (data) => api.post('/api/send-otp-email', data);

export const verifyOtpOfEmail = (data) => api.post('/api/verify-otp-email', data);

export const activateAccount = (data) => api.post('/api/activate', data);


export const logout = () => api.post('/api/logout');


export const createRooms = (data) => api.post('/api/rooms', data);



export const getAllRooms = () => api.get('/api/rooms');

export const getUserAllRooms = () => api.get('/api/user-room');

export const updateUser = (userId, data) => api.put(`/api/users/${userId}`, data);

export const getRoom = (roomId) => api.get(`/api/rooms/${roomId}`);


export const deleteUserRoom = (roomId) => api.delete(`/api/rooms/${roomId}`);






api.interceptors.response.use((config) => {
    return config;
}, async(error)=> {
    const originalRequest = error.config;
    if(error.response.status === 401 && originalRequest && !originalRequest._isRetry){
        originalRequest.isRetry = true;

        try {
            await axios.get("http://localhost:5000/api/refresh", {
                withCredentials: true,
            })


            return api.request(originalRequest);
        } catch (error) {
            console.log(error.message);
        }
    }
})


export default api;