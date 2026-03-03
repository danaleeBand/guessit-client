import { Answer } from '@/types/answer.ts'
import { useStompClient } from '@/hooks/useStompClient.ts'
import { useEffect, useState } from 'react'

export const useAnswer = (roomId: number): { answer: Answer | undefined } => {
  const { client, isConnected } = useStompClient()
  const [answer, setAnswer] = useState<Answer>()

  useEffect(() => {
    if (!client || !isConnected) return

    const subscription = client.subscribe(
      `/sub/rooms/${roomId}/game/answer`,
      (message) => {
        try {
          const body = JSON.parse(message.body)
          setAnswer(body)
        } catch (err) {
          console.error('Failed to get Answer:', err)
        }
      },
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [client, isConnected, roomId])

  return { answer }
}
