import { Button } from '../components/ui/button.tsx'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty.tsx'
import { AlertCircle } from 'lucide-react'

const NotFound = () => {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircle className="w-10 h-10 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>방을 찾을 수 없습니다</EmptyTitle>
        <EmptyDescription>
          존재하지 않거나 잘못된 방 주소입니다.
          <br />방 목록으로 돌아가 다시 선택해주세요.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          variant="outline"
          size="sm"
          onClick={() => (window.location.href = '/')}
        >
          방 목록으로 이동
        </Button>
      </EmptyContent>
    </Empty>
  )
}
export default NotFound
