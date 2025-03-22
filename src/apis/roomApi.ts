import axiosClient from './axiosClient'
import { RoomRequestDto } from '../types/room.ts'

const roomApi = {
  createRoom: (request: RoomRequestDto) => axiosClient.post(`/rooms`, request),
}

export default roomApi
