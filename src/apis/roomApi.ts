import axiosClient from './axiosClient';

const roomApi = {
  createRoom: (userId: number) => axiosClient.get(`/users/${userId}`, {}),
};

export default roomApi;