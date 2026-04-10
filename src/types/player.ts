export interface Player {
  id: number
  nickname: string
  ready: boolean
  profileUrl: string
  score: number
}

export interface PlayerRequestDto {
  nickname: string
  profileUrl: string
}
