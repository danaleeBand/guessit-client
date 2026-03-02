import { Button } from '@/components/ui/button'
import { GameState } from '@/types/game.ts'
import Box from '@/components/Box.tsx'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'

interface BoardProps {
  countdown: number | undefined
  ready: boolean
  isCreator: boolean
  isAllReady: boolean
  onReadyClick: () => void
  onStartGame: () => void
  gameState: GameState | undefined
  hints: string[] | undefined
  romeState: boolean | undefined
  answer: string | undefined
}

const Board = ({
  countdown,
  ready,
  isCreator,
  isAllReady,
  onReadyClick,
  onStartGame,
  gameState,
  hints,
  romeState,
  answer,
}: BoardProps) => {
  return (
    <Box className="min-h-[300px] w-full rounded-lg mx-auto overflow-hidden shadow-none">
      <div className="relative flex h-full min-h-[300px] items-center justify-center p-6 bg-gray-100">
        {gameState === GameState.COUNTDOWN && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 backdrop-blur-sm">
            <div
              key={countdown}
              className="text-white text-6xl font-bold animate-pulse"
            >
              {countdown === 0 ? 'Start!' : countdown}
            </div>
          </div>
        )}

        {!romeState && (
          <div>
            <Button
              variant="outline"
              onClick={onReadyClick}
              hidden={isCreator}
              className="w-24 h-12 text-lg font-bold"
            >
              {ready ? '준비 취소' : '준비'}
            </Button>

            <Button
              variant="outline"
              disabled={!isAllReady}
              hidden={!isCreator}
              className="text-lg font-bold h-12 w-24"
              onClick={onStartGame}
            >
              게임시작
            </Button>
          </div>
        )}

        {gameState === GameState.HINT && hints && (
          <div className="w-full grid grid-cols-2 gap-3">
            {hints.map((hint, index) => (
              <Box
                key={`hint-${index}`}
                className="p-4 animate-in fade-in zoom-in-50 duration-500"
              >
                <div className="text-base font-medium">{hint}</div>
              </Box>
            ))}
          </div>
        )}
        {gameState === GameState.SCORING && hints && (
          <div>
            <Card className="w-56">
              <CardHeader className="bg-gray-100 border-b h-10 items-center justify-center">
                <CardTitle className="text-sm font-semibold">정답</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-4">
                <div className="text-lg font-bold">{answer}</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Box>
  )
}

export default Board
