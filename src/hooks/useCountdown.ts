import { useStompClient } from '@/hooks/useStompClient.ts'
import { useEffect, useState } from 'react'

export const useCountdown = (
  roomId: number,
): { countdown: number | undefined } => {
  const { client, isConnected } = useStompClient()
  const [countdown, setCountdown] = useState<number>()

  useEffect(() => {
    if (!client || !isConnected) return

    const subscription = client.subscribe(
      `/sub/rooms/${roomId}/countdown`,
      (message) => {
        try {
          const countdown = Number(message.body)
          setCountdown(countdown)
          console.log(countdown)
        } catch (err) {
          console.error('Failed to get countdown:', err)
        }
      },
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [client, isConnected, roomId])

  return { countdown }
}
