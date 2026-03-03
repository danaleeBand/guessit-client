import { Label } from '@/components/ui/label.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Crown } from 'lucide-react'
import { Player } from '@/types/player.ts'
import { Badge } from '@/components/ui/badge.tsx'
import { Submission } from '@/types/submission.ts'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx'
import { TooltipArrow } from '@radix-ui/react-tooltip'
import { Result } from '@/types/result.ts'
import { GameState } from '@/types/game.ts'
import { Score } from '@/types/score.ts'

interface PlayerProps {
  player: Player
  creatorId: number
  playerId: number
  roomState: boolean | undefined
  submission: Submission | null | undefined
  result: Result | null | undefined
  gameState: GameState | undefined
  score: Score | undefined
}

const PlayerProfile = ({
  player,
  creatorId,
  playerId,
  roomState,
  submission,
  result,
  gameState,
  score,
}: PlayerProps) => {
  const isMe = player.id === playerId

  const rankEmoji = (rank: number | undefined) => {
    switch (rank) {
      case 1:
        return '🥇1st'
      case 2:
        return '🥈2nd'
      case 3:
        return '🥉3rd'
      default:
        return `${rank}th`
    }
  }

  const rank =
    gameState === GameState.SCORING ? result?.rank : submission?.submitOrder

  return (
    <div className="flex flex-col items-center space-y-1">
      <TooltipProvider>
        <Tooltip open={gameState === GameState.SCORING}>
          <TooltipTrigger asChild>
            <div className="w-1 h-1" />
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className={
              result?.isCorrect
                ? 'bg-blue-500 text-white font-semibold'
                : 'bg-red-500 text-white font-semibold'
            }
          >
            {result?.submittedAnswer}
            <TooltipArrow
              className={result?.isCorrect ? 'fill-blue-500' : 'fill-red-500'}
            />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="h-5 w-16 flex items-center justify-center">
        {!roomState &&
          (creatorId === player.id ? (
            <Crown className="size-5" />
          ) : (
            <Label className="items-center">
              {player.ready ? 'Ready!' : ''}
            </Label>
          ))}
        {rank != null && <Badge variant="secondary">{rankEmoji(rank)}</Badge>}
      </div>
      <Avatar
        className={`text-black w-12 h-12 ${isMe ? 'border-2 border-dashed border-black bg-transparent' : 'bg-gray-200'}`}
      >
        <AvatarFallback>{player.id}</AvatarFallback>
        <AvatarImage src={player.profileUrl} />
      </Avatar>
      <div className="text-sm">{player.nickname}</div>
      <Badge variant="outline" className="text-xs w-12 justify-center">
        {score?.score || '-'}
      </Badge>
    </div>
  )
}

export default PlayerProfile
