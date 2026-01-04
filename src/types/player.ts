export interface Player {
  id: number
  nickname: string
  ready: boolean
  profileUrl: string
  score: number
}

export interface PlayerRequestDto {
  id: number
  nickname: string
  profileUrl: string
  ready: boolean
}
