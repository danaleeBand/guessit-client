import { useEffect, useState } from 'react'
import { useStompClient } from '@/hooks/useStompClient.ts'
import { Submission } from '@/types/submission.ts'

export const useSubmission = (
  roomId: number,
): { submissions: Submission[] } => {
  const { client, isConnected } = useStompClient()
  const [submissions, setSubmissions] = useState<Submission[]>([])

  useEffect(() => {
    if (!client || !isConnected) return

    const subscription = client.subscribe(
      `/sub/rooms/${roomId}/game/submissions`,
      (message) => {
        try {
          const body = JSON.parse(message.body)
          setSubmissions(body)
        } catch (err) {
          console.error('Failed to get Submission:', err)
        }
      },
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [client, isConnected, roomId])

  return { submissions }
}
