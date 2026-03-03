import { DoorClosed, DoorOpen, Settings } from 'lucide-react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '../components/ui/input-otp'
import { Separator } from '../components/ui/separator'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import PlayerProfile from '@/components/PlayerProfile.tsx'
import { IoMdLock } from 'react-icons/io'
import { useRoom } from '@/hooks/useRoom.ts'
import NotFound from '@/pages/NotFound.tsx'
import { useStompClient } from '@/hooks/useStompClient.ts'
import Board from '@/components/Board.tsx'
import { useCountdown } from '@/hooks/useCountdown.ts'
import { useGameState } from '@/hooks/useGameState.ts'
import { useHint } from '@/hooks/useHint.ts'
import Box from '@/components/Box.tsx'
import { GameState } from '@/types/game.ts'
import { useSubmission } from '@/hooks/useSubmission.ts'
import { useAnswer } from '@/hooks/useAnswer.ts'
import { useScores } from '@/hooks/useScores.ts'

export default function Room() {
  const navigate = useNavigate()
  const hasLeftRef = useRef(false)

  const { id } = useParams<{ id: string }>()
  const { client, isConnected } = useStompClient()
  const [ready, setReady] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const playerId = Number(sessionStorage.getItem('playerId'))
  const roomId = useMemo<number | null>(() => {
    if (!id) return null
    const parsed = Number(id)
    return Number.isNaN(parsed) ? null : parsed
  }, [id])

  const { room, isNotFound } = useRoom(roomId ?? 0)
  const { countdown } = useCountdown(roomId ?? 0)
  const { gameState } = useGameState(roomId ?? 0)
  const { hintData } = useHint(roomId ?? 0)
  const { submissions } = useSubmission(roomId ?? 0)
  // const { answer } = useAnswer(roomId ?? 0)
  const [answer, setAnswer] = useState({
    quizOrder: 1,
    quizId: 13,
    results: [
      {
        playerId: 34,
        isCorrect: true,
        submittedAnswer: '백설공주',
        rank: 1,
        score: 5,
      },
      {
        playerId: 33,
        isCorrect: false,
        submittedAnswer: '신데렐라',
        rank: 2,
        score: 5,
      },
    ],
    answer: '백설공주',
  })

  // const { scores } = useScores(roomId ?? 0)
  const [scores, setScores] = useState([
    {
      playerId: 33,
      score: 15,
      rank: 1,
    },
    {
      playerId: 34,
      score: 13,
      rank: 2,
    },
  ])

  const isCreator = useMemo(() => {
    return room?.creator?.id === playerId
  }, [room])

  const isAllReady = useMemo(() => {
    if (!room) return false
    return room.players
      .filter((player) => player.id !== room.creator.id)
      .every((player) => player.ready)
  }, [room])

  const onReadyClick = () => {
    const next = !ready
    setReady(next)

    if (!client || !isConnected) return

    client.publish({
      destination: '/pub/rooms/ready',
      body: JSON.stringify({
        roomId: roomId,
        playerId: playerId,
        ready: next,
      }),
    })
  }

  const handleLeave = () => {
    if (hasLeftRef.current) return
    if (!client || !client.active) return

    hasLeftRef.current = true

    client.publish({
      destination: '/pub/rooms/leave',
      body: JSON.stringify({ roomId, playerId }),
    })
  }

  const handleLeaveAndGoHome = () => {
    handleLeave()
    setTimeout(() => {
      navigate('/', { replace: true })
    }, 50)
  }

  const startGame = () => {
    if (hasLeftRef.current) return
    if (!client || !client.active) return

    client.publish({
      destination: `/pub/rooms/${roomId}/game/start`,
    })
  }

  const submitAnswer = () => {
    setSubmitted(true)
    const body = JSON.stringify({
      playerId: playerId,
      quizId: hintData?.quizId,
      answer: userAnswer,
    })
    client?.publish({
      destination: `/pub/rooms/${roomId}/submit`,
      body: body,
    })
  }

  useEffect(() => {
    if (!client || !isConnected || roomId === null || playerId === null) return

    client.publish({
      destination: '/pub/rooms/join',
      body: JSON.stringify({ roomId, playerId }),
    })
  }, [client, roomId, playerId])

  useEffect(() => {
    if (gameState === GameState.HINT) {
      setSubmitted(false)
      setUserAnswer('')
    }
  }, [gameState])

  if (roomId === null || playerId === null || isNotFound) {
    return <NotFound />
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
              <div className="flex items-center gap-1">
                {isCreator && !room?.playing && (
                  <Button
                    variant="ghost"
                    className="group h-8 w-8 p-1 [&_svg]:w-full [&_svg]:h-full"
                  >
                    <Settings className="group-hover:animate-spin-slow inline-block" />
                  </Button>
                )}

                <Button
                  variant="ghost"
                  className="group h-8 w-8 p-1 [&_svg]:w-full [&_svg]:h-full"
                  onClick={handleLeaveAndGoHome}
                >
                  <DoorClosed className="group-hover:hidden" />
                  <DoorOpen className="hidden group-hover:block" />
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-end mb-3">
              <Box className="px-3 py-1 w-20 text-center text-lg font-bold">
                {room?.playing && hintData?.quizOrder
                  ? `${hintData?.quizOrder} / 10`
                  : '...'}
              </Box>
            </div>

            <Board
              countdown={countdown}
              ready={ready}
              isCreator={isCreator}
              isAllReady={isAllReady}
              onReadyClick={onReadyClick}
              onStartGame={startGame}
              gameState={gameState}
              hints={hintData?.hints}
              romeState={room?.playing}
              answer={answer?.answer}
            />
          </div>
          게임 상태 : {gameState}
          <div className="w-full flex justify-center items-center my-10">
            <InputOTP
              maxLength={hintData?.answerLength ? hintData.answerLength : 5}
              disabled={!(gameState === GameState.HINT && !submitted)}
              value={userAnswer}
              onChange={setUserAnswer}
              onKeyDownCapture={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  e.stopPropagation()
                  submitAnswer()
                }
              }}
            >
              <InputOTPGroup>
                {Array.from({
                  length: hintData?.answerLength ? hintData.answerLength : 5,
                }).map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Separator />
        </div>

        <div className="mt-8 flex justify-center gap-8 flex-wrap">
          {room?.players.map((player, idx) => (
            <div
              key={`${room?.id}-${player.id}-${idx}`}
              className="flex flex-col items-center space-y-2"
            >
              <PlayerProfile
                player={player}
                creatorId={room?.creator?.id as number}
                playerId={playerId}
                roomState={room?.playing}
                submission={submissions?.find(
                  (submission) => submission.playerId === player.id,
                )}
                result={answer?.results.find(
                  (result) => result.playerId === player.id,
                )}
                gameState={gameState}
                score={scores?.find((score) => score.playerId === player.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
