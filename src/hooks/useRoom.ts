import { useStompClient } from '@/hooks/useStompClient.ts'
import { useEffect, useState } from 'react'
import { RoomDetail } from '@/types/room.ts'
import roomApi from '@/apis/roomApi.ts'

export const useRoom = (roomId: number): RoomDetail | undefined => {
  const { client, isConnected } = useStompClient()
  const [room, setRoom] = useState<RoomDetail>()

  useEffect(() => {
    const fetchInitialRooms = async () => {
      try {
        const res = await roomApi.getRoom(roomId)
        setRoom(res.data)
      } catch (err) {
        console.error('Failed to fetch initial room:', err)
      }
    }

    fetchInitialRooms()
  }, [roomId])

  useEffect(() => {
    if (!client || !isConnected) return

    const subscription = client.subscribe(`/sub/rooms/${roomId}`, (message) => {
      try {
        const room = JSON.parse(message.body)
        setRoom(room)
      } catch (err) {
        console.error('Failed to parse room:', err)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [client, isConnected, roomId])

  return room
}
