import { useEffect, useState } from 'react'
import { useStompClient } from './useStompClient'
import { Room } from '@/types/room.ts'
import roomApi from '@/apis/roomApi.ts'

export const useRoomList = (): Room[] => {
  const { client, isConnected } = useStompClient()
  const [roomList, setRoomList] = useState<Room[]>([])

  useEffect(() => {
    const fetchInitialRooms = async () => {
      try {
        const res = await roomApi.getRooms()
        setRoomList(res.data)
      } catch (err) {
        console.error('Failed to fetch initial rooms:', err)
      }
    }

    fetchInitialRooms()
  }, [])

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

    return () => {
      subscription.unsubscribe()
    }
  }, [client, isConnected])

  return roomList
}
