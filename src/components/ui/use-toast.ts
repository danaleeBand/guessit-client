import * as React from 'react'
import { toast, ToastOptions } from 'react-hot-toast'

export function useToast() {
  const notify = React.useCallback((options: ToastOptions) => {
    toast(options)
  }, [])

  return {
    toast: notify,
  }
}
