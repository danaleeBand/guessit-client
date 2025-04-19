import { Card, SimpleGrid } from '@chakra-ui/react'
import { IoMdLock } from 'react-icons/io'
import { Button } from '../components/ui/button.tsx'
import { BsDoorOpenFill } from 'react-icons/bs'
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
import roomApi from '../apis/roomApi.ts'

export default function Home() {
  // const handleGetUerInfo = async (userId: number) => {
  //   await roomApi
  //     .createRoom(userId)
  //     .then((value) => {
  //       console.log(value.data)
  //     })
  //     .catch(function (e) {
  //       console.log('error Msg....', e)
  //     })
  //     .finally()
  // }
  //
  // useEffect(() => {
  //   handleGetUerInfo(1)
  // }, [])

  const defaultRoomList = [
    {
      title: '같이 연상퀴즈 해요~!',
      code: '#DFWA2736',
      locked: true,
    },
    {
      title: '연상퀴즈 ㄱㄱ',
      code: '#QWER1234',
      locked: false,
    },
    {
      title: '3번방',
      code: '#ABDW9280',
      locked: false,
    },
    {
      title: '4번방',
      code: '#SJEI1038',
      locked: true,
    },
    {
      title: '5번방',
      code: '#ABDW9223',
      locked: false,
    },
  ]

  const playerId = sessionStorage.getItem('playerId')
  if (!playerId) {
    alert('로그인이 필요합니다!')
    return
  }

  const [roomList, setRoomList] = useState(defaultRoomList)
  const [isLocked, setIsLocked] = useState(false)

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
      ['locked']: value,
      password: value ? prev.password : '',
    }))
  }

  const onCreateRoomButton = async () => {
    if (!room.title.trim()) {
      alert('방 제목을 입력해주세요!')
      return
    }

    await roomApi
      .createRoom({ ...room, creatorId: parseInt(playerId) })
      .then((res) => {
        setRoomList([
          ...roomList,
          {
            title: res.data.title,
            code: res.data.code,
            locked: res.data.locked,
          },
        ])
      })
      .catch((err) => {
        console.log(err)
        alert('서버 오류로 인해 방 생성에 실패했습니다.')
      })
  }

  return (
    <>
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Guess It!</h1>
      </div>

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
                defaultValue={isLocked ? 'true' : 'false'}
                id="locked"
                className="col-span-3"
                onValueChange={(value) => setIsLocked(value === 'true')}
              >
                <div className="grid grid-cols-3 items-center">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      onClick={() => handleLockStateChange(false)}
                      value="false"
                      id="open"
                    />
                    <Label htmlFor="open">공개방</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      onClick={() => handleLockStateChange(true)}
                      value="true"
                      id="lock"
                    />
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
                disabled={!isLocked}
                className="col-span-3"
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

      <div className="mt-10 flex flex-col items-center text-center">
        <SimpleGrid columns={2} gap="4">
          {roomList.map((value) => (
            <Card.Root width="320px" variant={'elevated'} key={value.code}>
              <Card.Body gap="2">
                <Card.Title mb="2">
                  <div className="flex items-center space-x-2 text-lg">
                    {value.locked ? <IoMdLock className="mr-1.5" /> : ''}{' '}
                    {value.title}
                  </div>
                </Card.Title>
                <Card.Description>{value.code}</Card.Description>
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
                <Button>Join</Button>
              </Card.Footer>
            </Card.Root>
          ))}
        </SimpleGrid>
      </div>
    </>
  )
}
