import { Card } from '@/components/ui/card'
import { Toggle } from '@/components/ui/toggle'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { GameState } from '@/types/game.ts'

interface BoardProps {
  countdown: number | undefined
  ready: boolean
  isCreator: boolean
  isAllReady: boolean
  onReadyClick: () => void
  onStartGame: () => void
  gameState: GameState | undefined
}

const Board = ({
  countdown,
  ready,
  isCreator,
  isAllReady,
  onReadyClick,
  onStartGame,
  gameState,
}: BoardProps) => {
  return (
    <Card className="min-h-[300px] w-full rounded-lg mx-auto overflow-hidden shadow-none">
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

        <div>
          <Toggle
            pressed={ready}
            onPressedChange={onReadyClick}
            variant="outline"
            hidden={isCreator}
            className="bg-white data-[state=on]:bg-gray-200 w-24 h-12"
          >
            <Label className="text-lg font-bold">
              {ready ? '준비완료' : '준비'}
            </Label>
          </Toggle>

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
      </div>
    </Card>
  )
}

export default Board
