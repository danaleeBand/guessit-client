import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../components/ui/dialog.tsx'
import { Button } from '../components/ui/button.tsx'
import { Input } from '../components/ui/input.tsx'
import { useState } from 'react'
import roomApi from '@/apis/roomApi.ts'
import { useToast } from '@/hooks/use-toast.ts'
import { useNavigate } from 'react-router-dom'

type PasswordModalProps = {
  roomId: number
  isOpen: boolean
  onClose: () => void
}

export default function PasswordModal({
  roomId,
  isOpen,
  onClose,
}: PasswordModalProps) {
  const { toast } = useToast()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')

  const handleJoinRoom = async () => {
    try {
      const playerId = Number(sessionStorage.getItem('playerId'))
      const res = await roomApi.joinRoom(roomId, { playerId, password })
      const { valid, message } = res.data

      if (valid) {
        navigate(`/room/${roomId}`)
      } else {
        toast({
          title: message,
        })
      }
    } catch (err) {
      console.error(err)
      toast({
        variant: 'destructive',
        title: '비밀번호 확인 중 오류가 발생했습니다.',
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>비밀번호 입력</DialogTitle>
          <DialogDescription>
            방에 입장하려면 비밀번호를 입력하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleJoinRoom}>Join</Button>
          <Button variant="ghost" onClick={onClose} className="border">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
