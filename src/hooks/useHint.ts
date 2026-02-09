import { useStompClient } from '@/hooks/useStompClient.ts'
import { useEffect, useState } from 'react'
import { AccumulatedHints, Hint } from '@/types/hint.ts'

export const useHint = (
  roomId: number,
): { hintData: AccumulatedHints | null } => {
  const { client, isConnected } = useStompClient()
  const [hintData, setHintData] = useState<AccumulatedHints | null>(null)

  useEffect(() => {
    if (!client || !isConnected) return

    const subscription = client.subscribe(
      `/sub/rooms/${roomId}/game/hint`,
      (message) => {
        try {
          const newHint: Hint = JSON.parse(message.body)
          setHintData((prev) => {
            if (prev && prev.quizId !== newHint.quizId) {
              return {
                quizOrder: newHint.quizOrder,
                quizId: newHint.quizId,
                answerLength: newHint.answerLength,
                hints: [newHint.hint],
              }
            }

            if (!prev) {
              return {
                quizOrder: newHint.quizOrder,
                quizId: newHint.quizId,
                answerLength: newHint.answerLength,
                hints: [newHint.hint],
              }
            }

            return {
              ...prev,
              hints: [...prev.hints, newHint.hint],
            }
          })
        } catch (err) {
          console.error('Failed to get hint:', err)
        }
      },
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [client, isConnected, roomId])

  return { hintData }
}
