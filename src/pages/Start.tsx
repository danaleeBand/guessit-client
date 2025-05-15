import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button.tsx'
import { Card, CardContent, CardFooter } from '../components/ui/card.tsx'
import { Input } from '../components/ui/input.tsx'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../components/ui/avatar.tsx'
import playerApi from '../apis/playerApi.ts'

const profileImages = [
  'https://i.postimg.cc/J76717dq/2025-02-07-9-11-10.png',
  'https://i.postimg.cc/ZKWb0kGh/2025-02-07-9-11-15.png',
  'https://i.postimg.cc/yY2VZQK3/2025-02-07-9-11-20.png',
  'https://i.postimg.cc/Z53JF8Y7/2025-02-07-9-11-26.png',
  'https://i.postimg.cc/prY6LdPB/2025-02-07-9-11-32.png',
  'https://i.postimg.cc/jqz9XMyJ/2025-02-07-9-11-37.png',
  'https://i.postimg.cc/WbTyf07Y/2025-02-07-9-11-45.png',
  'https://i.postimg.cc/6p113gxF/2025-02-07-9-11-52.png',
  'https://i.postimg.cc/wBy4s26M/2025-02-07-9-11-56.png',
  'https://i.postimg.cc/Pqg3bDx4/2025-02-07-9-12-02.png',
  'https://i.postimg.cc/rm5hfpRL/2025-02-07-9-12-07.png',
  'https://i.postimg.cc/D0FxHK14/2025-02-07-9-12-16.png',
]

export default function Start() {
  const navigate = useNavigate()
  const [player, setPlayer] = useState({
    nickname: '',
    profileUrl: '',
  })

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * profileImages.length)
    setPlayer((prev) => ({ ...prev, profileUrl: profileImages[randomIndex] }))
  }, [])

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer((prev) => ({ ...prev, nickname: e.target.value }))
  }

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!player.nickname) {
      alert('닉네임을 입력해주세요!')
      return
    }
    await playerApi
      .createPlayer(player)
      .then((res) => {
        sessionStorage.setItem('playerId', res.data.id)
        navigate('/home')
      })
      .catch((err) => {
        console.error(err)
        alert('서버 오류로 인해 프로필 생성에 실패했습니다.')
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-sm sm:max-w-md p-6 shadow-xl">
        <CardContent className="space-y-4">
          <h1 className="py-6 text-3xl font-bold text-center">Guessit!</h1>

          {player.profileUrl && (
            <div className="mt-6 flex justify-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={player.profileUrl} />
                <AvatarFallback>아바타</AvatarFallback>
              </Avatar>
            </div>
          )}
          <div className="mt-6">
            <Input
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={player.nickname}
              onChange={handleNicknameChange}
              className="w-full"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleClick} className="w-full sm:w-auto">
            Join
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
