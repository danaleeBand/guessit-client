import { Label } from '@/components/ui/label.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Crown } from 'lucide-react'

const Player = ({ player, creatorId }) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <div className="h-5 w-12 flex items-center justify-center">
        {creatorId === player.id ? <Crown className="size-5" /> : ''}
        <Label className="items-center">{player.isReady ? 'Ready!' : ''}</Label>
      </div>
      <Avatar className="bg-gray-200 text-black">
        <AvatarFallback>{player.id}</AvatarFallback>
        <AvatarImage src={player.profileUrl} />
      </Avatar>
      <div className="text-sm">{player.nickname}</div>
      <div className="rounded-md border px-2 py-1 text-xs">{0}</div>
    </div>
  )
}

export default Player
