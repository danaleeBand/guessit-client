import { ResizablePanel, ResizablePanelGroup } from '../components/ui/resizable'
import { Settings } from 'lucide-react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '../components/ui/input-otp'
import { Separator } from '../components/ui/separator'
import { Toggle } from '@/components/ui/toggle.tsx'
import { Label } from '@/components/ui/label.tsx'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { useParams } from 'react-router-dom'
import Player from '@/components/Player.tsx'
import { IoMdLock } from 'react-icons/io'
import { useRoom } from '@/hooks/useRoom.ts'
import Loading from '@/pages/Loading.tsx'

export interface Room {
  id: number
  code: string
  title: string
  playing: boolean
  locked: boolean
  creator: Player
  players: Player[]
}

export interface Player {
  id: number
  nickname: string
  isReady: boolean
  profileUrl: string
}

export default function Room() {
  const { id } = useParams<{ id: string }>()
  const roomId = useMemo<number | null>(() => {
    if (!id) return null
    const parsed = Number(id)
    return Number.isNaN(parsed) ? null : parsed
  }, [id])

  if (roomId === null) {
    return <Loading />
  }

  const room = useRoom(roomId)
  const [isReady] = useState(false)
  const isCreator = useMemo(() => {
    return room?.creator?.id.toString() === sessionStorage.getItem('playerId')
  }, [room])

  const isAllReady = useMemo(() => {
    if (!room) return false
    return room.players
      .filter((player) => player.id !== room.creator.id)
      .every((player) => player.isReady)
  }, [room])

  function onReadyClick() {
    // setIsReady(!isReady)
    // ws.current?.send(
    //   JSON.stringify({
    //     roomId: roomId,
    //     playerId: sessionStorage.getItem('playerId'),
    //   }),
    // )
  }

  return (
    <div>
      <div className="mt-5 flex flex-col items-center text-center">
        <div className="w-full max-w-[600px] px-4 sm:px-6 lg:px-8  mx-auto">
          <div className="flex w-full flex-row justify-between items-center mb-5">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-1">
                {room?.title}
                {room?.locked && <IoMdLock />}
              </h1>
            </div>
            <div>
              {isCreator && !room?.playing && (
                <Settings className="hover:animate-spin" />
              )}
              {room?.playing && (
                <ResizablePanelGroup
                  direction="vertical"
                  className="min-h-[50px] max-w-min rounded-lg border"
                >
                  <ResizablePanel defaultSize={75}>
                    <div className="flex h-full items-center justify-center p-6">
                      <span className="font-semibold">1/10</span>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              )}
            </div>
          </div>

          <div className="w-full">
            <ResizablePanelGroup
              direction="vertical"
              className="min-h-[300px] w-full rounded-lg mx-auto"
            >
              <ResizablePanel defaultSize={75} className="w-full">
                <div className="flex h-full items-center justify-center p-6 bg-gray-100">
                  <div>
                    <Toggle
                      pressed={isReady}
                      onPressedChange={onReadyClick}
                      variant="outline"
                      hidden={isCreator}
                      className="bg-white data-[state=on]:bg-gray-200 w-24 h-12"
                    >
                      <Label className="text-lg font-bold">
                        {isReady ? '준비완료' : '준비'}
                      </Label>
                    </Toggle>
                    <Button
                      variant="outline"
                      disabled={!isAllReady}
                      hidden={!isCreator}
                      className="text-lg font-bold h-12 w-24"
                    >
                      게임시작
                    </Button>
                  </div>
                  {/*<div className="grid grid-cols-2 gap-4">*/}
                  {/*  {defaultRoom.quizHints.map((hint, index) => (*/}
                  {/*    <span key={index} className="font-semibold">*/}
                  {/*      {hint}*/}
                  {/*    </span>*/}
                  {/*  ))}*/}
                  {/*</div>*/}
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          <div className="w-full flex justify-center items-center my-10">
            <InputOTP maxLength={5} disabled={!room?.playing}>
              <InputOTPGroup>
                {Array.from({ length: 5 }).map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Separator />
        </div>

        <div className="mt-8 flex justify-center gap-8 flex-wrap">
          {room?.players.map((player) => (
            <div
              key={player.id}
              className="flex flex-col items-center space-y-2"
            >
              <Player player={player} creatorId={room?.creator?.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
