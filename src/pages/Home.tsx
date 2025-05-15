import { Card, SimpleGrid } from '@chakra-ui/react'
import { IoMdLock } from 'react-icons/io'
import { Button } from '../components/ui/button.tsx'
import { useEffect, useRef, useState } from 'react'
import CreateRoomModal from '@/components/CreateRoomModal.tsx'

export default function Home() {
  const ws = useRef<WebSocket | null>(null)

  type RoomItem = {
    id: number
    title: string
    code: string
    locked: boolean
    playing: boolean
    playerCount: number
  }

  const [roomList, setRoomList] = useState<RoomItem[]>([])

  useEffect(() => {
    ws.current = new WebSocket(
      `${import.meta.env.VITE_WEB_SOCKET_SERVER_BASE_URL}/ws/rooms`,
    )

    ws.current.onopen = () => {
      console.log('WebSocket connected')
      ws.current?.send(JSON.stringify({ type: 'get_items' }))
    }

    ws.current.onmessage = (event) => {
      const rawMessage = event.data

      try {
        const message = JSON.parse(rawMessage)
        setRoomList(message)
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err)
      }
    }

    ws.current.onclose = () => {
      console.log('WebSocket disconnected')
    }

    return () => {
      ws.current?.close()
    }
  }, [])

  const playerId = sessionStorage.getItem('playerId')
  if (!playerId) {
    alert('로그인이 필요합니다!')
    return
  }

  return (
    <>
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Guess It!</h1>
      </div>
      <CreateRoomModal />

      <div className="mt-10 flex flex-col items-center text-center">
        <SimpleGrid columns={[1, 2]} gap="4">
          {roomList.map((value) => (
            <Card.Root
              width="320px"
              variant={'elevated'}
              key={value.id}
              _hover={{ boxShadow: value.playing ? 'none' : 'lg' }}
              style={{ opacity: value.playing ? 0.5 : 1 }}
              pointerEvents={value.playing ? 'none' : 'auto'}
            >
              <Card.Body gap="2">
                <Card.Title mb="2">
                  <div className="flex items-center space-x-2 text-lg">
                    {value.locked ? <IoMdLock className="mr-1.5" /> : ''}{' '}
                    {value.title}
                  </div>
                </Card.Title>
                <Card.Description>{value.code}</Card.Description>
              </Card.Body>
              <Card.Footer justifyContent="space-between" alignItems="center">
                <span className="bg-gray-100 text-gray-700 font-semibold text-sm px-2 py-1 rounded-md">
                  {value.playerCount} / 5
                </span>
                <Button>Join</Button>
              </Card.Footer>
            </Card.Root>
          ))}
        </SimpleGrid>
      </div>
    </>
  )
}
