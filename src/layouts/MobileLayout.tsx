import { Outlet } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster.tsx'

export default function MobileLayout() {
  return (
    <div className="min-h-screen bg-zinc-200 sm:flex sm:justify-center">
      <div className="relative w-full min-h-screen bg-white sm:max-w-[430px] sm:shadow-2xl overflow-y-auto">
        <Toaster />
        <Outlet />
      </div>
    </div>
  )
}
