import { useEffect, useState } from 'react'
import { useStompClient } from './useStompClient'
import { Room } from '@/types/room.ts'

export const useRoomList = () => {
  const { client, isConnected } = useStompClient()
  const [roomList, setRoomList] = useState<Room[]>([])

  useEffect(() => {
    if (!client || !isConnected) return

    const subscription = client.subscribe('/sub/rooms', (message) => {
      try {
        const rooms = JSON.parse(message.body)
        setRoomList(rooms)
      } catch (err) {
        console.error('Failed to parse room list:', err)
      }
    })

    client.publish({
      destination: '/pub/rooms',
      body: JSON.stringify({}),
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [client, isConnected])

  return roomList
}
