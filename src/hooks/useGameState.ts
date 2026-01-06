import { useStompClient } from '@/hooks/useStompClient.ts'
import { GameState } from '@/types/game'
import { useEffect, useState } from 'react'

export const useGameState = (
  roomId: number,
): { gameState: GameState | undefined } => {
  const { client, isConnected } = useStompClient()
  const [gameState, setGameState] = useState<GameState>()

  useEffect(() => {
    if (!client || !isConnected) return

    const subscription = client.subscribe(
      `/sub/rooms/${roomId}/game-state`,
      (message) => {
        try {
          const receivedState = message.body
          if (Object.values(GameState).includes(receivedState as GameState)) {
            setGameState(receivedState as GameState)
            console.log(receivedState)
          } else {
            console.error('Invalid game state received:', receivedState)
          }
        } catch (err) {
          console.error('Failed to get game state:', err)
        }
      },
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [client, isConnected, roomId])

  return { gameState }
}
