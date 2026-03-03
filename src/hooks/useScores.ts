import { useEffect, useState } from 'react'
import { useStompClient } from '@/hooks/useStompClient.ts'
import { Score } from '@/types/score.ts'

export const useScores = (roomId: number): { scores: Score[] } => {
  const { client, isConnected } = useStompClient()
  const [scores, setScores] = useState<Score[]>([])

  useEffect(() => {
    if (!client || !isConnected) return

    const subscription = client.subscribe(
      `/sub/rooms/${roomId}/game/scores`,
      (message) => {
        try {
          const body = JSON.parse(message.body)
          setScores(body)
          console.log(body)
        } catch (err) {
          console.error('Failed to get Scores:', err)
        }
      },
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [client, isConnected, roomId])

  return { scores }
}
