import { ResizablePanel, ResizablePanelGroup } from '../components/ui/resizable'
import { Settings } from 'lucide-react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '../components/ui/input-otp'
import { Separator } from '../components/ui/separator'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../components/ui/avatar.tsx'

const defaultRoom = {
  title: '방 제목',
  players: [
    {
      id: 1,
      name: '유저1',
      profileUrl: 'https://i.postimg.cc/J76717dq/2025-02-07-9-11-10.png',
      score: 2,
    },
    {
      id: 2,
      name: '유저2',
      profileUrl: 'https://i.postimg.cc/J76717dq/2025-02-07-9-11-10.png',
      score: 3,
    },
    {
      id: 3,
      name: '유저3',
      profileUrl: 'https://i.postimg.cc/J76717dq/2025-02-07-9-11-10.png',
      score: 10,
    },
    {
      id: 4,
      name: '유저4',
      profileUrl: 'https://i.postimg.cc/J76717dq/2025-02-07-9-11-10.png',
      score: 0,
    },
    {
      id: 5,
      name: '유저5',
      profileUrl: 'https://i.postimg.cc/J76717dq/2025-02-07-9-11-10.png',
      score: 0,
    },
  ],
  quizAnswerLength: 4,
  quizHints: ['태양', '노란색', '햄스터', '씨앗'],
}

export default function Room() {
  return (
    <div>
      <div className="mt-10 flex flex-col items-center text-center">
        <div className="w-full max-w-[600px] px-4 sm:px-6 lg:px-8  mx-auto mt-8">
          <div className="mt-10 flex w-full flex-row justify-between items-center">
            <h1 className="text-3xl font-semibold text-gray-800">
              {defaultRoom.title}
            </h1>
            <Settings />
          </div>

          <div className="w-full flex justify-end">
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
          </div>

          <div className="w-full">
            <ResizablePanelGroup
              direction="vertical"
              className="min-h-[300px] w-full rounded-lg mx-auto"
            >
              <ResizablePanel defaultSize={75} className="w-full">
                <div className="flex h-full items-center justify-center p-6 bg-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    {defaultRoom.quizHints.map((hint, index) => (
                      <span key={index} className="font-semibold">
                        {hint}
                      </span>
                    ))}
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          <div className="w-full flex justify-center items-center my-10">
            <InputOTP maxLength={defaultRoom.quizAnswerLength}>
              <InputOTPGroup>
                {Array.from({ length: defaultRoom.quizAnswerLength }).map(
                  (_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ),
                )}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Separator />
        </div>

        <div className="mt-8 flex justify-center gap-8 flex-wrap">
          {defaultRoom.players.map((player) => (
            <div
              key={player.id}
              className="flex flex-col items-center space-y-2"
            >
              <Avatar className="bg-gray-200 text-black">
                <AvatarFallback>{player.id}</AvatarFallback>
                <AvatarImage src={player.profileUrl} />
              </Avatar>
              <div className="text-sm">{player.name}</div>
              <div className="rounded-md border px-2 py-1 text-xs">
                {player.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
