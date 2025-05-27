"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Phone, Video, MoreHorizontal, Paperclip, Smile } from "lucide-react"
import { useWebSocket } from "@/lib/websocket"
import { cn } from "@/lib/utils"

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: number
  type: "text" | "image" | "file" | "system"
  status: "sending" | "sent" | "delivered" | "read"
}

export interface ChatParticipant {
  id: string
  name: string
  avatar?: string
  role: "client" | "professional"
  isOnline: boolean
  lastSeen?: number
}

interface LiveChatProps {
  chatId: string
  currentUserId: string
  participants: ChatParticipant[]
}

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    senderId: "user1",
    senderName: "John Doe",
    content: "Hi Dr. Wilson, I wanted to confirm my appointment for tomorrow at 2 PM.",
    timestamp: Date.now() - 3600000,
    type: "text",
    status: "read",
  },
  {
    id: "2",
    senderId: "user2",
    senderName: "Dr. Sarah Wilson",
    content: "Hello John! Yes, your appointment is confirmed for tomorrow at 2:00 PM. Please arrive 10 minutes early.",
    timestamp: Date.now() - 3300000,
    type: "text",
    status: "read",
  },
  {
    id: "3",
    senderId: "user1",
    senderName: "John Doe",
    content: "Perfect! Should I bring anything specific to the session?",
    timestamp: Date.now() - 3000000,
    type: "text",
    status: "read",
  },
  {
    id: "4",
    senderId: "user2",
    senderName: "Dr. Sarah Wilson",
    content: "Just bring any questions you might have. Looking forward to seeing you!",
    timestamp: Date.now() - 2700000,
    type: "text",
    status: "delivered",
  },
]

export function LiveChat({ chatId, currentUserId, participants }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { subscribe, send, isConnected } = useWebSocket()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Subscribe to real-time chat events
    const unsubscribeMessage = subscribe("chat_message", (payload) => {
      if (payload.chatId === chatId) {
        const newMsg: ChatMessage = {
          id: payload.id,
          senderId: payload.senderId,
          senderName: payload.senderName,
          senderAvatar: payload.senderAvatar,
          content: payload.content,
          timestamp: payload.timestamp,
          type: payload.type || "text",
          status: "delivered",
        }
        setMessages((prev) => [...prev, newMsg])
      }
    })

    const unsubscribeTyping = subscribe("user_typing", (payload) => {
      if (payload.chatId === chatId && payload.userId !== currentUserId) {
        setTypingUsers((prev) => {
          if (!prev.includes(payload.userId)) {
            return [...prev, payload.userId]
          }
          return prev
        })

        // Remove typing indicator after 3 seconds
        setTimeout(() => {
          setTypingUsers((prev) => prev.filter((id) => id !== payload.userId))
        }, 3000)
      }
    })

    const unsubscribeStopTyping = subscribe("user_stop_typing", (payload) => {
      if (payload.chatId === chatId) {
        setTypingUsers((prev) => prev.filter((id) => id !== payload.userId))
      }
    })

    return () => {
      unsubscribeMessage()
      unsubscribeTyping()
      unsubscribeStopTyping()
    }
  }, [subscribe, chatId, currentUserId])

  const sendMessage = () => {
    if (!newMessage.trim() || !isConnected) return

    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const currentUser = participants.find((p) => p.id === currentUserId)

    const message: ChatMessage = {
      id: messageId,
      senderId: currentUserId,
      senderName: currentUser?.name || "You",
      senderAvatar: currentUser?.avatar,
      content: newMessage.trim(),
      timestamp: Date.now(),
      type: "text",
      status: "sending",
    }

    // Add message optimistically
    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Send to server
    send({
      type: "chat_message",
      payload: {
        chatId,
        id: messageId,
        senderId: currentUserId,
        senderName: currentUser?.name,
        senderAvatar: currentUser?.avatar,
        content: message.content,
        timestamp: message.timestamp,
        type: "text",
      },
    })

    // Stop typing indicator
    send({
      type: "user_stop_typing",
      payload: {
        chatId,
        userId: currentUserId,
      },
    })
  }

  const handleTyping = (value: string) => {
    setNewMessage(value)

    if (!isTyping && value.length > 0) {
      setIsTyping(true)
      send({
        type: "user_typing",
        payload: {
          chatId,
          userId: currentUserId,
        },
      })
    }

    // Debounce stop typing
    setTimeout(() => {
      if (isTyping) {
        setIsTyping(false)
        send({
          type: "user_stop_typing",
          payload: {
            chatId,
            userId: currentUserId,
          },
        })
      }
    }, 1000)
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getMessageStatus = (status: string) => {
    switch (status) {
      case "sending":
        return "Sending..."
      case "sent":
        return "Sent"
      case "delivered":
        return "Delivered"
      case "read":
        return "Read"
      default:
        return ""
    }
  }

  const otherParticipants = participants.filter((p) => p.id !== currentUserId)

  return (
    <Card className="flex flex-col h-[600px]">
      {/* Chat Header */}
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {otherParticipants.length === 1 ? (
              <>
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={otherParticipants[0].avatar || "/placeholder.svg"}
                    alt={otherParticipants[0].name}
                  />
                  <AvatarFallback>
                    {otherParticipants[0].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{otherParticipants[0].name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        otherParticipants[0].isOnline ? "bg-green-500" : "bg-slate-400",
                      )}
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {otherParticipants[0].isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <CardTitle className="text-lg">Group Chat</CardTitle>
                <span className="text-sm text-slate-600 dark:text-slate-300">{participants.length} participants</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => {
              const isOwnMessage = message.senderId === currentUserId
              const sender = participants.find((p) => p.id === message.senderId)

              return (
                <div key={message.id} className={cn("flex gap-3", isOwnMessage ? "justify-end" : "justify-start")}>
                  {!isOwnMessage && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={sender?.avatar || "/placeholder.svg"} alt={sender?.name} />
                      <AvatarFallback className="text-xs">
                        {sender?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className={cn("max-w-[70%]", isOwnMessage && "text-right")}>
                    {!isOwnMessage && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 mb-1">{message.senderName}</p>
                    )}

                    <div
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm",
                        isOwnMessage
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white",
                      )}
                    >
                      {message.content}
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">{formatTimestamp(message.timestamp)}</span>
                      {isOwnMessage && (
                        <span className="text-xs text-slate-500">{getMessageStatus(message.status)}</span>
                      )}
                    </div>
                  </div>

                  {isOwnMessage && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={sender?.avatar || "/placeholder.svg"} alt={sender?.name} />
                      <AvatarFallback className="text-xs">
                        {sender?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              )
            })}

            {/* Typing Indicator */}
            {typingUsers.length > 0 && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">...</AvatarFallback>
                </Avatar>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>

      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>

          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => handleTyping(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              className="pr-10"
            />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
              <Smile className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim() || !isConnected}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {!isConnected && (
          <div className="mt-2">
            <Badge variant="destructive" className="text-xs">
              Disconnected - Messages will be sent when connection is restored
            </Badge>
          </div>
        )}
      </div>
    </Card>
  )
}
