import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './components/ui/button.tsx'
import { Card, SimpleGrid } from '@chakra-ui/react'
import { Input } from './components/ui/input.tsx'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'

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

export default function NicknameInput() {
  const [nickname, setNickname] = useState('')
  const [randomProfileImage, setRandomProfileImage] = useState<string>('')

  const navigate = useNavigate()

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * profileImages.length)
    setRandomProfileImage(profileImages[randomIndex])
  }, [])

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nickname) {
      alert('닉네임을 입력해주세요!')
      return
    }

    try {
      const response = await fetch('http://localhost:8080/api/v1/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickname,
          profileUrl: randomProfileImage,
        }),
      })

      if (!response.ok) {
        throw new Error('프로필 생성에 실패했습니다.')
      }

      const data = await response.json()
      sessionStorage.setItem('playerId', data.id)

      navigate('/home')
    } catch (error) {
      console.error(error)
      alert('서버 오류로 인해 프로필 생성에 실패했습니다.')
    }
  }

  return (
    <>
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Guess It!</h1>
      </div>

      <div className="mt-10 flex flex-col items-center text-center">
        <SimpleGrid columns={1} gap="4">
          <Card.Root width="320px" variant={'elevated'}>
            <form onSubmit={handleSubmit}>
              <Card.Body gap="2">
                <Card.Title mb="2"></Card.Title>
                <Card.Description>
                  {randomProfileImage && (
                    <div className="mt-6 flex justify-center">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={randomProfileImage} />
                        <AvatarFallback>미리보기</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  <div className="mt-6">
                    <Input
                      type="text"
                      placeholder="닉네임"
                      value={nickname}
                      onChange={handleNicknameChange}
                    />
                  </div>
                </Card.Description>
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
                <Button type="submit">Join</Button>
              </Card.Footer>
            </form>
          </Card.Root>
        </SimpleGrid>
      </div>
    </>
  )
}
