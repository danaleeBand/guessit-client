import axiosClient from './axiosClient';

const roomApi = {
  createRoom: (request) => axiosClient.post(`/rooms`, request),
};

export default roomApi;