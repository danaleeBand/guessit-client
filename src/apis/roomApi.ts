import axiosClient from './axiosClient'
import { RoomRequestDto } from '../types/room.ts'

const roomApi = {
  createRoom: (request: RoomRequestDto) => axiosClient.post(`/rooms`, request),
  checkPassword: (roomId: number, password: string) =>
    axiosClient.post(`/rooms/${roomId}/check-password`, { password }),
}

export default roomApi
