import { Player } from '@/types/player.ts'

export interface RoomCreateRequestDto {
  title: string
  locked: boolean
  password: string
  creatorId: number
}

export interface RoomJoinRequestDto {
  playerId: number
  password: string
}

export type Room = {
  id: number
  title: string
  code: string
  locked: boolean
  playing: boolean
  playerCount: number
}

export type RoomDetail = {
  id: number
  title: string
  code: string
  locked: boolean
  playing: boolean
  creator: Player
  players: Player[]
}
