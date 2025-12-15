import axiosClient from './axiosClient'
import { RoomCreateRequestDto, RoomJoinRequestDto } from '../types/room.ts'

const roomApi = {
  getRooms: () => axiosClient.get(`/rooms`),
  createRoom: (request: RoomCreateRequestDto) =>
    axiosClient.post(`/rooms`, request),
  joinRoom: (roomId: number, request: RoomJoinRequestDto) =>
    axiosClient.post(`/rooms/${roomId}/join`, request),
}

export default roomApi
