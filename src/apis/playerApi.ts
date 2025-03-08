import axiosClient from './axiosClient.ts'
import { PlayerRequestDto } from '../types/player.ts'

const playerApi = {
  createPlayer: (request: PlayerRequestDto) =>
    axiosClient.post(`/players`, request),
}

export default playerApi
