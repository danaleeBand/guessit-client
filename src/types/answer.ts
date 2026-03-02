import { Result } from '@/types/result.ts'

export interface Answer {
  quizOrder: number
  quizId: number
  results: Result[]
  answer: string
}
