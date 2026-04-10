import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Score } from '@/types/score.ts'
import { Label } from '@/components/ui/label.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Player } from '@/types/player.ts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'

type ScoreBoardModal = {
  isOpen: boolean
  onClose: () => void
  scores: Score[]
  players: Player[]
}
export function ScoreBoardModal({ isOpen, onClose, scores, players }) {
  const rankEmoji = (rank: number | undefined) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return `${rank}`
    }
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>게임 결과</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead></TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scores.map((score) => {
              const player = players.find((p) => p.id === score.playerId)
              if (!player) return null
              return (
                <TableRow key={score.playerId}>
                  <TableCell className="font-medium text-center">
                    {score.rank < 4 ? (
                      <Label className="text-3xl">
                        {rankEmoji(score.rank)}
                      </Label>
                    ) : (
                      <Label className="text-lg">{score.rank}</Label>
                    )}
                  </TableCell>
                  <TableCell>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{player.id}</AvatarFallback>
                      <AvatarImage src={player.profileUrl} />
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{player.nickname}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="ml-auto font-bold">{score.score}</span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={onClose}>
              확인
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
