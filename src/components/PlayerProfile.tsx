import { Label } from '@/components/ui/label.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Crown } from 'lucide-react'
import { Player } from '@/types/player.ts'

interface PlayerProps {
  player: Player
  creatorId: number
  playerId: number
}

const PlayerProfile = ({ player, creatorId, playerId }: PlayerProps) => {
  const isMe = player.id === playerId

  return (
    <div className="flex flex-col items-center space-y-1">
      <div className="h-5 w-12 flex items-center justify-center">
        {creatorId === player.id ? (
          <Crown className="size-5" />
        ) : (
          <Label className="items-center">{player.ready ? 'Ready!' : ''}</Label>
        )}
      </div>
      <Avatar
        className={`text-black w-12 h-12 ${isMe ? 'border-2 border-dashed border-black bg-transparent' : 'bg-gray-200'}`}
      >
        <AvatarFallback>{player.id}</AvatarFallback>
        <AvatarImage src={player.profileUrl} />
      </Avatar>
      <div className="text-sm">{player.nickname}</div>
      <div className="rounded-md border px-2 py-1 text-xs">{0}</div>
    </div>
  )
}

export default PlayerProfile
