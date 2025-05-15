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

type PasswordModalProps = {
  roomId: number
  isOpen: boolean
  onClose: () => void
  onSubmit: (password: string) => void
}

export default function PasswordModal({
  roomId,
  isOpen,
  onClose,
  onSubmit,
}: PasswordModalProps) {
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    try {
      const res = await roomApi.checkPassword(roomId, password)
      const { valid } = res.data

      if (valid) {
        onSubmit(password)
      } else {
        alert('비밀번호가 일치하지 않습니다.')
      }
    } catch (err) {
      console.error(err)
      alert('비밀번호 확인 중 오류가 발생했습니다.')
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
          <Button onClick={handleSubmit}>입장</Button>
          <Button variant="ghost" onClick={onClose} className="border">
            취소
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
