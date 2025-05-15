import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog.tsx'
import { Label } from '../components/ui/label.tsx'
import { Input } from '../components/ui/input.tsx'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group.tsx'
import { useState } from 'react'
import { Button } from './ui/button.tsx'
import { BsDoorOpenFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import roomApi from '../apis/roomApi.ts'

export default function CreateRoomModal() {
  const playerId = sessionStorage.getItem('playerId')
  const navigate = useNavigate()
  const [locked, setIsLocked] = useState(false)
  const [room, setRoom] = useState({
    title: '',
    locked: false,
    password: '',
  })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRoom((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLockStateChange = (value: boolean) => {
    setRoom((prev) => ({
      ...prev,
      locked: value,
      password: value ? prev.password : '',
    }))
    setIsLocked(value)
  }

  const onCreateRoomButton = async () => {
    if (!room.title.trim()) {
      alert('방 제목을 입력해주세요!')
      return
    }

    try {
      const res = await roomApi.createRoom({
        ...room,
        creatorId: parseInt(playerId!),
      })
      const roomId = res.data.id
      navigate(`/room/${roomId}`)
    } catch (err) {
      console.log(err)
      alert('서버 오류로 인해 방 생성에 실패했습니다.')
    }
  }

  return (
    <Dialog>
      <div className="mt-5 text-center">
        <DialogTrigger asChild>
          <Button variant={'secondary'}>
            <BsDoorOpenFill /> 방 만들기
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>방 만들기</DialogTitle>
          <DialogDescription>
            직접 방을 개설하고 친구들과 게임을 즐겨보세요~!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              방 제목
            </Label>
            <Input
              name="title"
              className="col-span-3"
              onChange={handleTitleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="locked" className="text-right">
              잠금 여부
            </Label>
            <RadioGroup
              defaultValue={locked ? 'true' : 'false'}
              id="locked"
              className="col-span-3"
              onValueChange={(value) => handleLockStateChange(value === 'true')}
            >
              <div className="grid grid-cols-3 items-center">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="open" />
                  <Label htmlFor="open">공개방</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="lock" />
                  <Label htmlFor="lock">비밀방</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              비밀번호
            </Label>
            <Input
              id="password"
              disabled={!locked}
              className="col-span-3"
              value={room.password}
              onChange={(e) =>
                setRoom((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onCreateRoomButton}>
            만들기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
