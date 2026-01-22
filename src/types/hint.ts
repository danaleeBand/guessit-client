export interface Hint {
  quizOrder: number
  quizId: number
  hint: string
  answerLength: number
}

export interface AccumulatedHints {
  quizOrder: number
  quizId: number
  answerLength: number
  hints: string[]
}
