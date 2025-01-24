import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './components/ui/button.tsx'
import { Card, SimpleGrid } from '@chakra-ui/react'
import { Input } from './components/ui/input.tsx'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'

const profileImages = ['https://github.com/shadcn.png']

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nickname) {
      sessionStorage.setItem('nickname', nickname)
      sessionStorage.setItem('profileImage', randomProfileImage)
      navigate('/home')
    } else {
      alert('닉네임을 입력해주세요!')
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
                      <Avatar>
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
