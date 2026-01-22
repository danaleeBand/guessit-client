export enum GameState {
  WAITING = 'WAITING',
  COUNTDOWN = 'COUNTDOWN',
  HINT = 'HINT',
  SCORING = 'SCORING',
  FINISHED = 'FINISHED',
}

export interface Game {
  state: GameState
}
