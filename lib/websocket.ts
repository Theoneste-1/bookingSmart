"use client"

import { useEffect, useRef, useState } from "react"

export interface WebSocketMessage {
  type: string
  payload: any
  timestamp: number
  userId?: string
}

export interface UseWebSocketOptions {
  url?: string
  reconnectAttempts?: number
  reconnectInterval?: number
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: Event) => void
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const {
    url = process.env.NODE_ENV === "production" ? "wss://api.bookingsmart.com/ws" : "ws://localhost:3001/ws",
    reconnectAttempts = 5,
    reconnectInterval = 3000,
    onConnect,
    onDisconnect,
    onError,
  } = options

  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected" | "error">(
    "disconnected",
  )
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)

  const ws = useRef<WebSocket | null>(null)
  const reconnectCount = useRef(0)
  const messageQueue = useRef<WebSocketMessage[]>([])
  const listeners = useRef<Map<string, ((message: any) => void)[]>>(new Map())

  const connect = () => {
    try {
      setConnectionStatus("connecting")
      ws.current = new WebSocket(url)

      ws.current.onopen = () => {
        setIsConnected(true)
        setConnectionStatus("connected")
        reconnectCount.current = 0
        onConnect?.()

        // Send queued messages
        while (messageQueue.current.length > 0) {
          const message = messageQueue.current.shift()
          if (message) {
            send(message)
          }
        }
      }

      ws.current.onclose = () => {
        setIsConnected(false)
        setConnectionStatus("disconnected")
        onDisconnect?.()

        // Attempt reconnection
        if (reconnectCount.current < reconnectAttempts) {
          reconnectCount.current++
          setTimeout(connect, reconnectInterval)
        }
      }

      ws.current.onerror = (error) => {
        setConnectionStatus("error")
        onError?.(error)
      }

      ws.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          setLastMessage(message)

          // Notify listeners
          const typeListeners = listeners.current.get(message.type) || []
          typeListeners.forEach((listener) => listener(message.payload))
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error)
        }
      }
    } catch (error) {
      setConnectionStatus("error")
      console.error("WebSocket connection failed:", error)
    }
  }

  const disconnect = () => {
    if (ws.current) {
      ws.current.close()
      ws.current = null
    }
  }

  const send = (message: Omit<WebSocketMessage, "timestamp">) => {
    const fullMessage: WebSocketMessage = {
      ...message,
      timestamp: Date.now(),
    }

    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(fullMessage))
    } else {
      // Queue message for when connection is restored
      messageQueue.current.push(fullMessage)
    }
  }

  const subscribe = (messageType: string, callback: (payload: any) => void) => {
    const typeListeners = listeners.current.get(messageType) || []
    typeListeners.push(callback)
    listeners.current.set(messageType, typeListeners)

    // Return unsubscribe function
    return () => {
      const currentListeners = listeners.current.get(messageType) || []
      const index = currentListeners.indexOf(callback)
      if (index > -1) {
        currentListeners.splice(index, 1)
        listeners.current.set(messageType, currentListeners)
      }
    }
  }

  useEffect(() => {
    connect()
    return () => disconnect()
  }, [url])

  return {
    isConnected,
    connectionStatus,
    lastMessage,
    send,
    subscribe,
    connect,
    disconnect,
  }
}

// Mock WebSocket server simulation for demo
export class MockWebSocketServer {
  private clients: Set<WebSocket> = new Set()
  private messageHandlers: Map<string, (message: WebSocketMessage, client: WebSocket) => void> = new Map()

  constructor() {
    this.setupHandlers()
  }

  private setupHandlers() {
    this.messageHandlers.set("booking_created", this.handleBookingCreated.bind(this))
    this.messageHandlers.set("booking_updated", this.handleBookingUpdated.bind(this))
    this.messageHandlers.set("chat_message", this.handleChatMessage.bind(this))
    this.messageHandlers.set("notification_read", this.handleNotificationRead.bind(this))
  }

  private handleBookingCreated(message: WebSocketMessage, sender: WebSocket) {
    // Broadcast to all connected clients except sender
    this.broadcast(message, sender)
  }

  private handleBookingUpdated(message: WebSocketMessage, sender: WebSocket) {
    this.broadcast(message, sender)
  }

  private handleChatMessage(message: WebSocketMessage, sender: WebSocket) {
    this.broadcast(message, sender)
  }

  private handleNotificationRead(message: WebSocketMessage, sender: WebSocket) {
    this.broadcast(message, sender)
  }

  private broadcast(message: WebSocketMessage, excludeClient?: WebSocket) {
    this.clients.forEach((client) => {
      if (client !== excludeClient && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message))
      }
    })
  }

  addClient(client: WebSocket) {
    this.clients.add(client)
  }

  removeClient(client: WebSocket) {
    this.clients.delete(client)
  }

  handleMessage(message: WebSocketMessage, client: WebSocket) {
    const handler = this.messageHandlers.get(message.type)
    if (handler) {
      handler(message, client)
    }
  }
}
