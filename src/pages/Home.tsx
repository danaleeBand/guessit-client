import { IoMdLock } from 'react-icons/io'
import { Button } from '../components/ui/button.tsx'
import { useEffect, useRef, useState } from 'react'
import CreateRoomModal from '@/components/CreateRoomModal.tsx'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import PasswordModal from '@/components/PasswordModal.tsx'
import roomApi from '@/apis/roomApi.ts'
import { useToast } from '@/hooks/use-toast.ts'
import {Client} from "@stomp/stompjs";
import {list} from "postcss";

export default function Home() {
  const { toast } = useToast()

  const ws = useRef<WebSocket | null>(null)

  type Player = {
    id: number
    nickname: string
    profileUrl: string
  }

  type RoomItem = {
    id: number
    title: string
    code: string
    locked: boolean
    playing: boolean
    players: Player[]
  }

  const [roomList, setRoomList] = useState<RoomItem[]>([])
  const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(null)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    roomApi.getRooms()
        .then(res => setRoomList(res.data));
  }, []);

  useEffect(() => {
    const client = new Client({
      brokerURL: `${import.meta.env.VITE_WEB_SOCKET_SERVER_BASE_URL}/ws`,
      debug: (str) => console.log("[STOMP]", str),
      onConnect: () => {
        console.log("STOMP 연결 성공");
        client.subscribe("/sub/rooms", (message) => {
          setRoomList(JSON.parse(message.body));
        });
      },
    });

    client.activate();

    return () => {
      client.deactivate().then(() => {
        console.log("STOMP 연결 종료");
      });
    };
  }, [])

  const handleJoinClick = async (room: RoomItem) => {
    const playerId = Number(sessionStorage.getItem('playerId'))

    if (room.locked) {
      setSelectedRoom(room)
      setIsPasswordModalOpen(true)
    } else {
      try {
        const res = await roomApi.joinRoom(room.id, { playerId, password: '' })

        const { valid, message } = res.data

        if (valid) {
          navigate(`/room/${room.id}`)
        } else {
          toast({
            title: message,
          })
        }
      } catch (err) {
        console.error(err)
        toast({
          variant: 'destructive',
          title: '방 입장 중 오류가 발생했습니다.',
        })
      }
    }
  }

  return (
    <>
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Guess It!</h1>
      </div>
      <CreateRoomModal />

      <div className="mt-10 flex flex-col items-center text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roomList.map((value) => (
            <Card
              key={value.id}
              className={`w-[320px] ${value.playing ? 'opacity-50 pointer-events-none' : 'hover:shadow-lg'}`}
            >
              <CardHeader className="text-left">
                <CardTitle>
                  <div className="flex items-center space-x-2">
                    {value.locked && <IoMdLock className="text-lg" />}
                    <span>{value.title}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardDescription className="text-left px-6 pb-2">
                {value.code}
              </CardDescription>
              <CardFooter className="flex justify-between items-center">
                <span className="bg-gray-100 text-gray-700 font-semibold text-sm px-2 py-1 rounded-md">
                  {value.players.length} / 5
                </span>
                <Button onClick={() => handleJoinClick(value)}>Join</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {selectedRoom && (
        <PasswordModal
          roomId={selectedRoom.id}
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
    </>
  )
}
