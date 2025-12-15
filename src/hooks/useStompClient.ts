import { useEffect, useRef, useState } from 'react'
import { Client } from '@stomp/stompjs'

export const useStompClient = () => {
  const clientRef = useRef<Client | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const wsUrl = `${import.meta.env.VITE_WEB_SOCKET_SERVER_BASE_URL}`

    const client = new Client({
      brokerURL: wsUrl,

      onConnect: () => {
        console.log('✅ STOMP connected')
        setIsConnected(true)
      },

      onStompError: (frame) => {
        console.error('❌ STOMP error:', frame.headers['message'])
        console.error('Details:', frame.body)
        setIsConnected(false)
      },

      onWebSocketClose: () => {
        console.log('🔌 WebSocket disconnected')
        setIsConnected(false)
      },

      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    })

    clientRef.current = client
    client.activate()

    return () => {
      if (client.active) {
        client.deactivate()
        console.log('🔌 STOMP client deactivated')
      }
    }
  }, [])

  return {
    client: clientRef.current,
    isConnected,
  }
}
