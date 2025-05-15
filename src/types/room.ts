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
